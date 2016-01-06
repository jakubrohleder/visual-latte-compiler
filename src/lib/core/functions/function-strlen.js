var CodeBlock = require('latte/code/code-block');

var _Function = require('./function').constructor;
var Argument = require('../argument');

module.exports = FunctionPrintInt;

FunctionPrintInt.prototype = Object.create(_Function.prototype);
FunctionPrintInt.prototype.constructor = FunctionPrintInt;
FunctionPrintInt.prototype.semanticCheck = semanticCheck;
FunctionPrintInt.prototype.compile = compile;

function FunctionPrintInt(rootScope) {
  var _this = this;
  var arg = Argument.create({
    type: rootScope.getType('string'),
    ident: 'arg'
  });

  _this.ident = 'strlen';
  _this.type = rootScope.getType('int');
  _this.args = [arg];
  _this.parent = rootScope;
  _this.decl = {
    loc: {
      first_line: 1,
      last_line: 1,
      first_column: 1,
      last_column: 1
    }
  };
}

function semanticCheck() {
  // NOTHING
}

function compile(state) {
  var _this = this;

  var strlen = 'strlen';

  if (state.os === 'osx') {
    strlen = '_' + strlen;
  }

  return CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, 'Strlen function body', true)
      .add('pushq %rbp')
      .add('movq %rsp, %rbp')

      .add('movq  16(%rbp), %rdi')
      .add('call ' + strlen)

      .add('popq %rbp')
      .add('retq')
    );
}

