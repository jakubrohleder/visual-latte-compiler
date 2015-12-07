/* global require:false, $:false, Favico:false*/
(function() {
  'use strict';

  angular
    .module('visualLatteCompiler')
    .constant('instant', require('instant'))
    .constant('Favico', Favico)
    .constant('jQuery', $);

})();
