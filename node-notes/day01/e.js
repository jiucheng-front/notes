// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', () => {
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });

// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });

//练习
var q='请输入用户名：\n';
var users={
        'admin':'123',
        'user1':'321',
        'user2':'456'
};
//2、输出第一个问题
process.stdout.write(q);
// var i=0;
//3、变量判断
// var inputIsUsersName=true;
var usersname='';
// var msg=process.stdin.readline();
process.stdin.on('data',(input)=>{
    // console.log(i++);
    //要在此处知道input到底是什么
    //此时用户输入的input不是字符串是object
    //input实际是一个流,有回车换行符
    // process.stdout.write(typeof input);
    //输入的字符最后肯定是一个回车符
    input=input.toString().trim();
    if(!usersname){
        //获取一个键值对集合中所有的键
        if(Object.keys(users).indexOf(input)===-1){
            process.stdout.write('用户名不存在'+'\n');
            process.stdout.write(q+'\n');
            // inputIsUsersName=true;
            usersname='';
        }else{
            //用户存在
            // var pwd=users[input];
            // console.log('用户名存在');
            process.stdout.write('请输入密码：\n');
            // inputIsUsersName=false;
            usersname=input;
        }
    }else{//密码判断
        // process.stdout.write('判断密码');
        if(input===users[usersname]){
            process.stdout.write('登录成功！');
        }else{
            process.stdout.write('请输入密码：\n');
        }
    }

});







//1、注册事件，data是输入数据，命令行按下enter键盘后触发
// process.stdin.on('data',(data)=>{
//     process.stdout.write(data);
// });


