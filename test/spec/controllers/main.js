'use strict';

describe('Controller: InitTrackerCtrl', function () {

  // load the controller's module
  beforeEach(module('quickInitApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('InitTrackerCtrl', {
      $scope: scope
    });
  }));
});
