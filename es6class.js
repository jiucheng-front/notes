<<<<<<< HEAD
=======

>>>>>>> master
"use strict";
class Video {
    constructor(signStatus){
        this.signStatus = signStatus
        this.boxDom = document.getElementById("boxDom")
        this.init()
    }
    init(){
        this._getAnchorInfo()
    }
    _getAnchorInfo(){
        api.getInfo("/anchor/info").then(res =>{
            // success
            if(res.ret_code=="0"){
                let data = res.data
                this._renderHtml(data)
            // failed
            }else{
                this._errorTips()
            }
        }).catch(error =>{
            console.log(error)
        })
    }
    _renderHtml(data){
        if(this.signStatus){
            // 如果存在
        }else{
            this.boxDom.innerHTML="</p>"+data+"</p>"
        }
    }
    _errorTips(){
        this.boxDom.innerHTML="数据为空了~"
    }
}

var ReplayVideos = new Video()
window.ReplayVideos = ReplayVideos
<<<<<<< HEAD

// other status

// var ReplayVideos = new Video(true)
=======
// other status
// var ReplayVideos = new Video(true)
// 注意class中的this受限於是否使用箭頭函數！
>>>>>>> master
