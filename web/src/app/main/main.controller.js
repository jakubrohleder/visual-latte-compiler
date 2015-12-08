(function() {
  'use strict';

  angular
    .module('visualLatteCompiler')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, latte) {
    $scope.parse = parse;
    $scope.code = "\n\
    int main () {\n\
      printInt(fact(7)) ;\n\
      printInt(factr(7)) ;\n\
      return 0 ;\n\
    }\n\
\n\
    int fact (int n) {\n\
      int i,r ;\n\
      i = 1 ;\n\
      r = 1 ;\n\
      while (i < n+1) {\n\
        r = r * i ;\n\
        i++ ;\n\
      }\n\
      return r ;\n\
    }\n\
\n\
    int factr (int n) {\n\
      if (n < 2)\n\
        return 1 ;\n\
      else\n\
        return (n * factr(n-1)) ;\n\
    }";
    $scope.data = {};
    $scope.$watch('code', function (code) {
      $scope.data = parse(code);
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
