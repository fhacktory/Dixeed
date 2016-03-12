'use strict';

var ev3dev = require('ev3dev-lang');

exports.up = up;
exports.down = down;
exports.right = right;
exports.left = left;

///////////////////////////////////////////////////////////////

var motorA = new ev3dev.Motor(ev3dev.OUTPUT_A);
var motorB = new ev3dev.Motor(ev3dev.OUTPUT_B);

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

function checkMotorConnected (letter) {
    if (!"motor"+letter.connected) {
        console.error("No motor was found on port " + letter + ". Please connect a tacho motor and try again.");
        process.exit(1);
    }
}

function up() {

    // check if motors are connected
    checkMotorConnected("A");
    checkMotorConnected("B");

    // enable speed regulation an set motors speed
    motorA.speedRegulationEnabled = 'on';
    motorA.speedSp = 500;
    motorB.speedRegulationEnabled = 'on';
    motorB.speedSp = 500;

    // set the amount of time the motor will run
    motorA.positionSp = 500;
    motorB.positionSp = 500;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // run the motor for the amount of time specified in `time_sp`
    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log(" Running forward the motors A and B for 180 tacho counts... ");

}

function down() {

    // check if motors are connected
    checkMotorConnected("A");
    checkMotorConnected("B");

    // enable speed regulation and set motors speed
    motorA.speedRegulationEnabled = 'on';
    motorA.speedSp = 500;
    motorB.speedRegulationEnabled = 'on';
    motorB.speedSp = 500;

    // set the amount of time the motor will run
    motorA.positionSp = -500;
    motorB.positionSp = -500;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // use var positionSp
    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log("Running back the motors A and B for 180 tacho counts...");
}

function left() {

    // check if motors are connected
    checkMotorConnected("A");
    checkMotorConnected("B");

    // enable speed regulation and set motors speed
    motorA.speedRegulationEnabled = 'on';
    motorA.speedSp = 500;
    motorB.speedRegulationEnabled = 'on';
    motorB.speedSp = 500;

    // set the amount of time the motor will run
    motorA.positionSp = 500;
    motorB.positionSp = -500;

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

    // enable speed regulation and set motors speed
    motorA.speedRegulationEnabled = 'on';
    motorA.speedSp = 500;
    motorB.speedRegulationEnabled = 'on';
    motorB.speedSp = 500;

    // set inverse polarity to move back
    motorB.polarity = 'inversed';

    // set the amount of time the motor will run
    motorA.positionSp = -500;
    motorB.positionSp = 500;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // use var positionSp
    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log("Turn to the right ...");

}
