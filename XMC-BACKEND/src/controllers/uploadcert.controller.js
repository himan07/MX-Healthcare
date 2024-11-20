const multer = require("multer");
const minioClient = require("../config/minio");
const Image = require("../modal/ImageUpload");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("certificates");

exports.uploadImage = (req, res) => {
  upload(req, res, async function (err) {
    try {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            status: "fail",
            message:
              "File size exceeds the 5MB limit. Please upload a smaller file.",
          });
        }
      } else if (err) {
        console.error(err);
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

      const { email } = req.body;
      const emaiExist = Image.findOne(email);

      // if (emaiExist) {
      //   return res.status(500).json({
      //     status: "fail",
      //     message:
      //       "A certificate is already associated with this account. Please review your account details or contact support if you need further assistance!",
      //   });
      // }

      const fileName = `${req.file.originalname}`;
      console.log("fileName: ", fileName);
      const bucketName = "mx-healthcare";
      minioClient.putObject(
        bucketName,
        fileName,
        req.file.buffer,
        { "Content-Type": req.file.mimetype },
        async (minioErr) => {
          if (minioErr) {
            console.error(minioErr);
            return res.status(500).json({
              status: "error",
              message: "Failed to upload image to MinIO",
              error: minioErr,
            });
          }

          const imageUrl = `${req.protocol}://${req.get("host")}/${fileName}`;
          try {
            const newImage = await Image.create({
              imageUrl,
              email,
            });

            res.status(201).json({
              status: "success",
              data: {
                newImage,
              },
            });
          } catch (error) {
            return res.status(500).json({
              status: "error",
              message: "Internal Server Error",
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
};
