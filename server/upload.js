const AWS = require('aws-sdk');
const awsServerlessExpress = require('aws-serverless-express')

const bucketName = process.env.S3;
const Utils = require('./lib/utils');
const ImageAnalyser = require('./lib/imageAnalyser');

var express = require("express");
var multer = require('multer');
var multerupload = multer();
var app = express();

app.post('/upload', multerupload.any(), function(req, res){
  console.log(req.files);
  res.send({
    "code":"200",
    "success":"files printed successfully"
  })
});

module.exports.upload = (event, context, callback) => {
  const server = awsServerlessExpress.createServer(app)

  return awsServerlessExpress.proxy(server, event, context);

  let s3 = new AWS.S3();
  let parsedBody = Utils.parse(event);
  console.log(event.body);

  let file = parsedBody.file;
  console.log(file.content);

  s3.putObject({
    Body: file.content,
    Bucket: bucketName,
    Key: file.filename,
    ContentType: file.contentType
  }, function (err, data) {
    if (err) {
      return callback(new Error(`Failed to put s3 object: ${err}`));
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({}),
    };
    callback(null, response);

    // const s3Config = {
    //   bucket: bucketName,
    //   imageName: file.filename,
    // };
    //
    // return ImageAnalyser
    //   .getImageLabels(s3Config)
    //   .then((labels) => {
    //     const response = {
    //       statusCode: 200,
    //       body: JSON.stringify({ Labels: labels }),
    //     };
    //     callback(null, response);
    //   })
    //   .catch((error) => {
    //     callback(null, {
    //       statusCode: error.statusCode || 501,
    //       headers: { 'Content-Type': 'text/plain' },
    //       body: error.message || 'Internal server error',
    //     });
    //   });
  })
};
