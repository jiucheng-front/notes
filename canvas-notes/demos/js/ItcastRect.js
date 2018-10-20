/**
 * Created by Administrator on 2017/1/18.
 */
/*
* 封装属性：
* 1: x,y,w,h,fillStyle,strokeStyle,rotation,opacity
* 封装行为
* 2:render
*
*
* */

function ItcastRect(option){
    this._init(option);
}
ItcastRect.prototype={
    _init:function(option){
        this.x=option.x||0;
        this.y=option.y||0;
        this.w=option.w||0;
        this.h=option.h||0;
        this.rotation=option.rotation||0;
        this.opacity=option.opacity===0?0:option.opacity||1;

        this.scaleX=option.scaleX||1;
        this.scaleY=option.scaleY||1;

        this.strokeStyle=option.strokeStyle||'green';
        this.fillStyle=option.fillStyle||'red';

    },
    render:function(ctx){
        ctx.save();//保存当前的状态

        ctx.beginPath();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.rotation*Math.PI/180);
        ctx.globalAlpha=this.opacity;
        ctx.scale(this.scaleX,this.scaleY);
        ctx.rect(0,0,this.w,this.h);
        ctx.fillStyle=this.fillStyle;
        ctx.fill();

        ctx.strokeStyle=this.strokeStyle;
        ctx.stroke();

        ctx.restore();//回归到最初的原始状态
    }
}