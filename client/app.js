'use strict';

// Declare app level module which depends on views, and components.
var app = angular.module('robotFhacktory', [
    'ngRoute',
    'ngAnimate',
    'ui.router'
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
            templateUrl: 'views/home/home.html'
        })
        .state('notFound', {
            url: '/not-found',
            templateUrl: 'views/errors/404.html'
        });
}