/**
 * Created by Administrator on 2017/1/19.
 */
/*
* ctx.arc(x,y,r,startAngle,andAngle,counterclockwise)
 x,y圆心的左边
 r圆的半径
 startAngle，andAngle开始和结束的角度，注意是弧度π,
 JS里是：Math.PI
 counterclockwise：是否是逆时针。true是逆时针，false：顺时针
 弧度和角度的转换方式
 180度=Math.PI
 如：60度 ：60*Math.PI / 180
* */
function ItcastArc(option){
    this._init(option);
}
ItcastArc.prototype={
    _init:function(option){
        option=option||{};
        // 如果传入了0就是0，不是0就是option.x,或者不传就是100
        this.x=option.x===0?0:option.x||100;
        this.y=option.y===0?0:option.y||100;
        this.r=option.r||50;
        this.sAngle=option.sAngle===0?0:option.sAngle||0;
        this.eAngle=option.eAngle===0?0:option.eAngle||0;
        this.sAngle=this.sAngle*Math.PI/180;
        this.eAngle=this.eAngle*Math.PI/180;
        this.counterclockwise=option.counterclockwise===true?true:option.counterclockwise||false;
        //变换样式
        this.rotation=option.rotation===0?0:option.rotation||0;
        this.opacity=option.opacity===0?0:option.opacity||1;
        this.scaleX=option.scaleX||1;
        this.scaleY=option.scaleY||1;
        this.strokeStyle=option.strokeStyle||'green';
        this.strokeWidth = option.strokeWidth ||4;//默认描边宽度是2px
        this.fillStyle=option.fillStyle||'red';
    },
    render:function(ctx){
        ctx.save();//保存当前的状态

        ctx.beginPath();
        ctx.translate(this.x,this.y);

        ctx.rotate(this.rotation*Math.PI/180);
        ctx.globalAlpha=this.opacity;
        ctx.scale(this.scaleX,this.scaleY);
        ctx.fillStyle=this.fillStyle;
        ctx.strokeStyle=this.strokeStyle;
        ctx.moveTo(0,0);
        ctx.arc(0,0,this.r,this.sAngle,this.eAngle,this.counterclockwise);
        ctx.fill();
        ctx.stroke();
        ctx.restore();//回归到最初的原始状态
    }
}