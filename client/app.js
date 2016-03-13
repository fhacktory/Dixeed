'use strict';

// Declare app level module which depends on views, and components.
var app = angular.module('robotFhacktory', [
    'ngRoute',
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'cfp.hotkeys',
    'robotFhacktory.component.command'
]);

app.run(Startup)
   .config(Router);

app.controller('robotFhacktoryHomeCtrl', RobotFhacktoryHomeCtrl);
app.controller('robotFhacktoryChgTeamCtrl', RobotFhacktoryChgTeamCtrl);

RobotFhacktoryHomeCtrl.$inject = [ '$uibModal', '$timeout' ];
RobotFhacktoryChgTeamCtrl.$inject = [ '$scope', '$uibModalInstance', 'teams' ];

Startup.$inject = [ '$rootScope', '$state', '$stateParams' ];
Router.$inject = [ '$stateProvider', '$urlRouterProvider' ];

function Startup($rootScope, $state, $stateParams) {
    // Set the $state and $stateParams to be globally accessible on the application.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}

function Router($stateProvider, $urlRouterProvider) {
    // Redirect on a 'not found' page when no urls are matched.
    $urlRouterProvider.otherwise('/not-found');

    // Base states already defined.
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home/home.html',
            controllerAs: '$homeCtrl',
            scope: {
                team: '='
            },
            bindToController: true,
            controller: 'robotFhacktoryHomeCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about/about.html'
        })
        .state('notFound', {
            url: '/not-found',
            templateUrl: 'views/errors/404.html'
        });
}

function RobotFhacktoryHomeCtrl ($uibModal, $timeout) {
    this.teams = [
        {
            id: 1,
            label: 'Rouge',
            customClass: 'cmd-red',
            desc: 'Le mode de décision est anarchique. Une des commandes demandées sera tirée au hasard.'
        },
        {
            id: 2,
            label: 'Bleue',
            customClass: 'cmd-blue',
            desc: 'Le mode de décision est démocratique. C\'est la commande avec le plus de "voix" qui est sélectionnée.'
        }
    ]

    this.team = this.teams[0];
    this.selectedCommand = '';

    var controller = this;

    this.openModal = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/modals/change-team-modal.html',
            controller: 'robotFhacktoryChgTeamCtrl',
            resolve: {
                teams: function() {
                    return controller.teams;
                }
            }
        });

        modalInstance.result.then(function (selectedTeam) {
            controller.team = selectedTeam;
        });
    };

    var socket = io.connect('http://192.168.1.136:8990');

    socket.on('command_response', function (data) {
        controller.selectedCommand = data;

        // $timeout(function () {
        //     controller.selectedCommand = '';
        // }, 1500);
    });

    this.displayCmdClass = function () {
        if (this.selectedCommand === '') {
            return '';
        }

        switch (this.selectedCommand) {
            case 'up':
            case 'down':
            case 'left':
            case 'right':
                return 'glyphicon-arrow-' + this.selectedCommand;
            case 'arm':
                return 'glyphicon-stop'
        }

        return '';
    };
}

function RobotFhacktoryChgTeamCtrl($scope, $uibModalInstance, teams) {
    $scope.teams = teams;

    $scope.selected = {
        item: $scope.teams[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}
