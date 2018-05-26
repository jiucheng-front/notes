/**
 * Created by Administrator on 2016/10/17.
 * update 2017-11-01
 * update 2018-04-02
 */
var adv={
    div:null,
    step:10,
    btnItem:null,
    sumIndex:true,
    interval:10,
    init:function(){
        var _this=this;
        this.div=document.getElementById("navMenu");
        this.btnItem=document.getElementById("navBtn");
        if(this.btnItem){
            //限制連續點擊
            this.btnItem.addEventListener("click",_this.throttle(_this.toggleItem,500));
        }
        // 返回頂部
        this.backTop("floor");
        // 切換或者隱藏當前窗口
        this.changeTitle();
    },
    changeTitle:function(){
        document.addEventListener('visibilitychange', function() { 
            var isHidden = document.hidden; 
            if (isHidden) { 
              document.title = "小樣,你瞅啥呢快回來~"
            } else { 
              document.title = "逗伴不是瓣 - 博客园"
            } 
          });
    },
    // 返回頂部公用方法
    backTop:function(btnId){
        var btn = document.getElementById(btnId);
        var d = document.documentElement;
        var b = document.body;
        window.onscroll = set;
        btn.style.display = "none";
        btn.onclick = function() {
            btn.style.display = "none";
            window.onscroll = null;
            this.timer = setInterval(function() {
                d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
            }, 10);
        };
        function set() {
            btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none";
        }
    },
    //mobile 收起菜單
    moveUp:function(){
        adv.btnItem.className="footerLines";
        var divStyle=getComputedStyle(this.div);
        var minHeight=parseInt(divStyle.height);
        this.div.style.top=parseInt(divStyle.top)-this.step+"px";
        if(parseInt(this.div.style.top)>-minHeight){
            setTimeout(function(){
                adv.moveUp();
            },this.interval);
        }else{
            adv.sumIndex=true;
        }
    },
    //mobile 打開菜單
    moveDown:function(){
        adv.btnItem.className="footerLines"+" sumShow";
        var divStyle=getComputedStyle(this.div);
        var top=parseInt(divStyle.top)+this.step;
        this.div.style.top=top+"px";
        var navStyle=getComputedStyle(document.getElementById("navHeight"));
        var maxHeight=parseInt(navStyle.height)-3;
        if(top<maxHeight){
            setTimeout(function(){
                adv.moveDown();
            },this.interval);
        }else{
            adv.sumIndex=false;
            return false;
        }
    },
    //節流，限制點擊
    throttle:function(func,wait){
        var timeout;
        return function(){
            var context=this;
            var args=arguments;
            // console.log(args);
            if(!timeout){
                timeout=setTimeout(function(){
                    timeout=null;
                    func.apply(context,args);
                },wait);
            }
        }
    },
    // 切換
    toggleItem:function(){
        if(adv.sumIndex){
            adv.moveDown();
        }else{
            adv.moveUp();
        }
    }
};
window.onload=function(){
    adv.init();
};