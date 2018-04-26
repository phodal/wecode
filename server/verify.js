module.exports.handler = (event, context, callback) => {
  callback(
    null,
    {
      statusCode: 200,
      body: '3b87de370bf0e3902e5f70d341c7eb53',
      headers: {'Content-Type': 'text/plain'},
    }
  );
}
