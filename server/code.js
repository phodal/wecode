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
    FilterExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
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

module.exports.update = (event, context, callback) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    console.log(error)
    callback(null, {statusCode: 400, body: JSON.stringify(error)});
  }

  const userId = body.user_id;
  const code = body.code;
  const title = body.title;
  const codeId = event.pathParameters.codeId;

  if (!userId || !code) {
    callback(null, {statusCode: 400, body: '弄什么呢'});
  }

  const params = {
    TableName: tableName,
    Key: {
      id: codeId,
      userId: userId
    },
    ExpressionAttributeNames: {
      '#code': 'code',
      '#title': 'title'
    },
    ExpressionAttributeValues: {
      ':code': code,
      ':title': title
    },
    UpdateExpression: 'SET #code = :code, #title = :title',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          error: 500,
          message: 'Couldn\'t update item.'
        }),
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
}
