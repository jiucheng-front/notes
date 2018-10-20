//Markdown文件自动转换
'use strict';

const fs=require('fs');
const path=require('path');
const marked=require('marked');

//2、把需要转换的文件作为参数
//接收需要转换的文件路径
const target=path.join(__dirname,process.argv[2]||'../README.md');

//3、监视文件的变化
fs.watchFile(target,(curr,prev)=>{
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
            fs.writeFile(target.replace(path.extname(target),'.html'),html,'utf8');
        });
        // //console.log(html);
        // //把转换的内容添加到html模板内
        // html=template.replace('{{{content}}}',html);
        // //3-4写入一个新建的html文件
        // //注意：markdown文件后缀名字：可能是：.marked/.markdown
        // //path.extname(target)获取扩展名
        // fs.writeFile(target.replace(path.extname(target),'.html'),html,'utf8');
    });
});
//4、1定义个一个html模板
var template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>markdown自动转换的HTML</title>
  <style>{{{styles}}}</style>
</head>
<body>
  <div class="vs">
    {{{content}}}
  </div>
</body>
</html>
`;