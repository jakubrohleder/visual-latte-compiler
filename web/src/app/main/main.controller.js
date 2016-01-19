(function() {
  'use strict';

  angular
    .module('visualLatteCompiler')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, latte) {
    $scope.samples = latte.samples;
    $scope.code = localStorage.getItem('code');

    $scope.options = angular.fromJson(localStorage.getItem('options')) || {
      debounce: 500,
      parse: true,
      semantic: true,
      optimize: true,
      compile: true
    };

    $scope.data = {};

    $scope.parse = parse;
    $scope.semantic = semantic;
    $scope.optimize = optimize;
    $scope.compile = compile;
    $scope.auto = auto;

    $scope.$on('code', setCode);
    $scope.$watch('code', watchCode);

    function setCode(event, code) {
      $scope.code = code;
    }

    function watchCode(code) {
      localStorage.setItem('code', code);

      auto();
    }

    function auto() {
      if ($scope.options.parse === true) {
        parse();
      }

      if ($scope.data.tree === undefined) {
        return;
      }

      if ($scope.options.semantic === true) {
        semantic();
      }

      if ($scope.data.state === undefined) {
        return;
      }

      if ($scope.options.optimize === true) {
        optimize();
      }

      if ($scope.options.compile === true) {
        compile();
      }
    }

    function processCode(fun, args) {
      args = args || [];

      try {
        fun();
        $scope.data.error = undefined;
      } catch (error) {
        // console.error(error);
        $scope.data.error = error;
        // $scope.data.tree = undefined;
        // $scope.data.rootScope = undefined;
        throw error;
      }
    }

    function parse() {
      processCode(parseCode);

      function parseCode() {
        $scope.data.tree = latte.parse($scope.code);
      }
    }

    function semantic() {
      processCode(semanticCheck);

      function semanticCheck() {
        $scope.data.state = latte.semanticCheck($scope.data.tree);
      }
    }

    function optimize() {
      processCode(optimizeCode);

      function optimizeCode() {
        $scope.data.optimized = latte.optimize($scope.data.state);
      }
    }

    function compile() {
      processCode(compileCode);

      function compileCode() {
        $scope.data.compiled = latte.compile($scope.data.optimized);
      }
    }
  }
})();
