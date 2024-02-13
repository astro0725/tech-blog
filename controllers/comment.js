const db = require('../models');
const Comment = db.Comment;

async function createComment (req, res) {
  try {
    const { post_id, body } = req.body;
    const user_id = req.session.user_id;
    await Comment.create({
      post_id,
      user_id,
      body,
    });
    return { success: true, comment };
  } catch (error) {
    console.error('Error creating comment:', error);
    return { success: false, error: error.message };
  }
};

async function getPostComments (req, res) {
  try {
    const comments = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
    });
    return { success: true, comments };
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { success: false, error: error.message };
  }
};

async function editComment (req, res) {
  try {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!comment) {
      throw new Error('Comment not found or you do not have permission to edit this comment.');
    }

    comment.body = req.body.body;
    await comment.save();

    return { success: true, comment };

  } catch (error) {
    console.error('Error editing comment:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  createComment,
  getPostComments,
  editComment,
},