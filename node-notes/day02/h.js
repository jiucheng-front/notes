
//模块的缓存测试
'use strict';
var first;
setInterval(()=>{
    var date=require('./module/date.js');
    console.log(first===date);
    console.log(date.getTime());
},1000);//
