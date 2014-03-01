'use strict';

angular.module('quickInitApp')
  .factory('TrackerStorage', function Storage() {
    var STORAGE_ID;
    return {
      get: function (storageKey) {
        var storageId = storageKey || STORAGE_ID;
        if(!storageId) {
          return [];
        }
        return JSON.parse(localStorage.getItem(storageId) || '[]');
      },

      put: function (chars, storageKey) {
        var storageId = storageKey || STORAGE_ID;
        if(!storageId) {
          return null;
        }
        localStorage.setItem(storageId, JSON.stringify(chars));
      },

      set: function (storageKey) {
        STORAGE_ID = storageKey;
      }
    };
  });
