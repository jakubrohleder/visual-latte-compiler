/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  web : {
    src: 'web/src',
    dist: 'web/dist',
    tmp: 'web/.tmp',
    e2e: 'web/e2e'
  },
  lib: {
    src: 'src',
    e2e: 'e2e'
  }
};

exports.overrides = {
  semantic: {
    main: [
      'dist/semantic.css',
      'dist/semantic.js',
      'dist/themes/default/assets/fonts/icons.eot',
      'dist/themes/default/assets/fonts/icons.otf',
      'dist/themes/default/assets/fonts/icons.svg',
      'dist/themes/default/assets/fonts/icons.ttf',
      'dist/themes/default/assets/fonts/icons.woff',
      'dist/themes/default/assets/fonts/icons.woff2'
    ]
  }
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  directory: 'bower_components',
  overrides: exports.overrides
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
