'use strict';
//文件的写入,在date下自动创建一个04.txt,并写入知道内容，如果该04.txt已结存在，默认会覆盖源文件内容

const fs=require('fs');
const path=require('path');
//1、fs.writeFile();
var filename=path.join(__dirname,'../date/09js.txt');
// fs.writeFile(filename,{id:10},(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('success');
//     }
// });

//JSON.stringify();
// fs.writeFile(filename,JSON.stringify({id:10}),(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('success');
//     }
// });
//JSON.base()

//2、fs.writeFileSync();

//3、fs.createWriteStream();
var streamWrite=fs.createWriteStream(filename);
var i=1;
setInterval(()=>{
    streamWrite.write('Hello',()=>{
        console.log(i++);
    });
},1000);//每隔1秒钟03里写一个Hello