const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  lastSearch: { type: String },
  events: [{ type: String }],
});

// Encrypt password before saving
userSchema.pre('save', function(next) {
  const user = this;

  // Generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { throw new Error(err); }

    // Encrypt password using the generated salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { throw new Error(err); }

      // Replace plain text password with generated hash
      user.password = hash;
      next();
    });
  });
});

// Password comparation method
userSchema.methods.comparePassword = function(inputPassword, callback) {
  bcrypt.compare(inputPassword, this.password, function(err, isMatch) {
    if(err) { return new Error(err); }

    callback(null, isMatch);
  });
}

module.exports = mongoose.model('user', userSchema);
