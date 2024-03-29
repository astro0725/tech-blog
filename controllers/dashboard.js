const db = require('../models');
const User = db.User;
const Post = db.Post;

// define an asynchronous function to render the user's dashboard
async function renderDashboard(req, res) {
  try {
    const user_id = req.session.user_id;

    if (!user_id) {
      return res.render('dashboard', {
        userIsAuthenticated: false
      });
    }

    // fetch all posts from the database for the logged-in user
    const userPosts = await Post.findAll({
      where: {
        user_id: user_id, // filter posts by the user_id stored in the session
      },
      include: [
        {
          model: User, // include data from the User model
          as: 'user', // alias the user data as 'user'
          attributes: ['username'], // fetch only the username attribute of the user
        }
      ],
      order: [['createdAt', 'DESC']] // order the posts by their creation date in descending order
    });

    // convert each post into a plain object for easy handling in the template
    const postsPlain = userPosts.map(post => {
      let postPlain = post.get({ plain: true });
      postPlain.userEdit = (post.user_id === user_id);
      return postPlain;
    });

    // render the 'dashboard' template, passing the user's posts to it
    res.render('dashboard', {
      posts: postsPlain,
      userIsAuthenticated: req.cookies['connect.sid'] ? true : false
    });

  } catch (error) {
    // log any errors that occur while fetching posts
    console.error('Error fetching posts:', error);
    // send a 500 status code and error message to the client if an error occurs
    res.status(500).send('Error fetching posts');
  }
}

module.exports = {
  renderDashboard
};