const path = require("path");
const fs = require("fs");
const multer = require("multer");
const tesseract = require("tesseract.js");
const Identity = require("../modal/IdentityModal");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../Public/Identity");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("identity");

exports.uploadIdentity = (req, res) => {
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
          message: "Error uploading file",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          status: "fail",
          message: "No file  provided",
        });
      }

      const identitypath = path.join(
        __dirname,
        `../Public/Identity/${req.file.filename}`
      );

      const {
        data: { text },
      } = await tesseract.recognize(identitypath, "eng");

      const identityPattern = /(?:\d[\s-]*){11,}/g;
      const IdentityInformation = text.match(identityPattern);
      const IdentityInfo = IdentityInformation.map(digits => digits.replace(/\s+/g, '').trim());
      console.log("longDigits: ",IdentityInfo)
      


      if (!IdentityInformation) {
        return res.status(400).json({
          status: "fail",
          message: "Could not find a Identity details in the image",
        });
      }
      const IdentityInfoNumber = IdentityInfo[0];
      console.log("IdentityInfoNumber: ", IdentityInfoNumber);
      

      const existingIdentity = await Identity.findOne({ IdentityInfoNumber });
      if (existingIdentity) {
        return res.status(400).json({
          status: "fail",
          message: "This Identity is already in use.",
        });
      }

      const imageUrl = `${req.protocol}://${req.get("host")}/Public/Identity/${
        req.file.filename
      }`;

      const identity = await Identity.create({ imageUrl, IdentityInfoNumber });

      res.status(201).json({
        status: "success",
        data: {
          identity,
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
