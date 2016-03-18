## 启动项目
首先安装gulp（如果已经安装请跳过此步骤）
```
npm -g install gulp
```
在项目下运行，浏览器会自动打开项目
```
npm install
gulp dev
```

## 插件简介

下面将介绍本例所用的插件[戳这里，这里有gulp直达gulp插件官网](http://gulpjs.com/plugins/)

* gulp-autoprefixer

> 自动添加css浏览器私有前缀，你只需要配置需要兼容的浏览器版本即可
> [点击查看详细API](https://github.com/postcss/autoprefixer#options)

* gulp-connect

> gulp内置web服务器

* gulp-csso

> css压缩处理

* gulp-file-include

> 文件包含

### example

index.html
```
<!DOCTYPE html>
<html>
  <body>
  @@include('./view.html')
  @@include('./var.html', {
    "name": "haoxin",
    "age": 12345,
    "socials": {
      "fb": "facebook.com/include",
      "tw": "twitter.com/include"
    }
  })
  </body>
</html>
```
view.html
```
<h1>view</h1>
```
gulp产出的html文件
```
<!DOCTYPE html>
<html>
	<body>
		<h1>view</h1>
		<label>haoxin</label>
		<label>12345</label>
		<strong>facebook.com/include</strong>
		<strong>twitter.com/include</strong>
	</body>
</html>
```
* gulp-less

> less文件编译

* gulp-livereload

> 页面的自动刷新

* gulp-plumber

> 用于处理错误信息

* gulp-shell

> 执行一段shell脚本，这个在Linux系统和MacOS上大有用处，但在Windows下，用处大打折扣

* gulp-uglify

> JS压缩混淆处理

* webpack-stream

> webpack打包处理

# 公用JS，常用的一些方法

## 58类库汇总
* [58ap](http://webapptest.58.com/static/doc/58app/index.html#!/api/app58)
* 58app交互（web&native）核心JS库 远程路径：http://pic2.58.com/m58/app58/m_static/js/app.js 模版引用：$rescachehelper.getResource(20264)

