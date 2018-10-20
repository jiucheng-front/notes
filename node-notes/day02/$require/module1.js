
//1、导入module2模块
var module2=$require('./module2.js');
//2、导出成员
module.exports={
    a:{
        say:()=>{
            console.log('say module1');
        }
    },
    b:module2
}