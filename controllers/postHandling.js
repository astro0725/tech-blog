// require the database models
const db = require('../models');
const Post = db.Post;
const User = db.User;
const Comment = db.Comment;

// function to create a post
async function createPost(req, title, body) {
  try {
    // check if user is logged in
    if (!req.session.user_id) {
      return { error: "User not authenticated." };
    }

    // get user id from session
    const user_id = req.session.user_id;

    // create a new post with provided title, body, and user_id
    const newPost = await Post.create({
      title: title,
      body: body,
      user_id: user_id
    });

    // log the successful post creation
    console.log("Post created successfully:", newPost);
    return { success: true, task: newPost };
  } catch (error) {
    // log any errors that occur
    console.error("Error creating post:", error);
    return { error: "Error creating post." };
  }
}

// function to edit a post
async function editPost(req, res, title, body) {
  try {
    // check if user is logged in
    if (!req.session.user_id) {
      return { error: "User not authenticated." };
    }

    // get user id from session
    const user_id = req.session.user_id;

    // find the post to edit based on post_id and user_id
    const existingPost = await Post.findOne({
      where: { post_id: post_id, user_id: user_id },
    });

    // if post not found, return error
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found, unable to edit." });
    }

    // update the post's title and body
    existingPost.title = title;
    existingPost.body = body;
    await existingPost.save();

    // log the successful post edit
    console.log('Post edited successfully:', existingPost);
    return res.status(200).json({ message: "Post edited successfully" });

  } catch (error) {
    // log any errors that occur
    console.error('Error editing post:', error);
    return res.status(500).json({ error: "Error editing post." });
  }
}

// function to delete a post
async function deletePost(req, res) {
  // get the post id from request parameters
  const post_id = req.params.id;

  try {
    // check if user is logged in
    if (!req.session.user_id) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    // get user id from session
    const user_id = req.session.user_id;

    // find the post to delete based on post_id and user_id
    const existingPost = await Post.findOne({
      where: { post_id: post_id, user_id: user_id },
    });

    // if post not found, return error
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found, unable to delete." });
    }

    // delete the found post
    await existingPost.destroy();

    // log the successful post deletion
    console.log("Post deleted successfully.");
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    // log any errors that occur
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Error deleting post." });
  }
}

// function to get a post by its id
async function getPostById(req, res) {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username'],
        },
        {
          model: Comment,
          as: 'comments', 
          include: [{
            model: User,
            as: 'user',
            attributes: ['username'],
          }]
        }
      ],
    });

    if (!post) {
      throw new Error('Post not found');
    }

    const postPlain = post.get({ plain: true });

    res.render('post-page', {
      post: postPlain,
      userIsAuthenticated: req.cookies['connect.sid'] ? true : false
    });
  } catch (error) {
    console.error('Error getting post by id:', error);
    res.status(500).send('Error fetching post details');
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getPostById,
}