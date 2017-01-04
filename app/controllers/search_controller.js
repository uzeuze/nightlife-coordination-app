const yelp = require('../services/yelp');

exports.find = (req, res) => {
  let city = req.query.q;
  yelp.search({ term: 'bar', location: city })
  .then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    res.json({ error: 'Invalid search' });
  });
};
