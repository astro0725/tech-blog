const db = require('../models');
const Comment = db.Comment;

// define an asynchronous function to create a comment
async function createComment(req, body) {
  try {
    // check if the user is logged in by verifying session user_id
    if (!req.session.user_id) {
      return { error: "User not authenticated." }; // return an error if the user is not logged in
    }

    const user_id = req.session.user_id; // retrieve the user_id from the session

    // create a new comment with the user_id, post_id, and body of the comment
    const newComment = await Comment.create({
      user_id: user_id,
      post_id: post_id, // assumes post_id is globally available or passed in some other way
      body: body,
    });

    // log the successful creation of the comment
    console.log("Comment created successfully:", newComment);
    return { success: true, task: newComment }; // return success and the created comment
  } catch (error) {
    // log any errors that occur during the comment creation
    console.error("Error creating comment:", error);
    return { error: "Error creating comment." }; // return an error message
  }
}

// define an asynchronous function to delete a comment
async function deleteComment(req, res) {
  const comment_id = req.params.id; // retrieve the comment_id from the request parameters

  try {
    // check if the user is logged in by verifying session user_id
    if (!req.session.user_id) {
      return res.status(401).json({ error: "User not authenticated." }); // return an error if the user is not logged in
    }

    const user_id = req.session.user_id; // retrieve the user_id from the session

    // find the comment by comment_id and user_id to ensure the user owns the comment
    const existingComment = await Comment.findOne({
      where: { comment_id: comment_id, user_id: user_id },
    });

    // if the comment is not found, return a 404 error
    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found, unable to delete." });
    }

    await existingComment.destroy(); // delete the comment

    // log the successful deletion of the comment
    console.log("Comment deleted successfully.");
    res.status(200).json({ message: "Comment deleted successfully." }); // return a success message
  } catch (error) {
    // log any errors that occur during the comment deletion
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Error deleting comment." }); // return an error message
  }
}


module.exports = {
  createComment,
  deleteComment
}