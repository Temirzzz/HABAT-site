const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const imagemin = require('gulp-imagemin')

const sync = require('browser-sync').create()

function html() {
    return src('./src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('./build'))
}

function scss() {
    return src('./src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('style.css'))
        .pipe(dest('./build/css'))
}

function script() {
    return src('./src/script/**.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(dest('./build/script'))
}

function image() {
    return src('./src/img/**')
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(dest('./build/img/'))
}

function fonts() {
    return src('./src/fonts/*')
        .pipe(plumber())
        .pipe(dest('./build/fonts'))
}

function clear() {
    return del('build')
}

function serve() {
    sync.init({
        server: './build'
    })

    watch('./src/script/**.js', series(script)).on('change', sync.reload)
    watch('./src/img/**', series(image)).on('change', sync.reload)
    watch('./src/**.html', series(html)).on('change', sync.reload)
    watch('./src/scss/**.scss', series(scss)).on('change', sync.reload)

}


exports.build = series(clear, fonts, script, image, scss, html)
exports.serve = series(clear, fonts, script, image, scss, html, serve)
exports.clear = clear