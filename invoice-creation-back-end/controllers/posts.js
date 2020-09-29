//Model
const User = require("../models/user");
const Post = require("../models/post");
const Vendor = require("../models/vendor");

exports.create = (req, res) => {
  Vendor.findById(req.user.id)
    .select("-password")
    .then(user => {
      const newPost = new Post({
        user_id: req.user.id,
        user_name: user.name,
        title: req.body.title,
        content: req.body.content,
        gst: req.body.gst
      });

      newPost
        .save()
        .then(data => res.json(data))
        .catch(() =>
          res.status(400).json({
            msg: "Something went wrong"
          })
        );
    });
};

exports.get = (req, res) => {
  Post.find()
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getOne = (req, res) => {
  console.log(req.body);
  User.findById(req.user.id)
    .then(user => {
      Post.findById(req.body.service_id)
        .then(post => res.json(post))
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    })
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getUserPost = (req, res) => {
  Vendor.findById(req.user.id).then(user => {
    Post.find({ user_id: user._id })
      .sort({ register_date: -1 })
      .then(posts => res.json(posts))
      .catch(() => res.json({ status: 400, msg: "Something went wrong. Couldn't load the services" }));
  });
};

exports.update = (req, res) => {
  Vendor.findById(req.user.id)
    .select("-password")
    .then(user => {
      Post.find({ user_id: req.user.id })
        .then(() => {
          Post.findByIdAndUpdate(req.body.id, req.body)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};

exports.delete = (req, res) => {
  Vendor.findById(req.user.id)
    .select("-password")
    .then(user => {
      Post.find({ auth_id: req.user.id })
        .then(() => {
          Post.findByIdAndDelete(req.body.id)
            .then(post => res.json(post))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};
