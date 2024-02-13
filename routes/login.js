const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/userAuth');

router.get('/', (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    console.error('Login render error', error);
  }
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await loginUser(req, username, password);

    if (result.success) {
      if (req.session.authenticated) {
        res.json({ success: true, redirectUrl: '/dashboard' });
      }
    } else {
      res.json({ success: false, error: result.error });
    }

  } catch (error) {
    console.error('Login error in route: ' + error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;