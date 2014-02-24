'use strict';

angular.module('quickInitApp')
  .factory('TrackerStorage', function Trackerstorage() {
    var STORAGE_ID = 'quick-init-tracker-store';

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		put: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
});