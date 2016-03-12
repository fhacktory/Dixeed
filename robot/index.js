'use strict';

var http = require('http'),
    url = require('url');

var server = http.createServer(function handleRequest(request, response) {
    var data = url.parse(request.url, true);

    switch(data.pathname) {
        case 'forward':

            break;
        case 'backward':

            break;
        case 'turnleft':

            break;
        case 'turnright':
            
            break;
    }
});

server.listen(8880, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", 8880);
});