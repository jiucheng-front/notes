### 以下demo用到的node_module依赖包这里没有上传！测试的话自己安装
### 一、准备(day01)
### 什么是Javascript？
+ ...


### Javascript能做什么？
+ .....


### 浏览器中的Javascript可以做什么？
+ 操作DOM(增删改查)
+ AJAX/跨域
+ BOM
+ ECMAScript


### 浏览器中的Javascript不能做什么？
+ 文件操作
+ 没有办法操作系统信息
+ 由于运行环境


###### 编程语言的能力取决于？
+ 语言本身只是提供了定义变量、定义函数、定义类型、流程控制、循环结构之类的操作
+ 取决于运行该语言的平台（环境）
+ 对于js来说，经常说的JS实际是ES，大部分能力都是由浏览器的执行殷勤决定
+ BOM和DOM可以说是浏览器开放出来的接口
+ 比如：Cordova中提供JS调用摄像头，操作本地文件的API
+ Java既是语言也是平台
+ Java运行在Java虚拟机（跨操作系统）
+ PHP是语言也是平台
+ C#语言，平台：.net framework
+ C#可以运行在MONO这样的平台
+ 因为有人需要将C#运行在Linux平台，所以出现了MONO

###### Javascript只可以运行在浏览器中吗？
+ 不是
+ 能运行在哪里，取决于这个环境有没有特定的平台

### node是什么？(Ryan Dahl)
+ Node是javascript运行于服务端的运行环境
+ 注意：是Node选择了Javascript，不是Javascript发展出来一个Node

 
### Node的诞生
+ 2008年左右，随着AJAX的普及，WEB走向复杂化、系统化
+ 2009年2月Ryan Dahl想要创建一个轻量级，适应现代WEB开的平台
+ 2009年5月Ryan Dahl在GitHub中开源了最初版本，同年11月的JSConf就安排了NODE讲座
+ 2010年底Joyent公司资助，Ryan Dahl也加入了改公司，专门负责NODE的开发
+ 2011年7月在微软的支持下登录Windows平台

### Node在web中的用途
+ node开发的Application处理用户的所有请求和给用户的响应
+ 分发数据（调用NODE服务器接口,再去调用传统服务器）请求,渲染HTML页面

**总结：Node是Javascript的运行环境（平台），不是一门语言，也不是Javascript的框架。**

### 环境配置
+ 下载安装包
+ 安装过程

makdir .net->创建一个资源管理器不能创建的一些文件
node --use_strict->必须是严格模式
###### 匿名函数自执行的方式：
+ (function(){console.log(1)})()
+ +function(){console.log(1)}()
+ !function(){console.log(1)}()

### 全局对象
+ global（等价于客户端javascript的window对象）
+ process.stdin->标准输入(采集用户的输入)
+ process.stdout.write()->标准输出类似console.log();


###### 模板字符串``中间可以随意换行
+ var msg='hello';
+ var a=1;
+ process.stdout.write(`${msg} world`);
+ process.stdout.write(`${msg} world ${a}`);


### Debug
+ vs code编辑器里面可以调试
+ node debug XXX.js可以调试
+ node-inspector执行后打开127.0.0.1：8080页面调试（如：node-debug d.js此时会自动打开浏览器调试界面google）
+ devtool XXX.js也是调试有BUG


### 练习
+ ctrl+c终止当前进程
+ 简单的人际交互，如何在控制台接收用户的输入，如：e.js


### 异步操作
+ 现实
+ 程序>1、setTimeout();2、$.ajax()

### node中的异步操作
+ Node采用Chrome V8引擎处理Javascript脚本，V8最大的特点就是单线程运行，一次只执行一个任务。
+ Node大量采用异步操作(asynchronous operation)，即任务不是马上执行，而是插在任务队列的尾部，等到前面的任务运行完成后再执行
+ 提高代码的影响能力

