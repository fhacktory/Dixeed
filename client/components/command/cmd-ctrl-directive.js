'use strict';

var component = angular.module('robotFhacktory.component.command');

component.directive('robotFhacktoryCmd', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/command/cmd.html',
        controller: 'robotFhacktoryCmdCtrl',
        scope: {},
        controllerAs: '$ctrl',
        bindToController: {
            endPoint: '=',
            action: '@'
        }
    };
});