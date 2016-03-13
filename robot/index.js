'use strict';

var http = require('http'),
    url = require('url'),
    legoControl = require('./lib/lego-control');

legoControl.init();

var server = http.createServer(function handleRequest(request, response) {
    var data = url.parse(request.url, true);

    switch(data.pathname) {
        case '/up/':
            legoControl.up();
            break;
        case '/down/':
            legoControl.down();
            break;
        case '/right/':
            legoControl.right();
            break;
        case '/left/':
            legoControl.left();
            break;
        case '/arm/':
            legoControl.arm();
            break;
    }

    response.end('Coucou');
});

server.listen(8880, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", 8880);
});
