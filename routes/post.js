const express = require('express');
const router = express.Router();
const postHandling = require('../controllers/postHandling');

router.post('/', async (req, res) => {
  const { title, body } = req.body;
  const result = await postHandling.createPost(req, title, body);
  if (result.error) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// Route to edit an existing post
router.put('/:id', async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;
  await postHandling.editPost(req, res, id, title, body);
});

// Route to delete a post
router.delete('/:id', async (req, res) => {
  await postHandling.deletePost(req, res);
});

// Route to get a single post by ID
router.get('/:id', async (req, res) => {
  const result = await postController.getPostById(req);
  if (result.error) {
    return res.status(404).json(result);
  }
  res.json(result);
});

module.exports = router;