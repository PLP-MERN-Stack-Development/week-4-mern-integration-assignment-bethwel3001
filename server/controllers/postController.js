import Post from '../models/Post.js';
import Category from '../models/Category.js';
import { generateSlug } from '../utils/helpers.js';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('categories', 'name slug')
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    res.json({
      posts,
      page,
      pages: Math.ceil(totalPosts / limit),
      totalPosts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('categories', 'name slug')
      .populate('author', 'name avatar')
      .populate('comments.user', 'name avatar');

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res, next) => {
  try {
    const { title, content, categories, excerpt } = req.body;

    // Check if categories exist
    const existingCategories = await Category.find({
      _id: { $in: categories },
    });
    if (existingCategories.length !== categories.length) {
      res.status(400);
      throw new Error('One or more categories not found');
    }

    const post = new Post({
      title,
      content,
      excerpt,
      categories,
      author: req.user._id,
      slug: generateSlug(title),
    });

    if (req.file) {
      post.featuredImage = req.file.path;
    }

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res, next) => {
  try {
    const { title, content, categories, excerpt } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Check if user is the author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to update this post');
    }

    // Check if categories exist
    const existingCategories = await Category.find({
      _id: { $in: categories },
    });
    if (existingCategories.length !== categories.length) {
      res.status(400);
      throw new Error('One or more categories not found');
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = excerpt || post.excerpt;
    post.categories = categories || post.categories;
    post.slug = title ? generateSlug(title) : post.slug;

    if (req.file) {
      post.featuredImage = req.file.path;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Check if user is the author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to delete this post');
    }

    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    const comment = {
      user: req.user._id,
      text,
    };

    post.comments.push(comment);
    await post.save();

    // Populate the user details in the comment
    await post.populate('comments.user', 'name avatar').execPopulate();
    const newComment = post.comments[post.comments.length - 1];

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};