const {src, dest, watch, series}        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const cssmin      = require('gulp-cssmin');
const rename      = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');

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
/* function minCss() {
    return src('./css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('css'));
}; */
//Будет использована clean css

//Подготовка пронкта к выгрузке (сжатие, минимификация...)
//CSS
function buildCSS(done) {
    src('css/**/**.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('dist/css/'));
    done();
};
//JS
function buildJS(done) {
    src(['js/**/**.js', '!js/**/**.min.js'])
        .pipe(minify({
            ext:{
                min:'.js'
            }
        }))
        .pipe(dest('dist/js/'));
    src('js/**/**.min.js')
        .pipe(dest('dist/js/'));
    done();
};

function buildHTML(done) {
    src('**.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'));
    done();
};

function php(done) {
    src('**.php')
        .pipe(dest('dist/'));
    src('phpmailer/**/**')
        .pipe(dest('dist/phpmailer/'));
    done();
};

function fonts(done) {
    src('css/fonts/**/**')
        .pipe(dest('dist/css/fonts'));
    done();
};

function imgMin(done) {
    src('img/**/**')
        .pipe(tinypng({
            key: 'h0pJDThTqVTvbqb1CHhpPMrFlsfs7rpY'
        }))
        .pipe(dest('dist/img/'));
    src(['img/**/**.ico', 'img/**/**.svg', '!img/**/**.{png,jpg,jpeg}'])
        .pipe(dest('dist/img/'));
    done();
};

exports.bs = bs; //вызов таска командой gulp bs
//exports.minCss = minCss;
exports.build = series(buildCSS, buildJS, buildHTML, php, fonts);
exports.imgmin = imgMin;
