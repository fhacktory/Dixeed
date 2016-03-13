'use strict';

exports.action = function actionHandler(request, reply) {
    const action = request.payload.action;
    const teamId = request.params.teamId;

    console.log('Action demandé : ' + action);
    global['bufferTeam' + teamId].push(action);

    reply();
};
