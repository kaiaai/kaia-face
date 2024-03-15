const { src, dest, series } = require("gulp");
const clean_ = require('gulp-clean');
const concat_ = require('gulp-concat');

const LIB_NAME = 'kaia-face.js';
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

function copy(cb) {
  src('src/js/*.js')
    .pipe(dest('copies'));
  cb();
}

function clean(cb) {
  src([DIST_DIR, BUNDLE_DIR, BASE64_DIR], {read: false, allowEmpty: true})
    .pipe(clean_());
//  .pipe(wait(WAIT))
  cb();
}

function concat(cb) {
  src(SRC_JS)
    .pipe(concat_(LIB_NAME))
    .pipe(dest(BUNDLE_DIR));
//    .pipe(wait(WAIT))
  cb();
}

exports.copy = copy;
exports.clean = clean;
exports.concat = series(clean, concat);
