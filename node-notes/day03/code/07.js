//readline动态显示歌词
'use strict';
const fs=require('fs');
const path=require('path');
// const iconv=require('iconv-lite');//载入失败！！
const readline=require('readline');

var begin=new Date().getTime();
var filename=path.join(__dirname,'../date/歌词.txt');


var streamReader=fs.createReadStream(filename);
// var streamReader=fs.createReadStream(filename)
// .pipe(iconv.decodeStream('gbk'));

var rl=readline.createInterface({input:streamReader});
rl.on('line',(line)=>{
    task(line,begin);
});


var regex=/\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/;
function task(line,begin){
    var matchs=regex.exec(line);
        if(matchs){
            var m=parseFloat(matchs[1]);//分钟
            var s=parseFloat(matchs[2]);//秒数
            var f=parseFloat(matchs[3]);//毫秒
            var lyric=matchs[4];//歌词内容
            var offset=new Date().getTime()-begin;
            setTimeout(()=>{
                console.log(lyric);
            },m*60*1000+s*1000+f-offset);
            // console.log(new Date().getTime());
        }else{//此行不是歌词
            console.log(line);
        }
}