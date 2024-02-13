const express = require('express');
const router = express.router();

// import route modules
const homeRoutes = require('./home');
const dashboardRoutes = require('./dashboard');

const signupRoutes = require('./signup');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');

const postRoutes = require('./post');

const commentRoutes = require('./comment');

// use imported routes
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);

router.use('/post', postRoutes);

router.use('/comment', commentRoutes);

module.exports = router;