'use strict';
//创建文件夹
const fs=require('fs');
const path=require('path');

//引入模块
const mkdirs=require('./module/mkdirs');
//1、
mkdirs(path.join(__dirname,'create1/create2'),(err)=>{
    console.log(err);
});
//2、
mkdirs('./create1/create2/create3',(err)=>{console.log(err);});