const express = require('express');
const router = express.Router();
const {renderHome} = require('../controllers/home');

// GET request to render homepage
router.get('/', function (req, res) {
  renderHome(req, res);
});

module.exports = router;