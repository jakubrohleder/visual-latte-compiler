var FunctionDecl = require('./functions/function-decl');
var FunctionMain = require('./functions/function-main');

module.exports = new function() {
  var _this = this;

  _this.create = create.bind(_this);
};

function create(opts) {
  if (opts.ident === 'main') {
    return FunctionMain.create(opts);
  }

  return new FunctionDecl(opts);
}
