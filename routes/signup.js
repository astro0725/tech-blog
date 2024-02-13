const express = require('express');
const router = express.Router();
const { signUpUser } = require('../controllers/userAuth');

router.get('/', (req, res) => {
  try { 
    res.render('signup');
  } catch (error) {
    console.error('Signup render error', error);
  }
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await signUpUser(req, username, password);

    if (result.succes) {
      if (req.session.authenticated) {
        res.json ({ success: true, redirectUrl: '/dashboard' });
      };

    } else {
      res.json ({ success: false, error: result.error });
    }

  } catch (error) {
    console.error('Signup error in route: ' + error);
    res.status(500).send({ error: error.message });
  }
});

module.exportts = router;