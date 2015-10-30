var parse = require('./instant-bundle.js');
var fs = require('fs');
var args = process.argv.slice(2);
var path = require('path');
var filename = path.basename(args[0], '.ins');

if (args[0] === undefined) {
  console.error('Need file with instant sourcecode *.ins');
} else {
  fs.writeFile(filename + '.j', 'Hello world from jvm,', function(err) {
    if(err) {
      return console.log(err);
    }
  });
}

