var Element = require('latte/core/element');
var Variable = require('latte/core/variable');
var TypeVoid = require('latte/core/types/type-void');

var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;

var _ = require('lodash');

module.exports = {
  constr: _Function,
  create: create
};

_Function.prototype = Object.create(Element.prototype);
_Function.prototype.constructor = _Function;
_Function.prototype.semanticCheck = semanticCheck;
_Function.prototype.compile = compile;

_Function.prototype.generateEnter = generateEnter;
_Function.prototype.generateExit = generateExit;

function _Function(opts) {
  var _this = this;

  Element.call(_this, opts);

  _this.main = false;
  _this.registers = ['%r12', '%r13', '%r14', '%r15'];
  _this.register = 0;
  _this.lastRegister = 0;
}

function semanticCheck(state) {
  var _this = this;
  var variable;

  _this.scope = state.pushScope();
  state.pushFunction(_this);

  _.forEach(_this.args, function(argument, index) {
    if (argument.type === TypeVoid) {
      parseError(
        'Void argument ' + argument.ident + ' in function ' + _this.name,
        argument.loc,
        _this
      );
    }

    variable = Variable.create({
      type: argument.type,
      ident: argument.ident,
      decl: argument,
      address: index * 8 + 16 + '(%rbp)'
    });

    argument.variable = variable;

    state.scope.addVariable(variable);
  });

  _this.block.semanticCheck(state);

  if (!_this.type.eq(TypeVoid) && state.scope.return === false) {
    parseError(
      'No return in function \'' + _this.name + '\'',
      _this.decl.loc[_this.decl.loc.length - 2],
      _this
    );
  }

  state.popScope();
  state.popFunction();
}

function create(opts) {
  return new _Function(opts);
}

function compile(state, shift) {
  var _this = this;
  var code;
  var argsBlock;
  var pushRegsBlock;
  var popRegsBlock;
  var cleanVarsBlock;
  var newPos;
  var oldPos;
  var pos;
  var end;

  shift = shift || 0;

  state.pushStack();
  state.pushScope(_this.scope);
  state.pushFunction(_this);

  state.stack.addShift(shift);

  _this.exitLabel = state.nextLabel();

  argsBlock = CodeBlock.create(undefined, 'Args to local memory');

  _.forEach(_this.args, function(argument) {
    newPos = '' + -state.stack.addArgument(argument.variable) + '(%rbp)';
    oldPos = argument.variable.address;
    argument.variable.address = newPos;
    argsBlock.add('movq ' + oldPos + ', %rax');
    argsBlock.add('movq %rax, ' + newPos);

    if (argument.type.pointer === true) {
      end = state.nextLabel();
      argsBlock
        .add('movq %rax, %rdx')
        .add('cmpq $0, %rdx')
        .add('je ' + end)
        .add('incq (%rdx)')
        .add(end + ':')
      ;
    }
  });

  code = _this.block.compile(state);

  pushRegsBlock = CodeBlock.create(undefined, 'Registers to local memory');
  popRegsBlock = CodeBlock.create(undefined, 'Registers from local memory');

  if (_this.method === true) {
    pos = -state.stack.addRegister();
    pushRegsBlock
      .add('movq %rbx, ' + pos + '(%rbp)')
      .add('movq %rdi, %rbx');
    popRegsBlock.add('movq ' + pos + '(%rbp), %rbx');
  }

  for (var i = 0; i < _this.lastRegister && i < 4; i++) {
    pos = -state.stack.addRegister();
    pushRegsBlock.add('movq ' + _this.registers[i] + ', ' + pos + '(%rbp)');
    popRegsBlock.add('movq ' + pos + '(%rbp), ' + _this.registers[i]);
  }

  cleanVarsBlock = CodeBlock.create(undefined, 'Cleaning vars references')
    .add('movq %rax, %r8');
  _.forEach(_this.scope.variables, function(variable) {
    if (variable.type.pointer === true) {
      end = state.nextLabel();
      cleanVarsBlock
        .add('movq ' + variable.address + ', %rdx', 'Var ' + variable)
        .add('cmpq $0, %rdx')
        .add('je ' + end)
        .add('decq (%rdx)')
        .add(end + ':')
      ;
    }
  });
  cleanVarsBlock.add('movq %r8, %rax');


  code = CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, _this.ident + ' function body', true)
      .add(_this.generateEnter(state))
      .add(pushRegsBlock)
      .add(argsBlock)
      .add(code)
      .add(_this.exitLabel + ':')
      .add(cleanVarsBlock)
      .add(popRegsBlock)
      .add(_this.generateExit(state))
    );

  state.popFunction();
  state.popScope();
  state.popStack();

  return code;
}

function generateEnter(state) {
  var code = CodeBlock.create()
    .comment('Stack size: ' + state.stack.size)
    .comment('Local: ' + (state.stack.vars))
    .comment('Shift: ' + (state.stack.shift))
    .comment('Spill: ' + (state.stack.spill))
    .comment('Registers: ' + (state.stack.registers))
    .comment('Calls: ' + (state.stack.max * 8))
    .comment('Args: ' + (state.stack.args))
    .add('pushq %rbp')
    .add('movq %rsp, %rbp')
  ;

  if (state.stack.size > 0) {
    code.add('subq $' + state.stack.getOffset(16) + ', %rsp');
  }

  return code;
}

function generateExit(state) {
  var _this = this;
  var _void = state.rootScope.getType('void');
  var code = CodeBlock.create();

  if (_this.type === _void) {
    code.add('nop');
  }

  if (state.stack.size > 0) {
    code.add('addq $' + state.stack.getOffset(16) + ', %rsp');
  }

  return code
    .add('popq %rbp')
    .add('retq');
}
