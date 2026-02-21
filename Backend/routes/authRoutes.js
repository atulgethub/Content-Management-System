const express = require('express');
const passport = require('passport');
const { register, login, profile } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', 
  passport.authenticate('local', { session: false, failureMessage: true }),
  login
);
router.get('/profile', passport.authenticate('jwt', { session: false }), profile);

module.exports = router;
