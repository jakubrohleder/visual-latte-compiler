var _ = require('lodash');

var CodeBlock = require('latte/code/code-block');
var ExpressionObject = require('latte/core/expressions/expression-object');
var Value = require('latte/core/value');

var Type = require('./type');

module.exports = TypeString;

TypeString.prototype = Object.create(Type.prototype);
TypeString.prototype.constructor = TypeString;
TypeString.prototype.checkeValue = _.isString;
TypeString.prototype.compile = compile;
TypeString.prototype.defaultValueExpr = defaultValueExpr;

function TypeString(rootScope) {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'string';
  _this.rootScope = rootScope;
  _this.size = 8;

  _this.operators.binary = {
    '+': {
      compile: compileAdd.bind(_this)
    }
  };
}

function compileAdd(state, left, right) {
  var leftPointer = left;
  var rightPointer = right;
  var resultPointer = state.pushRegister();
  var leftLength = state.pushRegister();
  var rightLength = state.pushRegister();

  state.popRegister();
  state.popRegister();
  state.popRegister();

  var strlen = 'strlen';
  var malloc = 'malloc';
  var memcpy = 'memcpy';

  if (state.os === 'darwin') {
    strlen = '_' + strlen;
    malloc = '_' + malloc;
    memcpy = '_' + memcpy;
  }

  return CodeBlock.create(this)
    .add('movq ' + leftPointer + ', %rdi')
    .add('call ' + strlen)
    .add('movq %rax, ' + leftLength, 'Save left string len')

    .add('movq ' + rightPointer + ', %rdi')
    .add('call ' + strlen)
    .add('movq %rax, ' + rightLength, 'Save right string len')

    .add('addq ' + leftLength + ', %rax')
    .add('leaq 1(%rax), %rdi')
    .add('call ' + malloc, 'Alloc result string')
    .add('movq %rax, ' + resultPointer)

    .add(CodeBlock.create(undefined, 'Memcpy left string')
      .add('movq ' + leftPointer + ', %rsi', 'Left string to src arg')
      .add('movq ' + resultPointer + ', %rdi', 'Result string to dest arg')
      .add('movq ' + leftLength + ', %rdx', 'Left string length')
      .add('call ' + memcpy)
    )
    .add(CodeBlock.create(undefined, 'Memcpy right string')
      .add('movq ' + rightPointer + ', %rsi', 'Right string to src arg')
      .add('movq ' + resultPointer + ', %rax')
      .add('addq ' + leftLength + ', %rax')
      .add('movq %rax, %rdi', 'Result + left string length to dest arg')
      .add('movq ' + rightLength + ', %rdx', 'Right string length to rdx')
      .add('call ' + memcpy)
    )
    .add('movq ' + resultPointer + ', %rax')
    .add('addq ' + rightLength + ', %rax')
    .add('addq ' + leftLength + ', %rax')
    .add('movq $0, (%rax)')
    .add('movq ' + resultPointer + ', %rax')
  ;
}

function compile(state, expr) {
  var _this = this;
  var value = _.trim(expr.text, '"');
  var length = value.length;
  var code;
  var malloc = 'malloc';

  expr.value = Value.create({
    type: _this,
    register: '%rax'
  });

  if (state.os === 'darwin') {
    malloc = '_' + malloc;
  }

  code = CodeBlock.create(undefined, 'Allocating string')
    .add('movq $' + (length + 1) + ', %rdi')
    .add('call ' + malloc)
  ;

  for (var i = 0; i < length; i++) {
    code.add('movb $' + value.charCodeAt(i) + ', ' + i + '(%rax)');
  }

  code.add('movb $0, ' + length + '(%rax)');

  return code;
}

function defaultValueExpr(loc) {
  return ExpressionObject.create({
    type: 'string',
    text: '""',
    loc: loc
  });
}
