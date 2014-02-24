'use strict';

angular.module('quickInitApp')
  .controller('MainCtrl', function TodoCtrl($scope, $location, TrackerStorage) {
  	var tracker = $scope.tracker = TrackerStorage.get();

	$scope.newCharacter = '';
	$scope.editedCharacter = null;
	$scope.movedCharacter = null;

	var debouncedSave = _.debounce(function(){TrackerStorage.put(tracker)}, 500);

	$scope.sortableOptions = {
		update: function(e,ui){
			debouncedSave();
		},
		axis:'y'
	};

	$scope.addCharacter = function(){
		var newCharacter = $scope.newCharacter.trim();
		if(newCharacter.length === 0) {
			return;
		}
		tracker.push({
			name: newCharacter,
			init: 0
		});
		TrackerStorage.put(tracker);

		$scope.newCharacter = '';
	};

	$scope.editCharacter = function(character){
		$scope.editedCharacter = character;
		$scope.originalCharacter = _.clone(character);
	};

	$scope.doneEditing = function (character) {
		$scope.editedCharacter = null;
		character.name = character.name.trim();
		character.init = parseInt(character.init, 10) || 0;

		if (!character.name){
			$scope.removeCharacter(character);
		}

		TrackerStorage.put(tracker);
	};

	$scope.revertEditing = function (character) {
		tracker[tracker.indexOf(char)] = $scope.originalCharacter;
		$scope.doneEditing($scope.originalCharacter);
	}

	$scope.removeCharacter = function (character) {
		tracker = _.without(tracker, character);
		TrackerStorage.put(tracker);
	};
});