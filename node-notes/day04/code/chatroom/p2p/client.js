//创建socket客户端

'use strict';
const net=require('net');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('What is your name ?',(name)=>{
    name=name.trim();
    if(!name){
        throw new Error('没名字还混！');
    }
    //2、创建与服务端的连接，该server就是服务端的socket对象
    var server=net.connect({port:2080,host:'10.168.5.145'},()=>{
        //登入操作
        var user={
            procotol:'signin',
            username:name
        }
        server.write(JSON.stringify(user));
        console.log(`Welcome ${name} to 2080 chatroom!`);
        
        
        //4、监听服务端返回的消息
        server.on('data',(chunk)=>{
            try {
                var signal=JSON.parse(chunk.toString().trim());
                var procotol=signal.procotol;
                switch (procotol) {
                    case 'boardcast':
                        console.log('\nboardcast【'+signal.from+'】>'+signal.message+'\n');
                        rl.prompt();                 
                        break;
                    case 'p2p':
                        console.log('\np2p【'+signal.from+'】>'+signal.message+'\n');
                        rl.prompt();                 
                        break;                   
                    default:
                        server.write('不支持！！');
                        break;
                }           
            } catch (error) {
                server.write('不是JSON格式');
            }
        });//socket.on结尾
        
        rl.setPrompt(name+'> ');
        rl.prompt();
        
        //当用户输入内容后敲回车时候触发
        rl.on('line', (line) => {
            //5、1:p2p点对点的消息
            line=line.toString().trim();
            var temp=line.split(':');
            var send;
            if(temp.length===2){
                //5.2：点对点消息
                send={
                  procotol:'p2p',
                  from:name,
                  to:temp[0],
                  message:temp[1]
                }
            }else{
                //5.3:广播消息
                send={
                   procotol:'boardcast',
                   from:name,
                   message:line
                }
            }      
            server.write(JSON.stringify(send));              
            rl.prompt();
        }).on('close', () => {//当用户按ctrl+c关闭对话框时候触发
            // console.log('Have a great day!');
            // process.exit(0);
        });//rl.on结尾
    });//server结尾
});//question结尾

