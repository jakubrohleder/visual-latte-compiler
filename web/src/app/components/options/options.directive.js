(function() {
  'use strict';

  angular.module('visualLatteCompiler')
    .directive('options', options);

  function options() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/options/options.html',
      controller: controller
    };

    function controller($scope) {
      $scope.$watchCollection('options', watchOptions, true);

      function watchOptions(options) {
        options.semantic = options.semantic && options.parse;
        options.compile = options.compile && options.semantic;
        options.compile = options.compile && options.semantic;

        localStorage.setItem('options', JSON.stringify(options));

        $scope.auto();
      }
    }
  }
})();
