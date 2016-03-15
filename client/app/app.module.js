'use strict';

// Angular imports
var angular = require('angular');
var routesConfig = require('./app.routes');
require('angular-route');
require('angular-ui-bootstrap');

// Shared modules imports
require('./shared/menu/menu.widget');

// Project modules
require('./components/about/about.controller');

var app = angular.module('app', [
    // Angular Modules
    'ngRoute',
    'ui.bootstrap',

    // Widgets modules
    'app.widget.menu',
    'app.about'
]);

// Routes configuration
app.config(['$locationProvider', '$routeProvider', '$controllerProvider', function ($locationProvider, $routeProvider, $controllerProvider) {
    app.controller = $controllerProvider.register;

    //$routeProvider.otherwise({redirectTo: routesConfig.defaultRoutePath});
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