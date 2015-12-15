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
      optimize: false,
      compile: false
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
      if (code === undefined || code === '') {
        return;
      }

      localStorage.setItem('code', code);

      auto();
    }

    function auto() {
      if ($scope.options.parse === true) {
        parse();
      }

      if ($scope.data.rootScope === undefined) {
        return;
      }

      if ($scope.options.semantic === true) {
        semantic();
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
        $scope.data.error = error;
        $scope.data.rootScope = undefined;
      }
    }

    function parse() {
      processCode(parseCode);

      function parseCode() {
        $scope.data.rootScope = latte.parse($scope.code);
      }
    }

    function semantic() {
      var obj = $scope.data.rootScope;
      processCode(obj.semanticCheck.bind(obj));
    }

    function optimize() {
      var obj = $scope.data.rootScope;
      processCode(obj.optimize.bind(obj));
    }

    function compile() {
      var obj = $scope.data.rootScope;
      processCode(obj.compile.bind(obj));
    }
  }
})();
