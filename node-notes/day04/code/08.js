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

//读取流pipe流到写入流去
reader.pipe(writer);


