
//CMD规范
//define(...);
//CommonJS规范
//1、
'use strict';
const canvert=(input)=>{
    return parseFloat(input);
}
// canvert(12);
function add(a,b){
    return canvert(a)+canvert(b);
}
function substract(a,b){
    return canvert(a)-canvert(b);
}
function mutiply(a,b){
    return canvert(a)*canvert(b);
}
function divide(a,b){
    return canvert(a)/canvert(b);
}
//导出模块ES6的'自动属性'
module.exports={add,substract,mutiply,divide};

// module.exports={
//     add:add,
//     substract:substract,
//     mutiply:mutiply,
//     divide:divide
// }
