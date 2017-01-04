const express = require('express');
const passport = require('passport');

const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const authenticationController = require('../controllers/authentication_controller');
const searchController = require('../controllers/search_controller');
require('../services/passport');

// Authentication
router.post('/signin', requireSignin, authenticationController.signin);
router.post('/signup', authenticationController.signup);

// Search
router.post('/search', searchController.find);

module.exports = router;
