'use strict';

angular.module('quickInitApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'InitTrackerCtrl'
      })
      .when('/health', {
        templateUrl: 'views/healthtracker.html',
        controller: 'HealthTrackerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
