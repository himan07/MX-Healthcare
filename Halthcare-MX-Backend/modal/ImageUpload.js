const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    }
})

const Images = mongoose.model("Images", imageSchema);

module.exports = Images;
