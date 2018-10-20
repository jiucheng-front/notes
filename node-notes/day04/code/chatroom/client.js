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
        console.log(`Welcome ${name} to 2080 chatroom!`);
        //4、监听服务端返回的消息
        server.on('data',(chunk)=>{
            try {
                var signal=JSON.parse(chunk.toString().trim());
                var procotol=signal.procotol;
                switch (procotol) {
                    case 'boardcast':
                        console.log('\nboardcast【'+signal.from+'】>'+signal.message+'\n');
                        // console.log('\nboardcast');
                        // console.log(signal.from+'>');
                        // console.log(signal.message);
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
            // console.log(line);
            // chunk:{'procotol':'boardcast','from':'李四','message':'弄啥咧！'}
            //3、向服务端发送的消息send
            var send={
                procotol:'boardcast',
                from:name,
                message:line.toString().trim()
            }
            server.write(JSON.stringify(send));
                 
            rl.prompt();
        }).on('close', () => {//当用户按ctrl+c关闭对话框时候触发
            // console.log('Have a great day!');
            // process.exit(0);
        });//rl.on结尾
    });//server结尾
});//question结尾

