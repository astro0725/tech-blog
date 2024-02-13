const express = require('express');
const router = express.Router();
const { signUpUser } = require('../controllers/userAuth');

// GET request to render the signup page
router.get('/', (req, res) => {
  try {
    res.render('signup');
  } catch (error) {
    console.error("Signup Error:", error);
  }
});

// POST request to handle the form submission
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await signUpUser(req, username, password);

    if (result.success) {
      if (req.session.authenticated) {
        res.json({ success: true, redirectUrl: '/dashboard' });
      };
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error in signin route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;