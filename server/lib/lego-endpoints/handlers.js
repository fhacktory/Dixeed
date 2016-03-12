'use strict';

exports.move = function moveHandler(request, reply) {
    var action = request.payload.action;

    console.log('Action demandé : ' + action);
    global.bufferStack.push(action);

    reply();
};
