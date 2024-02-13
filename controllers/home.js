const db = require('../models');
const Post = db.Post;
const User = db.User;

// define an asynchronous function to handle rendering the homepage
async function renderHome(req, res) {
  try {
    // retrieve all posts from the database, including the username of the user who created each post
    const posts = await Post.findAll({
      include: [
        {
          model: User, // specifies that we want to include data from the User model
          attributes: ['username'] // only fetch the username attribute from the User model
        }
      ],
      order: [['createdAt', 'DESC']] // order the posts by their creation date in descending order
    });

    // convert the posts data into a plain format for easier handling in the template
    const postsPlain = posts.map(post => post.get({ plain: true }));

    // render the 'home' template, passing the posts data to it
    res.render('home', {
      posts: postsPlain,
      userIsAuthenticated: req.session.user ? true : false
    });

  } catch (error) {
    // log any errors that occur during the fetch operation
    console.error('Error fetching posts: ', error);
    // send a 500 status code and error message to the client if an error occurs
    res.status(500).send('Error fetching posts');
  }
}

module.exports = {
  renderHome
};