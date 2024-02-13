const db = require('../models');
const Post = db.Post;

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
}

async function editPost(req, title, body) {

}

async function deletePost(req) {

}


module.exports = {
  createPost,
  editPost,
  deletePost
}