const { src, dest, series } = require("gulp");
const clean_ = require('gulp-clean');
const concat_ = require('gulp-concat');
const jshint = require('gulp-jshint');
const imagemin_ = require('gulp-imagemin');
const inject = require('gulp-js-base64-inject');
const replace = require('gulp-replace');
const umd_ = require('gulp-umd');

const LIB_NAME = 'kaia-face.js';
const UMD_EXPORTS = 'Face';
const UMD_NAMESPACE = UMD_EXPORTS;

const SRC_DIR = 'src/';
const SRC_JS_DIR = SRC_DIR + 'js/';
const SRC_JS = [SRC_JS_DIR + 'helpers.js', SRC_JS_DIR + 'animationModule.js',
  SRC_JS_DIR + 'animationEffectModule.js', SRC_JS_DIR + 'main.js',
  SRC_JS_DIR + 'user_api.js', SRC_JS_DIR + 'expression.js',
  SRC_JS_DIR + 'expressionElement.js'];
const IMG_DIR = 'img/';
const DIST_DIR = 'dist/';
const BUNDLE_DIR = 'bundle/';
const BASE64_DIR = 'base64/';

function imagemin(cb) {
  return src(SRC_DIR + IMG_DIR + '**/*')
    .pipe(imagemin_())
    .pipe(dest(BUNDLE_DIR + IMG_DIR));
}

function clean(cb) {
  return src([DIST_DIR, BUNDLE_DIR, BASE64_DIR], {read: false, allowEmpty: true})
    .pipe(clean_());
}

function concat(cb) {
  return src(SRC_JS)
    .pipe(concat_(LIB_NAME))
    .pipe(dest(BUNDLE_DIR));
}

function jshint_src(cb) {
  return src(SRC_JS)
    //.pipe(plumber())
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter('default'))
}

function jshint_bundle(cb) {
  return src(BUNDLE_DIR + LIB_NAME)
    //.pipe(plumber())
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter('default'));
}

function base64(cb) {
  return src(BUNDLE_DIR + LIB_NAME)
    .pipe(inject({
      basepath: BUNDLE_DIR + IMG_DIR,
      pattern: /['"]img\/([a-zA-Z0-9\-_.\\/]+)['"]/g
      //debug: true
    }))
    .pipe(replace('image/png;base64', 'data:image/png;base64')) // inject bug workaround
    .pipe(dest(BASE64_DIR));
}

function umd(cb) {
  return src(BASE64_DIR + LIB_NAME)
    //.pipe(plumber())
    .pipe(umd_({
      namespace: () => UMD_NAMESPACE,
      exports: () => UMD_EXPORTS,
    }))
    .pipe(dest(DIST_DIR));
}

exports.clean = clean;
exports.concat = series(exports.clean, concat);
exports.jshint_src = jshint_src;
exports.jshint_bundle = series(exports.concat, jshint_bundle);
exports.imagemin = series(exports.concat, imagemin);
exports.base64 = series(exports.imagemin, base64);
exports.umd = series(exports.base64, umd);
