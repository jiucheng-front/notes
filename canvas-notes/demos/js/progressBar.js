//1 定义构造函数
function ProgressBar(option){
    //new 构造函数执行的时候，调用 内部的初始化方法。
    this._init(option);
}
//2 自定义原型
ProgressBar.prototype={
    //初始化
    _init:function(option){
        this.x=option.x||0;//进度条x坐标
        this.y=option.y||0;//进度条y坐标
        this.w=option.w||0;//进度条宽度
        this.h=option.h||0;//进度条的高度

        this.fillStyle=option.fillStyle||'pink';
        this.strokeStyle=option.strokeStyle||'green';
        //2.1定义内部进度条的矩形
        var innerRect=new Konva.Rect({
            // stage.width(),获得舞台的宽度，  x：设置当前矩形x坐标
            x:this.x,
            y:this.y,
            //设置矩形的宽度
            width:0,
            //设置矩形的高度
            height:this.h,
            //设置矩形的填充的颜色
            fill:this.fillStyle,
            //设置进度条的圆角。
            cornerRadius:1/2*this.h,
            //设置当前矩形的ID，以便于后面进行使用ID选择器
            id:'innerRect',
            //设置name,方便后面用类选择器。
            name:'ss'
        });
        this.innerRect=innerRect;

        //2.2 添加一个外边框的矩形
        var outerRect=new Konva.Rect({
            x:this.x,
            y:this.y,
            width:this.w,
            height:this.h,
            stroke:this.strokeStyle,
            strokeWidth:4,
            cornerRadius:1/2*this.h,
        });
        //2.3 创建一个组，相当于html中的一个盒子
        this.group=new Konva.Group({
            x:0,
            y:0
        });
        //2.4 把内外部的矩形放到组中
        this.group.add(innerRect);
        this.group.add(outerRect);
    },
    //3 此方法是讲用户传进来的需要改变的进度  运行动画
    changeValue:function(val){
        //传进来的进度
        //1-100  vs  0-1  >=0.5
        if(val>1){
            val=val/100;
        }
        //做动画  val= .3  .7 
        var width=this.w*val;//最终进度条内部矩形的 进度条宽度
        //通过id  去查找内部的子元素
        var innerRect=this.group.findOne('#innerRect');
        var innerRect=this.innerRect;

        //to动画系统 ：让我们的物件  变换到某个状态
        //从当前状态  到  下面设置的状态
        innerRect.to({
            width:width,
            duration:.5,
            easing:Konva.Easings.EasIn
        });
    },
    //4  传进来的是层或者是组
    //此方法是：把当前创建的进度条 添加到 层中
    addToGroupOrLayer:function(layer){
        layer.add(this.group);
    }
}