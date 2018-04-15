const https = require('https');

https.get('https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});


let res = codeToHtml(`
\`\`\`typescript
var fs     = require('fs');
var hljs   = require('highlight.js');
var marked = require('marked');

var markdownString = fs.readFileSync('./node_modules/marked/README.md');

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

var output = marked(markdownString);

console.log(output);
\`\`\`
`)

console.log(res)
