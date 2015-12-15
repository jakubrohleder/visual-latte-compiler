(function() {
  'use strict';

  angular
    .module('visualLatteCompiler')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, Favico, $interval) {
    var favicon = new Favico({
      animation: 'slide',
      position: 'up'
    });
    var up = new Image();
    up.src = 'assets/images/mario-up.gif';

    var down = new Image();
    down.src = 'assets/images/mario-down.gif';

    var isDown = true;

    $interval(changeIcon, 10);

    $log.debug('runBlock end');

    function changeIcon() {
      isDown = !isDown;
      if (isDown) {
        favicon.image(down);
      } else {
        favicon.image(up);
      }
    }
  }
})();
