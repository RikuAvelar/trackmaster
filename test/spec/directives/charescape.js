'use strict';

describe('Directive: charEscape', function () {

  // load the directive's module
  beforeEach(module('quickInitApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<char-escape></char-escape>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the charEscape directive');
  }));
});
