//文件流的方式复制
'use strict';
const fs=require('fs');
const path=require('path');
//创建文件的读取流，并没有读出正式的数据


// console.time('start');
//创建读取流
const reader=fs.createReadStream('E:\\github\\aboutnodejs\\node\\day04\\code\\willreaded.avi');
//创建写入流
const writer=fs.createWriteStream('E:\\github\\aboutnodejs\\node\\day04\\code\\willwrited.avi');

// console.timeEnd('start');
fs.stat('E:\\github\\aboutnodejs\\node\\day04\\code\\willreaded.avi',(err,stats)=>{
    if(stats){
        var readtotal=0;
        reader.on('data',(chunk)=>{
            writer.write(chunk,(err)=>{
                //chunk是一个buffer（字节数组）65536默认字节
                console.log('写入进度：'+((readtotal+=chunk.length)/stats.size*100).toFixed(2)+'%');
                //1,667,072 
            });
        });
    }
});



