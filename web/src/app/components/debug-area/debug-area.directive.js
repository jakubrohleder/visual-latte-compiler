(function() {
  'use strict';

  angular.module('visualLatteCompiler')
    .directive('debugArea', debugArea);

  function debugArea() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/debug-area/debug-area.html',
      scope: {
        data: '='
      },
      controller: controller
    };

    function controller($scope) {
      $scope.$watch('data.code', function (code) {
        if(code !== undefined) {
          $scope.code = code.match(/[^\r\n]+/g);
        }
      });

      $scope.showDebug = true;
    }
  }

})();
