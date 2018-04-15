const request = require('request');
const weappConfnig = require('../config');

module.exports.login = (event, context, callback) => {
  let JSCODE = event.queryStringParameters;

  const APPID = weappConfnig.app_id;
  const SECRET = weappConfnig.app_secret;

  console.log(JSCODE)

  request(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`, {json: true}, (err, res, body) => {
    if (err) {
      console.log(err);

      const response = {
        statusCode: 400,
        body: JSON.stringify(err),
      };
      callback(null, response);
      return ;
    }

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      },
      body: JSON.stringify(body),
    };
    callback(null, response);
  });
}