### 什么是I/O
+ I/O【input/output】
+ 可以理解为从输入到输出之间的转化过程
+ 比如：敲键盘(输入)，看到编辑器出现字符(输出)
+ 移动鼠标(输入)，看到光标移动(输出)

### 回调函数的设计
+ 对于一个函数如果需要定义一个回调函数：
	+ 回调函数的一定作为参数的最后一个参数出现：1、function getFile(name,job,callback){}
	+ 回调函数的第一个参数默认接收错误信息，第二个参数才是真正的回调数据(便于外界获取调用的错误情况)；如：getFile('jason','coding',function(error,data){if(error) throw error;console.log(data);});
+ Node统一约定
   + 强调错误优先，因为之后的操作大部分都是异步方式，无法通过try catch捕获异常，所以错误优先的回调函数第一个参数为上一步的错误信息

###### 非阻塞I/O-->其实就是Node的核心特性

### 事件驱动和非阻塞机制
+ Node平台将一个任务连同该任务的回调函数放到一个事件循环系统中
+ 事件循环高效的管理系统池同时高效执行每一个任务
+ 当任务执行完成过后自动咨询回调函数

### 非阻塞的优势
+ 提高代码的响应效率
+ 充分利用单核CPU的优势
+ 改善I/O的不可预测带来的问题
+ 如何提高一个人的工作效率
+ 但是：目前大多数都是多核CUP

### 异步回调的问题(相对于传统的代码)
+ 异步事件驱动的代码
+ 不易阅读
+ 不易调试
+ 不易维护

### 进程和线程
######  1、进程(XXX.exe)
+ 每一个**正在运行**的应用程序称之为进程
+ 每一个应用程序至少有一个进程
+ 进程是用来给应用程序提供一个运行环境
+ 进程是操作系统为应用程序分配资源的一个单位

######  2、线程
+ 用来执行应用程序中的代码
+ 在一个进程内部，可以有多个线程
+ 在一个线程内部，同事只能做一件事
+ 而且传统的开发方式大部分都是I/O阻塞的
+ 所以需要多线程来更好的利用硬件资源
+ 给人一种错觉：线程越多越好


###  二、模块化结构(day02)
+ Node实现的CommonJS规范，所以可以使用模块化的方式组织代码结构
+ Node采用的模块化结果是按照CommonJS规范
+ 模块与文件是一一对应关系，即加载一个模块，实际上就是加载对应的一个模块文件

### CommonJS规范概述
+ CommonJS就是一套约定标砖，不是技术
+ 用于约定我们的代码应该是怎样的一种结构
+ http://wiki.commonjs.org/wiki/CommonJS

### CommonJS模块的特点
+ 所有代码都运行在模块作用域，不会污染全局作用域
+ 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果，要想让模块再次运行，必须清除缓存
+ 模块加载的顺序，按照其在代码中出现的顺序

### module对象
+ Node内部提供一个Module构建函数，所有模块都是Module的实例，属性如下：
 	+ module.id模块的识别符，通常是带有绝对路径的模块文件名
 	+ module.filename模块定义的文件的绝对路径
 	+ module.loaded返回一个布尔值，表示模块是否已经完成加载
 	+ module.parent返回一个对象，表示调用该模块的模块
 	+ module.children返回一个数组，表示该模块要用到的其他模块
 	+ **module.exports表示模块对外输出的值！**
+ 载入一个模块就是构建一个Module实例

### 模块的定义
+ 一个新的JS文件就是一个模块
+ 一个合格的模块应该是有导出成员的，否则模块就失去了第一的意义
+ 模块内部是一个独立(封闭)的作用域，模块之间不会冲突
+ 模块之间必须通过导出导入的方式协同
+ 导出方式：
	+ exports.name=value;
	+ module.exports={name:value};
