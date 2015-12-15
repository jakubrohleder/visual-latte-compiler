var exports = module.exports = {};
var _ = require('lodash');

exports.parseError = parseError;

_parseError.prototype = new Error();

function _parseError (msg, hash) {
  this.message = msg;
  this.hash = hash;
}

function parseError(str, loc, object) {
  var hash;
  if (loc === undefined) {
    loc = {
      first_line: 0,
      last_line: 0,
      first_column: 0,
      last_column: 0
    };
  } else if (_.isArray(loc)) {
    loc = loc[loc.length - 1];
  }

  hash = {
    loc: loc,
    object: object
  };

  throw new _parseError(str, hash);
}
