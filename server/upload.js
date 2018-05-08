const AWS = require('aws-sdk');

const shortid = require('shortid');
const bucketName = process.env.S3;
const Utils = require('./utils');


module.exports.upload = (event, context, callback) => {
  let s3 = new AWS.S3();
  let parsedBody = Utils.parse(event, true);
  console.log(event.body);

  let file = parsedBody.file;

  s3.putObject({
    Body: file.content,
    Bucket: bucketName,
    Key: file.filename,
    ContentEncoding: 'binary',
    ContentType: file.contentType
  }, function (err, data) {
    if (err) {
      return callback(new Error(`Failed to put s3 object: ${err}`));
    }

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({})
    })
  })
}
