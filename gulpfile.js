/*
 * gulpfile with gulp 4 for local deployment. Omit uploads and tests.
 */

const gulp = require('gulp');
const rimraf = require('rimraf');
var concat = require('gulp-concat');
const sass = require('gulp-sass');

const baseDistRoot = 'dist';

// Configurable variables

// Tasks

function cleanDist() {
  rimraf.sync(baseDistRoot);
}

function css() {
  return gulp.src('css/polis_main_dist.scss')
    .pipe(sass({
      loadPath: [__dirname + '/css'],
    }))
    .pipe(concat('polis.css'))
    .pipe(gulp.dest(destDir('/css')));
}

// Support functions

function destDir(suffix) {
  return baseDistRoot + suffix;
}

function getGitHash() {
  return new Promise(function(resolve, reject) {
    exec("git log --pretty=\"%h\" -n 1", function(error, stdout, stderr) {
      if (error) {
        console.error('FAILED TO GET GIT HASH: ' + error);
        reject(stderr);
      } else {
        resolve(stdout);
      }
    })
  });
}

module.exports = {
  css: css,
  clean: cleanDist
};