+ **此时就没必要在模块内部写自执行函数了！！**
+ module.exports和exports
+ module.exports是用于为模块导出成员的接口
+ exports是指向module.exports的别名，相当于在模块开始的时候执行：var exports=module.exports;
+ 一旦为module.exports赋值，就会切断之前两者的相关性
+ 最终模块的导出成员以module.exports为准

### 模块的分类
+ 文件模块：就是我们自己写的功能模块文件
+ 核心模块：Node平台自带的一套基本的功能模块，也有人称之为Node平台的API
+ 第三方模块：社区或第三方个人开发好的功能模块，可以直接拿来用

### 模块化开发的流程
+ 创建模块：new some.js
+ 导出成员：module.exports={}
+ 载入模块：var some=require('./some.js');
+ 使用模块：some.add(1，2);

### 模块内全局环境(伪)
+ 我们之后的文件操作中必须使用绝对路径
+ __dirname：用于获取当前文件所在目录的完整路径，在REPL环境无效
+ __filename:用来获取当前文件的完整路径，在REPL环境同样无效
+ module:模块对象
+ exports:映射到module.exports的别名
+ require():require.cache、require.extensions、require.main、require.resolve()

### 练习：命令行下的计算器，c.js和e.js
+ c.js里是非模块化的
+ e.js是模块化的(CommonJS规范)
+ module.exports={a,b,c};ES6的'自动属性'

### 模块的载入：require函数简介
+ node使用CommonJS模块规范，内置的require函数用于加载模块的文件
+ require的基本功能是：读取并执行一个javascript文件，然后返回该模块的exports对象
+ 如果没有发现指定的模块会报错！

### require扩展名：规则>描述的越详细越准确，类似CSS的选择器优先级
+ require加载文件时可以省略扩展名：require('./module1')
	+ 此时会默认先找require('./module1.js');
	+ 如果默认的.js文件不存在接下来会继续默认找require('./module1.json');

### 加载文件规则
+ 通过"./"或"../"开头：则按照相对路径熊当前文件所在文件夹开始寻找模块：require('../xxx.js')>上级目录下找xxx.js文件;
+ 通过/开头：则以系统根目录开始寻找模块：require('/Users/xxx/Documents/sss.js')>以绝对路径的方式找，无意义！;
+ 如果参数字符串不以"./"或者"/"开始，则表示加载的是一个默认提供的核心模块(位于Node的系统安装目录中)：require('fs')、require('http')、require('path')等等;
+ 或者从当前目录向上搜索node_modules目录中的文件：require('my_module')>各级node_modules夹中搜索my_nodule.js文件;
+ 如果require传入的是一个目录的路径，会自动查看该目录的package.json文件，然后加载main字段指定的入口文件
+ 如果package.json文件没有main字段，或者根本就没有package.json文件，则默认找目录下的index.js文件作为模块：require('./filesModule')>当前目录下找filesModule目录中的index.js文件;

### 注意require('filename')：
+ 加载的模块名字如果跟系统的模块冲突，系统的优先级最高！
+ 就近原则去找node_modules文件夹下的filename文件

### require的实现机制：自定义的的$require,g.js和模块module2.js
+ 将传入的模块的ID通过加载规则找到对应的模块文件
+ 读取这个文件里面的代码
+ 通过拼接的方式为该段代码构建私有空间
+ 执行该代码
+ 拿到module.exports返回

### __dirname与__filename:如f.js
+ __dirname当前文件所在目录的完整路径
+ __filename当前文件的完整路径


### 思考与练习：
+ 1、如何定义和导入模块？
+ 2、如何使用模块化的方式组织代码结构？
+ 3、载入模块的规则
+ 4、了解模块的加载机制
+ 5、自定义一个$require类似require,如$require下面的：index.js

### 模块的缓存:如h.js
+ 第一次加载某个模块时，Node会缓存该模块，以后再加载该模块就直接从缓存取出该模块的module.exports属性(不会再次执行该模块);
+ 如果需要多次执行模块中的代码，一般可以让模块暴露行为(函数)
+ 模块的缓存可以通过require.cache拿到，同样也可以删除

