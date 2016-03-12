'use strict';

// Declare app level module which depends on views, and components.
var app = angular.module('robotFhacktory', [
    'ngRoute',
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'robotFhacktory.component.command'
]);

app.run(Startup)
   .config(Router);

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

app.controller('robotFhacktoryHomeCtrl', RobotFhacktoryHomeCtrl);

function RobotFhacktoryHomeCtrl () {
    this.teams = [
        {
            id: 1,
            label: 'Rouge',
            url: 'http://localhost:8990/move'
        },
        {
            id: 2,
            label: 'Bleue',
            url: 'http://localhost:8990/move'
        }
    ]

    this.team = this.teams[0];
}