var parseError = require('latte/error').parseError;
var getFunctionName = require('latte/utils').getFunctionName;
var CodeBlock = require('latte/code/code-block');
var StatementNoop = require('latte/core/statements/statement-noop');

var _ = require('lodash');

var exports = module.exports = {};

exports.create = create;

Block.prototype = Object.create(Array.prototype);
Block.prototype.constructor = Block;
Block.prototype.semanticCheck = semanticCheck;
Block.prototype.compile = compile;

function Block(elements) {
  var _this = this;

  Array.call(_this);

  if (_.isArray(elements)) {
    elements = _.flatten(elements);
    _this.length = elements.length;

    for (var i = 0; i < elements.length; i++) {
      _this[i] = elements[i];
    }
  }
}

function create(elements) {
  return new Block(elements);
}

function semanticCheck(state) {
  var _this = this;
  var skip;
  var noop = StatementNoop.create({loc: _this.loc});

  _.forEach(_this, function(element, index) {
    skip = false;
    if (state.scope.return === true) {
      parseError(
        'Code after return',
        element.loc,
        _this
      );
    }

    if (getFunctionName(element) === 'StatementIf') {
      if (element.cond.value === false) {
        if (element.wrong === undefined) {
          _this[index] = noop;
          element = noop;
        } else {
          _this[index] = element.wrong;
          element = element.wrong;
        }
      } else if (element.cond.value === true) {
        _this[index] = element.right;
        element = element.right;
      }
    }

    if (getFunctionName(element) === 'StatementWhile') {
      if (element.cond.value === false) {
        _this[index] = noop;
        element = noop;
      } else if (element.cond.value === true) {
        // console.warn('Warning: possible endless loop', element.loc);
      }
    }

    if (!skip) {
      element.semanticCheck(state);
    }
  });

  _.forEach(state.scope.functions, function(element) {
    element.semanticCheck(state);
  });
}

function compile(state) {
  var _this = this;
  var code = CodeBlock.create(_this);

  _.forEach(_this, function(element) {
    try {
      code.add(element.compile(state));
    } catch (err) {
      console.error('Problem compiling', element);
      throw err;
    }
  });

  return code;
}
