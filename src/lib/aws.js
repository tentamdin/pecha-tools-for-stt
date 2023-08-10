const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export const s3 = new AWS.S3();
export const bucketName = "pecha-audio";
