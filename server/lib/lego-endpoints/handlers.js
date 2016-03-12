'use strict';

exports.move = function moveHandler(request, reply) {
    const action = request.payload.action;

    console.log('Action demandé : ' + action);
    global.bufferStack.push(action);

    reply();
};
