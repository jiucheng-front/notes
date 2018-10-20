
'use strict';
//同步和异步调用
const fs=require('fs');
const path=require('path');
//指定编码
//同步
console.time('sync');
try {
    var data=fs.readFileSync(path.join(__dirname,'../date/02.txt'),'utf8');
    console.log(data);
} catch (error) {
    throw error;
}
console.timeEnd('sync');


//异步
console.time('async');//异步调用
fs.readFile(path.join(__dirname,'../date/02.txt'),'utf8',(error,data)=>{
    console.log(data);
});
console.timeEnd('async');



//没指定编码---Buffer ?
// //异步
// console.time('async');//异步调用
// fs.readFile(path.join(__dirname,'../date/02.txt'),(error,data)=>{
//     console.log(data);
// });
// console.timeEnd('async');