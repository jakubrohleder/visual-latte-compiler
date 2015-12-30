var _Function = require('./functions/function');
var FunctionMain = require('./functions/function-main');

module.exports = new function() {
  var _this = this;

  _this.create = create.bind(_this);
};

function create(opts) {
  if (opts.ident === 'main' && opts.scope.root === true) {
    return FunctionMain.create(opts);
  }

  return new _Function(opts);
}
