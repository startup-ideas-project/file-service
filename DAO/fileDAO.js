const {dynamoDBClient} = require('./configs/dynamoDB')
const {S3TableParams} = require('./create-tables')
const { v4: uuidv4 } = require('uuid');;

// doc: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html

const generateInputs = (tableName, S3path, key, bucketName, fileName) => {
    const data =  {
        TableName: tableName,
        Item: {
            fileID: uuidv4(),
            S3URL: S3path,
            key,
            bucketName,
            fileName
        }
    }
    return data;
}
const createRecordInS3urlPathTable = ({path, key, bucketName, fileName}) => {
    const params = generateInputs(S3TableParams.TableName, path, key, bucketName, fileName)
    dynamoDBClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

const getAllFilesDAO = () => {
    const params = {
        TableName: S3TableParams.TableName
    }
    return dynamoDBClient.scan(params).promise()
}

module.exports = {
    createRecordInS3urlPathTable,
    getAllFilesDAO
}