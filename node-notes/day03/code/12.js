

//递归目录树

//先写一层的情况

//抽象递归参数

//找到突破点(避免死循环)，自己调用自己，某种情况不不调用


'use strict';
const fs=require('fs');
const path=require('path');
//打印挡墙目录下所有文件
//1、获取当前有没有传入目标路径
var target=path.join(__dirname,process.argv[2]||'./');

function load(target,depfloor){
    //3、depfloor 0=''
    //3、depfloor 1='│'
    //3、depfloor 1='│ │'   
    //3、2
    //new Array(2)声明一个长度为2的空数组
    var prefix=new Array(depfloor+1).join('│  '); 
    var dirinfo=fs.readdirSync(target);
    var dirs=[];
    var files=[];
    dirinfo.forEach((info)=>{
        let str=path.join(target,info);
        var stats=fs.statSync(str);
        if(stats.isFile()){
            files.push(info);
        }else{
            dirs.push(info);
        }
    });
    //2、先写一层情况
    //├ └ ─ └
    dirs.forEach(dir=>{
        console.log(`${prefix}├─└${dir}`);
        //当前是一个目录，需要深入进去继续遍历
        // 2第二层-----------------------------
        load(path.join(target,dir),depfloor+1);
    });

    var count=files.length-1;
    files.forEach(file=>{
        console.log(`${prefix}${count--?'├':'└'}─${file}`);
    });
}

load(target,0);//0是层级