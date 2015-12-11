(function() {
  'use strict';

  angular.module('visualLatteCompiler')
    .directive('codeArea', codeArea);

  function codeArea() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/code-area/code-area.html',
      scope: {
        code: '=',
        error: '='
      },
      controller: controller
    };

    function controller($scope, $timeout) {
      var codeMirror;
      var errorMarker;
      var errorMessage;
      // var theme = localStorage.getItem('nightMode') === true ? 'ambiance' : 'default';

      $scope.bindCodeMirror = bindCodeMirror;
      $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        gutters: ['error'],
        mode: 'text/x-c++src',
        theme: 'ambiance'
      };

      $scope.$watch('error', markError);

      function markError (error) {
        $timeout(function() {
          if(errorMarker !== undefined) {
            errorMarker.clear();
          }

          if(errorMessage !== undefined) {
            errorMessage.clear();
          }

          if(
            error !== undefined &&
            codeMirror !== undefined &&
            $scope.code !== undefined &&
            $scope.code.length > 0
          ) {
            var from = {
              line: error.hash.loc.first_line - 1,
              ch: error.hash.loc.first_column
            };

            var to = {
              line: error.hash.loc.last_line - 1,
              ch: error.hash.loc.last_column
            };

            if(error.hash.parse !== true) {
              from.ch += 1;
              to.ch += 1;
            }

            var doc = codeMirror.getDoc();

            errorMessage = codeMirror.addLineWidget(error.hash.loc.last_line-1, makeMarker(error.message));
            errorMarker = doc.markText(from, to, {className: 'error-text'});
          }
        });
      }

      function bindCodeMirror(cm) {
        codeMirror = cm;

      }

      function makeMarker(message) {
        var marker = angular.element('<div></div>');
        marker.text(message);
        marker.addClass('error-marker');
        return marker[0];
      }

    }
  }

})();
