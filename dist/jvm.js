var instant = require('../src/main.js');
var fs = require('fs');
var args = process.argv.slice(2);
var path = require('path');
var filename = path.basename(args[0], '.ins');
var child_process = require('child_process');
var className = filename.charAt(0).toUpperCase() + filename.slice(1);

if (args[0] === undefined) {
  console.error('Need file with instant sourcecode *.ins');
} else {
  fs.readFile(args[0], 'utf8', function(err, data) {
    var tree = instant.parse(data);
    var compiled = instant.compileJVM(tree, className);
    fs.writeFile(filename + '.j', compiled.code, function(err) {
      if(err) {
        return console.log(err);
      } else {
        child_process.exec('java -jar Jasmin/jasmin.jar ' + filename + '.j', function(err) {
          if(err) {
            return console.log(err);
          }
        });
      }
    });
  });
}
