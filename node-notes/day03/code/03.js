
'use strict';
//同步和异步调用
const fs=require('fs');
const path=require('path');
// 没指定编码---Buffer ?
//异步没有指定编码
// console.time('async');//异步调用
// fs.readFile(path.join(__dirname,'../date/02.txt'),(error,data)=>{
//     console.log(data);
// });
// console.timeEnd('async');


//buf.toString([encoding[, start[, end]]])
console.time('async');//异步调用
fs.readFile(path.join(__dirname,'../date/README.md'),(error,data)=>{
    // console.log(data);
    console.log(data.toString('utf8'));    
});
console.timeEnd('async');