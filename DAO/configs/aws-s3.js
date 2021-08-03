const AWS = require("aws-sdk");


const awsS3 = new AWS.S3({
  endpoint: "http://localhost:4566",
  s3ForcePathStyle: true,
});
module.exports = {
    awsS3
}