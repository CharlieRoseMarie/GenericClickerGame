var gulp = require('gulp');
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var tsify = require("tsify");
var del = require("del");
var vinylPaths = require("vinyl-paths");
var typescript = require("gulp-typescript");
<<<<<<< Updated upstream
=======
var nodemon = require("gulp-nodemon");
var less = require("gulp-less");
>>>>>>> Stashed changes

var sources = {
    views: "app/**/*.jade",
    dist: "dist",
    serverMain: "app/app.ts",
    bin: "app/bin/www.*",
    scripts: "app/public/**/*.js",
    less: "app/**/*.less",
    binDist: "dist/bin/www"
};

var bowserifySettings = {
    basedir: ".",
    debug: true,
    entries: ['./app/engine/main.ts'],
    cache: {},
    packageCache: {}
};

gulp.task("build-server", function() {
    var tsProject = typescript.createProject('tsconfig.json');
    var tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(sources.dist));
});

gulp.task("clean", function() {
    return gulp.src("dist/*")
                .pipe(vinylPaths(del));
});

gulp.task("copy-views", function() {
    return gulp
            .src(sources.views)
            .pipe(gulp.dest(sources.dist));
});

gulp.task("copy-scripts", function() {
    return gulp
        .src(sources.scripts)
        .pipe(gulp.dest(sources.dist));
});

gulp.task("copy-css", function() {
    return gulp
        .src(sources.less)
        .pipe(less())
        .pipe(gulp.dest(sources.dist));
});

gulp.task("build", function() {
    return browserify(bowserifySettings)
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(sources.dist));
});

gulp.task("default",  
<<<<<<< Updated upstream
    gulp.series("clean", gulp.parallel("build-server", "build", "copy-views", "copy-css", "copy-scripts")));
=======
    gulp.series(
        "clean", 
        gulp.parallel("build-server", "build", "copy-views", "copy-css", "copy-scripts") 
        ));
>>>>>>> Stashed changes
