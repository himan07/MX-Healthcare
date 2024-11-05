// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");
// const tesseract = require("tesseract.js");
// const Image = require("../modal/ImageUpload");
// const PersonalDetail = require("../modal/PersonalDetails");
// const minioClient = require("../config/minio")

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "../Public/Images");

//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("certificates");

// exports.uploadImage = (req, res) => {
//   upload(req, res, async function (err) {
//     try {
//       if (err instanceof multer.MulterError) {
//         return res.status(400).json({
//           status: "fail",
//           message: "Error uploading the image. Please try again.",
//         });
//       } else if (err) {
//         return res.status(500).json({
//           status: "error",
//           message: "An unexpected error occurred during image upload.",
//         });
//       }

//       if (!req.file) {
//         return res.status(400).json({
//           status: "fail",
//           message: "No image file provided",
//         });
//       }

//       const imagePath = path.join(
//         __dirname,
//         `../Public/Images/${req.file.filename}`
//       );

//       const {
//         data: { text },
//       } = await tesseract.recognize(imagePath, "eng");

//       const certificateNumberMatch = text.match(
//         /(?:Certificate No\.?|Cert\. No\.?|Certificate number|Cert number|Registration no|Reg no)\s*\.?\s*(\S+)/i
//       );

//       if (!certificateNumberMatch) {
//         return res.status(400).json({
//           status: "fail",
//           message: "Could not find a valid certificate number in the image",
//         });
//       }

//       const certificateNumber = certificateNumberMatch[1]
//         .replace(/[^a-zA-Z0-9]/g, "")
//         .trim();

//       const personalDetails = await PersonalDetail.find();

//       const matchedDetail = personalDetails.find(
//         (detail) => detail.medicalNo === certificateNumber
//       );

//       if (!matchedDetail) {
//         return res.status(400).json({
//           status: "fail",
//           message:
//             "The certificate number does not correspond to any existing personal details in our records!",
//         });
//       }

//       const uuid = matchedDetail.uuid;
//       const uniqueId = matchedDetail.uniqueId;
//       if (!uuid) {
//         return res.status(400).json({
//           status: "fail",
//           message: "Could not find any UUID for the matched personal details.",
//         });
//       }

//       const existingCertificate = await Image.findOne({ certificateNumber });
//       if (existingCertificate) {
//         return res.status(400).json({
//           status: "fail",
//           message: "This certificate number is already in use.",
//         });
//       }

//       const imageUrl = `${req.protocol}://${req.get("host")}/Public/Images/${
//         req.file.filename
//       }`;

//       const Images = await Image.create({
//         imageUrl,
//         certificateNumber,
//         uuid,
//         uniqueId,
//       });
//       res.status(201).json({
//         status: "success",
//         data: {
//           Images,
//         },
//       });
//     } catch (error) {
//       res.status(500).json({
//         status: "error",
//         message: "An unexpected error occurred. Please try again later.",
//       });
//     }
//   });
// };

const multer = require("multer");
const tesseract = require("tesseract.js");
const Image = require("../modal/ImageUpload");
const CreateUser = require("../modal/CreateUserModal");
const minioClient = require("../config/minio");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("certificates");

exports.uploadImage = (req, res) => {
  upload(req, res, async function (err) {
    try {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          status: "fail",
          message: "Error uploading the image. Please try again.",
        });
      } else if (err) {
        return res.status(500).json({
          status: "error",
          message: "An unexpected error occurred during image upload.",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          status: "fail",
          message: "No image file provided",
        });
      }

      const fileName = `${Date.now()}-${req.file.originalname}`;
      minioClient.putObject(
        minioClient.bucketName,
        fileName,
        req.file.buffer,
        { "Content-Type": req.file.mimetype },
        async (minioErr) => {
          if (minioErr) {
            return res.status(500).json({
              status: "error",
              message: "Failed to upload image to MinIO",
            });
          }

          const imageUrl = `${req.protocol}://${req.get("host")}/${
            minioClient.bucketName
          }/${fileName}`;

          const {
            data: { text },
          } = await tesseract.recognize(req.file.buffer, "eng");

          const certificateNumberMatch = text.match(
            /(?:Certificate No\.?|Cert\. No\.?|Certificate number|Cert number|Registration no|Reg no)\s*\.?\s*(\S+)/i
          );

          if (!certificateNumberMatch) {
            return res.status(400).json({
              status: "fail",
              message: "Could not find a valid certificate number in the image",
            });
          }

          const certificateNumber = certificateNumberMatch[1]
            .replace(/[^a-zA-Z0-9]/g, "")
            .trim();

          const personalDetails = await CreateUser.find();
          const matchedDetail = personalDetails.find(
            (detail) => detail.medicalNo === certificateNumber
          );

          if (!matchedDetail) {
            return res.status(400).json({
              status: "fail",
              message:
                "The certificate number does not correspond to any existing personal details in our records!",
            });
          }

          const { uuid, uniqueId } = matchedDetail;
          if (!uuid) {
            return res.status(400).json({
              status: "fail",
              message:
                "Could not find any UUID for the matched personal details.",
            });
          }

          const existingCertificate = await Image.findOne({
            certificateNumber,
          });
          if (existingCertificate) {
            return res.status(400).json({
              status: "fail",
              message: "This certificate number is already in use.",
            });
          }

          const newImage = await Image.create({
            imageUrl,
            certificateNumber,
            uuid,
            uniqueId,
          });

          res.status(201).json({
            status: "success",
            data: {
              newImage,
            },
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  });
};
