'use strict';

const AWS = require('aws-sdk');
const hljs = require('highlight.js');
const marked = require('marked');
const shortid = require('shortid');

AWS.config.setPromisesDependency(Promise);

const tableName = process.env.DYNAMODB_TABLE;
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const userId = event.body.user_id;
  const code = event.body.code;

  if (!userId || !code) {
    callback(
      null,
      {
        statusCode: 400,
        body: '弄什么呢'
      }
    );
  }

  const timestamp = new Date().getTime();
  const params = {
    TableName: tableName,
    Item: {
      id: shortid.generate(),
      userId: userId,
      code: codeToHtml(code),
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
      // headers: {
      //   "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      // },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};

function codeToHtml(code) {
  marked.setOptions({
    highlight: function (code, lang) {
      if (typeof lang === 'undefined') {
        return hljs.highlightAuto(code).value;
      } else if (lang === 'nohighlight') {
        return code;
      } else {
        return hljs.highlight(lang, code).value;
      }
    }
  });
  return marked(code);
}
