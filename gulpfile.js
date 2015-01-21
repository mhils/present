var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require("gulp-livereload");  // livereload of gulp-webserver is somewhat slow
var sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var webserver = require('gulp-webserver');

var conf = {
    html: "*.html",
    js: "js/*",
    images: "images/*",
    css: "css/*.css",
    less: "css/*.less",
    main: "index.html",
};

var dont_break_on_errors = function () {
    return plumber(function (error) {
        notify.onError("Error: <%= error.message %>").apply(this, arguments);
        this.emit('end');
    });
};

gulp.task("less", function(){
    return gulp.src(conf.less)
        .pipe(dont_break_on_errors())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"));
});


gulp.task("html", function(){
    return gulp.src(conf.html)
        .pipe(livereload());
});

gulp.task("css", function(){
    return gulp.src(conf.css)
        .pipe(livereload());
});

gulp.task("js", function(){
    return gulp.src(conf.js)
        .pipe(livereload());
});

gulp.task("images", function(){
    return gulp.src(conf.images)
        .pipe(livereload());
});

gulp.task("build", ["html", "less", "js", "images"]);

gulp.task("serve", function () {
    gulp.src('.')
        .pipe(webserver({
            open: conf.main
        }));
});

gulp.task("watch", function () {
    livereload.listen();
    gulp.watch(conf.html, ["html"]);
    gulp.watch(conf.less, ["less"]);
    gulp.watch(conf.css, ["css"]);
    gulp.watch(conf.js, ["js"]);
    gulp.watch(conf.images, ["images"]);
});

gulp.task("default", ["build", "watch", "serve"]);