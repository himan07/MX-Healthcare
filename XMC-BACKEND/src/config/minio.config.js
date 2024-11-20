const Minio = require("minio");

const minioClient = new Minio.Client({
  endPoint: "127.0.0.1",
  port: 9000,
  useSSL: false,
  accessKey: "himanshuyadav",
  secretKey: "#Himan123",
});

const bucketName = "mx-healthcare";

minioClient.bucketExists(bucketName, (err, exists) => {
  if (err) {
    console.error("Error checking bucket existence:", err);
    throw err;
  }
  if (!exists) {
    minioClient.makeBucket(bucketName, "", (makeBucketErr) => {
      if (makeBucketErr) {
        console.error("Error creating bucket:", makeBucketErr);
        throw makeBucketErr;
      }
      console.log(`Bucket ${bucketName} created.`);
    });
  }
});

module.exports = minioClient;
