const featuresCode = [{
  'title': 'Ajax',
  'id': 'ByWfnpe3M',
  'code': "<pre><code>$.ajax({ \\n    url: <span class=\\\"hljs-string\\\">'https://api.github.com/authorizations'</span>,\\n    <span class=\\\"hljs-built_in\\\">type</span>: <span class=\\\"hljs-string\\\">'POST'</span>,\\n    beforeSend: <span class=\\\"hljs-function\\\"><span class=\\\"hljs-keyword\\\">function</span><span class=\\\"hljs-params\\\">(xhr)</span> { </span>\\n        xhr.setRequestHeader(<span class=\\\"hljs-string\\\">\\\"Authorization\\\"</span>, <span class=\\\"hljs-string\\\">\\\"Basic \\\"</span> + btoa(<span class=\\\"hljs-string\\\">\\\"USERNAME:PASSWORD\\\"</span>)); \\n    },\\n    data: <span class=\\\"hljs-string\\\">'{\\\"</span>scopes<span class=\\\"hljs-string\\\">\\\":[\\\"</span>gist<span class=\\\"hljs-string\\\">\\\"],\\\"</span>note<span class=\\\"hljs-string\\\">\\\":\\\"</span>ajax gist test <span class=\\\"hljs-keyword\\\">for</span> a user<span class=\\\"hljs-string\\\">\\\"}'</span>\\n}).done(<span class=\\\"hljs-function\\\"><span class=\\\"hljs-keyword\\\">function</span><span class=\\\"hljs-params\\\">(response)</span> {</span>\\n    console.<span class=\\\"hljs-built_in\\\">log</span>(response);\\n});\\n</code></pre>"
}, {
  'title': '平方根倒数速算法',
  'id': 'ryyX26g3f',
  'code': "<pre><code><span class=\\\"hljs-attribute\\\">float</span> Q_rsqrt( float number )\\n{\\n    <span class=\\\"hljs-attribute\\\">long</span> i;\\n    <span class=\\\"hljs-attribute\\\">float</span> x2, y;\\n    <span class=\\\"hljs-attribute\\\">const</span> float threehalfs = <span class=\\\"hljs-number\\\">1</span>.5F;\\n\\n    <span class=\\\"hljs-attribute\\\">x2</span> = number * <span class=\\\"hljs-number\\\">0</span>.5F;\\n    <span class=\\\"hljs-attribute\\\">y</span>  = number;\\n    <span class=\\\"hljs-attribute\\\">i</span>  = * ( long * ) &amp;y;\\n    <span class=\\\"hljs-attribute\\\">i</span>  = 0x5f3759df - ( i &gt;&gt; <span class=\\\"hljs-number\\\">1</span> );\\n    <span class=\\\"hljs-attribute\\\">y</span>  = * ( float * ) &amp;i;\\n    <span class=\\\"hljs-attribute\\\">y</span>  = y * ( threehalfs - ( x2 * y * y ) ); \\n    <span class=\\\"hljs-attribute\\\">return</span> y;\\n}\\n</code></pre>"
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
