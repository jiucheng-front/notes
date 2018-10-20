

//当前文件所在目录的完整路径
console.log(__dirname);
//当前文件的完整路径
console.log(__filename);

const fs=require('fs');
//1：所有的文件操作必须是绝对路径
fs.readFile(__dirname+'/../list.md','utf8',(err,content)=>{
    if(err) throw err;
    console.log(content);
});//不传utf8输出的content是二进制的数据流，content.toString()亦可
