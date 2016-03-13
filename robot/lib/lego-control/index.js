'use strict';

var ev3dev = require('ev3dev-lang');
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

// Prevent Node from exiting until motor is done
var cancellationTokenA = setInterval(function() {
    if(motorA.state.indexOf("running") == -1)
        clearInterval(cancellationTokenA);
}, 10);

// Prevent Node from exiting until motor is done
var cancellationTokenB = setInterval(function() {
    if(motorB.state.indexOf("running") == -1)
        clearInterval(cancellationTokenB);
}, 10);

function init() {

    motorA = new ev3dev.Motor(ev3dev.OUTPUT_A);
    motorB = new ev3dev.Motor(ev3dev.OUTPUT_B);
    motorC = new ev3dev.Motor(ev3dev.OUTPUT_C);
    // check if motors are connected
    checkMotorConnected("A");
    checkMotorConnected("B");
    checkMotorConnected("C");

    // reset motors positions
    motorA.reset();
    motorB.reset();
    motorC.reset();

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
    motorC.positionSp = 100;

    // stop all previous command
    motorC.stopCommand = 'brake';

    // run the motor for the amount of time specified in `time_sp`
    motorC.command = "run-to-rel-pos";

    console.log("Turn arm");

}

function up() {

    // check if motors are connected
    checkMotorConnected("A");
    checkMotorConnected("B");


    // set the amount of time the motor will run
    motorA.positionSp = 500;
    motorB.positionSp = 500;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // run the motor for the amount of time specified in `time_sp`
    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log("Running forward");

}

function down() {

    // check if motors are connected
    checkMotorConnected("A");
    checkMotorConnected("B");

    // set the amount of time the motor will run
    motorA.positionSp = -500;
    motorB.positionSp = -500;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // use var positionSp
    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log("Running backward");
}

function left() {

    // check if motors are connected
    checkMotorConnected("A");
    checkMotorConnected("B");

    // set the amount of time the motor will run
    motorA.positionSp = -650;
    motorB.positionSp = 650;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // use var positionSp
    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log("Turn to the left");

}

function right() {
    // check if motors are connected
    checkMotorConnected("A");
    checkMotorConnected("B");


    // set the amount of time the motor will run
    motorA.positionSp = 650;
    motorB.positionSp = -650;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // use var positionSp
    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log("Turn to the right ...");

}
