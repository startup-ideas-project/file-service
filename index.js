

const express = require('express')
const cors = require('cors')
const formidableMiddleware = require('express-formidable');

const {createS3Table} = require('./DAO/create-tables');
const {createBucket} = require('./DAO/createS3Bucket');
const {  
    deleteFile,
    getFileById,
    uploadFile,
    getAllFiles,
    loadS3File
} = require('./service/file-service')


const corsOptions = {
  origin: '*'
}

// these 2 steps need to move to another resources scripts, this is only for testing
// restart the server will fail these creation steps
createS3Table(); // Create the table
createBucket() // create S3 Bucket

// app configs
const app = express()
app.use(express.json());
app.use(cors(corsOptions))
app.use(formidableMiddleware());

const port = process.env.PORT || 4040

app.post('/file', uploadFile)
app.get('/file', getAllFiles)
app.get('/file/:fileID',getFileById)
app.get('/file/:fileID/load',loadS3File)
app.delete('/file/:fileID', deleteFile)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})