const mongoose = require("mongoose");
const ProfessionalDetailsSchema = new mongoose.Schema({
  specialty: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  nameOfOrganization: {
    type: String,
    required: true,
  },
  officialEmail: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
    validate: {
      validator: async function (value) {
        const emailExists = await ProfessionalDetails.findOne({
          officialEmail: value,
        });
        return !emailExists;
      },
      message: "Email already exists",
    },
  },
  state: {
    type: String,
    required: false,
  },
  yearsOfPractice: {
    type: Number,
    required: true,
    min: 0,
  },
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
});

const ProfessionalDetails = mongoose.model(
  "ProfessionalDetails",
  ProfessionalDetailsSchema
);

module.exports = ProfessionalDetails;
