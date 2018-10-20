'use strict';
//创建层级目录
const fs=require('fs');
const path=require('path');
//创建文件，定义模块成员，导出模块成员，载入模块，使用模块

function mkdirs(pathname,callback){
    //module.parent调用者的对象02.js
    var root=path.dirname(module.parent.filename);
    // console.log(root);
    pathname=path.isAbsolute(pathname)?pathname:path.join(root,pathname);
    
    //获取要创建的部分
    // pathname=pathname.replace(__dirname,'');
    var relativepath=path.relative(root,pathname);
    // console.log(relativepath);
    var folders=relativepath.split(path.sep);
    // console.log(folders);
    try {
        //
        var pre='';
        folders.forEach(folder=>{
            try {
                //如果不存在报错
                fs.statSync(path.join(root,pre,folder));
            } catch (error) {
                fs.mkdirSync(path.join(root,pre,folder));
            }
            pre=path.join(pre,folder);
        });
        callback&&callback(null);
    } catch (error) {
        callback&&callback(error);
    }
}
module.exports=mkdirs;