'use strict';

describe('Controller: SpriteselectorCtrl', function () {

  // load the controller's module
  beforeEach(module('quickInitApp'));

  var SpriteselectorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpriteselectorCtrl = $controller('SpriteselectorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
