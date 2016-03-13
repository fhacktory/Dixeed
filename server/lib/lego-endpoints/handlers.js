'use strict';

exports.action = function actionHandler(request, reply) {
    const action = request.payload.action;

    console.log('Action demandé : ' + action);
    global.bufferStack.push(action);

    reply();
};
