var gulp = require('gulp');
var seajs = require('gulp-seajs');
var clean = require('gulp-clean');
//var coffee = require('gulp-coffee');
//var less = require('gulp-less');

var pathScripts = [],
    pathStyles  = [],
    pathTemplates = [],
    pathImages  = [];

gulp.task('clean', function(){
  return gulp.src(['build', 'dist'])
             .pipe(clean({force:true}));
});

gulp.task('scripts', function(){
  return gulp.src(['src/**/*.js'])
    .pipe(seajs({

    }))
    .pipe(gulp.dest('build/'));
});


gulp.task('styles', function(){
  return gulp.src(['src/**/*.css']).pipe(gulp.dest('build/'));
});

gulp.task('templates', function(){
  return gulp.src(['src/**/*.+(html|tpl)']).pipe(gulp.dest('build/'));
});

gulp.task('images', function(){
  return gulp.src(['src/**/*.!(js|css|html|tpl)']).pipe(gulp.dest('build/'));
});
/*
gulp.task('watch', function(){

});
*/

gulp.task('default', ['clean', 'scripts', 'styles', 'templates', 'images']);