const AWS = require('aws-sdk');

// load env variables
require('dotenv').config();

// configure AWS env
AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const bucketName = 'todo-123';

console.log('getting buckets...');

s3.listBuckets((err, data) => {
    if (err) console.log('error: ', err);
    else console.log(JSON.stringify(data, null, 4));
});

s3.putObject({ Bucket: bucketName, Key: 'id1234', Body: 'Hello 4' })
    .promise()
    .then((result) => {
        console.log('success:', result);
    })
    .catch(err => console.log);

s3.listObjects({ Bucket: bucketName }, (err, data) => {
    if (err) console.log('error: ', err);
    else console.log(`objects for bucket ${bucketName}...`, JSON.stringify(data, null, 4));
});

item = {
    id: String,
    title: 'Clean House',
    description: 'Clean house after work'
}
