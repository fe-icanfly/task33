/**
 * 引入Gulp相关插件
 */
//基础设施==
var gulp = require('gulp'),
    path = require('path'),
    connect = require('gulp-connect'), //自动刷新
    serveStatic = require('serve-static'), //静态文件服务
    del = require('del'), //文件删除
    plumber = require('gulp-plumber'), //错误处理
    shell = require('gulp-shell'); //gulp shell命令
//页面处理==  
var uglify = require('gulp-uglify'), //js压缩
    useref = require('gulp-useref'), //html静态资源处理
    concat = require('gulp-concat'), //文件合并
    less = require('gulp-less'), //less编译
    csso = require('gulp-csso'), //css压缩
    autoprefixer = require('gulp-autoprefixer'), //浏览器前缀添加
    amdOptimize = require('amd-optimize'), //AMD压缩合并
    livereload = require('gulp-livereload'), //自动刷新页面
    fileinclude = require('gulp-file-include'), //文件包含
    imagemin = require('gulp-imagemin'), //图片压缩
    cdn = require('gulp-cdn-replace');



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

/*
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
                })
            })
        });
    //image watch
    gulp.watch('static/img/**', ['imagesBuild'])
        .on('change', function(event) {
            return gulp.start(['imagesBuild'], function() {
                console.log('[img] File ' + event.path + ' was ' + event.type + ' Done...');
                return gulp.start(['reloadHtml'], function() {
                    console.log("................. reload html ......................");
                })
            })
        });
    //css watch
    gulp.watch('static/less/**')
        .on('change', function(event) {
            return gulp.start(['less'], function() {
                console.log('[css] File ' + event.path + ' was ' + event.type + ' Done...');
                return gulp.start(['reloadHtml'], function() {})

            })
        });
    //js watch
    gulp.watch('static/js/**')
        .on('change', function(event) {
            return gulp.start(['pagesBuild_dev'], function() {
                console.log('[js] File ' + event.path + ' was ' + event.type + ' Done...............');
                return gulp.start(['reloadHtml'], function() {
                    console.log("................. reload html ......................");
                })
            });
        });
});







/**
 * 图片构建相关
 */

//图片压缩
gulp.task('imageMin', function() {
    gulp.src('static/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest(BUILDDIR + '/img'));
});

//imagesBuild
gulp.task('imagesBuild', function() {
    gulp.start('imageMin');
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
        }))
        .pipe(useref({
            'noAssets': true, //资源不处理，只处理路径
        }))
        .pipe(gulp.dest(BUILDDIR + '/views'));
});
gulp.task('viewsBuild_pro', function() {
    return gulp.src('views/**/*.html')
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
        }))
        .pipe(useref({
            'noAssets': true, //资源不处理，只处理路径
        }))
        .pipe(cdn({
            dir: './dist',
            root: {
                js: 'http://j1.58cdn.com.cn/crop/m/bang/58zhaocaimao',
                css: 'http://c.58cdn.com.cn/crop/m/bang/58zhaocaimao'
            }
        }))
        .pipe(gulp.dest(BUILDDIR + '/views'));
});
/*
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
        .pipe(fileinclude({
            prefix: '@@',
        }))
        .pipe(uglify())
        .pipe(gulp.dest(BUILDDIR + '/js'))
});
gulp.task('pagesBuild_dev', function() {
    gulp.src('static/js/**/*.js')
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
        }))
        .pipe(gulp.dest(BUILDDIR + '/js'))
});
gulp.task('jsBuild', function() {
    gulp.start(['pagesBuild', 'libBuild']);
});
gulp.task('jsBuild_dev', function() {
    gulp.start(['pagesBuild_dev', 'libBuild']);
});

/*
 *
 * 构建完成后，html文件添加版本号
 * 
 */
gulp.task('dev', function() {
    // gulp.start(["clean:dist"], function() {
    // console.log("delete dist =====");
    return gulp.start(["less", "viewsBuild", 'jsBuild_dev', "imagesBuild"], function() {
        console.log("bulid css js =====");
        return gulp.start(['server'], function() {
            console.log("start server ======")
            return gulp.start(['watch'], function() {
                console.log("start watch =========")
                require('opn')('http://10.252.159.73:3000');
            });
        });
    });
    // });
});

gulp.task('pro', function() {
    // gulp.start(["clean:dist"], function() {
    // console.log("delete dist =====");
    return gulp.start(["less", "viewsBuild_pro", 'jsBuild', 'imagesBuild'], function() {
        console.log("完成");
    });
    // });
});
