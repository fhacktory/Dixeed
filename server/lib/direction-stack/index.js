'use strict';

const request = require('request');
var DIRECTIONS = require('../lego-endpoints/constant').DIRECTIONS;

global.bufferStack = [];
global.votedValue = '';

setInterval(vote, 2000);

function vote() {
    const election = {};
    let winner = null;

    console.log('current stack : ' + global.bufferStack);
    if (global.bufferStack.length === 0) {
        global.votedValue = '';
        return;
    }

    election[DIRECTIONS.UP] = 0;
    election[DIRECTIONS.DOWN] = 0;
    election[DIRECTIONS.RIGHT] = 0;
    election[DIRECTIONS.LEFT] = 0;

    for (let voteCnt = 0; voteCnt < global.bufferStack.length; voteCnt++) {
        const value = global.bufferStack[voteCnt];
        election[value]++;
    }

    winner = DIRECTIONS.UP;
    for (let action in election) {
        if (election[action] > election[winner]) {
            winner = action;
        }
    }

    global.votedValue = winner;
    console.log('voted value : ' + winner);
    global.bufferStack.length = 0;

    sendToRobot(winner);
}

function sendToRobot(action) {
    const host = 'http://192.168.1.50:8880/' + action + '/';
    request(host, function(error, response, body) {
        console.log('request sent to ' + host);
    });
}
