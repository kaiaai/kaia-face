const { src, dest, series } = require("gulp");
const clean_ = require('gulp-clean');
const concat_ = require('gulp-concat');
const jshint = require('gulp-jshint');
const imagemin_ = require('gulp-imagemin');
const inject = require('gulp-js-base64-inject');
const replace = require('gulp-replace');
const umd_ = require('gulp-umd');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
//const changed_ = require('gulp-changed');
const watch_ = require('gulp-watch');

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

function imagemin() {
  return src(SRC_DIR + IMG_DIR + '**/*')
    .pipe(imagemin_())
    .pipe(dest(BUNDLE_DIR + IMG_DIR));
}

function clean() {
  return src([DIST_DIR, BUNDLE_DIR, BASE64_DIR], {read: false, allowEmpty: true})
    .pipe(clean_());
}

function concat() {
  return src(SRC_JS)
    .pipe(concat_(LIB_NAME))
    .pipe(dest(BUNDLE_DIR));
}

function jshint_src() {
  return src(SRC_JS)
    //.pipe(plumber())
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter('default'));
}

function jshint_bundle() {
  return src(BUNDLE_DIR + LIB_NAME)
    //.pipe(plumber())
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter('default'));
}

function jshint_base64() {
  return src(BASE64_DIR + LIB_NAME)
    //.pipe(plumber())
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter('default'));
}

function jshint_umd() {
  return src(DIST_DIR + LIB_NAME)
    //.pipe(plumber())
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter('default'));
}

function base64() {
  return src(BUNDLE_DIR + LIB_NAME)
    .pipe(inject({
      basepath: BUNDLE_DIR + IMG_DIR,
      pattern: /['"]img\/([a-zA-Z0-9\-_.\\/]+)['"]/g
      //debug: true
    }))
    .pipe(replace('image/png;base64', 'data:image/png;base64')) // inject bug workaround
    .pipe(dest(BASE64_DIR));
}

function umd() {
  return src(BASE64_DIR + LIB_NAME)
    //.pipe(plumber())
    .pipe(umd_({
      namespace: () => UMD_NAMESPACE,
      exports: () => UMD_EXPORTS,
    }))
    .pipe(dest(DIST_DIR));
}

function umd_step() {
  return src(BASE64_DIR + LIB_NAME)
    //.pipe(plumber())
    .pipe(umd({
      namespace: () => UMD_NAMESPACE,
      exports: () => UMD_EXPORTS,
    }))
    .pipe(dest(DIST_DIR));
}

function minify() {
  return src(DIST_DIR + LIB_NAME)
    .pipe(uglify())
    .pipe(rename((path) => {
      path.basename += '.min';
    }))
    .pipe(dest(DIST_DIR));
}

function minify_step() {
  return src(DIST_DIR + LIB_NAME)
    .pipe(uglify())
    .pipe(rename((path) => {
      path.basename += '.min';
    }))
    .pipe(dest(DIST_DIR));
}

//"gulp-changed": "^4.0.3",
//function changed() {
//  return src(SRC_JS)
//    .pipe(changed_(DIST_DIR))
//    .pipe(dest(DIST_DIR));
//}

exports.clean = clean;
exports.concat = series(exports.clean, concat);
exports.jshint_src = jshint_src;
exports.jshint_bundle = series(exports.concat, jshint_bundle);
exports.imagemin = series(exports.concat, imagemin);
exports.base64 = series(exports.imagemin, base64);
exports.jshint_base64 = series(exports.base64, jshint_base64);
exports.umd = series(exports.base64, umd);
exports.jshint_umd = series(exports.umd, jshint_umd);
exports.umd_step = umd_step;
exports.minify = series(exports.umd, minify);
exports.minify_step = minify_step;
//exports.changed = changed;
exports.default = exports.minify;

function watch() {
  const watcher = watch_(SRC_JS_DIR+'/*.js');
  watcher.on('change', function(path, stats) {
    exports.minify();
  });
}

exports.watch = watch;
