const gulp = require('gulp'),
  sass = require('gulp-sass'),
  del = require('del'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css');

const processors = [
  autoprefixer({
    browsers: ['> 1%'],
    cascade: false
  })
];

gulp.task('cleanup-css', () => {
  return del(['dist/css']);
});

gulp.task('css', ['cleanup-css'] , () => {
  return gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('css-build', ['cleanup-css'], () => {
  return gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', () => {
  gulp.watch('src/*.scss', ['css']);
});

gulp.task('build', ['css-build']);
gulp.task('default', ['watch']);
