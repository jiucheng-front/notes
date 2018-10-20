
//建立一个Socket服务端

'use strict';
const net=require('net');


//4、定义数组用于存储所有的连接
var clients=[];
//1、1、创建一个Socket服务器
var server=net.createServer((socket)=>{
    //哪个客户端与我连接哪个就是socket
    clients.push(socket);
    //有人连接时候
    console.log(`Welcome ${socket.remoteAddress} to 2080 chatroom!当前${clients.length}人在线。`);
    //3、定义boardcast广播消息函数
    function boardcast(signal){
        console.log(signal);
        //肯定有用户名和消息
        var username=signal.from;
        var message=signal.message;
        //send是需要发给客户端的东西
        var send={
            procotol:signal.procotol,
            from:username,
            message:message
        }
        //广播消息,boardcast(广播)
        clients.forEach(client=>{
            client.write(JSON.stringify(send))//序列化一个JSON字符串
        });
    }
    //2、有任何客户端连接该服务端发消息都会触发
    socket.on('data',(chunk)=>{
        //数据格式一：boardcast|李四|弄啥来
        //二：json格式
        // chunk:{'procotol':'boardcast','from':'李四','message':'弄啥咧！'}
        // chunk:{'procotol':'p2p','from':'李四','to':'张三','message':'弄啥咧！'}
        try {
            var signal=JSON.parse(chunk.toString().trim());
            var procotol=signal.procotol;
            switch (procotol) {
                case 'boardcast':
                    boardcast(signal);
                    break;
                // case 'p2p':
                //     p2p(signal);
                //     break;                     
                default:
                    socket.write('不支持！！');
                    break;
            }           
        } catch (error) {
            socket.write('不是JSON格式');
        }
        //var username=signal.from
        //var message=signal.message
        //boardcast(username,message)
        //5、此时，客户端结束会导致服务端也结束，onerror事件
    }).on('error',(err)=>{
        clients.splice(clients.indexOf(socket),1);
        //indexOf返回该socket在数组中的下标，
        //splice(start,count)原来数组就是删除掉的新数组
        //start是被删除元素的下标，count是将要删除几个元素
        console.log(`${socket.remoteAddress}下线了！当前在线${clients.length}人数`);
    });
});

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