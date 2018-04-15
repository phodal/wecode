const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE;

module.exports.detail = (event, context, callback) => {
  let codeId = event.pathParameters.codeId;

  const params = {
    TableName: tableName,
    FilterExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': codeId,
    }
  };

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'couldn\'t fetch the logs.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      headers: {'Content-Type': 'text/html'},
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

module.exports.list = (event, context, callback) => {
  let userId = event.pathParameters.userId;

  const params = {
    TableName: tableName,
    FilterExpression: 'user_id = :user_id',
    ExpressionAttributeValues: {
      ':user_id': userId
    }
  };

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'couldn\'t fetch the logs.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      headers: {'Content-Type': 'text/html'},
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
