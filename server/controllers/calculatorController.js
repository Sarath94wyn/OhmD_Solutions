const { validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');
const { sendEmail } = require('../utils/email');

// Aligned pricing matching the frontend constants
const PRICING = {
  website: { base: 10000, label: 'Website Development' },
  'ai-bot': { base: 25000, label: 'AI Chatbot Solutions' },
  'mobile-app': { base: 40000, label: 'Mobile App Development' },
  saas: { base: 80000, label: 'SaaS Platform Development' },
  uiux: { base: 8000, label: 'UI/UX Design Services' },
  branding: { base: 15000, label: 'Brand Identity & Design' },
};

const COMPLEXITY_MULTIPLIER = {
  basic: 1.0,
  standard: 2.0,
  premium: 3.5,
};

const FEATURE_COSTS = {
  // Website
  auth: 10000,
  payment: 15000,
  db: 15000,
  cms: 12000,
  seo: 5000,
  // AI Bot
  'custom-training': 15000,
  voice: 20000,
  'crm-int': 18000,
  whatsapp: 10000,
  // Mobile App
  auth_mobile: 12000, // fallback
  payment_mobile: 18000, // fallback
  push: 8000,
  map: 15000,
  offline: 20000,
  // SaaS
  'multi-tenant': 30000,
  billing: 25000,
  analytics: 20000,
  'api-access': 15000,
  // UI/UX
  wireframes: 5000,
  interactive: 10000,
  assets: 4000,
  // Branding
  'logo-variations': 5000,
  guidelines: 8000,
  collateral: 6000,
};

// Also support common features that might map differently
const FEATURE_ALIASES = {
  auth: ['auth', 'user_auth'],
  payment: ['payment', 'payment_gateway'],
};

// @desc    Calculate estimated price and/or save lead enquiry
// @route   POST /api/calculator
// @access  Public
const calculate = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const {
      name,
      email,
      phone,
      serviceType,
      complexity = 'standard',
      features = [],
      minEstimate,
      maxEstimate,
      timeline,
    } = req.body;

    // Validate service type
    const serviceInfo = PRICING[serviceType];
    if (!serviceInfo) {
      return res.status(400).json({
        success: false,
        message: `Invalid service type. Valid types: ${Object.keys(PRICING).join(', ')}`,
      });
    }

    // Perform calculation (re-verify or fallback)
    const base = serviceInfo.base;
    const multiplier = COMPLEXITY_MULTIPLIER[complexity] || 2.0;
    
    let featureCost = 0;
    const featureBreakdown = [];
    features.forEach((fId) => {
      // Find cost (either direct match or common fallback)
      let cost = FEATURE_COSTS[fId];
      if (cost === undefined) {
        // Check mobile specific auth/payment
        if (fId === 'auth' && serviceType === 'mobile-app') cost = FEATURE_COSTS.auth_mobile;
        else if (fId === 'payment' && serviceType === 'mobile-app') cost = FEATURE_COSTS.payment_mobile;
      }

      if (cost !== undefined) {
        featureCost += cost;
        featureBreakdown.push({ feature: fId, cost });
      }
    });

    const calculatedMin = Math.round((base * multiplier) + featureCost);
    const calculatedMax = Math.round(calculatedMin * 1.35);

    // Timeline calculation
    let calculatedTimeline = timeline || '2-4 weeks';
    if (!timeline) {
      if (serviceType === 'saas' || serviceType === 'mobile-app' || complexity === 'premium') {
        calculatedTimeline = '6-12 weeks';
      } else if (complexity === 'standard') {
        calculatedTimeline = '3-5 weeks';
      } else if (serviceType === 'website' && complexity === 'basic') {
        calculatedTimeline = '1-2 weeks';
      }
    }

    // Save lead to database if contact details are provided
    if (name && email) {
      const messageContent = `Interactive Cost Calculator Lead Summary:
- Service Category: ${serviceInfo.label} (${serviceType})
- Complexity Level: ${complexity.toUpperCase()}
- Selected Features: ${features.length > 0 ? features.join(', ') : 'None'}
- Estimated Budget Range: ₹${(minEstimate || calculatedMin).toLocaleString('en-IN')} - ₹${(maxEstimate || calculatedMax).toLocaleString('en-IN')}
- Projected Timeline: ${timeline || calculatedTimeline}
- Client Name: ${name}
- Client Email: ${email}
- Client Phone: ${phone || 'N/A'}`;

      await Enquiry.create({
        name,
        email,
        phone,
        type: 'service_enquiry',
        message: messageContent,
      });

      // Send email notification to admin
      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
      if (adminEmail) {
        try {
          await sendEmail(
            adminEmail,
            `New Cost Calculator Lead: ${name} - ${serviceInfo.label}`,
            `
            <h2>New Cost Calculator Lead Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Service Type:</strong> ${serviceInfo.label} (${serviceType})</p>
            <p><strong>Complexity:</strong> ${complexity}</p>
            <p><strong>Selected Features:</strong> ${features.length > 0 ? features.join(', ') : 'None'}</p>
            <p><strong>Estimated Budget:</strong> ₹${(minEstimate || calculatedMin).toLocaleString('en-IN')} - ₹${(maxEstimate || calculatedMax).toLocaleString('en-IN')}</p>
            <p><strong>Projected Timeline:</strong> ${timeline || calculatedTimeline}</p>
            <hr>
            <p><em>Sent from OhmD Solutions Interactive Cost Calculator</em></p>
            `
          );
        } catch (emailErr) {
          console.error('SMTP Calculator Lead Email notification failed:', emailErr.message);
        }
      }
    }

    res.json({
      success: true,
      message: 'Calculator request processed successfully',
      data: {
        serviceType: serviceInfo.label,
        complexity,
        estimatedPrice: {
          min: minEstimate || calculatedMin,
          max: maxEstimate || calculatedMax,
          currency: '₹',
          formatted: `₹${(minEstimate || calculatedMin).toLocaleString('en-IN')} - ₹${(maxEstimate || calculatedMax).toLocaleString('en-IN')}`,
        },
        featureBreakdown,
        featureCostTotal: featureCost,
        estimatedTimeline: {
          formatted: timeline || calculatedTimeline,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { calculate };
