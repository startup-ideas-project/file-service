const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:4566"
});

const awsS3 = new AWS.S3({apiVersion: '2006-03-01'});
module.exports = {
    awsS3
}