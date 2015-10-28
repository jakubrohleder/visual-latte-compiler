(function() {
  'use strict';

  angular
    .module('instantCompiler')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, require) {
    var instant = require('instant');
    $scope.parse = parse;
    $scope.code = '1+1+a;\n2+2;';
    $scope.data = {};
    $scope.$watch('code', function (code) {
      $scope.data = parse(code);
    })

    function parse(code) {
      var data = {};
      try {
        data.tree = instant.parse(code);
        data.error = undefined;
      } catch (error) {
        data.error = error;
        data.tree = undefined;
      } finally {
        data.code = code;
      }

      return data;
    }
  }
})();
