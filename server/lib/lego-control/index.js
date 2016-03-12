'use strict';

var ev3dev = require('ev3dev-lang');

var motorA = new ev3dev.Motor(ev3dev.OUTPUT_A);
var motorB = new ev3dev.Motor(ev3dev.OUTPUT_B);

// Prevent Node from exiting until motor is done
var cancellationToken = setInterval(function() {
    if(motor.state.indexOf("running") == -1)
        clearInterval(cancellationToken);
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

    // enable speed regulation
    motorA.speedRegulationEnabled = 'on';
    motorB.speedRegulationEnabled = 'on';

    // set motors speed
    motorA.speedSp = 500;
    motorB.speedSp = 500;

    // set the amount of time the motor will run
    motorA.timeSp = 400;
    motorB.timeSp = 400;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // run the motor for the amount of time specified in `time_sp`
    motorA.command = "run-timed";
    motorB.command = "run-timed";

    console.log("Running forward the motors A and B for 4 sec ...");

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

    // set inverse polarity to move back
    motorA.polarity = 'inversed';
    motorB.polarity = 'inversed';

    // set the amount of time the motor will run
    motorA.timeSp = 400;
    motorB.timeSp = 400;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // use var positionSp
    motorA.command = "run-timed";
    motorB.command = "run-timed";

    console.log("Running back the motors A and B for 4 sec ...");
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

    // set inverse polarity to move back
    motorA.polarity = 'inversed';

    // set the amount of time the motor will run
    motorA.timeSp = 400;
    motorB.timeSp = 400;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // use var positionSp
    motorA.command = "run-timed";
    motorB.command = "run-timed";

    console.log("Running back the motors A and B for 4 sec ...");

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
    motorA.timeSp = 400;
    motorB.timeSp = 400;

    // stop all previous command
    motorA.stopCommand = 'brake';
    motorB.stopCommand = 'brake';

    // use var positionSp
    motorA.command = "run-timed";
    motorB.command = "run-timed";

    console.log("Running back the motors A and B for 4 sec ...");

}
