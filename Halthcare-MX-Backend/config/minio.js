const Minio = require('minio');
require('dotenv').config();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const bucketName = process.env.MINIO_BUCKET;
minioClient.bucketExists(bucketName, (err, exists) => {
  if (err) throw err;
  if (!exists) {
    minioClient.makeBucket(bucketName, 'us-east-1', err => {
      if (err) throw err;
      console.log(`Bucket ${bucketName} created.`);
    });
  }
});

module.exports = minioClient;
