'use strict';

describe('Controller: HealthTrackerCtrl', function () {

  // load the controller's module
  beforeEach(module('quickInitApp'));

  var HealthTrackerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HealthTrackerCtrl = $controller('HealthTrackerCtrl', {
      $scope: scope
    });
  }));
});
