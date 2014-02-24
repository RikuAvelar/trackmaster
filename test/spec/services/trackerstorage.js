'use strict';

describe('Service: Trackerstorage', function () {

  // load the service's module
  beforeEach(module('quickInitApp'));

  // instantiate service
  var Trackerstorage;
  beforeEach(inject(function (_Trackerstorage_) {
    Trackerstorage = _Trackerstorage_;
  }));

  it('should do something', function () {
    expect(!!Trackerstorage).toBe(true);
  });

});
