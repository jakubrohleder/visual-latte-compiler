(function() {
  'use strict';
  /* global $:false*/

  var app = angular.module('visualLatteCompiler');
  // console.log($.site.settings.modules);
  $.each($.site.settings.modules, function(index, module) {
    var fn = $.fn[module];
    var name = 'ui' + module.charAt(0).toUpperCase() + module.substring(1);

    /** @ngInject */
    app.directive(name, ['$timeout', '_', '$rootScope', function($timeout, _, $rootScope) {
      return {
        restrict: 'A',
        seModule: {
          name: module,
          fn: fn
        },
        scope: {
          options: '&',
          arguments: '=',
          ngModel: '='
        },
        link: function(scope, iElement) {
          if (!scope.options) {
            scope.options = {};
          }

          scope.options.directive = scope;

          if (name === 'uiCheckbox') {
            scope.options.onChecked = function() {
              $timeout(function() {
                scope.ngModel = true;
              });
            };

            scope.options.onUnchecked = function() {
              $timeout(function() {
                scope.ngModel = false;
              });
            };
          } else {
            scope.options.onChange = function(value) {
              $timeout(function() {
                scope.ngModel = value;
              });
            };
          }

          $timeout(function() {
            var element = iElement[module](_.clone(scope.options));
            if (scope.arguments !== undefined) {
              iElement[module].apply(element, scope.arguments);
            }
          }, 300);

          var handler = $rootScope.$on('semantic-ui:reload', function() {
            $timeout(function() {
              var element = iElement[module](_.clone(scope.options));
              if (scope.arguments !== undefined) {
                iElement[module].apply(element, scope.arguments);
              }
            }, 300);
          });

          $rootScope.$on('$destroy', clear);

          function clear() {
            handler();
          }
        }
      };
    }]);
  });
})();
