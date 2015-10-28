/* global require:false, $:false, Favico:false*/
(function() {
  'use strict';

  angular
    .module('instantCompiler')
    .constant('require', require)
    .constant('Favico', Favico)
    .constant('jQuery', $);

})();
