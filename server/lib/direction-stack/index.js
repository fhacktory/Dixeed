'use strict';

const request = require('request');
const DIRECTIONS = require('../lego-endpoints/constant').DIRECTIONS;
const ACTIONS = require('../lego-endpoints/constant').ACTIONS;
const ROBOT_REFRESH = 1000;

const internals = {};

module.exports = function register(server, options, next) {
    internals.io = require('socket.io')(server.listener);

    internals.io.on('connection', function (socket) {
        console.log('New connection!');
    });

    global.bufferTeam1 = [];
    global.bufferTeam2 = [];

    setInterval(internals.voteDemo, ROBOT_REFRESH);
    setInterval(internals.voteRand, ROBOT_REFRESH);

    next();
};

module.exports.attributes = {
    name: 'direction-stack',
    version: '1.0.0'
};

/////////////////////////////////////////////////////////////////:

internals.voteDemo = function voteDemo() {
    const election = {};
    let winner = null;

    console.log('demo stack : ' + global.bufferTeam2);
    if (global.bufferTeam2.length === 0) {
        return;
    }

    election[DIRECTIONS.UP] = 0;
    election[DIRECTIONS.DOWN] = 0;
    election[DIRECTIONS.RIGHT] = 0;
    election[DIRECTIONS.LEFT] = 0;
    election[ACTIONS.ARM] = 0;

    for (let voteCnt = 0; voteCnt < global.bufferTeam2.length; voteCnt++) {
        const value = global.bufferTeam2[voteCnt];
        election[value]++;
    }

    winner = DIRECTIONS.UP;
    for (let action in election) {
        if (election[action] > election[winner]) {
            winner = action;
        }
    }

    console.log('demo voted value : ' + winner);
    global.bufferTeam2.length = 0;

    internals.sendToRobot('http://192.168.1.133:8990/', winner);
}

internals.voteRand = function voteRand() {
    console.log('rand stack : ' + global.bufferTeam1);
    if (global.bufferTeam1.length === 0) {
        return;
    }

    let randInteger = internals.getRandomNumber(0, global.bufferTeam1.length);
    const winner = global.bufferTeam1[randInteger];
    console.log('rand voted value : ' + winner);
    global.bufferTeam1.length = 0;

    internals.sendToRobot('http://192.168.1.134:8990/', winner);
}

internals.getRandomNumber = function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

internals.sendToRobot = function sendToRobot(hostStr, action) {
    internals.io.emit('command_response', action);

    const host = hostStr + action + '/';
    request(host, function(error, response, body) {
        console.log('request sent to ' + host);
    });
}
