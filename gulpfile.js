var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    stylus = require('gulp-stylus'),
    cmq = require('gulp-combine-mq'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    fontmin = require('gulp-fontmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    run = require('gulp-run'),
    browserSync = require('browser-sync').create();

var onError = function(err) {
    gutil.log(gutil.colors.red('¡Oh, no! 😱'));
    gutil.beep();
    console.log(err);
}

gulp.task('styles', function() {
    return gulp
        .src('./src/styles/main.styl')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(stylus({
          'include css': true
        }))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('./src/css'))
})

gulp.task('cmq', function() {
    return gulp
        .src('./src/css/styles.css')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(cmq())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('prefix', function() {
    return gulp
        .src('./src/css/*.css')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(autoprefixer({
        browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('templates', function() {
    return gulp
        .src('./src/templates/production/*.pug', { read: 'false'})
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(pug())
        .pipe(gulp.dest('./dist/'))
})

gulp.task('compress-fonts', function () {
    return gulp
        .src('./src/fonts/**/*')
        .pipe(fontmin())
        .pipe(gulp.dest('./dist/fonts/'));
})

gulp.task('concat', function() {
    return gulp
        .src('./src/js/**/*.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist/js/'));
})

gulp.task('compress-images', function() {
  console.error(
    "grab the compressor with this command: `go get github.com/thewraven/shrink`"
  );
  return run(
    'shrink -dir src/images/ -output dist/images/ -quality 70 -hierarchy -override'
  ).exec();
})

// Server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch('./src/templates/**/*.pug', ['templates']).on('change', browserSync.reload);
    gulp.watch('./src/styles/**/*.styl', ['build-styles']).on('change', browserSync.reload);

});

gulp.task('build-styles', function() {
    runSequence('styles', 'cmq', 'prefix')
})

gulp.task('build-js', function() {
  runSequence(['concat'], 'emerald', 'minifyJS')
})

gulp.task('watch', function() {
  gulp.watch('./src/templates/**/*.pug', ['templates']).on('change', browserSync.reload);
  gulp.watch('./src/styles/**/*.styl', ['build-styles']).on('change', browserSync.reload);
  // gulp.watch('./src/js/**/*.js ', ['build-js'])
})

gulp.task('default', function() {
  runSequence(['templates', 'jstemplate'], ['build-styles',
      'build-js'
    ],
    'watch')
})
