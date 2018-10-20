
//读取图片
'use strict';
//异步调用
const fs=require('fs');
const path=require('path');
fs.readFile(path.join(__dirname,'../img/baner02.jpg'),(error,data)=>{
    // console.log(data);
    console.log(data.toString('base64'));    
});

