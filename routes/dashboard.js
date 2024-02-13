const express = require('express');
const router = express.Router();
const { renderDashboard } = require('../controllers/dashboard');

// GET request to render dashboard
router.get('/', function(req, res) {
  renderDashboard(req, res);
});

module.exports = router;