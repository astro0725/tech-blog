const express = require('express');
const router = express.Router();
const commentHandling = require('../controllers/commentHandling');

// POST request to create a new comment
router.post('/', (req, res) => {
  commentHandling.createComment(req, res);
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