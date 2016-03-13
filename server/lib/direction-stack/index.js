'use strict';

const request = require('request');
const DIRECTIONS = require('../lego-endpoints/constant').DIRECTIONS;
const ACTIONS = require('../lego-endpoints/constant').ACTIONS;

global.bufferTeam1 = [];
global.bufferTeam2 = [];

setInterval(voteDemo, 2000);
setInterval(voteRand, 2000);

/////////////////////////////////////////////////////////////////:

function voteDemo() {
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
        const value = global.bufferTeam2[voteCnt].action;
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

    sendToRobot('http://192.168.1.50:8880/', winner);
}

function voteRand() {
    console.log('rand stack : ' + global.bufferTeam1);
    if (global.bufferTeam1.length === 0) {
        return;
    }
    
    let randInteger = getRandomNumber(0, global.bufferTeam2.length);
    const winner = global.bufferTeam2[randInteger];
    console.log('rand voted value : ' + winner);

    // sentToRobot('', winner);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sendToRobot(hostStr, action) {
    const host = hostStr + action + '/';
    request(host, function(error, response, body) {
        console.log('request sent to ' + host);
    });
}
