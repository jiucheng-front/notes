'use strict';
//创建文件夹
const fs=require('fs');
const path=require('path');
// 1、demo01文件夹是自动创建的
// fs.mkdir(path.join(__dirname,'demo01'));

//2、这样在不存在的文件夹下面创建是不可以的！
// fs.mkdir(path.join(__dirname,'demo02/demo03'),(err)=>{
//     console.log(err);
// });

// console.log(__dirname);//当前文件所在文件夹的完整路径
//3、导入模块mkdirs

const mkdirs=require('./mkdirs');//原版
// const mkdirs=require('./module/mkdirs');
// mkdirs('demo02/demo03');
//4、自动创建目录demo02且在demo02下自动创建demo03文件夹
mkdirs(path.join(__dirname,'demo02/demo03'),(err)=>{
    console.log(err);
});


//5、如果路径嵌套非常深，在win下复制移动文件会报错，
//无法移动无法删除，可以选择压缩后删除！！
// mkdirs(path.join(__dirname,
// 'demo02/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03/demo03'),(err)=>{
//     console.log(err);
// });