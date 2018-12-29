const AWS = require('aws-sdk');

// load env variables
require('dotenv').config();

// configure AWS env
AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
});

// create objects in the bucket
const bucketName = 'todo-123';
const s3 = new AWS.S3();

s3.listBuckets((err, data)=> {
    if(err) console.log('error:', err);
    else console.log(JSON.stringify(data, null, 4));
});

var objparams = {
    Body: "Hellohello", 
    Bucket: "examplebucket", 
    Key: "objectkey"
   };

s3.putObject(objparams, (err,data)=>{
    if(err) console.log('error:', err);
    else console.log(JSON.stringify(data))
});