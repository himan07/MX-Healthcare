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
  profession: {
    type: String,
    required: true,
  },
  medicalNo: {
    type: String,
    required: true,
    unique: true,
  },
});

const Profession = mongoose.model("PersonalDetails", personalDetailSchema);

module.exports = Profession;
