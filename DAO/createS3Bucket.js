const {awsS3} = require('./configs/aws-s3');

const S3params = {
    Bucket: "file-bucket"
}

const createBucket = () => {
    awsS3.createBucket(S3params, function(err, data) {
        if (err) console.log("Error", err);
        else console.log(`Successfully create bucket ${S3params.Bucket}: ${data}`);
    })
}

module.exports = {
    createBucket,
    S3params
}