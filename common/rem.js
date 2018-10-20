(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        //orientationchange 事件是在用户水平或者垂直翻转设备（即方向发生变化）时触发的事件。
        //resize事件是屏幕缩放时候触发的事件
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    /*DOMContentLoaded该事件是当所有DOM解析完以后会触发这个事件。
    DOMContentLoaded事件本身不会等待CSS文件、图片、iframe加载完成。
    它的触发时机是：加载完页面，解析完所有标签（不包括执行CSS和JS），
    并如规范中所说的设置interactive和执行每个静态的script标签中的JS，然后触发。
    而JS的执行，需要等待位于它前面的CSS加载（如果是外联的话）、执行完成，
    因为JS可能会依赖位于它前面的CSS计算出来的样式。*/
})(document, window);

/**
 *  在html内最外层元素给max-width:640px,min-width:320px
 *  元素宽高都以rem为单位就会自动缩放
 *  字体大小一般0.2rem-0.34rem，如>h3:font-size:0.3rem,h4:font-size:.28rem,p:font-size:.2rem一般这几个够用了.
 *  引入img标签时候该img必须float或者给一个属性(vertical-align: middle;)否则其与父元素有20多px的margin-bottom
 *  如img想自适应需要给个宽度，可以百分比，可以rem为单位给固定宽度，比如img实际宽度100px,用此JS后想自动缩放,可以css里给该img{width:1rem},其他元素雷同
 *  如果有用到input时候，该input得浮动或者以rem为单位给固定宽度和高度，不然占据行高很大,出现元素占据位置大时候，float一下即可
 * 
 **/