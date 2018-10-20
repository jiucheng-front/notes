//移动文件和重命名

'use strict';

const fs=require('fs');
const path=require('path');

var currentPath=path.join(__dirname,'../date/temp.txt');
var targetPath=path.join(__dirname,'../date/temp01.txt');
//这样就会把temp.txt换名为temp01.txt
fs.rename(currentPath,targetPath);


var endPath=path.join(__dirname,'../date/src/temp01.txt');
//下面这样就会把date/temp01.txt移动到src目录下
// fs.rename(targetPath,endPath);