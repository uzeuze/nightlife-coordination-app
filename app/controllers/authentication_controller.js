const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
}

exports.signin = (req, res, next) => {
  // Give token to user
  res.json({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  // Return error if email or password is not provided
  if (!email || !password) {
    return res.status(422).json({ error: 'You must provide email and password' });
  }

  // Check if user exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) { throw new Error(err); }

    // If a user exists return an error
    if (existingUser) {
      return res.status(422).json({ error: 'Email is in use.' });
    }

    // If user does not exist, create new user
    const user = new User({
      email,
      password
    });

    user.save((error) => {
      if (error) { throw new Error(error); }

      // Give token to created user
      res.json({ token: tokenForUser(user) });
    });
  });
};
