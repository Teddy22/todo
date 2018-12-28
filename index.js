const AWS = require('aws-sdk');

// load env variables
require('dotenv').config();

// configure AWS env
AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
});