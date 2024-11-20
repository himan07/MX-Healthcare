const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const certificate = mongoose.model("certificates", certificateSchema);

module.exports = certificate;
