const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ServiceRequestSchema = new Schema({
  vendor_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  service_id: {
    type: String,
    required: false
  },
  request_accepted: {
    type: Boolean,
    default: false,
    required: true
  },
  no_of_items: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ServiceRequest = mongoose.model("service-request", ServiceRequestSchema);
