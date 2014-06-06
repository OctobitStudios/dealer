'use strict';

var config = require('./config'),
    path = require('path');

module.exports = function(server){
    var io = require('socket.io')(server);

    // Globbing routing files
    config.getGlobbedFiles('./app/sockets/**/*.js').forEach(function(socketPath) {
        require(path.resolve(socketPath))(io);
    });

    return io;
};