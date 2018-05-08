var AWS = require('aws-sdk');

const shortid = require('shortid');
const bucketName = process.env.S3;

module.exports.upload = (event, context, callback) => {
  let s3 = new AWS.S3();
  console.log(event.body)
  let buffer = new Buffer(event.body, 'base64');

  s3.putObject({
    Body: buffer,
    Bucket: bucketName,
    Key: shortid.generate() + '.jpg',
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  }, function (err, data) {
    if (err) {
      return callback(new Error(`Failed to put s3 object: ${err}`));
    }

    return callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({})
    })
  })
}
