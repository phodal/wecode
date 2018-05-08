var AWS = require('aws-sdk');
var queryString = require('query-string');

const shortid = require('shortid');
const bucketName = process.env.S3;

module.exports.upload = (event, context, callback) => {
  var s3 = new AWS.S3();

  var params = queryString.parse(event.body)
  console.log(params);

  var s3Params = {
    Bucket: bucketName,
    Key:  shortid.generate(),
    ContentType: 'image/jpeg',
    ACL: 'public-read',
  };

  var uploadURL = s3.getSignedUrl('putObject', s3Params);

  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ uploadURL: uploadURL }),
  })
}
