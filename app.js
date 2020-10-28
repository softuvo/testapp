#!/usr/bin/env nodejs
var dotenv = require('dotenv');
dotenv.config();
const config = require('./config');
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');
const rjwt = require('restify-jwt-community');

var https_options = {
	name: config.name,
	version: config.version
	// key: fs.readFileSync('/etc/ssl/private/server.key'),
	// certificate: fs.readFileSync('/etc/ssl/private/server.crt')
};


const server = restify.createServer(https_options);
require('./routes')(server);


// server.use(rjwt(config.jwtOwner).unless({
// 	path: ['/createUser', '/createProduct', '/getAllProduct', '/viewProductByUser', '/viewCount']
// }));

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

server.listen(config.port, () => {
	mongoose.Promise = global.Promise;
	// console.log('config.db.uri,', config.db.uri);

	mongoose.connect(config.db.uri, );

	const db = mongoose.connection;

	db.on('error', (err) => {
		// console.error(err);
		process.exit(1);
	});

	db.once('open', () => {
		// console.log('Server is listening on port ', config.port);
	});
});