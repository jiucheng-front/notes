
//模块的缓存
'use strict';
//缓存测试
// setInterval(()=>{
//     var date=require('./module/date.js');
//     console.log(date.getTime());
// },1000);//

'use strict';
//自己实现一个require函数,以及一个缓存机制
function $require(id){
    //1、先找到文件，如果文件不存在；Connot find ....
    //2、读取文件：
    const fs=require('fs');
    const path=require('path');
    // const filename=__dirname+id;
    const filename=path.join(__dirname,id);
    //filename=E:\github\aboutnodejs\node\day02\module\module2.js
    //5、1缓存机制,如果有缓存
    $require.cache=$require.cache||{};
    if($require.cache[filename]){
        return $require.cache[filename].exports;
    }
    //第一次没有缓存
    const dirname=path.dirname(filename);
    //dirname=E:\github\aboutnodejs\node\day02\module
    //path.dirname():文件目录的绝对路径
    //path.basename():文件的文件名字
    let code=fs.readFileSync(filename,'utf8');
    //3、执行代码
    let module={id:filename,exports:{}};
    let exports=module.exports;
    code=`(function($require,module,exports,__dirname,__filename){
        ${code}
    })($require,module,exports,dirname,filename);`;
    eval(code);
    //5、2
    $require.cache[filename]=module;
    //4、返回值
    return module.exports;
}
//如何删除缓存
// setInterval(()=>{
//     //删除缓存
//     Object.keys(require.cache).forEach((key)=>{
//         delete require.cache[key];
//     });
//     var date=require('./module/date.js');
//     // console.log(require.cache);
//     console.log(date.getTime());
// },1000);//


//6、自己实现的缓存机制
setInterval(()=>{
    var date=$require('./module/date.js');
    // console.log(require.cache);
    console.log(date.getTime());
},1000);//

// console.log(require.cache);