//Model
const User = require("../models/user");
const Vendor = require("../models/vendor");
const Post = require("../models/post");
const ServiceRequest = require("../models/serviceRequest");
const { request } = require("express");
const { json } = require("body-parser");

exports.create = (req, res) => {
  // console.log("Hello");
  const newRequest = new ServiceRequest({
    vendor_id: req.body.vendor_id,
    user_id: req.user.id,
    service_id: req.body.service_id,
    no_of_items: req.body.no_of_items
  });

  newRequest
    .save()
    .then(data => res.json(data))
    .catch(() =>
      res.status(400).json({
        msg: "Something went wrong"
      })
    );
};

exports.getRequestsPendingUser = async (req, res) => {
  var obj = [];
  await ServiceRequest.find({ $and: [{ request_accepted: false }, { user_id: req.user.id }] }).then(async service => {
    for (var i = 0; i < service.length; i++) {
      obj[i] = await Post.findById(service[i].service_id).then(data => {
        var obj = {
          _id: service[i]._id,
          user_id: data.user_id,
          user_name: data.user_name,
          title: data.title,
          content: data.content,
          gst: data.gst,
          no_of_items: service[i].no_of_items,
          register_date: data.register_date
        };
        // console.log(obj);
        return obj;
      });
    }
  });
  // console.log(obj);
  res.json(obj);
};

exports.getAcceptedRequestsPerUser = async (req, res) => {
  var obj = [];
  // console.log(req.user.id);
  await ServiceRequest.find({ $and: [{ request_accepted: true }, { user_id: req.user.id }] })
    .then(async request => {
      for (var i = 0; i < request.length; i++) {
        obj[i] = await Vendor.findById(request[i].vendor_id)
          .then(async vendor => {
            var result = {
              name: vendor.name,
              email: vendor.email,
              profile_picture: vendor.profile_picture,
              address: vendor.address,
              service: request[i],
              request: await Post.findById(request[i].service_id).then(data => {
                return data;
              })
            };
            // console.log(result);
            return result;
          })
          .catch(() => res.json({ status: 400, msg: "Something went wrong" }));
      }
    })
    .catch(() => res.json({ status: 400, msg: "Something went wrong" }));
  res.json(obj);
};

exports.acceptRequest = async (req, res) => {
  Vendor.findById(req.user.id).then(() => {
    ServiceRequest.findByIdAndUpdate(req.body.id, { request_accepted: true }).then(() => {
      res.json({ msg: "Request was accepted successfully" }).catch(err => res.status(400).json({ msg: "Something went wrong" }));
    });
  });
};

exports.getRequestsNotAcceptedUser = async (req, res) => {
  var obj = [];
  await ServiceRequest.find({ $and: [{ request_accepted: false }, { vendor_id: req.user.id }] }).then(async request => {
    for (var i = 0; i < request.length; i++) {
      obj[i] = await User.findById(request[i].user_id).then(async user => {
        var result = {
          service_id: request[i]._id,
          no_of_items: request[i].no_of_items,
          name: user.name,
          email: user.email,
          profile_picture: user.profile_picture,
          user_id: user._id
        };
        // console.log(request);
        return result;
      });
    }
  });
  res.json(obj);
};

exports.get = (req, res) => {
  Post.find()
    .sort({ register_date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(400).json({ msg: "Something went wrong" }));
};

exports.getUserPost = (req, res) => {
  User.findById(req.user.id).then(user => {
    Post.find({ user_id: user.id })
      .sort({ register_date: -1 })
      .then(posts => res.json(posts))
      .catch(() => res.json({ status: 400, msg: "Something went wrong. Couldn't load the services" }));
  });
};

exports.update = (req, res) => {
  User.findById(req.user.id)
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
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      ServiceRequest.find({ user_id: req.user.id })
        .then(() => {
          ServiceRequest.findByIdAndDelete(req.body.id)
            .then(service => res.json(service))
            .catch(() => res.status(400).json({ msg: "Something went wrong" }));
        })
        .catch(() => res.status(400).json({ msg: "Something went wrong" }));
    });
};
