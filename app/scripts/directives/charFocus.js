'use strict';

angular.module('quickInitApp')
  .directive('charFocus', ['$timeout', function ($timeout) {
    return function (scope, elem, attrs) {
      scope.$watch(attrs.todoFocus, function (newVal) {
        if (newVal) {
          $timeout(function () {
            elem[0].focus();
          }, 0, false);
        }
      });
    };
  }]);
