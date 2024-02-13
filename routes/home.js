const express = require('express');
const router = express.Router();
const {renderHome} = require('../controllers/home');

router.get('/', function (req, res) {
  renderHome(req, res);
});

module.exports = router;