'use strict';

const AWS = require('aws-sdk');
const shortid = require('shortid');
const tc = require('./text-censor')
const Utils = require('./lib/utils');

AWS.config.setPromisesDependency(Promise);

const tableName = process.env.DYNAMODB_TABLE;
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    console.log(error)
    callback(null, {statusCode: 400, body: JSON.stringify(error)});
  }
  const userId = body.user_id;
  const title = body.title;
  const code = body.code;

  console.log(body)

  if (!userId || !code) {
    callback(null, {statusCode: 400, body: '弄什么呢'});
  }

  const timestamp = new Date().getTime();

  tc.filter(code, function (err, censoredCode) {
    if (err) {
      callback(null, {statusCode: 500, body: JSON.stringify(err)});
    }
    tc.filter(title, function (err, censoredTitle) {
      if (err) {
        callback(null, {statusCode: 500, body: JSON.stringify(err)});
      }

      const params = {
        TableName: tableName,
        Item: {
          title: censoredTitle,
          id: shortid.generate(),
          userId: userId,
          code: Utils.codeToHtml(censoredCode),
          createdAt: timestamp
        }
      };

      docClient.put(params, (error) => {
        if (error) {
          console.error(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: {'Content-Type': 'text/plain'},
            body: 'couldn\'t create the form item.',
          });
          return;
        }

        const response = {
          statusCode: 201,
          headers: {
            "Access-Control-Allow-Origin": "*" // Required for CORS support to work
          },
          body: JSON.stringify(params.Item),
        };
        callback(null, response);
      });
    })

  })
};
