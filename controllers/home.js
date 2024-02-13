const db = require('../models');
const Post = db.Post;
const User = db.User;

async function renderHome(req, res) {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
      order: ['createdAt', 'DESC']
    });

    const postsPlain = posts.map(post => post.get({ plain: true }));

    res.render('home', {
      posts: postsPlain,
    });

  } catch (error) {
    console.error('Error fetching posts: ', error);
    res.status(500).send('Error fetching posts');
  }
}

module.exports = {
  renderHome
};