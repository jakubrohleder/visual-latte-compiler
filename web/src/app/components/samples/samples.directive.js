(function() {
  'use strict';

  angular.module('visualLatteCompiler')
    .directive('samples', samples);

  function samples(latte) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/samples/samples.html',
      scope: {},
      controller: controller
    };

    function controller($scope) {
      $scope.samples = latte.samples;
      $scope.checked = angular.fromJson(localStorage.getItem('checkedSamples')) || {};

      $scope.$watchCollection('checked', function(checked) {
        if (checked !== undefined) {
          localStorage.setItem(
            'checkedSamples',
            angular.toJson(checked)
          );
        }
      });
    }
  }
})();
