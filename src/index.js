var http = require('http');
var url  = require('url');

var server = http.createServer(function (req, res) {
	console.log('Requête entrante');
	
	// HTTP code response
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	
	var path = url.parse(req.url).pathname;
	
	res.write('<p>Chemin demandé : ' + path + '</p>');
	
	// Got to the end of the body
	res.end('<p>OK</p>');
});

server.listen(8000);