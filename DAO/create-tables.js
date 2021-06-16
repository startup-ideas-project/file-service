const {dynamodb} = require('./configs/dynamoDB');

const S3TableParams = {
    TableName : "S3_URL_path",
    KeySchema: [       
        { AttributeName: "fileID", KeyType: "HASH"},  //Partition key
        { AttributeName: "S3URL", KeyType: "RANGE" }, //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "fileID", AttributeType: "S" },
        { AttributeName: "S3URL", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

const createTable = (db, params) =>{
    db.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

const createS3Table = () => {
    createTable(dynamodb, S3TableParams)
}

module.exports = {
    createS3Table,
    S3TableParams
}