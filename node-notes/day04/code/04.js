//Markdown文件自动转换
'use strict';

const fs=require('fs');
const path=require('path');
const marked=require('marked');

//6、引入borwsersync，创建一个文件服务器
// require the module as normal
var browserSync = require("browser-sync");

//2、把需要转换的文件作为参数
//接收需要转换的文件路径
const target=path.join(__dirname,process.argv[2]||'../README.md');
//6-3 转换为HTML后的保存位置
var fileName=target.replace(path.extname(target),'.html');

//6-4 获取HTML文件名
var indexPath=path.basename(fileName);


// Start the server
// 6-1 browserSync({server: "./app"});
browserSync({
    notify:false,//改动README.md文件时候浏览器右上角的小提示，false就会关闭
    server: path.dirname(target),//网站根目录
    index:indexPath//默认的文件，这里是：README.html
    //一般浏览器地址下会以index.html为默认文档，可以这样配置更换默认文档
});


//3、监视文件的变化，一旦文件变化就会触发该函数
fs.watchFile(target,{interval:200},(curr,prev)=>{
    // console.log(`current:${curr.size};previous:${prev.size}`);
    //3-1判断文件有没有变化
    if(curr.mtime==prev.mtime){
        //没有变化
        return false;
    }
    //3-2读取文件转换为新的HTML
    fs.readFile(target,'utf8',(err,content)=>{
        if(err){
            throw err;
        }
        //3-3 npm install marked安装
        var html=marked(content);
        //5-1引入CSS:读取css文件再引入到html模板的style标签内
        fs.readFile(path.join(__dirname,'github.css'),'utf8',(err,css)=>{
            html=template.replace('{{{content}}}',html).replace('{{{styles}}}',css);
            // var fileName=target.replace(path.extname(target),'.html');

            fs.writeFile(fileName,html,'utf8',
            (err)=>{
                //6-2 通过browserSync刷新浏览器
                //此时只要：执行node 04 ../README.md 浏览器会自动打开localhost:3000
                //README.md文件有改动localhost:3000/README.html会自动刷新
                browserSync.reload(indexPath);
                console.log('updated@'+new Date);
            });
        });
    });
});
//4、1定义个一个html模板
var template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>自动生成的README.html</title>
  <style>{{{styles}}}</style>
</head>
<body>
  <div class="vs">
    {{{content}}}
  </div>
</body>
</html>
`;

//code下执行：node 04 ../README.md 浏览器会自动打开localhost:3000地址
//并且以README.html为index.html显示，当README.md文件有改动时候该地址会自动刷新