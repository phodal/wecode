const hljs = require('highlight.js');
const marked = require('marked');

module.exports.codeToHtml = (code) => {
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

