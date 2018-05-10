const AWS = require('aws-sdk');
const awsServerlessExpress = require('aws-serverless-express');
const bucketName = process.env.S3;
const express = require("express");
const multer = require('multer');

const ImageAnalyser = require('./lib/imageAnalyser');

const multerupload = multer();
const app = express();

app.post('/upload', multerupload.any(), function (req, res) {
  let file = req.files[0];
  let s3 = new AWS.S3();

  console.log(file);

  s3.putObject({
    Body: file.buffer,
    Bucket: bucketName,
    Key: file.originalname,
    ContentType: file.mimetype
  }, function (err, data) {
    if (err) {
      console.log(`file ${file.originalname} create failure`);
      return res.status(500).send({
        "error": `Failed to put s3 object: ${err}`
      });
    }

    console.log(`file ${file.originalname} create success`);
    const s3Config = {
      bucket: bucketName,
      imageName: file.originalname,
    };

    return ImageAnalyser
      .getImageText(s3Config)
      .then((text) => {
        console.log(JSON.stringify(text, null, '\t'));
        res.status(200).send(text)
      })
      .catch((error) => {
        console.log(error);
        res.status(error.statusCode || 501).send({
          "error": error.message || 'Internal server error'
        })
      });
  });
});

module.exports.upload = (event, context, callback) => {
  const server = awsServerlessExpress.createServer(app)
  return awsServerlessExpress.proxy(server, event, context);
};
