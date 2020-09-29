//Model
const User = require("../models/user");

exports.get = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};
