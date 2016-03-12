'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
require('./lib/direction-stack');

module.exports = server;

/////////////////////////////////////////////////////////////////////////

server.connection({
    host: 'localhost',
    port: '8990'
});

////////////////////////////////////////////////////////////////////
//                                                                //
//                      Plugins registration                      //
//                                                                //
////////////////////////////////////////////////////////////////////
server.register([
    require('./lib/lego-endpoints')
])

/////////////////////////////////////////////////////////////////////////
//                                                                     //
//                      Plugins configuration                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
.then(function () {

})
.catch(function (err) {
    console.error('Failed to load a plugin: ', err);
    process.exit(2);
})

////////////////////////////////////////////////////////////////////
//                                                                //
//                      Start the server                          //
//                                                                //
////////////////////////////////////////////////////////////////////
.then(function() {
    return server.start();
})
.then(function() {
    console.log('Server started on port : [8990]');
})
.catch(function(err) {
    console.error('Started server with errors: ' + err);
    process.exit(3);
});
