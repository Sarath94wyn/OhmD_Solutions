const { validationResult } = require('express-validator');
const BlogPost = require('../models/BlogPost');

// @desc    Get all published blog posts
// @route   GET /api/blog
// @access  Public
const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = { isPublished: true };

    // Search by title or tags
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      filter.$or = [
        { title: searchRegex },
        { tags: { $in: [searchRegex] } },
      ];
    }

    if (req.query.category) {
      filter.category = { $regex: req.query.category, $options: 'i' };
    }

    if (req.query.tag) {
      filter.tags = { $in: [req.query.tag] };
    }

    // Admin can see all posts
    if (req.query.all === 'true') {
      delete filter.isPublished;
    }

    const total = await BlogPost.countDocuments(filter);
    const posts = await BlogPost.find(filter)
      .select('-content') // exclude full content in list
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
const getBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog post
// @route   POST /api/blog
// @access  Private (Admin)
const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private (Admin)
const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    // Update fields
    Object.assign(post, req.body);
    await post.save(); // triggers pre-save slug generation

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private (Admin)
const remove = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle publish status
// @route   PUT /api/blog/:id/toggle-publish
// @access  Private (Admin)
const togglePublish = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    post.isPublished = !post.isPublished;
    post.publishedAt = post.isPublished ? new Date() : null;
    await post.save();

    res.json({
      success: true,
      data: post,
      message: post.isPublished ? 'Post published' : 'Post unpublished',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getBySlug, create, update, remove, togglePublish };
