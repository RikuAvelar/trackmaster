'use strict';

describe('Directive: charFocus', function () {

  // load the directive's module
  beforeEach(module('quickInitApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<char-focus></char-focus>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the charFocus directive');
  }));
});
