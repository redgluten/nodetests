var http         = require('http');
var url          = require('url');
var qs           = require('querystring');
var EventEmitter = require('events').EventEmitter;
var include      = require('./include');
var pack         = require('./package');

var e = new EventEmitter();

var server = http.createServer(function (req, res) {
	var path  = url.parse(req.url).pathname;
	var query = qs.parse(url.parse(req.url).query)

	// HTTP code response
	res.writeHead(200, {
		"Content-Type": "text/html; charset=utf-8",
	});

	if ('action' in query && query['action'] === 'stop') {
		this.close();
		e.emit('serverstop', 'Arrêt du serveur par l’utilisateur');
	};

	res.write('<p>Chemin demandé : ' + path + '</p>');
	res.write('<p>Var : ' + query['var'] + '</p>');

	pack.test();

	// Got to the end of the body
	res.end();
});

e.on('serverstop', function(message) {
	console.log('serverstop reçu');
	server.close(function() {
		console.log('close');
	})
})
server.on('close', function() {
	console.log('Arrêt du serveur');
});
server.listen(8000);
