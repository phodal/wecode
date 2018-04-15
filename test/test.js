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
