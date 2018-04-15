'use strict';

var hljs = require('highlight.js');
var marked = require('marked');

module.exports.create = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};

function codeToHtml(code) {
  marked.setOptions({
    highlight: function(code, lang) {
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
