'use strict';

angular.module('quickInitApp')
  .controller('HealthTrackerCtrl', function ($scope, TrackerStorage, $modal, $http) {
    TrackerStorage.set('health-tracker');
    $scope.currentCharacter = {};
    $scope.errors = {};
    $scope.characters = TrackerStorage.get();
    $scope.location = '/health';
    $scope.Math = window.Math;
    $scope.spriteList = {};

    var saveStorage = function(){
      return TrackerStorage.put($scope.characters);
    };

    var filterInt = function (value) {
      if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
        return Number(value);
      return NaN;
    }

    $http.get('scripts/sprites.json').then(function(spriteList){
      $scope.spriteList = _.map(_.keys(spriteList.data), function(spriteName){
        return 'sprite-' + spriteName;
      });
    });

    $scope.addCharacter = function(){
      var character = _.clone($scope.currentCharacter);

      $scope.errors = {};

      if (!$scope.currentCharacter.name) {
        $scope.errors.nameError = true;
      }

      if (!$scope.currentCharacter.maxHealth) {
        $scope.errors.hpError = true;
      }

      if (!_.isEmpty($scope.errors)) {
        return;
      }

      character.position = {top:0, left:0};


      // Find an unused position
      var samePosition = function(char){
        var tempPosition = _.mapValues(character.position, function(pos){ return pos + 'px'; });
        return tempPosition.left === char.position.left && tempPosition.top === char.position.top;
      };
      while(_.some($scope.characters, samePosition)) {
        if (character.position.left + 100 >= 700) {
          character.position.top += 150;
        }
        character.position.left = (character.position.left + 100) % 700;
      }

      character.sprite = $scope.currentCharacter.sprite || 'sprite-brachy';
      character.damage = 0;
      character.position = _.mapValues(character.position, function(pos){ return pos + 'px'; });
      character.id = _.uniqueId();

      while(_.some($scope.characters, {id: character.id})) {
        character.id = _.uniqueId();
      }

      // Pressing enter will instantly become an edit command
      $scope.currentCharacter = _.clone(character);
      $scope.characters.push(character);
      saveStorage();
    };

    $scope.clearCharForm = function(){
      $scope.currentCharacter = {};
    };

    $scope.deleteCharacter = function(character){
      if (character) {
        $scope.currentCharacter = _.clone(character);
      }
      var modalInstance = $modal.open({
        templateUrl: 'views/modalconfirmation.html',
        controller: 'ConfirmCtrl'
      });

      modalInstance.result.then(function(confirmed){
        if(confirmed){
          $scope.characters = _.reject($scope.characters, {id: $scope.currentCharacter.id});
          $scope.currentCharacter = {};
          saveStorage();
        }
      });
    };

    $scope.clearAll = function(){
      var modalInstance = $modal.open({
        templateUrl: 'views/modalconfirmation.html',
        controller: 'ConfirmCtrl'
      });

      modalInstance.result.then(function(confirmed){
        if(confirmed){
          $scope.characters = [];
          $scope.currentCharacter = {};
          saveStorage();
        }
      });
    };

    $scope.selectSprite = function(){
      if(!_.isEmpty($scope.spriteList)) {
        var modalInstance = $modal.open({
          templateUrl: 'views/spriteselector.html',
          controller: 'SpriteselectorCtrl',
          resolve: {
            spriteList: function(){
              return $scope.spriteList;
            },
            selectedSprite: function() {
              return ($scope.currentCharacter.sprite || '');
            }
          }
        });

        modalInstance.result.then(function(sprite){
          $scope.currentCharacter.sprite = sprite;
        });
      }
    };

    $scope.spriteSelectorClass = function(){
      if(!$scope.currentCharacter.sprite) {
        return ['label label-default'];
      } else {
        return $scope.currentCharacter.sprite;
      }
    };

    $scope.clearForm = function(){
      $scope.currentCharacter = {};
    };

    $scope.addOrSaveCharacter = function(){
      if ($scope.currentCharacter.id) {
        var linkedChar = _.find($scope.characters, {id: $scope.currentCharacter.id});
        _.extend(linkedChar, $scope.currentCharacter);
        saveStorage();
      } else {
        $scope.addCharacter();
      }
    };

    $scope.editCharacter = function(character){
      $scope.currentCharacter = _.clone(character);
    };

    $scope.addDamage = function(character){
      var damage = filterInt(character.damageInPanel);
      if(_.isFinite(damage)) {
        character.damage += damage;
      }
      character.damageInPanel = '';
      saveStorage();
    };

    $scope.updatePos = function(character, position) {
      position = _.extend({left: 0, top: 0}, position);
      character.position = position;
      saveStorage();
    };

    $scope.sendToTop = function(id){
      angular.element('.sprite-grid .sprite').css('z-index', '');
      angular.element(id).css('z-index', '1');
    };
  });
