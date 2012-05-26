var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
httpProxy.createServer(function (req, res, proxy) {
  //
  // Put your custom server logic here
  //
  console.log(req);
req.headers.host = 'auth10-int.accesscontrol.windows.net';

  proxy.proxyRequest(req, res, {
    host: 'auth10-int.accesscontrol.windows.net',
    port: 443,
    target : { https: true }
  });
}).listen(process.env.PORT || 9000);
