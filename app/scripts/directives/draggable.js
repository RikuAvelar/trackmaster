'use strict';
var uniqueId = 0;

angular.module('quickInitApp')
  .directive('draggable', function ($document) {
    return {
      scope: {
        draggableCallback: '&'
      },
      link: function(scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0, moved = false;
        var position = (element.css('position') || '').match(/relative|absolute/) || ['relative'];
        var camelize = function(str){
          return str.replace(/[-_\s\.#]+(.)?/g, function(match, c){ return c.toUpperCase(); });
        };
        var namespaceId;

        if (attr.draggableTarget) {
          namespaceId = camelize(attr.draggableTarget);
        } else if(element.prop('id')) {
          namespaceId = camelize(element.prop('id'));
        } else {
          namespaceId = 'draggableElement' + uniqueId;
          uniqueId += 1;
        }

        position = position[0];

        if(!attr.draggableTarget) {
          element.css({
            position: position
          }).addClass('draggable');
        }

        element.on('mousedown', function(event) {
          // Prevent default dragging of selected content
          var target = attr.draggableTarget ? angular.element(attr.draggableTarget) : element;

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
          $document.on('mousemove.draggable.' + namespaceId, mousemove);
          $document.on('mouseup.draggable.' + namespaceId, mouseup);
        });

        function mousemove(event) {
          var target = attr.draggableTarget ? angular.element(attr.draggableTarget) : element;
          y = event.pageY - startY;
          x = event.pageX - startX;
          target.css({
            top: y + 'px',
            left:  x + 'px'
          });
        }

        function mouseup() {
          var target = attr.draggableTarget ? angular.element(attr.draggableTarget) : element;
          var locals = {position: {top: target.css('top'), left: target.css('left')}};

          target.removeClass('dragging');
          scope.draggableCallback(locals);

          $document.off('mousemove.' + namespaceId, mousemove);
          $document.off('mouseup.' + namespaceId, mouseup);
        }
      }
    };
  });
