'use strict';

var DIRECTIONS = require('../lego-endpoints/constant').DIRECTIONS;
var legoControl = require('../lego-control');

global.bufferStack = [];
global.votedValue = '';

setInterval(vote, 2000);

function vote() {
    var winner = '';
    var previousAction = null;
    var election = {};

    console.log('current stack : ' + global.bufferStack);
    if (global.bufferStack.length === 0) {
        global.votedValue = '';
        return;
    }

    election[DIRECTIONS.UP] = 0;
    election[DIRECTIONS.DOWN] = 0;
    election[DIRECTIONS.RIGHT] = 0;
    election[DIRECTIONS.LEFT] = 0;

    for (var voteCnt = 0; voteCnt < global.bufferStack.length; voteCnt++) {
        var value = global.bufferStack[voteCnt];
        election[value]++;
    }

    for (var action in election) {
        if (previousAction && election[action] > election[previousAction]) {
            winner = action;
        } else if (previousAction && election[action] < election[previousAction]) {
            winner = previousAction;
        }
        previousAction = action;
    }

    global.votedValue = winner;
    console.log('voted value : ' + winner);
    global.bufferStack.length = 0;

    legoControl[winner];
}
