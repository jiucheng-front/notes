

'use strict';
//V8对ES6支持情况有三个级别：根本不支持、直接支持、在use sstrict模式下支持
const http=require('http');

let count=0;
const server=http.createServer((request,response)=>{
    response.write(`你是第${count++}个访问的用户`);
    // if(count===10){
    //     while(true){}
    // }    
    response.end();
});

server.listen(1000,(error)=>{
    if(error) throw error;
    console.log('成功启动WEB服务器，端口：1000');
});