### 缓存是如何实现(如：i.js)

### 如何删除缓存(如：i.js)，一般不会删除缓存
+ 缓存require.cache


### 三、Node：核心模块、文件操作、文件流、网络操作(day03)

### 1、核心模块
+ 核心模块的意义：
	+ 如果只是在服务器运行javascript代码，意义不大，因为无法实现任何功能(读写文件，访问网络)
	+ Node的用处在于它本身还提供的一系列功能模块，用于操作系统运动
	+ 这些核心的功能模块在Node中的内置

+ 内置的有如下模块
	+ <a href='http://nodejs.org/api/path.html' target='_blank'>path</a>：处理文件路径
	+ <a href='http://nodejs.org/api/fs.html' target='_blank'>fs</a>：操作文件系统
	+ <a href='http://nodejs.org/api/child_process.html' target='_blank'>child_process</a>：新建子进程
	+ <a href='http://nodejs.org/api/util.html' target='_blank'>util</a>：提供一些列实用的小工具
	+ <a href='http://nodejs.org/api/http.html' target='_blank'>http</a>：提供HTTP服务器功能
	+ <a href='http://nodejs.org/api/url.html' target='_blank'>url</a>：用于解析URL
	+ <a href='http://nodejs.org/api/querystring.html' target='_blank'>querystring</a>：解析URL中的查询字符串
	+ <a href='http://nodejs.org/api/crypto.html' target='_blank'>crypto</a>：提供加密和解密功能(MD5是不可逆，无法解密！！)
	+ <a href='https://nodejs.org/api/' target='_blank'>其他</a>

### Node Package
由于Node是一套轻内核的平台，虽然提供了一系列的内置模块，但是不足以满足开发者的需求，于是出现了包(Package)的概念。与核心模块类似，就是讲一些预先设计好的功能或者API封装到一个文件夹，提供给开发者使用
###### 1）：包的加载机制
+ 与内置模块相同，同样使用require方法,如：const express=require('express');
+ 加载机制也和内置模块加载机制相同
+ 加载注意事项：
	+ 先在系统核心(优先级最高)的模块中找
	+ 然后再到当前项目中的：node_mocules目录中去找

###### 2）：如何管理好自己的包
+ 由于Node本身并没有太多的功能性API。所以市面上涌现出大量的第三方人员开发出来的Package
+ 包的生态圈一旦繁荣起来，就必须有工具去代替人脑或者文档的方式去管理
+ 此时NPM诞生了~

### NPM（Node Package Manager）
+ 随着时间的发展，NPM出现了两层概念：
	+ 一层韩式是Node的开放式模块登记和管理系统，也可以说是一个生态圈，一个社区
	+ 另一层含义是Node默认的模块管理器，是一个命令行下的软件，用来安装和管理Node模块
+ 官方地址：https://www.npmjs.com/
+ 国内加速镜像地址：https://npm.taobao.org/

###### 1）：安装NPM
+ NPM不需要单独安装，默认在安装Node的时候会自动一起安装NPM
+ 但是Node附带的NPM可能不是最新版本，最好用下面的命令更新到最新版本：$ npm install npm -g
+ 默认安装到当前系统Node所在的目录下
+ 由于之前使用NVM的方式安装的Node所以需要重新配置NPM全局目录

###### 2）：配置NPM的全局目录?
+ npm config set prefix [filepath]
+ 将NPM目录配置到其他目录时，必须将该目录放到环境变量中，否则无法在全局使用

###### 3）：NPM常用命令->https://docs.npmjs.com/
+ npm config [ls|list|set|get] [name] [value]
+ npm init [--yes|-y]
+ npm search [name]
+ npm info [name]
+ npm install [--global|-g] [name]
+ npm uninstall [--global|-g] [name]
+ npm list [--global|-g]
+ npm outdated [--global|-g]
+ npm update [--global|-g] [name]
+ npm run [task]
+ npm cache [clean]

