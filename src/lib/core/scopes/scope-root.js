var Scope = require('./scope').constr;
var FunctionError = require('../functions/function-error');
var FunctionPrintInt = require('../functions/function-printInt');
var FunctionPrintString = require('../functions/function-printString');
var FunctionReadInt = require('../functions/function-readInt');
var FunctionReadString = require('../functions/function-readString');

var TypeInt = require('../types/type-int');
var TypeString = require('../types/type-string');
var TypeVoid = require('../types/type-void');
var TypeBoolean = require('../types/type-boolean');

var CodeBlock = require('latte/code/code-block');

var exports = module.exports = {};

exports.create = create;

RootScope.prototype = Object.create(Scope.prototype);
RootScope.prototype.constructor = RootScope;
RootScope.prototype.optimize = optimize;
RootScope.prototype.compile = compile;

function RootScope(opts) {
  var _this = this;

  Scope.call(_this, opts);

  _this.addType(TypeInt);
  _this.addType(TypeString);
  _this.addType(TypeVoid);
  _this.addType(TypeBoolean);

  _this.addFunction(FunctionError);
  _this.addFunction(FunctionPrintInt);
  _this.addFunction(FunctionPrintString);
  _this.addFunction(FunctionReadInt);
  _this.addFunction(FunctionReadString);

  _this.root = true;
}

function create(opts) {
  return new RootScope(opts);
}

function optimize() {
  var _this = this;

  Scope.prototype.optimize.call(_this);
}

function compile(state) {
  var _this = this;
  var stringSection;

  if (state.os === 'darwin') {
    stringSection = '.cstring\n';
  } else {
    stringSection = '.section .rodata\n';
  }

  return CodeBlock.create(_this)
    .add(stringSection)
    .add(CodeBlock.create(undefined, 'Format strings', true)
      .add('PRINT_INT_FORMAT:', undefined, -1)
      .add('.ascii "%ld\\12\\0"')
      .add('READ_INT_FORMAT:', undefined, -1)
      .add('.ascii "%ld\\0"')
      .add('NEW_LINE_FORMAT:', undefined, -1)
      .add('.ascii "\\12\\0"')
      .add('ERROR_STRING:', undefined, -1)
      .add('.ascii "runtime error\\0"')
    )
    .add('\n.text\n')
    .add(Scope.prototype.compile.call(_this, state));
}
