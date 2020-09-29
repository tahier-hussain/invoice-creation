const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  user_id: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  gst: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
