'use strict';

const DIRECTIONS = require('../lego-endpoints/constant').DIRECTIONS;

global.bufferStack = [];
global.votedValue = '';

setInterval(vote, 2000);

function vote() {
    let winner = DIRECTIONS.UP;
    const election = {};
    election[DIRECTIONS.UP] = 0;
    election[DIRECTIONS.DOWN] = 0;
    election[DIRECTIONS.RIGHT] = 0;
    election[DIRECTIONS.LEFT] = 0;

    for (let voteCnt = 0; voteCnt < global.bufferStack.length; voteCnt++) {
        const value = global.bufferStack[voteCnt];
        election[value]++;
    }

    for (let action in election) {
        if (election[action] > election[winner]) {
            winner = action;
        }
    }
    global.votedValue = winner;
    console.log('voted value : ' + winner);
    global.bufferStack.length = 0;
}
