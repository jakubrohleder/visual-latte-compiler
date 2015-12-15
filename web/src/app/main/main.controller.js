(function() {
  'use strict';

  angular
    .module('visualLatteCompiler')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, latte, $timeout) {
    $scope.parse = parse;
    $scope.showCodeArea = true;
    $scope.samples = latte.samples;
    $scope.code = localStorage.getItem('code');
    $scope.options = JSON.parse(localStorage.getItem('options')) || {
      debounce: 500,
      compile: false,
      semanticCheck: true
    };

    $scope.data = {};
    $scope.$on('code', setCode);
    $scope.$watch('code', watchCode);
    $scope.$watchCollection('options', watchOptions, true);

    function setCode(event, code) {
      $scope.code = code;
    }

    function watchCode(code) {
      if (code !== undefined) {
        localStorage.setItem('code', code);
        if($scope.options.semanticCheck) {
          $scope.data = parse(code);
        } else {
          $scope.data.error = undefined;
        }
      }
    }

    function watchOptions(options) {
      options.compile = options.compile && options.semanticCheck;
      localStorage.setItem('options', JSON.stringify(options));
      if (options.semanticCheck === true) {
        $scope.data = parse($scope.code);
      } else {
        $scope.data.error = undefined;
      }
    }

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
        if(error.hash === undefined) {
          console.error(error);
        }
      } finally {
        data.code = code;
      }
      return data;
    }
  }
})();
