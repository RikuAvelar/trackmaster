'use strict';

angular.module('quickInitApp')
  .controller('SpriteselectorCtrl', function ($scope, $modalInstance, spriteList, selectedSprite) {
    $scope.spriteList = spriteList;
    $scope.options = {selectedSprite: selectedSprite};

    $scope.select = function(){
      $modalInstance.close($scope.options.selectedSprite);
    };

    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    };
  });
