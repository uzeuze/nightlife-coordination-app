const User = require('../models/user');

exports.getUser = (req, res) => {
  res.json(req.user);
};

exports.joinEvent = (req, res) => {
  let business = req.body.business;
  User.findOneAndUpdate({ _id: req.user._id }, { $addToSet: { "events": business } })
    .then((response) => {
      res.json(response);
    });
}

exports.removeEvent = (req, res) => {
  let business = req.body.business;
  User.update({ _id: req.user._id }, { $pull: { "events": business } })
    .then((response) => {
      res.json(response);
    });
}
