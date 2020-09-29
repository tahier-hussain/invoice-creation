const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  company_name: {
    type: String
  },
  description: {
    type: String,
    required: false
  },
  user_type: {
    type: String,
    default: "business-owner",
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String,
    default: "no-picture.jpg"
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
