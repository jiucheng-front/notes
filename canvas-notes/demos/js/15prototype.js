/**
 * Created by Administrator on 2017/1/16.
 */

function Person(option){
    this._init(option);
}

Person.prototype={
    _init:function(option){
        this.x=option.x===0 ? 0:(option.x||10);//将要绘制在画布上的x坐标
        this.y=option.y===0 ? 0:(option.y||10);//将要绘制在画布上的y坐标

        this.w=option.w||40;//将要绘制到画布上的宽
        this.h=option.h||65;//将要绘制到画布上的高
        this._imgSrc=option.imgsrc||'';// img 的src
        this.fps=option.fps||10; //每秒的帧数
        this._dirindex=0;   //控制小人所走的方向0-3

        this.originw=option.originw||40;// 截取图片的宽
        this.originh=option.originh||65;// 截取图片的高

        //
        this.timer=''; //定时器可以控制动画停止

    },
    render:function(ctx){//把自己  画在 画布上
        //1  加载图片
        var img=new Image();
        img.src=this._imgSrc;

        var self=this;
        //2  图片加载完成后启动一个 定时器，不停的渲染动画
        img.onload=function(){
            //this==img
            var frameIndex=0;
            self.timer=setInterval(function(){
                //每次重绘之前先清除画布，防止模糊现象
                ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                ctx.drawImage(
                    img,
                    frameIndex*self.originw,    //左上角依次+40
                    self._dirindex*self.originh,//从上往下递增
                    self.originw,     //裁剪的宽
                    self.originh,      //裁剪的高
                    self.x,     //绘制在画布的x坐标
                    self.y,     //绘制在画布的y坐标
                    self.w,     //绘制出来的宽
                    self.h      //绘制出来的高
                );
                frameIndex++;
                //frameIndex%=4;
                if(frameIndex>3)frameIndex=0;
            },1000/self.fps);
        }
    },
    changeDir:function(dir){
        //if(dir=='left'){
        //    this._dirindex=1;
        //}
        //if(dir=='right'){
        //    this._dirindex=2;
        //}
        //if(dir=='up'){
        //    this._dirindex=3;
        //}
        //if(dir=='down'){
        //    this._dirindex=0;
        //}
        //if(dir=='stop'){
        //    this.clear();
        //}
        switch (dir){
            case 'left':
                this._dirindex=1;
                break;
            case 'right':
                this._dirindex=2;
                break;
            case 'up':
                this._dirindex=3;
                break;
            case 'down':
                this._dirindex=0;
                break;
            case 'stop':
                this.clear();
                break;
        }
    },
    clear:function(){
        clearInterval(this.timer);
        this.timer='';
        console.log(this);
    }
}