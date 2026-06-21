const Razorpay = require('razorpay');
const crypto = require('crypto');

// Create order
exports.createOrder = async (req, res, next) => {
  try {
    const { amount, currency } = req.body;
    
    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_mockkey12345';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'mocksecret12345';

    // If actual keys are not provided, we will return a mock order for testing
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const instance = new Razorpay({
        key_id,
        key_secret,
      });

      const options = {
        amount: Math.round(amount * 100), // Razorpay accepts in paisa
        currency: currency || 'INR',
        receipt: `receipt_order_${Date.now()}`,
      };

      const order = await instance.orders.create(options);
      return res.status(200).json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: key_id,
      });
    } else {
      // Mock order for frontend demo testing
      return res.status(200).json({
        success: true,
        isMock: true,
        orderId: `order_mock_${Date.now()}`,
        amount: amount * 100,
        currency: currency || 'INR',
        key: 'rzp_test_mockkey12345',
      });
    }
  } catch (err) {
    next(err);
  }
};

// Verify payment signature
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, isMock } = req.body;

    if (isMock) {
      return res.status(200).json({
        success: true,
        message: 'Mock payment verified successfully (Test Mode)',
      });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment verification details' });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'mocksecret12345';

    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid signature. Payment verification failed.',
      });
    }
  } catch (err) {
    next(err);
  }
};
