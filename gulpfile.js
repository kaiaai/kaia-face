const { src, dest } = require("gulp");
const clean_ = require('gulp-clean');

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

exports.copy = copy;
exports.clean = clean;
