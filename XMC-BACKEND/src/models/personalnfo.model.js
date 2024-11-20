const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  privacyPolicy: {
    type: Boolean,
    required: true,
  },
});

const personalInfoModal = mongoose.model("personalInfo", personalInfoSchema);

module.exports = personalInfoModal;
