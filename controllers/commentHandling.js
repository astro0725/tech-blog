const db = require('../models');
const Comment = db.Comment;

async function createComment(req, title, body) {
  try {
    if (!req.session.user_id) {
      return { error: "User not authenticated." };
    }

    const user_id = req.session.user_id;

    const newComment = await Comment.create({
      user_id: user_id,
      post_id: post_id,
      body: body,
    });

    console.log("Comment created successfully:", newComment);
    return { success: true, task: newComment };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { error: "Error creating comment." };
  }
}

async function editComment(req, res, title, body) {
  try {
    if (!req.session.user_id) {
      return { error: "User not authenticated." };
    }

    const user_id = req.session.user_id;

    const existingComment = await Comment.findOne({
      where: { comment_id: comment_id, user_id: user_id },
    });

    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found, unable to edit." });
    }

    existingComment.title = title;
    existingComment.body = body;
    await existingComment.save();

    console.log('Comment edited successfully:', existingComment);
    return res.status(200).json({ message: "Comment edited successfully" });

  } catch (error) {
    console.error('Error editing comment:', error);
    return res.status(500).json({ error: "Error editing comment." });
  }
}

async function deleteComment(req, res) {
  const comment_id = req.params.id;

  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    const user_id = req.session.user_id;

    const existingComment = await Comment.findOne({
      where: { comment_id: comment_id, user_id: user_id },
    });

    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found, unable to delete." });
    }

    await existingComment.destroy();

    console.log("Comment deleted successfully.");
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Error deleting comment." });
  }
}

module.exports = {
  createComment,
  editComment,
  deleteComment,
}