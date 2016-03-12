'use strict';

var ev3dev = require('ev3dev-lang');

var motorA = new ev3dev.Motor(ev3dev.OUTPUT_A);
var motorB = new ev3dev.Motor(ev3dev.OUTPUT_B);

if (!motorA.connected) {
    console.error("No motor was found on port A. Please connect a tacho motor to port A and try again.");
    process.exit(1);
}

if (!motorA.connected) {
    console.error("No motor was found on port B. Please connect a tacho motor to port B and try again.");
    process.exit(1);
}

// Prevent Node from exiting until motor is done
var cancellationToken = setInterval(function() {
    if(motor.state.indexOf("running") == -1)
        clearInterval(cancellationToken);
}, 10);

function up() {
    motorA.speedRegulationEnabled = 'on';
    motorB.speedRegulationEnabled = 'on';

    motorA.speedSp = 500;
    motorB.speedSp = 500;

    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    motorA.positionSp = 4000;
    motorB.positionSp = 4000;

    motorA.command = "run-to-rel-pos";
    motorB.command = "run-to-rel-pos";

    console.log("Running the motors A and B for 4000 tacho counts...");

}

function down() {

}

function left() {

}

function right() {

}
