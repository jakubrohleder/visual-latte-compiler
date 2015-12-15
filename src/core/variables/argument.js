var Element = require('../element.js');
var parseError = require('../error').parseError;

var exports = module.exports = {};

exports.create = create;

Argument.prototype = Object.create(Element.prototype);
Argument.prototype.constructor = Argument;
Argument.prototype.semanticCheck = semanticCheck;

function Argument(opts) {
  var _this = this;

  Element.call(_this, opts);
}

function create(opts) {
  return new Argument(opts);
}

function semanticCheck() {
  var _this = this;

  if (_this.type === 'void') {
    parseError(
      'Void argument ' + _this.ident + ' in function declaration',
       _this.loc,
      _this
    );
  }
}
