
//建立一个Socket服务端

'use strict';
const net=require('net');

//1、创建一个Socket服务器
var server=net.createServer(socketConnect);


//1-1、当有客户端与我连接的时候触发：url输入localhost:2080时候才会触发
function socketConnect(socket){
    // console.log('connecting.......');
    //谁连接我，就输出下谁的IP地址
    var client=socket.address();
    console.log(client.address+'connecting.......');
    //监听socket有数据过来
    socket.on('data',(chunk)=>{
        console.log(chunk.toString());//客户端发来的数据
        socket.write('server> 你说啥？');
    });
}


const port=2080;
//1-2、创建服务端必须监听一个端口否则没有意义
server.listen(port,(err)=>{
    //成功监听2080端口后执行(监听失败就是因为端口被占用)
    if(err){
        console.log('端口被占用！');
        return false;
    }
    console.log(`服务端正常启动,监听：[${port}]`);
});