//建立 socket客户端

const net=require('net');

const socket=net.connect({port:2080},()=>{
    console.log('已经连接到服务端！！');
    
    process.stdout.write('client>');
    process.stdin.on('data',(chunk)=>{
        //客户端控制台输入回车
        // console.log(chunk.toString().trim());     
        socket.write(chunk.toString().trim());
        process.stdout.write('client>');
    });
    //客户端接收服务端的数据
    socket.on('data',(data)=>{
        console.log('\n'+data.toString());
        // socket.end();
    });
});


