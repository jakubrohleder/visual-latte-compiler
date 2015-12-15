(function() {
  'use strict';

  angular.module('visualLatteCompiler')
    .directive('sample', sample);

  function sample(RecursionHelper) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/samples/sample.html',
      replace: true,
      scope: {
        content: '=',
        name: '=',
        path: '=',
        checked: '='
      },
      compile: RecursionHelper.compile,
      controller: controller
    };
  }

  function controller($scope) {
    $scope.folder = angular.isObject($scope.content);

    if($scope.folder) {
      $scope.size = Object.keys($scope.content).length;
    } else {
      $scope.firstLine = $scope.content.split("\n")[0];
    }

    $scope.show = show;
    $scope.getPath = getPath;
    $scope.checkSort = checkSort;

    function show() {
      if($scope.folder) {
        $scope.checked[$scope.path] = !$scope.checked[$scope.path];
      } else {
        $scope.$emit('code', $scope.content);
      }
    }

    function getPath(key) {
      return $scope.path + '/' + key;
    }

    function checkSort(value, key) {
      console.log(key, value);
      return value;
    }
  }

})();
