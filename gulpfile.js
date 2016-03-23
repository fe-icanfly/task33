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
    htmlmin = require('gulp-htmlmin'), //html压缩
    autoprefixer = require('gulp-autoprefixer'), //浏览器前缀添加
    imagemin = require('gulp-imagemin'), //浏览器前缀添加
    fileinclude = require('gulp-file-include'), //文件包含
    webpack = require('webpack-stream'), //webpack打包加入gulp流处理
    rev = require('gulp-rev'), //生成md5序列
    revCollector = require('gulp-rev-collector'), //替换静态文件（添加版本号）
    webpackConfig = require('./webpack.config'); //引入webpack配置文件



/**
 * 常量
 */
var htmlminOptions = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
};
var BUILDDIR = 'dist'; //构建的产出目录



/**
 * 初始化服务
 */
//删除dist文件夹
gulp.task('clean:dist', function() {
    del(['dist']);
});
gulp.task('clean:js', function() {
    del(['dist/js']);
});
gulp.task('clean:css', function() {
    del(['dist/css']);
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
// gulp.task('server', function() {
//     browserSync.init({
//         files: "**",
//         server: "./dist",
//         port: 3000,
//         routes: {
//             '/third': 'views/sec'
//         },
//         //中间件
//         middleware: function(req, res, next) {
//             console.log('hi middleware');
//             next();
//         }
//     });
// });
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
    console.log("++++++++++++++++++++++++++++++++++++++++++++")
    gulp.src(BUILDDIR + '/views/*.html')
        .pipe(connect.reload());
});
gulp.task('reloadJS', function() {
    console.log("++++++++++++++++++++++++++++++++++++++++++++")
    gulp.src(BUILDDIR + '/js/**/**')
        .pipe(connect.reload());
});
gulp.task('reloadCss', function() {
    console.log("++++++++++++++++++++++++++++++++++++++++++++")
    gulp.src(BUILDDIR + '/css/**.css')
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
    gulp.watch('views/**', ['viewsBuild', 'reloadHtml'])
        .on('change', function(event) {
            console.log("................. reload html ......................");
            return gulp.src(event.path)
                .pipe(plumber())
                .pipe(rev())
                .pipe(gulp.dest('./' + BUILDDIR + '/js/pages'))
                .pipe(rev.manifest())
                .pipe(gulp.dest('rev/js'));
        });
    //css watch
    gulp.watch('static/less/**', ['less', 'reloadCss'])
        .on('change', function(event) {
            console.log('[css] File ' + event.path + ' was ' + event.type + ' Done...');
            return gulp.src(event.path)
                .pipe(plumber())
                .pipe(rev())
                .pipe(gulp.dest('./' + BUILDDIR + '/js/pages'))
                .pipe(rev.manifest())
                .pipe(gulp.dest('rev/css'));
        });
    //js watch
    gulp.watch('static/js/**', ['pagesBuild_dev', 'reloadJS']).on('change', function(event) {
        console.log('[js] File ' + event.path + ' was ' + event.type + ' Done...............');
        gulp.src(event.path)
            .pipe(plumber())
            .pipe(rev.manifest())
            .pipe(gulp.dest('rev/js'));
    });
});

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
 */
gulp.task('viewsBuild', function() {
    return gulp.src('views/**/*.html')
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest(BUILDDIR + '/views'))
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
gulp.task('less_rev', function() {
    return gulp.src('static/less/*.less')
        .pipe(plumber())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android < 4.0', 'Firefox < 20', '> 5%'],
        }))
        .pipe(csso())
        .pipe(rev())
        .pipe(gulp.dest(BUILDDIR + '/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));

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
    gulp.src('static/js/pages/*.js')
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(uglify())
        .pipe(gulp.dest(BUILDDIR + '/js'))

});
gulp.task('pagesBuild_dev', function() {
    gulp.src('static/js/**/**')
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./' + BUILDDIR + '/js/pages'))

});
/*
带版本号的js打包处理
 */
gulp.task('jsBuild_dev_rev', function() {
    gulp.src('static/js/**/*.js')
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./' + BUILDDIR + '/js/pages'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));

});
gulp.task('jsBuild', function() {
    gulp.start(['pagesBuild', 'libBuild']);
});
gulp.task('jsBuild_dev', function() {
    gulp.start(['pagesBuild_dev', 'libBuild']);
});


/**
 * 版本号管理
 */
gulp.task('rev:js', function() {
    return gulp.start('clean:js', function() {
        return gulp.start('jsBuild_dev_rev', function() {
            console.log("js更新版本号成功");
        });
    });

});
gulp.task('rev:css', function() {
    return gulp.start('clean:css', function() {
        return gulp.start('less_rev', function() {
            console.log("css更新版本号成功");
        });
    });
});
gulp.task('rev', function() {
    return gulp.src(['rev/**/*.json', 'views/*.html'])
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(revCollector())
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest(BUILDDIR + '/views'));
});
/**
 * 开发gulp工程，
 * 1、运行CSS压缩编译
 * 2、JS打包但不压缩（利于开发debug）
 * 3、图片压缩，改动监听
 * 4、启动本地服务
 */
gulp.task('dev', function() {
    return gulp.start(["less", "viewsBuild", 'jsBuild_dev', 'imagesBuild'], function() {
        console.log("bulid css js =====");
        return gulp.start(['server'], function() {
            console.log("start server ======")
            require('opn')('http://127.0.0.1:3000/views');
            return gulp.start(['watch'], function() {
                console.log("start watch =========")
            });
        });
    });
});
gulp.task('pro', function() {
    return gulp.start(["rev:css", "rev", "imagesBuild"], function() {
        return gulp.start("rev:js",function(){
            gulp.start(["rev", "imagesBuild"],function(){
                console.log("完成");
            })
        })
    });
});