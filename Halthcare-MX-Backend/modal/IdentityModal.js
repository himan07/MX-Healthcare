const mongoose = require("mongoose");

const identitySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  IdentityInfoNumber: {
    type: String,
    required: true,
  },
});

const Identity = mongoose.model("identity", identitySchema);

module.exports = Identity;
