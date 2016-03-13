'use strict';

var ev3dev = require('ev3dev-lang');

// declare variables motors
var motorA;
var motorB;
var motorC;

exports.init = init;
exports.up = up;
exports.down = down;
exports.right = right;
exports.left = left;
exports.arm = arm;

///////////////////////////////////////////////////////////////

function init() {

    motorA = new ev3dev.Motor(ev3dev.OUTPUT_A);
    motorB = new ev3dev.Motor(ev3dev.OUTPUT_B);
    motorC = new ev3dev.Motor(ev3dev.OUTPUT_C);

    motorA.reset();
    motorB.reset();
    motorC.reset();

    // cheCck if motors are connected
    checkMotorConnected("A");
    checkMotorConnected("B");
    checkMotorConnected("C");

    // enable speed regulation an set motors speed
    motorA.speedRegulationEnabled = 'on';
    motorB.speedRegulationEnabled = 'on';
    motorC.speedRegulationEnabled = 'on';

    motorA.speedSp = 500;
    motorB.speedSp = 500;
    motorC.speedSp = 500;

}


function checkMotorConnected (letter) {
    if (!"motor"+letter.connected) {
        console.error("No motor was found on port " + letter + ". Please connect a tacho motor and try again.");
        process.exit(1);
    }
}

function arm() {
    // set the amount of time the motor will run
    motorC.positionSp = -20;
    // stop all previous command
    motorC.stopCommand = 'brake';
    // run the motor for the amount of time specified in `time_sp`
    motorC.command = "run-to-rel-pos";

    setTimeout(function() {
        // set the amount of time the motor will run
        motorC.positionSp = 0;
        // stop all previous command
        motorC.stopCommand = 'hold';
        // run the motor for the amount of time specified in `time_sp`
        motorC.command = "run-to-abs-pos";
    }, 1000);

    console.log("activate arm");

}

function up() {

    // set the amount of time the motor will run
    motorA.positionSp = 300;
    motorB.positionSp = 300;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // run the motor for the amount of time specified in `time_sp`
    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log("Running forward");

}

function down() {

    // set the amount of time the motor will run
    motorA.positionSp = -300;
    motorB.positionSp = -300;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // use var positionSp
    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log("Running backward");
}

function left() {

    // set the amount of time the motor will run
    motorA.positionSp = -50;
    motorB.positionSp = 50;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // use var positionSp
    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log("Turn to the left");

}

function right() {

    // set the amount of time the motor will run
    motorA.positionSp = 50;
    motorB.positionSp = -50;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // use var positionSp
    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log("Turn to the right ...");
}
