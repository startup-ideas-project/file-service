const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:4566"
});

const dynamodb = new AWS.DynamoDB();
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamodb,
    dynamoDBClient
}