const featuresCode = [{
  'title': 'CLI.js',
  'id': 'BkCifFXhf',
  'userId': 'root',
  'code': "<pre><code><span class=\"hljs-meta\">#!/usr/bin/env node</span>\n\n<span class=\"hljs-keyword\">import</span> { <span class=\"hljs-keyword\">default</span> <span class=\"hljs-keyword\">as</span> Mest } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'./mest'</span>\n\n<span class=\"hljs-keyword\">const</span> colors = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'colors'</span>)\n<span class=\"hljs-keyword\">const</span> program = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'commander'</span>)\n\n<span class=\"hljs-keyword\">const</span> version = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">'../../package.json'</span>).version\n\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">testSchema</span>(<span class=\"hljs-params\">inputFile: string</span>) </span>{\n  <span class=\"hljs-keyword\">let</span> mest = <span class=\"hljs-keyword\">new</span> Mest({\n    <span class=\"hljs-attr\">file</span>: inputFile\n  })\n  mest.load()\n}\n\nprogram\n  .version(version)\n  .option(<span class=\"hljs-string\">'-i, inputFile &lt;inputFile&gt;'</span>, <span class=\"hljs-string\">'Compare API'</span>, testSchema)\n  .parse(process.argv)\n\n<span class=\"hljs-keyword\">if</span> (!process.argv.slice(<span class=\"hljs-number\">2</span>).length || !process.argv.length) {\n  program.outputHelp(colors.green)\n}\n</code></pre>"
}, {
  "code": "<pre><code><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">html</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">head</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">meta</span> <span class=\"hljs-attr\">charset</span>=<span class=\"hljs-string\">\"UTF-8\"</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">meta</span> <span class=\"hljs-attr\">name</span>=<span class=\"hljs-string\">\"viewport\"</span>\n        <span class=\"hljs-attr\">content</span>=<span class=\"hljs-string\">\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\"</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">meta</span> <span class=\"hljs-attr\">http-equiv</span>=<span class=\"hljs-string\">\"X-UA-Compatible\"</span> <span class=\"hljs-attr\">content</span>=<span class=\"hljs-string\">\"ie=edge\"</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">title</span>&gt;</span>Document<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">title</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">head</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">body</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">body</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">html</span>&gt;</span>\n</code></pre>",
  "id": "SJYrQYX3M",
  "userId": "oa_xM5SsbhG4wjsTbQz9W_Etc3_Y",
  "title": "HTML 模板"
}, {
  'title': '平方根倒数速算法',
  'id': 'blabla',
  'userId': 'root',
  'code': "<pre><code><span class=\"hljs-attribute\">float</span> Q_rsqrt( float number )\n{\n    <span class=\"hljs-attribute\">long</span> i;\n    <span class=\"hljs-attribute\">float</span> x2, y;\n    <span class=\"hljs-attribute\">const</span> float threehalfs = <span class=\"hljs-number\">1</span>.5F;\n\n    <span class=\"hljs-attribute\">x2</span> = number * <span class=\"hljs-number\">0</span>.5F;\n    <span class=\"hljs-attribute\">y</span>  = number;\n    <span class=\"hljs-attribute\">i</span>  = * ( long * ) &amp;y;\n    <span class=\"hljs-attribute\">i</span>  = 0x5f3759df - ( i &gt;&gt; <span class=\"hljs-number\">1</span> );\n    <span class=\"hljs-attribute\">y</span>  = * ( float * ) &amp;i;\n    <span class=\"hljs-attribute\">y</span>  = y * ( threehalfs - ( x2 * y * y ) ); \n    <span class=\"hljs-attribute\">return</span> y;\n}\n</code></pre>"
}, {
  "code": "<pre><code><span class=\"hljs-keyword\">public</span> <span class=\"hljs-keyword\">class</span> <span class=\"hljs-title\">Main</span> {\n    <span class=\"hljs-function\"><span class=\"hljs-keyword\">public</span> <span class=\"hljs-keyword\">static</span> <span class=\"hljs-keyword\">void</span> <span class=\"hljs-title\">main</span>(<span class=\"hljs-params\">String[] args</span>) </span>{\n        System.<span class=\"hljs-keyword\">out</span>.println(<span class=\"hljs-string\">\"Hello, World!\"</span>);\n    }\n}\n</code></pre>",
  "id": "SkKsQYQhz",
  "userId": "oa_xM5SsbhG4wjsTbQz9W_Etc3_Y",
  "title": "Java Hello, World"
}];

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
