(function() {
  'use strict';

  angular
    .module('visualLatteCompiler')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
