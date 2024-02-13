const db = require('../models');
const Post = db.Post;
const User = db.User;

async function createPost(req, title, body) {
  try {
    if (!req.session.user_id) {
      return { error: "User not authenticated." };
    }

    const user_id = req.session.user_id;

    const newPost = await Post.create({
      title: title,
      body: body,
      user_id: user_id
    });

    console.log("Post created successfully:", newPost);
    return { success: true, task: newPost };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Error creating post." };
  }
}

async function editPost(req, res, title, body) {
  try {
    if (!req.session.user_id) {
      return { error: "User not authenticated." };
    }

    const user_id = req.session.user_id;

    const existingPost = await Post.findOne({
      where: { post_id: post_id, user_id: user_id },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "Post not found, unable to edit." });
    }

    existingPost.title = title;
    existingPost.body = body;
    await existingPost.save();

    console.log('Post edited successfully:', existingPost);
    return res.status(200).json({ message: "Post edited successfully" });

  } catch (error) {
    console.error('Error editing post:', error);
    return res.status(500).json({ error: "Error editing post." });
  }
}

async function deletePost(req, res) {
  const post_id = req.params.id;

  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    const user_id = req.session.user_id;

    const existingPost = await Post.findOne({
      where: { post_id: post_id, user_id: user_id },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "Post not found, unable to delete." });
    }

    await existingPost.destroy();

    console.log("Post deleted successfully.");
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Error deleting post." });
  }
}

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