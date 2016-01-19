var exports = module.exports = {};
var _ = require('lodash');

exports.parseError = parseError;

_parseError.prototype = new Error();
_parseError.prototype.toString = toString;

function _parseError(msg, hash) {
  this.message = msg;
  this.hash = hash;
}

function parseError(str, loc, object) {
  var hash;
  hash = {
    loc: loc,
    object: object
  };

  if (loc === undefined) {
    hash.loc = {
      first_line: 1,
      last_line: 1,
      first_column: 1,
      last_column: 1
    };
  } else if (_.isArray(loc)) {
    hash.loc = loc[loc.length - 1];
  }

  throw new _parseError(str, hash);
}

function toString() {
  var _this = this;
  return _this.message + '\n' + 'Location: ' + _this.hash.loc.first_line + ':' + _this.hash.loc.first_column + ' to ' + _this.hash.loc.last_line + ':' + _this.hash.loc.last_column;
}
