(function() {
  'use strict';

  angular
    .module('instantCompiler')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
