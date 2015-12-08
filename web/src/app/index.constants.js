/* global require:false, $:false, Favico:false*/
(function() {
  'use strict';

  angular
    .module('visualLatteCompiler')
    .constant('latte', require('latte'))
    .constant('Favico', Favico)
    .constant('jQuery', $);
})();
