const db = require('../models');
const Post = db.Post;
const User = db.User;

async function createPost(req, title, body) {
  if (!req.session.user_id) {
    throw new Error('You must be logged in to create a post');
  }

  try {
    const post = await Post.create({
      title,
      body,
      user_id: req.session.user_id,
    });
    return {success: true, post};
  } catch (error) {
    console.error('Error creating post:', error);
    return {success: false, error: error.message};
  }
};

async function editPost(req, title, body) {
  if (!req.session.user_id) {
    throw new Error('You must be logged in to edit a post');
  }

  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!post) {
      throw new Error('Post not found or you do not have permission to edit this post.');
    }

    post.title = title;
    post.body = body;
    await post.save();

    return {success: true, post};
  
  } catch (error) {
    console.error('Error editing post:', error);
    return {success: false, error: error.message};
  }
};

async function deletePost(req) {
  if (!req.session.user_id) {
    throw new Error('You must be logged in to delete a post');
  }

  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!post) {
      throw new Error('Post not found or you do not have permission to delete this post');
    }

    await post.destroy();

    return {success: true};
  
  } catch (error) {
    console.error('Error deleting post:', error);
    return {success: false, error: error.message};
  }
};

async function getPostById(req) {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return {success: true, post};
  } catch (error) {
    console.error('Error getting post by id:', error);
    return {success: false, error: error.message};
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getPostById,
}