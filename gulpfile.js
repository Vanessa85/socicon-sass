const gulp = require('gulp'),
  sass = require('gulp-sass'),
  del = require('del'),
  rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css');

gulp.task('cleanup-css', () => {
  return del(['dist/css']);
});

gulp.task('cleanup-fonts', () => {
  return del(['dist/fonts']);
});

gulp.task('css', ['cleanup-css'] , () => {
  return gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-fonts', ['cleanup-fonts'], () => {
  return gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('css-build', ['cleanup-css'], () => {
  return gulp.src('src/*.scss')
    .pipe(gulp.dest('dist/css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', () => {
  gulp.watch('src/*.scss', ['css']);
});

gulp.task('build', ['css-build', 'copy-fonts']);
gulp.task('default', ['watch']);
