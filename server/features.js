const featuresCode = [{
  'title': 'Ajax',
  'id': '1',
  'code': `$.ajax({ 
    url: 'https://api.github.com/authorizations',
    type: 'POST',
    beforeSend: function(xhr) { 
        xhr.setRequestHeader("Authorization", "Basic " + btoa("USERNAME:PASSWORD")); 
    },
    data: '{"scopes":["gist"],"note":"ajax gist test for a user"}'
}).done(function(response) {
    console.log(response);
});`
}, {
  'title': '平方根倒数速算法',
  'id': '2',
  'code': `float Q_rsqrt( float number )
{
	long i;
	float x2, y;
	const float threehalfs = 1.5F;
 
	x2 = number * 0.5F;
	y  = number;
	i  = * ( long * ) &y;
	i  = 0x5f3759df - ( i >> 1 );
	y  = * ( float * ) &i;
	y  = y * ( threehalfs - ( x2 * y * y ) ); 
	return y;
}`
}]

module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    },
    body: JSON.stringify(featuresCode),
  };
  callback(null, response);
};
