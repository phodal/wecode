const request = require('request');
const weappConfig = require('../config');

module.exports.login = (event, context, callback) => {
  let JSCODE = event.queryStringParameters.code;

  const APPID = weappConfig.app_id;
  const SECRET = weappConfig.app_secret;

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
      body: JSON.stringify(body),
    };
    callback(null, response);
  });
};
