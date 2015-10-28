(function() {
  'use strict';

  angular
    .module('instantCompiler')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
