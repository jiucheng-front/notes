'use strict';

const fs=require('fs');
const path=require('path');
//打印挡墙目录下所有文件
//1、获取当前有没有传入目标路径
// var target=path.join(__dirname,process.argv[2]||'./');


//target是完整的路径
// console.log(target);
// fs.readdir(target,(err,files)=>{
//     if(err){
//         console.log(err);
//     }else{
//         files.forEach((file)=>{
//             var str=path.join(target,file);
//             // console.log(str);
//             fs.stat(str,(err,stats)=>{
//                 // console.log(stats);
//                 var statsMsg=`${stats.mtime}\t${stats.size}\t${file}`;
//                 console.log(statsMsg);//回输出每个人文件的基础信息
//             });
//         });
//     }
// });



require('./proto.js');


var target=path.join(__dirname,process.argv[2]||'./');
//target是完整的路径
// console.log(target);
fs.readdir(target,(err,files)=>{
    if(err){
        console.log(err);
    }else{
        files.forEach((file)=>{
            var str=path.join(target,file);
            // console.log(str);
            fs.stat(str,(err,stats)=>{
                // console.log(stats);
                var statsMsg=`${stats.mtime.format('yyyy/MM/dd HH:mm')}\t${stats.size}\t${file}`;
                console.log(statsMsg);//回输出每个人文件的基础信息
            });
        });
    }
});