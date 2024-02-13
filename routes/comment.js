const express = require('express');
const router = express.Router();
const commentHandling = require('../controllers/commentHandling');

// POST request to create a new comment
router.post('/', async (req, res) => {
  const { post_id, body } = req.body; 

  try {
    const result = await commentHandling.createComment(req, post_id, body);
    if (result.success) {
      res.json({ success: true, comment: result.comment });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).send({ error: "Error creating comment." });
  }
});

// PUT request to edit an existing comment
router.put('/:id', async (req, res) => {
  const { body } = req.body; 

  try {
    await commentHandling.editComment(req, res, body);
  } catch (error) {
    console.error('Error editing comment:', error);
  }
});

// DELETE request to delete an existing comment
router.delete('/:id', async (req, res) => {
  try {
    await commentHandling.deleteComment(req, res);
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
});

module.exports = router;