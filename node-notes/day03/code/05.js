//动态显示歌词
'use strict';
const fs=require('fs');
const path=require('path');
// const iconv=require('iconv-lite');//载入失败！！
//异步
fs.readFile(path.join(__dirname,'../date/歌词.txt'),(error,data)=>{
    var msg=data.toString('utf8');
    // console.log(msg);
    var lines=msg.split('\n');
    // console.log(lines.length);
    //[00:32.67] 也许我告别 将不再回来
    var regex=/\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/;
    lines.forEach((line)=>{
        var matchs=regex.exec(line);
        if(matchs){
            var m=parseFloat(matchs[1]);//分钟
            var s=parseFloat(matchs[2]);//秒数
            var f=parseFloat(matchs[3]);//毫秒
            var lyric=matchs[4];//歌词内容
            setTimeout(()=>{
                console.log(lyric);
            },m*60*1000+s*1000+f);
            // console.log(new Date().getTime());
        }else{//此行不是歌词
            console.log(line);
        }
    });
});
