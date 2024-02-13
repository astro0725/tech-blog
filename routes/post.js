const express = require('express');
const router = express.Router();
const { createPost, editPost, deletePost, getPostById } = require('../controllers/postHandling');

router.get('/:id', async function (req, res) {
  try {
    const post = await getPostById(req); 
    res.render('single-post', { post: post.post }); 

  } catch (error) {
    console.error('Error getting post by id:', error);
    res.status(500).send({ error: error.message });
  }
});

router.post('/', async function(req, res) {
  const { title, body } = req.body;

  try {
    const result = await createPost(req, title, body);
    res.json(result);

  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send({ error: error.message });
  }
});

router.put('/:id', async function(req, res) {
  const { title, body } = req.body;

  try {
    const result = await editPost(req, title, body);
    res.json(result);

  } catch (error) {
    console.error('Error editing post:', error);
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:id', async function(req, res) {
  try {
    const result = await deletePost(req);
    res.json(result);

  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;