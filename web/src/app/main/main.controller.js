(function() {
  'use strict';

  angular
    .module('visualLatteCompiler')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, instant) {
    $scope.parse = parse;
    $scope.code = 'a = 1-2*3;';
    $scope.code += '\nb = 2*a;';
    $scope.code += '\nb';
    $scope.data = {};
    $scope.$watch('code', function (code) {
      $scope.data = parse(code);
    })

    function parse(code) {
      var data = {};
      try {
        data.tree = instant.parse(code);
        data.jvm = instant.compileJVM(data.tree, 'Test');
        data.llvm = instant.compileLLVM(data.tree, 'Test');
        data.error = undefined;
      } catch (error) {
        data.error = error;
        data.tree = undefined;
        data.llvm = undefined;
        data.jvm = undefined;
        if(error.hash === undefined) {
          throw error;
        }
      } finally {
        data.code = code;
      }

      return data;
    }
  }
})();
