(function() {
  'use strict';

  angular
    .module('visualLatteCompiler')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, latte) {
    $scope.parse = parse;
    $scope.code = localStorage.getItem('code');

    $scope.data = {};
    $scope.$watch('code', function (code) {
      if (code !== undefined) {
        localStorage.setItem('code', code);
        $scope.data = parse(code);
      }
    })

    function parse(code) {
      var data = {};
      try {
        data.tree = latte.parse(code);
        data.error = undefined;
      } catch (error) {
        data.error = error;
        data.tree = undefined;
        data.llvm = undefined;
        data.jvm = undefined;
        // if(error.hash === undefined) {
          console.error(error);
        // }
      } finally {
        data.code = code;
      }

      return data;
    }
  }
})();
