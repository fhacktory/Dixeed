'use strict';

var component = angular.module('robotFhacktory.component.command', []);

component.controller('robotFhacktoryCmdCtrl', RobotFhacktoryCmdCtrl);

RobotFhacktoryCmdCtrl.$inject = [ '$resource', '$timeout' ];

function RobotFhacktoryCmdCtrl($resource, $timeout) {
    var controller = this;

    this.cmdAction = function () {
        var Request = $resource(this.endPoint, null, {
            sendCmd: { method: 'POST' }
        });
        
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