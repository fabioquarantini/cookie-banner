var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');


gulp.task('scripts', function() {

	return gulp.src('jquery.cookie-banner.js')
		.pipe(uglify({
			preserveComments: 'some',
		}))
		.pipe(rename("jquery.cookie-banner.min.js"))
		.pipe(gulp.dest('.'));

});


gulp.task('default', function() {

	gulp.start('scripts');

});
