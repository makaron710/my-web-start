const {src, dest, watch}        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const cssmin      = require('gulp-cssmin');
const rename      = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

// Compile sass into CSS & auto-inject into browsers | компилятор sass в css
function serveSass() {
    return src("./sass/**/*.sass", "./scss/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({cascade: false}))
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
    watch("./scss/**/*.scss", serveSass);
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
