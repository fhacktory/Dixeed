'use strict';

var component = angular.module('robotFhacktory.component.command', []);

component.controller('robotFhacktoryCmdCtrl', RobotFhacktoryCmdCtrl);

RobotFhacktoryCmdCtrl.$inject = [ '$resource', '$timeout' ];

function RobotFhacktoryCmdCtrl($resource, $timeout) {
    var Request = $resource(this.endPoint, null, {
        sendCmd: { method: 'POST' }
    });

    var controller = this;

    this.cmdAction = function () {
        Request.sendCmd({ action: this.action }, function (value, responseHeaders) {
            if (value === controller.action) {
                controller.wasSelected = true;

                $timeout(function () {
                    controller.wasSelected = false;
                }, 3000);
            }
        });
    }
}