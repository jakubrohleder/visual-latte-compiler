var instant = require('../src/main.js');
var fs = require('fs');
var args = process.argv.slice(2);
var path = require('path');
var filename = path.basename(args[0], '.ins');
var filedir = path.dirname(args[0]);
var child_process = require('child_process');
var className = filename.charAt(0).toUpperCase() + filename.slice(1);

if (args[0] === undefined) {
  console.error('Need file with instant sourcecode *.ins');
} else {
  fs.readFile(args[0], 'utf8', function(err, data) {
    var tree = instant.parse(data);
    var compiled = instant.compileLLVM(tree, className);
    fs.writeFile(filedir + '/' + filename + '.ll', compiled.code, function(err) {
      if(err) {
        return console.log(err);
      } else {
        child_process.exec('llvm-as ' + filedir + '/' + filename + '.ll', function(err) {
          if(err) {
            return console.log(err);
          }
        });
      }
    });
  });
}
