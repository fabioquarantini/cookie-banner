var gulp = require('gulp'),
	rename = require('gulp-rename'),
	pump = require('pump'),
	uglify = require('gulp-uglify');

gulp.task('scripts', function() {

	pump([
		gulp.src('jquery.cookie-banner.js'),
		uglify(),
		rename('jquery.cookie-banner.min.js'),
		gulp.dest('.')
	]);

});

gulp.task('default', function() {

	gulp.start('scripts');

});
