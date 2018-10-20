
'use strict';
//自己实现一个require函数
function $require(id){
    //1、先找到文件，如果文件不存在；Connot find ....
    //2、读取文件：
    const fs=require('fs');
    const path=require('path');
    // const filename=__dirname+id;
    const filename=path.join(__dirname,id);
    //filename=E:\github\aboutnodejs\node\day02\module\module2.js
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
    //4、返回值
    return module.exports;
}
// var mdo4=$require('./module/module2.js');
// mdo4.say('hello my require!');


var m1=$require('./module1.js');

m1.a.say();
m1.b.say();
