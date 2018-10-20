//文件拷贝
'use strict';
const fs=require('fs');
const path=require('path');

console.time('read');
fs.readFile('E:\\github\\aboutnodejs\\node\\day04\\code\\node.d.ts',(err,data)=>{
    if(err) throw err;
    console.timeEnd('read');
    console.time('write');
    fs.writeFile('E:\\github\\aboutnodejs\\node\\day04\\code\\nodeCopy.d.ts',data,(err)=>{
        if(err) throw err;
        console.log('拷贝完成');
    }); 
    console.timeEnd('write');
});