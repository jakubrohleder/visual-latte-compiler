var _ = require('lodash');
var parseError = require('./error').parseError;

var exports = module.exports = {};

exports.create = create;

Block.prototype = Object.create(Array.prototype);
Block.prototype.constructor = Block;
Block.prototype.semanticCheck = semanticCheck;

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

  _.forEach(_this, function(element) {
    if (state.scope.return === true) {
      parseError(
        'Code after return',
        element.loc,
        _this
      );
    }

    element.semanticCheck(state);
  });

  _.forEach(state.scope.functions, function(element) {
    element.semanticCheck(state);
  });
}
