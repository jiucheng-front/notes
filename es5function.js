
"use strict";
function Video(status){
    this.init(status)
}
Video.prototype = {
    init:function(status){
        this.status = status;
        this.boxDom = document.getElementById("boxDom");
        this.getAnchorInfo();
    },
    getAnchorInfo:function(){
        let _this = this;
        api.getInfo("/anchor/info").then(function(res){
            // success
            if(res.ret_code=="0"){
                let data = res.data
                _this._renderHtml(data)
            // failed
            }else{
                _this._errorTips()
            }
        }).catch(function(error){
            console.log(error)
        })
    },
    renderHtml:function(data){
        if(this.status){
            // 如果存在
        }else{
            this.boxDom.innerHTML="</p>"+data+"</p>"
        }
    },
    errorTips:function(){
        this.boxDom.innerHTML="数据为空了~"
    }
}

var ReplayVideos = new Video()
window.ReplayVideos = ReplayVideos

// other status
// var ReplayVideos = new Video(true)
// 注意this的指向要替换