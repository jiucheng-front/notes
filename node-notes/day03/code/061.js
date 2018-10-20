var streamReader=fs.createReadStream(filename);

var data='';
streamReader.on('data',(chunk)=>{
    //chunk只是文档的一个片段。不完整
    data+=chunk.toString();
});
streamReader.on('end',()=>{
    //通知你已经结束了此时的data是完整的
    console.log(data);
});