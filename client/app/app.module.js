'use strict';

// Angular imports
var angular = require('angular');
var routesConfig = require('./app.routes');
require('angular-route');
require('angular-ui-bootstrap');

// Shared modules imports
require('./shared/menu/menu.widget');
require('./shared/currency/currency.directive');
require('./shared/currency/currency.service');

// Project modules imports
require('./components/about/about.controller');

// Third party imports
require('angular-input-masks');
require('angularytics');

var app = angular.module('app', [
    // Angular modules
    'ngRoute',
    'ui.bootstrap',

    // Widgets modules
    'app.widget.menu',
    'app.currency',

    //App modules
    'app.about',

    //Third party modules
    'ui.utils.masks',
    'angularytics'
]);

// Routes configuration
app.config(['$locationProvider', '$routeProvider', '$controllerProvider', function ($locationProvider, $routeProvider, $controllerProvider) {
    app.controller = $controllerProvider.register;

    $routeProvider.otherwise({redirectTo: routesConfig.defaultRoutePath});
    $locationProvider.html5Mode(true);

    angular.forEach(routesConfig.routes, function (route) {
        $routeProvider.when(route.url,
            {
                url: route.url,
                templateUrl: route.templateUrl,
                title: route.title
            }
        );
    });
}]);

// Angularytics configuration
app.config(['AngularyticsProvider', function (AngularyticsProvider) {
    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
}]).run(['Angularytics', function (Angularytics) {
    Angularytics.init();
}]);