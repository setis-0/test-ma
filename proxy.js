var http = require('http'),
  httpProxy = require('http-proxy');
httpProxy.createServer({changeOrigin: true, target: 'http://www.omdbapi.com'}).listen(8000);
