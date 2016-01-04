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
    type: rootScope.getType('int'),
    ident: 'arg'
  });

  _this.ident = 'printInt';
  _this.type = rootScope.getType('void');
  _this.args = [arg];
  _this.parent = rootScope;
}

function semanticCheck() {
  // NOTHING
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, 'PrintInt function body', true)
      .add('pushl %ebp')
      .add('movl %esp, %ebp')
      .add('leaq 4(%ebp), %esi')
      .add('movl .printIntFormat %edi')
      .add('xorl %eax, %eax')
      .add('call printf')
      .add('nop')
      .add('popl $ebp')
      .add('retl')
    );
}

