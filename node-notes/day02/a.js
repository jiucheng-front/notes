//node如何充分利用单线程

const fs=require('fs');
fs.stat('./list.md',(err,stats)=>{
    // if(error) throw error;
    // console.log(stats);
    if(err){
        //创建
        console.log('文件不存在');
        fs.writeFile('./list.md',new Date(),(err)=>{
            if(err){console.error(err);return false;}
            console.log('文件创建成功');
        });
        return false;
    }
    //删除文件
    fs.unlink('./list.md',(err)=>{
        if(err){console.error(err);return false;}
        //创建
        fs.writeFile('./list.md',new Date(),(err)=>{
            if(err){console.error(err);return false;}
            console.log('删除后创建成功');
        });
    });
});