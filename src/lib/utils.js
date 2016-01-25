var exports = module.exports = {};
var _ = require('lodash');

exports.getFunctionName = function(fun) {
  var funcNameRegex = /function (.{1,})\(/;
  var results = (funcNameRegex).exec((fun).constructor.toString());
  return (results && results.length > 1) ? results[1] : '';
};

exports.repeatString = function(string, times) {
  var output = '';
  for (;;) {
    if (times & 1) {
      output += string;
    }

    times >>= 1;

    if (times) {
      string += string;
    } else {
      break;
    }
  }

  return output;
};

exports.nextMul = function(argument, base) {
  return Math.ceil((argument - 1) / base) * base;
};

exports.encodeFunctionName = function(fun, type, builtin) {
  var ident = '';

  if (builtin === true) {
    ident += 'builtin_';
  }

  if (type === undefined) {
    if (fun.name === 'main') {
      return 'main';
    }

    ident += 'global_';
  } else {
    ident += 'class_' + type.name + '_';
  }

  ident += fun.type + '_' + fun.name + '_' + fun.args.length;

  _.forEach(fun.args, function(arg) {
    ident += '_' + arg.type;
  });

  return ident;
};

exports.unescape = function(string) {
  return string
    .replace(/^\"/, '')
    .replace(/\"$/, '')
    .replace(/([^\\])\\n/g, '$1\n')
    .replace(/([^\\])\\t/g, '$1\t')
    .replace(/\\\"/g, '\"')
    .replace(/\\\'/g, '\'')
    .replace(/\\\\/g, '\\');
};

