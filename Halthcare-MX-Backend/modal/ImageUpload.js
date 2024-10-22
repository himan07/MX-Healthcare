const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  certificateNumber: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
});

const Image = mongoose.model("image", imageSchema);

module.exports = Image;
