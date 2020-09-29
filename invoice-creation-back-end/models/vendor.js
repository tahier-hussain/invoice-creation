const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const VendorSchema = new Schema({
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
  address: {
    type: String,
    required: true
  },
  user_type: {
    type: String,
    default: "vendor",
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

module.exports = Vendor = mongoose.model("vendor", VendorSchema);
