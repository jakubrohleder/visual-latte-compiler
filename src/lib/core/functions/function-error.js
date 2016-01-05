var CodeBlock = require('latte/code/code-block');

var _Function = require('./function').constructor;

module.exports = FunctionError;

FunctionError.prototype = Object.create(_Function.prototype);
FunctionError.prototype.constructor = FunctionError;
FunctionError.prototype.semanticCheck = semanticCheck;
FunctionError.prototype.compile = compile;

function FunctionError(rootScope) {
  var _this = this;

  _this.ident = 'error';
  _this.type = rootScope.getType('void');
  _this.args = [];
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
    .add(CodeBlock.create(undefined, 'Error function body', true)
      // .add('pushq %rbp')
      // .add('movq %rsp, %rbp')
      // .add('leaq errorString(%rip), %rax')
      // .add('movq %rax, 0(%rsp)')
      // .add('xorq %rax, %rax')
      // .add('callq _printf')
      // .add('nop')
      // .add('popq %rbp')
      // .add('retq')
    );
}


