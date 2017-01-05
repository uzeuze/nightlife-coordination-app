const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Local Strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify email
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // Verify password
    user.comparePassword(password, (error, isMatch) => {
      if (error) { return done(error); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // Check if user ID in the payload exists in database
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
