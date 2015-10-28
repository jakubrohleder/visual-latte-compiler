'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  gulp.watch([path.join(conf.paths.web.src, '/*.html'), 'bower.json'], ['inject']);

  gulp.watch([
    path.join(conf.paths.web.src, '/app/**/*.css'),
    path.join(conf.paths.web.src, '/app/**/*.scss')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.web.src, '/app/**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.web.src, '/app/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });

  gulp.watch(path.join(conf.paths.lib.src, '/**/*.*'), function() {
    gulp.start('browsify');
  });
});
