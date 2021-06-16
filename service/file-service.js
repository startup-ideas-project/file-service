'use strict';
const {awsS3} = require('../DAO/configs/aws-s3');
const {S3params} = require('../DAO/createS3Bucket');
const {
  createRecordInS3urlPathTable,
  getAllFilesDAO,
  getFileByIdDAO,
  getS3ObjectDAO} = require('../DAO/fileDAO');
const fs = require('fs')
const stream = require('stream');
const { v4: uuidv4 } = require('uuid');


/**
 * Deletes a file
 *
 * fileID UUID file id to delete
 * no response value expected for this operation
 **/
const deleteFile = (fileID) => {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find a file by ID
 * Returns a single file 
 *
 * fileID UUID ID of a file
 * returns File
 **/
const getFileById = async (req, res) => {
  const fileId = req.params.fileID
  getFileByIdDAO(fileId).then(data => {
    console.log(data)
    res.send(JSON.stringify(data))
  })
}


/**
 * Add a new file to the dynamoDB, then upload to S3
 *
 * body File 
 * no response value expected for this operation
 **/
const uploadFile = async (req, res) => {
  const file = req.files.uploadedFile
  const promise = uploadToS3(file)
  promise.then(
    data => createRecordInS3urlPathTable({
      path : data.Location,
      key: data.Key,
      bucketName: data.Bucket,
      fileName: file.name
    })
  ).then(_ => res.sendStatus(200)).catch(err => res.sendStatus(500));
}

// ============== S3 bucket interaction =================
const loadS3File = async (req, res) => {
  const fileId = req.params.fileID
  const stream = getS3ObjectDAO(fileId)
  stream.pipe(res)
}


const uploadToS3 = (file) => {
  const pass = new stream.PassThrough();
  const uploadStream = ({ Bucket, Key }) => {
    return {
      writeStream: pass,
      promise: awsS3.upload({ Bucket, Key, Body: pass }).promise(),
    };
  }
  const { writeStream, promise } = uploadStream({Bucket: S3params.Bucket, Key: uuidv4()});
  const readStream = fs.createReadStream(file.path);
  readStream.pipe(writeStream);
  return promise
}

//============ the following functions not added to YAML ===========

const getAllFiles = async (req, res) => {
  getAllFilesDAO().then(data => res.send(JSON.stringify(data)))
}

module.exports = {
  deleteFile,
  getFileById,
  uploadFile,
  getAllFiles,
  loadS3File
}

