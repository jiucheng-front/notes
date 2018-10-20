var fs=require('fs');
fs.readFile('./frames/6.txt','utf8',(error,data)=>{
    if(error) throw error;
    if(data){
        data="新的TXT内容";
    }
    console.log(data);
});