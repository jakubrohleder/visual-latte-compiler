var CodeBlock = require('latte/code/code-block');
var Element = require('./element');

var exports = module.exports = {};

exports.create = create;

Value.prototype = Object.create(Element.prototype);
Value.prototype.constructor = Value;
Value.prototype.toString = toString;
Value.prototype.free = free;
Value.prototype.addReference = addReference;
Value.prototype.removeReference = removeReference;

function Value(opts) {
  var _this = this;

  Element.call(_this, opts);

  _this.pointer = _this.type.pointer;
  _this.references = _this.references || [];
}

function create(opts) {
  return new Value(opts);
}

function toString() {
  return this.ident;
}

function free(state) {
  var _this = this;
  var _free = 'free';
  if (state.os === 'darwin') {
    _free = '_' + _free;
  }

  if (!_this.pointer || _this.references.length > 0) {
    return undefined;
  }

  return CodeBlock.create(undefined, 'Freeing value ' + _this.expr + ' under register ' + _this.register)
    .add('movq ' + _this.register + ', %rdi')
    .add('call ' + _free)
  ;
}


function addReference(variable) {
  var _this = this;

  _this.references.push(variable);
}

function removeReference(variable, state) {
  var _this = this;

  _this.references.splice(_this.references.indexOf(variable), 1);
  _this.register = variable.address;

  return _this.free(state);
}
