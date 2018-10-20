// process.stdout.write('开始执行：\n');

// console.time('main');
// //不断的阻塞代码的执行
// for(var i=0;i<1000000000;i++){

// }
// //setTimeout(...,0);会放在后面执行
// setTimeout(()=>{
//     //不断的阻塞代码的执行
//     for(var i=0;i<10;i++){
//         console.log('循环结束！');
//     }
// },0);
// console.timeEnd('main');
// process.stdout.write('完成执行。\n');


//2、如果函数需要回调参数，一点是在参数的最后出现
function getFileAsync(path,callback){

}
//3、错误有限的回调函数



function isEvenOrOdd(number,callback){
    if(typeof number==='number'){
        if(number%2){
            //奇数
            callback(null,'当前是奇数');
        }else{
            callback(null,'当前输偶数');
        }
    }else{
        // throw new Error('你输入的不是数字！');
        callback(new Error('你输入的不是数字！'));
    }
}
//将错误信息作为回调的第一个参数
isEvenOrOdd(10,(error,data)=>{
    if(error) throw error;
    console.log(data);
});

isEvenOrOdd(21,(error,data)=>{
    if(error) throw error;
    console.log(data);
});

isEvenOrOdd('sji',(error,data)=>{
    if(error) throw error;
    console.log(data);
});