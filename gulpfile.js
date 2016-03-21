/**
 * 引入Gulp相关插件
 */
//基础设施==
var gulp = require('gulp'),
    path = require('path'),
    connect = require('gulp-connect'), //自动刷新
    del = require('del'), //文件删除
    plumber = require('gulp-plumber'); //错误处理
//页面处理==  
var uglify = require('gulp-uglify'), //js压缩
    less = require('gulp-less'), //less编译
    csso = require('gulp-csso'), //css压缩
    autoprefixer = require('gulp-autoprefixer'), //浏览器前缀添加
    fileinclude = require('gulp-file-include'), //文件包含
    livereload = require('gulp-livereload'), //自动刷新页面
    webpack = require('webpack-stream'), //webpack打包加入gulp流处理
    webpackConfig = require('./webpack.config'); //引入webpack配置文件



/**
 * 常量
 */
var BUILDDIR = 'dist'; //构建的产出目录



/**
 * 初始化服务
 */
//删除dist文件夹
gulp.task('clean:dist', function() {
    del(['dist']);
});
gulp.task("shell", function() {
    return gulp.src('*.js', {
            read: false
        })
        .pipe(shell([
            'scp -r $(pwd)"/dist" work@192.168.119.121:/opt/web/static/test/mingt',
        ]));
});
//本地启动
gulp.task('server', function() {
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
});
/*
 * 页面自动刷新
 */
gulp.task('reloadHtml', function() {
    gulp.src(BUILDDIR + '/views/*.html')
        .pipe(connect.reload());
});

/**
 *
 *   页面监听
 *
 */

/**
 * watch
 */
gulp.task('watch', function() {
    //views watch
    gulp.watch('views/**')
        .on('change', function(event) {
            return gulp.start(['viewsBuild'], function() {
                console.log('[views] File ' + event.path + ' was ' + event.type + ' Done...........');
                return gulp.start(['reloadHtml'], function() {
                    console.log("................. reload html ......................");
                });
            });
        });
    //css watch
    gulp.watch('static/less/**')
        .on('change', function(event) {
            return gulp.start(['less'], function() {
                console.log('[css] File ' + event.path + ' was ' + event.type + ' Done...');
                return gulp.start(['reloadHtml'], function() {});

            });
        });
    //js watch
    gulp.watch('static/js/**')
        .on('change', function(event) {
            return gulp.start(['pagesBuild_dev'], function() {
                console.log('[js] File ' + event.path + ' was ' + event.type + ' Done...............');
                return gulp.start(['reloadHtml'], function() {
                    console.log("................. reload html ......................");
                });
            });
        });
});






/**
 * 页面处理
 * TODO 需要在页面中处理，参见example目录中gulp-useref.html
 * useref处理要和amdOptimize保持一致（TODO css合并还未添加）
 */
gulp.task('viewsBuild', function() {
    return gulp.src('views/**/*.html')
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(BUILDDIR + '/views'));
});
gulp.task('viewsBuild_pro', function() {
    return gulp.src('views/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest(BUILDDIR + '/views'));
});
/**
 *   
 *   CSS处理
 *   Less编译
 */
gulp.task('less', function() {
    return gulp.src('static/less/*.less')
        .pipe(plumber())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android < 4.0', 'Firefox < 20', '> 5%'],
        }))
        .pipe(csso())
        .pipe(gulp.dest(BUILDDIR + '/css'))
});
/*
 *      js处理
 *      lib文件夹直接复制，pages不压缩，dev工程不合并，pro压缩混淆合并
 *
 */
gulp.task("libBuild", function() {
    gulp.src('lib/**/*')
        .pipe(plumber())
        .pipe(gulp.dest(BUILDDIR + '/lib'));
});
gulp.task("pagesBuild", function() {
    gulp.src('static/js/**/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(BUILDDIR + '/js'))
});
gulp.task('pagesBuild_dev', function() {
    gulp.src('static/js/**/*.js')
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./' + BUILDDIR + '/js/pages'))
});
gulp.task('jsBuild', function() {
    gulp.start(['pagesBuild', 'libBuild']);
});
gulp.task('jsBuild_dev', function() {
    gulp.start(['pagesBuild_dev', 'libBuild']);
});


/**
 * 
 * @param  {[type]} ) {n]
 * @return {[type]}   [description]
 */
gulp.task('dev', function() {
    return gulp.start(["less", "viewsBuild", 'jsBuild_dev'], function() {
        console.log("bulid css js =====");
        return gulp.start(['server'], function() {
            console.log("start server ======")
            return gulp.start(['watch'], function() {
                console.log("start watch =========")
                require('opn')('http://127.0.0.1:3000/views');
            });
        });
    });
});

gulp.task('pro', function() {
    return gulp.start(["less", "viewsBuild_pro", 'jsBuild'], function() {
        console.log("完成");
    });
});