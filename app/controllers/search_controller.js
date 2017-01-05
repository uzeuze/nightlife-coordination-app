const yelp = require('../services/yelp');
const User = require('../models/user');

exports.find = (req, res) => {
  let city = req.query.q;
  if (req.user) {
    User.findByIdAndUpdate(req.user._id, { $set: {lastSearch: city } })
      .then(() => {
        console.log('user updated');
      });
  }
  yelp.search({ term: 'bar', location: city })
  .then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    res.json({ error: 'Invalid search' });
  });
};
