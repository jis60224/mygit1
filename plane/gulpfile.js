
//引入插件
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifiCss = require('gulp-minify-css');

//创建任务
//css压缩
gulp.task('testCss',function(){
	gulp.src('css/*')
	.pipe(minifiCss())
	.pipe(gulp.dest('css1'))
})
//gulp.task('default',['testCss']);

//js压缩
gulp.task('testJs',function(){
	gulp.src('js1/*')
	.pipe(uglify())
	.pipe(gulp.dest('js'))
})
gulp.task('default',['testJs']);











