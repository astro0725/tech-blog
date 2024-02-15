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

// PATCH request to edit an existing post
router.patch('/:id', postHandling.editPost);

// DELETE request to delete an existing post
router.delete('/:id', async (req, res) => {
  await postHandling.deletePost(req, res);
});

// GET request to retrieve post by id
router.get('/:id', (req, res) => {
  postHandling.getPostById(req, res);
});

module.exports = router;