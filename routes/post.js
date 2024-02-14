const express = require('express');
const router = express.Router();
const postHandling = require('../controllers/postHandling');

// POST request to create a new post
router.post('/', async (req, res) => {
  const { title, body } = req.body;
  const result = await postHandling.createPost(req, title, body);
  if (result.error) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// PUT request to edit an existing post
router.put('/:id', async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;
  await postHandling.editPost(req, res, id, title, body);
});

// DELETE request to delete an existing post
router.delete('/:id', async (req, res) => {
  await postHandling.deletePost(req, res);
});

// GET request to retrieve post by id
router.get('/:id', async (req, res) => {
  try {
    const result = await postHandling.getPostById(req);
    if (!result.success) {
      return res.status(404).send('Post not found');
    }

    const formattedDate = new Date(result.post.createdAt).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    res.render('single-post', {
      title: result.post.title,
      createdAt: formattedDate, 
      body: result.post.body,
      username: result.post.User.username,
      id: result.post.id
    });
  } catch (error) {
    console.error('Error rendering post:', error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;