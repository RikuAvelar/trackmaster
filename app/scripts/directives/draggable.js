'use strict';

angular.module('quickInitApp')
  .directive('draggable', function ($document) {
    return {
      scope: {
        draggableCallback: '&'
      },
      link: function(scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0, moved = false;
        var targetName = attr.draggableTarget;
        var position = (element.css('position') || '').match(/relative|absolute/) || ['relative'];

        position = position[0];

        if(!targetName) {
          element.css({
            position: position
          }).addClass('draggable');
        }

        element.on('mousedown', function(event) {
          // Prevent default dragging of selected content
          var target = targetName ? angular.element(targetName) : element;

          // Handle the first click's position
          if (!moved) {
            if(target.css('left')) {
              x = target.position().left;
            }
            if(target.css('top')) {
              y = target.position().top;
            }
          }

          moved = true;

          target.addClass('dragging');
          event.preventDefault();
          startX = event.pageX - x;
          startY = event.pageY - y;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
          var target = targetName ? angular.element(targetName) : element;
          y = event.pageY - startY;
          x = event.pageX - startX;
          target.css({
            top: y + 'px',
            left:  x + 'px'
          });
        }

        function mouseup() {
          var target = targetName ? angular.element(targetName) : element;
          var locals = {position: {top: target.css('top'), left: target.css('left')}};

          target.removeClass('dragging');
          scope.draggableCallback(locals);

          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
        }
      }
    };
  });
