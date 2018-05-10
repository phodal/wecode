'use strict';

const AWS = require('aws-sdk');

const rek = new AWS.Rekognition();

class ImageAnalyser {
  static getImageText(s3Config) {
    const params = {
      Image: {
        S3Object: {
          Bucket: s3Config.bucket,
          Name: s3Config.imageName,
        },
      }
    };

    console.log(`Analyzing file: https://s3.amazonaws.com/${s3Config.bucket}/${s3Config.imageName}`);

    return new Promise((resolve, reject) => {
      rek.detectText(params, (err, data) => {
        if (err) {
          console.log(params, err);
          return reject(new Error(err));
        }
        return resolve(data);
      });
    });
  }
}

module.exports = ImageAnalyser;
