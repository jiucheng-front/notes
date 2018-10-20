
'use strict';
//实现命令行计算器
//1、接收参数
//argv=['node执行程序所在的路径'，'当前脚本所在路径'，..]，所以
const argvs=process.argv.slice(2);

//2、分析参数
if(argvs.length !==3){
    console.log('参数不合法');
    throw new Error('参数不合法！！！');
}
let parameter1=argvs[0];
let operator=argvs[1];
let parameter2=argvs[2];
//3、进行运算
// let result=eval(`${parameter1} ${operator} ${parameter2}`);
// console.log(result);
let result;
switch (operator) {
    case '+':
        result=parseFloat(parameter1)+parseFloat(parameter2);
        break;
    case '-':
        result=parseFloat(parameter1)-parseFloat(parameter2);
        break;
    case '*'://为何命令行不支持！！
    case '×':
        result=parseFloat(parameter1)*parseFloat(parameter2);
        break;
    case '/':
    case '÷':
        result=parseFloat(parameter1)/parseFloat(parameter2);
        break;
    default:
        throw new Error('操作符不支持'+operator);
}
console.log(result);