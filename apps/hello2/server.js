var fs = require('fs'),
	http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy');

var options = {
  https: {
    key: fs.readFileSync('./mygoogle.com.key.pem', 'utf8'),
    cert: fs.readFileSync('./mygoogle.com.certificate.pem', 'utf8')
  },
  target: {
    https: true // This could also be an Object with key and cert properties
  }
};


//
// Create an instance of HttpProxy to use with another HTTPS server
//
var proxy = new httpProxy.HttpProxy({ 
  target: {
    host: 'google.com', 
    port: 80,
    https: false
  }
});

http.createServer(function (req, res) {
  proxy.proxyRequest(req, res);
}).listen(process.env.PORT || 8002);

//
// Create the target HTTPS server for both cases
//
/*
https.createServer(options.https, function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('hello https\n');
  res.end();
}).listen(8000);
*/