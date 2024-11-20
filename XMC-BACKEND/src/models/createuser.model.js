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
    type: String,
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
  profession: {
    type: String,
    required: true,
  },
  medicalCertificateNo: {
    type: String,
    required: true,
    unique: true,
  },
  notification: {
    sms: {
      type: Boolean,
      required: false,
    },
    whatsApp: {
      type: Boolean,
      required: false,
    },
  },
  // certificateUrl: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
});

const CreateUser = mongoose.model("Users", CreateUserSchema);

module.exports = CreateUser;
