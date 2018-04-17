const hljs = require('highlight.js');
const marked = require('marked');

// const https = require('https');
//
// https.get('https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code', (resp) => {
//   let data = '';
//
//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });
//
//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(JSON.parse(data).explanation);
//   });
//
// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });

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

let res = codeToHtml(`
\`\`\`
console.log("fadsf");

\`\`\`
`)

console.log(res)
