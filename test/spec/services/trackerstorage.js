'use strict';

describe('Service: TrackerStorage', function () {

  // load the service's module
  beforeEach(module('quickInitApp'));

  // instantiate service
  var TrackerStorage;
  beforeEach(inject(function (_TrackerStorage_) {
    TrackerStorage = _TrackerStorage_;
  }));

  it('should do something', function () {
    expect(!!TrackerStorage).toBe(true);
  });

});
