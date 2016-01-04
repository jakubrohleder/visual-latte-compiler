(function() {
  'use strict';

  angular.module('visualLatteCompiler')
    .directive('debugAreaSection', debugAreaSection);

  function debugAreaSection() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/debug-area/debug-area-section.html',
      scope: {
        data: '=',
        show: '=',
        name: '=',
        string: '='
      },
      controller: controller
    };

    function controller($scope) {
      $scope.editorOptions = {
        lineWrapping: true,
        lineNumbers: false,
        readOnly: true,
        mode: {name: 'gas', architecture: 'x86'},
        tabSize: 2
      };
    }
  }
})();
