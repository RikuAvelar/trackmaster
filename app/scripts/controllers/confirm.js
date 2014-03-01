'use strict';

angular.module('quickInitApp')
  .controller('ConfirmCtrl', function ($scope, $modalInstance) {
    $scope.ok = function(){
      $modalInstance.close(true);
    };
    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    };
  });
