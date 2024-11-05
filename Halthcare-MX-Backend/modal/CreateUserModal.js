const mongoose = require("mongoose");

const CreateUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  pushNotification: {
    type: Boolean,
    required: false,
  },

  profession: {
    type: String,
    required: true,
  },
  medicalCertificateNo: {
    type: String,
    required: true,
    unique: true,
  },
  certificateUrl: {
    type: String,
    required: true,
    unique: true,
  },
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
});

const CreateUser = mongoose.model("PersonalDetails", CreateUserSchema);

module.exports = CreateUser;
