var Element = require('./element.js');
var _ = require('lodash');
var parseError = require('./error').parseError;

var exports = module.exports = {};

exports.create = create;
exports.constructor = Function;

Function.prototype = Object.create(Element.prototype);
Function.prototype.constructor = Function;
Function.prototype.semanticCheck = semanticCheck;

function Function(opts) {
  var _this = this;

  Element.call(_this, opts);

  _this.main = _this.ident === 'main';
}

function create(opts) {
  return new Function(opts);
}

function semanticCheck() {
  var _this = this;

  if (_this.main === true && _this.args.length > 0) {
    parseError(
      'Main function cannot have arguments',
      _this.loc[_this.loc.length - 2],
      _this
    );
  } else {
    _.forEach(_this.args, function(arg) {
      arg.semanticCheck();
    });
  }


  _this.scope.semanticCheck();
}
