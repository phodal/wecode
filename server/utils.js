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

function getValueIgnoringKeyCase(obj, lookedKey) {
  return Object.keys(obj)
    .map(presentKey => presentKey.toLowerCase() === lookedKey.toLowerCase() ? obj[presentKey] : null)
    .filter(item => item)[0];
}

module.exports.parse = (event, spotText) => {
  const boundary = getValueIgnoringKeyCase(event.headers, 'Content-Type').split('=')[1];
  const body = (event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('binary') : event.body)
    .split(boundary)
    .filter(item => item.match(/Content-Disposition/))
    .map((item) => {
      if (item.match(/filename/)) {
        const result = {};
        result[
          item
            .match(/name="[a-zA-Z_]+([a-zA-Z0-9_]*)"/)[0]
            .split('=')[1]
            .match(/[a-zA-Z_]+([a-zA-Z0-9_]*)/)[0]
          ] = {
          type: 'file',
          filename: item
            .match(/filename="[\w-\. ]+"/)[0]
            .split('=')[1]
            .match(/[\w-\.]+/)[0],
          contentType: item
            .match(/Content-Type: .+\r\n\r\n/)[0]
            .replace(/Content-Type: /, '')
            .replace(/\r\n\r\n/, ''),
          content: (spotText && item
              .match(/Content-Type: .+\r\n\r\n/)[0]
              .replace(/Content-Type: /, '')
              .replace(/\r\n\r\n/, '')
              .match(/text/)
          ) ? item
            .split(/\r\n\r\n/).slice(1).join("\r\n")
            .replace(/\r\n\r\n\r\n----/, '') : Buffer.from(item
            .split(/\r\n\r\n/).slice(1).join("\r\n")
            .replace(/\r\n\r\n\r\n----/, ''), 'binary'),
        };
        return result;
      }
      const result = {};
      result[
        item
          .match(/name="[a-zA-Z_]+([a-zA-Z0-9_]*)"/)[0]
          .split('=')[1]
          .match(/[a-zA-Z_]+([a-zA-Z0-9_]*)/)[0]
        ] = item
        .split(/\r\n\r\n/).slice(1).join("\r\n")
        .split(/\r\n--/)[0];
      return result;
    })
    .reduce((accumulator, current) => Object.assign(accumulator, current), {});
  return body;
};
