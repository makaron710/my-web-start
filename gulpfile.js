var {src, dest, watch}        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var cssmin      = require('gulp-cssmin');
var rename      = require('gulp-rename');

// Compile sass into CSS & auto-inject into browsers | компилятор sass в css
function serveSass() {
    return src("./sass/*.sass")
        .pipe(sass())
        .pipe(dest("./css"))
        .pipe(browserSync.stream());
};

// Static server | сервер для авто обновления страницы
function bs() {
    serveSass();
     browserSync.init({
      server: {
          baseDir: "./"
      }
    });
    watch("./*.html").on('change', browserSync.reload);
    watch("./sass/**/*.sass", serveSass);
    watch("./js/*.js").on('change', browserSync.reload);
};

//minimize css | минимизация css
function minCss() {
    return src('./css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('css'));
};

exports.bs = bs; //вызов таска командой gulp bs
exports.minCss = minCss;
