'use strict';

// Angular imports
var angular = require('angular');
require('angular-route');
require('angular-ui-bootstrap');

// Shared modules imports
require('./shared/menu/menu.widget');

var app = angular.module('app', [
    // Angular Modules
    'ngRoute',
    'ui.bootstrap',

    // Widgets modules
    'app.widget.menu'
]);