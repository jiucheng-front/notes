var fs=require('fs');
fs.readFile('./frames/6.txt','utf8',(error,data)=>{
    if(error) throw error;
    console.log(data);
});