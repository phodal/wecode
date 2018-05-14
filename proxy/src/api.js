'use strict';

const http = require('http');
const fs = require('fs');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
  target: {
    protocol: 'https:',
    host: 'my-domain-name',
    port: 443,
    pfx: fs.readFileSync('myKeystore.p12'),
    passphrase: 'password',
  },
});

const server = http.createServer(function (req, res) {
  proxy.web(req, res, {target: 'https://code.wdsm.io/'});
});

server.listen(3000);
