'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('inject', ['scripts', 'styles'], function() {
  var injectStyles = gulp.src([
    path.join(conf.paths.web.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.web.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.web.src, '/app/**/*.module.js'),
    path.join(conf.paths.web.src, '/app/**/*.js'),
    path.join('!' + conf.paths.web.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.web.src, '/app/**/*.mock.js')
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.web.src, path.join(conf.paths.web.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.web.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.web.tmp, '/serve')));
});
