var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
httpProxy.createServer(function (req, res, proxy) {
  //
  // Put your custom server logic here
  //
  console.log(req.url);

  proxy.proxyRequest(req, res, {
    host: 'google.com',
    port: 80,
    target : { https: true }
  });
}).listen(process.env.PORT || 9000);
