/* global require:false, $:false, Favico:false, _:false*/
(function() {
  'use strict';

  angular
    .module('visualLatteCompiler')
    .constant('latte', require('latte'))
    .constant('Favico', Favico)
    .constant('_', _)
    .constant('jQuery', $);
})();
