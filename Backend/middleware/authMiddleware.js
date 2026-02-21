const passport = require('passport');

const requireAuth = [
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    passport.authenticate('jwt', { session: false })(req, res, next);
  }
];

module.exports = { requireAuth };
