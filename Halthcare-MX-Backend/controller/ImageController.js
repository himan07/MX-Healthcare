const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Image = require("../modal/ImageUpload");

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../Public/Images");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer configuration for file upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

exports.uploadImage = (req, res) => {
  upload(req, res, async function (err) {
    try {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          status: "fail",
          message: err.message,
        });
      } else if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error uploading image",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          status: "fail",
          message: "No image file provided",
        });
      }

      const imageUrl = `${req.protocol}://${req.get("host")}/Public/Images/${
        req.file.filename
      }`;

      const Images = await Image.create({ imageUrl });

      res.status(201).json({
        status: "success",
        data: {
          Images,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  });
};
