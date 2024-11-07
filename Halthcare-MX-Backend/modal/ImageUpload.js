const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("certificates", imageSchema);

module.exports = Image;
