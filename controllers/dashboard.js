const db = require('../models');
const User = db.User;
const Post = db.Post;

async function renderDashboard(req, res) {
  try {
    const userPosts = await Post.findAll({
      where:{
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ],
      order: ['createdAt', 'DESC']
    });

    const posts = userPosts.map(post => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
    });

  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Error fetching posts');
  }
}

module.exports = {
  renderDashboard
};