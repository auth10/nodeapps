var http = require('http'),
	https = require('https');
	fs = require('fs');
    httpProxy = require('http-proxy');

var options = {
  https: {
    key: fs.readFileSync('mygoogle.com.key.pem', 'utf8'),
    cert: fs.readFileSync('mygoogle.com.certificate.pem', 'utf8')
  },
  target: {
    https: true // This could also be an Object with key and cert properties
  }
};

var proxy = new httpProxy.HttpProxy({ 
	  target: {
	    host: 'google.com', 
	    port: 80,
	    https: true
	  }
	});

https.createServer(options.https, function (req, res) {
  proxy.proxyRequest(req, res);
}).listen(process.env.PORT || 9000);
