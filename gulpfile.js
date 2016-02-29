var gulp = require('gulp'),
  connect = require('gulp-connect'),
  stylus = require('gulp-stylus'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  autoprefixer = require('gulp-autoprefixer'),
  gutil = require('gulp-util'),
  ftp = require('gulp-ftp');

  gulp.task('connect', function(){
    connect.server({
      port: 1337,
      livereload: true,
      root: 'dist/'
    });
  });

  gulp.task('html', function(){
    gulp.src(['dist/index.html', 'dist/pages/*.html'])
      .pipe(connect.reload());
  });

  gulp.task('js', function(){
    gulp.src(['js/core.js', 'js/modules/**/*.js'])
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./dist/js/'))
      .pipe(connect.reload());
  });

  gulp.task('stylus', function(){
    gulp.src([
        'styl/index.styl'
      ])
      .pipe(concat('app.styl'))
      .pipe(stylus({compress: false}))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(connect.reload());
  });

  gulp.task('imagemin', function () {
      return gulp.src('img/*')
          .pipe(imagemin({
              progressive: true,
              svgoPlugins: [{removeViewBox: false}]
          }))
          .pipe(gulp.dest('dist/img/'));
  });

  gulp.task('autoprefixer', function () {
      return gulp.src('dist/css/app.css')
          .pipe(autoprefixer({
              browsers: ['last 2 versions'],
              cascade: false
          }))
          .pipe(gulp.dest('dist/css/app.css'));
  });

  gulp.task('watch', function(){
    gulp.watch(['dist/index.html', 'dist/pages/*.html', 'dist/landings/*.html'], ['html']);
    gulp.watch('styl/**/*.styl', ['stylus']);
    gulp.watch('js/**/*.js', ['js']);
  });

gulp.task('default', ['js', 'stylus', 'connect', 'watch']);