const gulp = require('gulp');
const jshint = require('gulp-jshint');
const changed = require('gulp-changed');
//const plumber = require('gulp-plumber');
//const uglify = require('gulp-uglify-es').default;
const uglify = require('gulp-uglify');
//const uglify = require('gulp-minify');
const concat = require('gulp-concat');
const umd = require('gulp-umd');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
//const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-js-base64-inject');
const replace = require('gulp-replace');
const wait = require('gulp-wait');

const LIB_NAME = 'kaia-face.js';
const UMD_EXPORTS = 'Face';
const UMD_NAMESPACE = UMD_EXPORTS;
const SRC_DIR = 'src/';
const SRC_JS_DIR = SRC_DIR + 'js/';
const IMG_DIR = 'img/';
const SRC_JS = [SRC_JS_DIR + 'helpers.js', SRC_JS_DIR + 'animationModule.js',
  SRC_JS_DIR + 'animationEffectModule.js', SRC_JS_DIR + 'main.js',
  SRC_JS_DIR + 'user_api.js', SRC_JS_DIR + 'expression.js',
  SRC_JS_DIR + 'expressionElement.js'];
const DIST_DIR = 'dist/';
const BUNDLE_DIR = 'bundle/';
const BASE64_DIR = 'base64/';
const WAIT = 100; // hack, some async IO seems unfinished when task finishes

gulp.task('clean', () =>
  gulp.src([DIST_DIR, BUNDLE_DIR, BASE64_DIR], {read: false, allowEmpty: true})
  .pipe(clean())
  .pipe(wait(WAIT))
);

gulp.task('concat', gulp.series('clean'), () =>
  gulp.src(SRC_JS)
  .pipe(concat(LIB_NAME))
  .pipe(gulp.dest(BUNDLE_DIR))
  .pipe(wait(WAIT))
);

gulp.task('jshint-bundle', gulp.series('concat'), () =>
  gulp.src(BUNDLE_DIR + LIB_NAME)
  //.pipe(plumber())
  .pipe(jshint({ esversion: 6 }))
  .pipe(jshint.reporter('default'))
);

gulp.task('imagemin', gulp.series('concat'), () =>
  gulp.src(SRC_DIR + IMG_DIR + '**/*')
  .pipe(imagemin())
  .pipe(gulp.dest(BUNDLE_DIR + IMG_DIR))
  .pipe(wait(WAIT))
);

gulp.task('base64', gulp.series('imagemin'), () =>
  gulp.src(BUNDLE_DIR + LIB_NAME)
  .pipe(inject({
    basepath: BUNDLE_DIR + 'img/',
    pattern: /['"]img\/([a-zA-Z0-9\-_.\\/]+)['"]/g
    //debug: true
  }))
  .pipe(replace('image/png;base64', 'data:image/png;base64')) // inject bug workaround
  .pipe(gulp.dest(BASE64_DIR))
  .pipe(wait(WAIT))
);

gulp.task('watch', () =>
  watch(SRC_JS, batch((events, done) =>
    gulp.start('default', done)
  ))
);

gulp.task('umd', gulp.series('base64'), () =>
  gulp.src(BASE64_DIR + LIB_NAME)
  //.pipe(plumber())
  .pipe(umd({
    namespace: () => UMD_NAMESPACE,
    exports: () => UMD_EXPORTS,
  }))
  .pipe(gulp.dest(DIST_DIR))
  .pipe(wait(WAIT))
);

gulp.task('umdstep', () =>
  gulp.src(BASE64_DIR + LIB_NAME)
  //.pipe(plumber())
  .pipe(umd({
    namespace: () => UMD_NAMESPACE,
    exports: () => UMD_EXPORTS,
  }))
  .pipe(gulp.dest(DIST_DIR))
  .pipe(wait(WAIT))
);

gulp.task('jshint-src', () =>
  gulp.src(SRC_JS)
  //.pipe(plumber())
  .pipe(jshint({ esversion: 6 }))
  .pipe(jshint.reporter('default'))
);

gulp.task('jshint-base64', gulp.series('base64'), () =>
  gulp.src(BASE64_DIR + LIB_NAME)
  //.pipe(plumber())
  .pipe(jshint({ esversion: 6 }))
  .pipe(jshint.reporter('default'))
);

gulp.task('jshint-umd', gulp.series('umd'), () =>
  gulp.src(DIST_DIR + LIB_NAME)
  //.pipe(plumber())
  .pipe(jshint({ esversion: 6 }))
  .pipe(jshint.reporter('default'))
);

gulp.task('minify', gulp.series('umd'), () =>
  gulp.src(DIST_DIR + LIB_NAME)
  .pipe(uglify())
  .pipe(rename((path) => {
    path.basename += '.min';
  }))
  .pipe(gulp.dest(DIST_DIR))
);

gulp.task('minifystep', () =>
  gulp.src(DIST_DIR + LIB_NAME)
  .pipe(uglify())
  .pipe(rename((path) => {
    path.basename += '.min';
  }))
  .pipe(gulp.dest(DIST_DIR))
);

gulp.task('changed', () =>
  gulp.src(SRC_JS)
  .pipe(changed(DIST_DIR))
  .pipe(gulp.dest(DIST_DIR))
);

gulp.task('default', gulp.series('minify'));
