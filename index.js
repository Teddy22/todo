const AWS = require('aws-sdk');

// load env variables
require('dotenv').config();

// configure AWS env
AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const usersBucketName = process.env.USERS_BUCKET_NAME;
const itemsBucketName = process.env.ITEMS_BUCKET_NAME;

console.log('getting buckets...');

// getBucketObjects(usersBucketName)
//     .then((data) => {
//         console.log(`objects in bucket ${usersBucketName}`, data);
//     })
//     .catch((err) => {
//         console.log(`error getting items from bucket ${usersBucketName}`);
//     });

// addUser({ name: 'Teddy', id: 'teddy', auth: {} })
//     .then((data) => {
//         console.log('user created successfully!!', data);
//     })
//     .catch(() => {
//         console.log('failed to create user', err);
//     });

// getUserById('Teddy.json')
//     .then((userData) => {
//         console.log(JSON.parse(userData.Body));
//     })
//     .catch((err) => {
//         console.log('error getting user:', err);
//     });

function addUser(user) {
    return new Promise((resolve, reject) => {
        /**
         * user = {
         *  name: String,
         *  id: String,
         *  auth: {
         *    token: String
         *  }
         * }
         */
        s3.putObject({ Bucket: usersBucketName, Key: `${user.name}.json`, Body: JSON.stringify(user) })
            .promise()
            .then(resolve)
            .catch(reject);
    });
}

function getUserById(userId) {
    return getBucketItemByKey(usersBucketName, userId);
}

function getBucketItemByKey(bucketName, objectKey) {
    return new Promise((resolve, reject) => {
        s3.getObject({ Bucket: bucketName, Key: objectKey }, (err, data) => {
            if (err) return reject(err);
            else resolve(data);
        });
    });
}

function getBucketObjects(bucketName) {
    return new Promise((resolve, reject) => {
        s3.listObjects({ Bucket: bucketName }, (err, data) => {
            if (err) return reject(err);
            else return resolve(data);
        });
    });
}