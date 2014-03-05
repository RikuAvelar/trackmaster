'use strict';

angular.module('quickInitApp')
  .factory('TrackerStorage', function Storage() {
    return {
      get: function (storageKey) {
        if(!storageKey) {
          return [];
        }
        return JSON.parse(localStorage.getItem(storageKey) || '[]');
      },

      put: function (chars, storageKey) {
        if(!storageKey) {
          return null;
        }
        localStorage.setItem(storageKey, JSON.stringify(chars));
      },

      saveTo: function(storageKey, chars) {
        return this.put(chars, storageKey);
      },

      bind: function (storageKey) {
        return this.saveTo.bind(this, storageKey);
      }
    };
  });
