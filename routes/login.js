const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/userAuth');

// GET request to render the login page
router.get('/', (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    console.error("Login Error:", error);
  }
});

// POST request to handle the form submission
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await loginUser(req, username, password);

    if (result.success) {
      if (req.session.authenticated) {
        res.json({ success: true, redirectUrl: '/dashboard' });
      };
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error in login route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;