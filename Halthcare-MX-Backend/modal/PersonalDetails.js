
const mongoose = require("mongoose");

const personalDetailSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  medicalNo: {
    type: String,
    required: true,
    unique: true,
  },
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
  uniqueId: {
    type: String,
    unique: true,
    required: true,
  },
});

const PersonalDetail = mongoose.model("PersonalDetails", personalDetailSchema);

module.exports = PersonalDetail;
