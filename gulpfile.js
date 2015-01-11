var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require("gulp-livereload");  // livereload of gulp-webserver is somewhat slow
var sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var webserver = require('gulp-webserver');

var conf = {
    html: "index.html",
    js: "js/*",
    images: "images/*",
    css: "css/style.less",
    css_watch: "css/*.less",
    css_vendor: "css/bootstrap.less",
    main: "index.html",
};

var dont_break_on_errors = function () {
    return plumber(function (error) {
        notify.onError("Error: <%= error.message %>").apply(this, arguments);
        this.emit('end');
    });
};

var styles = function (files) {
    return gulp.src(files)
        .pipe(dont_break_on_errors())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"))
        .pipe(livereload());
};

gulp.task("css-presentation", styles.bind(null, conf.css));
gulp.task("css-vendor", styles.bind(null, conf.css_vendor));
gulp.task("css", ["css-presentation", "css-vendor"]);

gulp.task("html", function(){
    return gulp.src(conf.html)
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

gulp.task("build", ["css", "html", "js", "images"]);

gulp.task("serve", function () {
    gulp.src('.')
        .pipe(webserver({
            open: conf.main
        }));
});

gulp.task("watch", function () {
    livereload.listen();
    gulp.watch(conf.css_watch, ["css-presentation"]);
    gulp.watch(conf.css_vendor, ["css-vendor"]);
    gulp.watch(conf.html, ["html"]);
    gulp.watch(conf.js, ["js"]);
    gulp.watch(conf.images, ["images"]);
});

gulp.task("default", ["build", "watch", "serve"]);