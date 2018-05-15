'use strict';

const http = require('http');
const fs = require('fs');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createServer({
  ssl: {
    key: fs.readFileSync('cert.key', 'utf8'),
    cert: fs.readFileSync('ca-cert.pem', 'utf8')
  },
  target: 'https://code.wdsm.io',
  secure: true,
  passphrase: 'phodal',
}).listen(3000);

// const server = http.createServer(function (req, res) {
//   proxy.web(req, res, {target: 'https://code.wdsm.io/'});
// });

// server.listen(3000);
