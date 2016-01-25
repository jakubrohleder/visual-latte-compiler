var parseError = require('latte/error').parseError;
var Element = require('../element');
var Null = require('latte/core/null');
var CodeBlock = require('latte/code/code-block');

var _ = require('lodash');

module.exports = {
  constr: Type,
  create: create
};

Type.prototype = Object.create(Element.prototype);
Type.prototype.constructor = Type;
Type.prototype.toString = toString;

Type.prototype.unaryOperationCheck = unaryOperationCheck;
Type.prototype.binaryOperationCheck = binaryOperationCheck;

Type.prototype.semanticCheckValue = semanticCheckValue;
Type.prototype.compileValue = compileValue;

Type.prototype.semanticCheck = semanticCheck;
Type.prototype.compile = compile;
Type.prototype.defaultValueExpr = defaultValueExpr;
Type.prototype.eq = eq;

Type.prototype.addProperty = addProperty;

function Type(opts) {
  var _this = this;

  _this.operators = {
    binary: {
      '==': {
        compile: compileEq.bind(_this)
      },
      '!=': {
        compile: compileNeq.bind(_this)
      }
    },
    unary: {}
  };

  _this.size = 8;
  _this.internalSize = 0;
  _this.pointer = true;
  _this.builtin = false;

  _this.properties = {};

  _this.functions = {};

  _this.loc = {
    first_line: 1,
    last_line: 1,
    first_column: 1,
    last_column: 1
  };

  Element.call(_this, opts);
}

function create(opts) {
  return new Type(opts);
}

function compileEq() {
  return 'je';
}

function compileNeq() {
  return 'jne';
}

function eq(argument) {
  return argument === this || argument === Null;
}

function addProperty(property, name) {
  var _this = this;

  property.address = _this.internalSize;
  _this.properties[name] = property;
  _this.internalSize += property.type.size;
}

function semanticCheck(state) {
  var _this = this;
  var TypeInt = require('latte/core/types/type-int');

  _this.scope = state.pushScope();

  _this.block.semanticCheck(state);
  _this.addProperty({
    type: TypeInt,
    name: 'references'
  }, 'references');

  _this.addProperty({
    type: TypeInt,
    name: 'length'
  }, 'length');

  _this.functions = _this.scope.functions;

  _.forEach(_this.scope.variables, _this.addProperty.bind(_this));

  state.popScope();
}

function compile() {
  //
}

function semanticCheckValue() {
  //
}

function compileValue(state) {
  var _this = this;
  var malloc = 'malloc';

  if (state.os === 'darwin') {
    malloc = '_' + malloc;
  }

  return CodeBlock.create(undefined, 'Allocating ' + _this.name)
    .add('movq $' + _this.internalSize + ', %rdi')
    .add('call ' + malloc)

    .add('movq $0, (%rax)')
    .add('movq $' + _this.internalSize + ', 8(%rax)')
  ;
}

function defaultValueExpr() {
  return Null;
}

function unaryOperationCheck(operator) {
  var _this = this;

  if (_this.operators.unary[operator] === undefined) {
    parseError(
      'Unary operator ' + operator + ' not defined for type ' + _this.name,
      _this.loc,
      _this
    );
  }
}

function binaryOperationCheck(operator, rightType) {
  var _this = this;

  if (_this.operators.unary[operator] === undefined) {
    parseError(
      'Binary operator ' + operator + ' not defined for type ' + _this.name,
      _this.loc,
      _this
    );
  } else if (_this.operators.unary[operator][rightType.name] === undefined) {
    parseError(
      'Binary operator ' + operator + ' not defined for type ' + _this.name + ' and ' + rightType.name,
      _this.loc,
      _this
    );
  }
}

function toString() {
  return 't:' + this.name;
}

