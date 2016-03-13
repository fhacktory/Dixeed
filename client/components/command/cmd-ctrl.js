'use strict';

var component = angular.module('robotFhacktory.component.command', []);

component.controller('robotFhacktoryCmdCtrl', RobotFhacktoryCmdCtrl);

RobotFhacktoryCmdCtrl.$inject = [ '$resource', '$timeout', 'hotkeys' ];

function RobotFhacktoryCmdCtrl($resource, $timeout, hotkeys) {
    var controller = this;

    this.cmdAction = function () {
        controller.wasSelected = true;

        $timeout(function () {
            controller.wasSelected = false;
        }, 1500);

        var Request = $resource(this.endPoint, null, {
            sendCmd: { method: 'POST' }
        });

        Request.sendCmd({ action: this.action }, function (value, responseHeaders) {
            if (value === controller.action) {
                
            }
        });
    };

    if (this.key) {
        hotkeys.add({
            combo: this.key,
            description: 'Execute command',
            callback: function() {
                controller.cmdAction();
            }
        });
    }
}