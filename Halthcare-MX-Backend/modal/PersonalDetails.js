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
    validate: {
      validator: async function (value) {
        const emailExists = await mongoose.models.PersonalDetails.findOne({
          email: value,
        });
        return !emailExists;
      },
      message: "Email already exists",
    },
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

const PersonalDetail = mongoose.model("PersonalDetails", personalDetailSchema);

module.exports = PersonalDetail;
