'use strict';

angular.module('quickInitApp')
  .controller('InitTrackerCtrl', function TodoCtrl($scope, $location, TrackerStorage) {
    TrackerStorage.set('tracker-storage');
    $scope.tracker = TrackerStorage.get();
    $scope.newCharacter = '';
    $scope.editedCharacter = null;
    $scope.movedCharacter = null;
    $scope.location = '/';

    function reorderTracker(){
      $scope.tracker = _.sortBy($scope.tracker, function(character){
        return 100 - character.init;
      });
    }

    $scope.addCharacter = function(){
      var newCharacter = $scope.newCharacter.trim();
      if(newCharacter.length === 0) {
        return;
      }

      $scope.tracker.push({
        name: newCharacter,
        init: 0
      });

      reorderTracker();

      TrackerStorage.put($scope.tracker);

      $scope.newCharacter = '';
    };

    $scope.editCharacter = function(character){
      $scope.editedCharacter = character;
      $scope.originalCharacter = _.clone(character);
    };

    $scope.doneEditing = function (character) {
      $scope.editedCharacter = null;
      character.name = character.name.trim();
      character.init = parseFloat(character.init, 10) || 0;

      if (!character.name){
        $scope.removeCharacter(character);
      }

      reorderTracker();

      TrackerStorage.put($scope.tracker);
    };

    $scope.revertEditing = function (character) {
      $scope.tracker[$scope.tracker.indexOf(character)] = $scope.originalCharacter;
      $scope.doneEditing($scope.originalCharacter);
    };

    $scope.removeCharacter = function (character) {
      $scope.tracker = _.without($scope.tracker, character);
      TrackerStorage.put($scope.tracker);
    };

    $scope.moveCharacterDown = function (character) {
      character.init = $scope.tracker[$scope.tracker.indexOf(character) + 1].init - 0.5;
      reorderTracker();
      TrackerStorage.put($scope.tracker);
    };

    $scope.moveCharacterUp = function (character) {
      character.init = $scope.tracker[$scope.tracker.indexOf(character) - 1].init + 0.5;
      reorderTracker();
      TrackerStorage.put($scope.tracker);
    };
  });
