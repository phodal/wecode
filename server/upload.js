var AWS = require('aws-sdk');
var queryString = require('query-string');

const shortid = require('shortid');
const bucketName = process.env.S3;

module.exports.upload = (event, context, callback) => {
  let s3 = new AWS.S3();
  let buffer = Buffer.from(event.body, 'base64');

  s3.putObject({
    Body: buffer,
    Bucket: bucketName,
    Key: shortid.generate() + '.jpg',
    ContentEncoding: 'base64'
  });

  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({}),
  })
}