## 2、文件操作(important)
Node内核提供了很多与文件操作相关的模块，每个模块都提供了一些最基本的操作API，在NPM中也有社区提供的功能包
###### fs:
+ 基础的文件操作API
###### path:
+ 提供和路径相关的操作API
###### readline:（day03/code/07.js）
+ 用于读取大文本文件，一行一行读
###### fs-extra:(第三方)
+ https://www.npmjs.com/package/fs-extra

### 1):文件读取
+ 异步文件读取
	+ <p><code>fs.readFile(file[,options],callback(err,data))</code></p>
+ 同步文件读取
	+ <p><code>fs.readFileSync(file,[,option])</code></p>
+ 文件流的方式读取（后面单独介绍）
	+ <p><code>fs.createReadStream(path[, options])</code></p>
+ readline 模块逐行读取文本
<pre><code>
const readline = require('readline');
const fs = require('fs');
 
const rl = readline.createInterface({
  input: fs.createReadStream('sample.txt')
});
 
rl.on('line', (line) => {
  console.log('Line from file:', line);
});

</code></pre>

### 2）:同步或者异步调用(如：day03/code/02.js)
+ fs模块对文件的几乎所有操作都有同步和异步两种形式
	+ readFile() 
	+ readFileSync()
+ 区别：
	+ 同步调用会阻塞代码的执行，异步则不会
	+ 异步调用会将读取任务下达到任务队列，直到任务执行完成才会回调
	+ 异常处理方面，同步必须使用 try catch 方式，异步可以通过回调函数的第一个参数
	+ 同步比异步更加耗费时间

### 3）：路径模块
+ 在文件操作中，都必须使用物理路径(绝对路径)，
+ path模块提供了一些列与路径相关的API
	+ path.join([p1][,p2][,p3])=>连接多个路径
	+ path.basename(p,ext)=>获取文件名
	+ path.dirname(p)=>获取文件夹路径
	+ path.extname(p)=>获取文件扩展名
	+ path.format(obj)和path.parse(p);
	+ path.relative(from,to)=>获取从from到to的相对路径

### 4)：什么是缓冲区
+ 缓冲区就是内存中操作数据的容器
+ 只是数据的容器而已
+ 通过缓冲区可以很方便的操作二进制数据
+ 而且在大文件操作时必须有缓冲区

###### 如果读取文件没有指定编码的话，默认读取的是一个Buffer(缓冲区)
+ Buffer的作用，对咱们目前的情况来说只很少使用场景
	+ 将图片转成BASE64编码(code/04.js)
	+ 对文字进行BASE64编码

### 4）：为何要有缓冲区
+ JS是比较擅长处理字符串，但是早起的应用场景主要用于处理HTML文档，不会有太大批次的数据处理，也不会接触到二进制的数据
+ 而在Node中操作数据、网络通信是没办法完全以字符串的方式操作的
+ 所以在Node中引入了一个二进制的缓冲区的实现：Buffer
+ buf.toString([encoding[, start[, end]]])这里也可以设置编码：如code/03.js

###### 练习：控制台一行一行输出歌词(如：day03/code/05.js)
+ code/05.js
+ code/07.js

### 5)：文件写入
+ 确保操作没有额外的问题，一定使用绝对路径的方式
+ 异步文件写入：
	+ <p><code>fs.writeFile(file,data[,option],callback(err))</code></p>
+ 同步文件写入：
	+ <p><code>fs.writeFileSync(file,data[,option])</code></p>
+ 流式文件写入
	+ <p><code>fs.createWriteStream(path[,option])</code></p>
+ 默认写入文件是覆盖源文件
+ 异步追加
	+ <p><code>fs.appendFile(file,data[,options],callback(err))</code></p>
