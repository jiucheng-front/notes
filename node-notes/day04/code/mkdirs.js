'use strict';
//创建层级目录
const fs=require('fs');
const path=require('path');
//创建文件，定义模块成员，导出模块成员，载入模块，使用模块

function mkdirs(pathname,callback){
    //1、判断传入的是否是一个绝对路径
    //E:\github\aboutnodejs\node\day04\code\demo02\demo03
    //__dirname:E:\github\aboutnodejs\node\day04\code
    pathname=path.isAbsolute(pathname)?pathname:path.join(__dirname,pathname);
    
    //获取要创建的部分
    // pathname=pathname.replace(__dirname,'');
    var relativepath=path.relative(__dirname,pathname);
    // console.log(relativepath);
    var folders=relativepath.split(path.sep);
    // console.log(folders);
    try {
        //
        var pre='';
        folders.forEach(folder=>{
           fs.mkdirSync(path.join(__dirname,pre,folder));
           pre=path.join(pre,folder);
        });
        callback&&callback(null);
    } catch (error) {
        callback&&callback(error);
    }
}
module.exports=mkdirs;