+ 同步追加
	+ <p><code>fs.appendFileSync(file,data[,options])</code></p>

###### 练习：
+ a:计算工资所得税
+ b:获取一个根目录中的所有文件(day03/code/11.js)
	+ 打印文件列表（day03/code/11.js）
	+ 递归打印树状结构（day03/code/12.js）

### 6）：其他文件操作
+ 验证路径是否存在（过时的API）
	+ <p><code>fs.exists(path,callback(exists))</code></p>
	+ <p><code>fs.existsSync(path) // => 返回布尔类型 exists</code></p>
+ 获取文件信息
	+ <p><code>fs.stat(path,callback(err,stats))</code></p>
	+ <p><code>fs.statSync(path) // => 返回一个fs.Stats实例</code></p>
+ 移动文件
	+ <p><code>fs.rename(oldPath,newPath)</code></p>
+ 重命名文件或目录
	+ <p><code>fs.rename(oldPath,newPath,callback)</code></p>
	+ <p><code>fs.renameSync(oldPath,newPath)</code></p>
+ 删除文件
	+ <p><code>fs.unlink(path,callback(err))</code></p>
	+ <p><code>fs.unlinkSync(path)</code></p>

### 7)：目录操作
+ 创建一个目录
	+ <p><code>fs.mkdir(path[,model],callback)</code></p>
	+ <p><code>fs.mkdirSync(path[,model])</code></p>

+ 删除一个空目录
	+ <p><code>fs.rmdir(path,callback)</code></p>
	+ <p><code>fs.rmdirSync(path)</code></p>

+ 读取一个目录
	+ <p><code>fs.readdir(path,callback(err,files))</code></p>
	+ <p><code>fs.readdirSync(path) // => 返回files</code></p>

###### 练习
+ 获取一个根目录中的所有的文件
+ 打印文件列表
+ 递归打印树状结构

### 8）：监视文件
+ <p><code>fs.watchFile(filename[, options], listener(curr,prev))</code></p>
	+ <p><code>options:{persistent,interval}</code></p>
+ <p><code>fs.watch(filename[,options][,listener])</code></p>
+ 练习：实现LESS自动转换


### Node服务器端开发第4天
### 文件流、网络操作、服务端Web开发基础
### 一、文件监视：利用文件监视实现自动markdown文件转换为HTML(day04/README.MD)
+ day04/code/04.js是自动将README.md文件转换为README.html文件的完整版本,且引入了browserSync实时监听README.md文件实时刷新浏览器

### 二、文件流
+ 在node的文档中经常见到Stream（流）
+ 什么是流？
	+ 文件流、网络流
	+ 任何数据的最根本
	+ 表现形式都是二进制的
	+ 文件流就是以面向对象的概念对文件数据进行的抽象
	+ 文件流定义了一些对文件数据的操作方式
	+ 练习大文件的拷贝(day04/code/07-08.js)

### 三、网络操作(node内部与网络操作相关的模块)
###### 经典面试题：一个网页从你在URL地址栏输入地址敲回车到页面展现在你面前都发生了什么？？？？？
#### 1、相关模块
+ url
	+ 用于解析URL格式的模块

+ querystring
	+ 用于操作类似k1=v1&k2=v2的查询字符串

+ http
	+ 用于创建HTTP服务器或HTTP客户端

### 客户端与服务端
1、什么是客户端？
主动发起请求的统称为客户端

2、什么是服务端？

3、客户端和服务端是如何通信的？

4、通信的协议是什么？通信的数据格式是什么？

#### Socket服务端：客户端与服务端之前的一个桥梁
1、创建一个服务端必须监听一个端口，否则没有任何意义。例子如：server.js和client.js，且（chatroom）

2、客户端机制，客户端程序client.js
+ 1、确切的知道服务端在哪(IP)
+ 2、确切知道服务端监听的是哪个端口
<p><code>var socket=net.connect(...)</code><p>