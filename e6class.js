import Api from "./components/Api"
import Utils from "./components/Utils"
import { error } from "util";

var api = new Api(true)

function getInfoPfid(){
    let info =Cookie.getCookie("userInfo");
    return info && info.pfid
}

!(window =>{
    "use strict";
    class ReplayVideos {
        constructor(isSignUp){
            this.isSignUp = isSignUp
            // 回放視頻
            this.$viewLive = $(".view-video");
            this.liveId = this.$viewLive.attr("data-pfid");
            this.pfid = getInfoPfid();
            this.$replayAnchorBox = $(".anchor-box");
            this.$watchReplayInfo = $(".video-watch-info");
            // 右側列表
            this.$replayVideoList = $(".videos-wrapper");
            // this.loadReplayVideos(this.liveId);
            // 熱門推薦
            this.$hotAnchorsTitle = $(".hot-anchors-contenttitle");
            this.$hotAnchorsLists = $(".hot-anchors-content-lists");

            this.init()
        }
        init(){
            this._loadHotLives()
            this._loadReplayVideos(this.liveId)
        }
        //1 回放視頻和主播信息
        _loadReplayVideos(liveId){
            api.getWatchReplay(liveId).then(res => {
                if(res.ret_code=="0"){
                    let data = res.data;
                    let anchorInfo = data.live_info;
                    // 視頻頭部信息
                    let follow = data.user_info && data.user_info.follow;
                    this.$replayAnchorBox.html(T.replayWatchAnchor({
                        data:anchorInfo,
                        pfid:this.pfid,
                        follow:follow,
                        Utils
                    }))
                    // 視頻底部信息
                    this.$watchReplayInfo.html(T.replayWatchTime({
                        data:anchorInfo,
                        Utils
                    }))
                    // 右邊列表
                    let list = data.video_list;
                    let anchorId = anchorInfo.uid;
                    this.$replayVideoList.html(T.replayWatchLists({
                        anchorId:anchorId,
                        data:list,
                        Utils,
                        liveId:this.liveId,
                        emptyTips: "這個主播暫時還沒有影片哦~"
                    }))
                    // 3.4 播放視頻-----------------------------------------------------------
                    let defaultUrl = {
                        name: '最佳',
                        url: anchorInfo.video
                    }
                    let video = new KingKongPlayer({
                        $content: $(document.getElementById('player')),
                        urls: [defaultUrl],
                        roomUrl: '000',
                        staticPath: '/static/lib/kk-player/',
                        liveStatus: 3,
                        defaultUrl: defaultUrl
                    })
                }else if(res.ret_code=="-1"){
                    // this._errorReplayVideo()
                }
            }).catch(error => {
                console.log(error)
            })

            //追踪
            this._followOrNot()
        }
        //2 熱門推薦列表
        _loadHotLives(){
            api.getIndexHotAnchors(1, 10).then(res =>{
                if(res.ret_code=="0"){
                    // 列表title
                    this.$hotAnchorsTitle.html(T.contentTitle({
                        iconCategory: "hotlive",
                        islivingRoom: "islivingRoom",
                        Href: "/category/all",
                        categoryTitle: "熱門推薦",
                        showMore: true,
                        canMore: true,
                        moreBtnName: "更多"
                    }))
                    // 列表
                    let list = res.data.list;
                    this.$hotAnchorsLists.append(T.hotAnchors({
                        data: list,
                        islivingRoom: "islivingRoom",
                        colCounts: 5,
                        rowsMethod: 'ceil',
                        indexHot: true,
                        Utils
                    }))
                    this._startLazyLoad();
                    if(list.length==0){
                        this._errorHotLives()
                    }
                }else{
                    this._errorHotLives()
                }
            }).catch(error =>{
                console.log(error)
            })
        }
        //3 是否追踪
        _followOrNot() {
            let $this = this;
            var VAR ={
                repeatTemp:[]
            }
            var COM = {
                repeat:function(s,t){
                    //限制执行频率，默认为60秒 允许执行时返回false  毫秒
                    t = t ? t * 1000 : 60000;
                    var time = microtime();
                        if(!VAR.repeatTemp[s]){
                            VAR.repeatTemp[s] = time;
                            //允许
                            return false;
                        }else{
                            var ts = t - (time - VAR.repeatTemp[s]);
                            ts = parseInt(ts/1000);
                            if(ts > 0){
                                let msg = "操作過於頻繁！請稍後再試";
                                Toast.send(msg);
                                //禁止执行
                                return true;
                            }else{
                                //更新时间
                                VAR.repeatTemp[s] = time;
                                //允许
                                return false;
                            }
                        }
                }
            }
            function microtime(){
                return new Date().getTime();
            }  
            function canClick(){
                var can = COM.repeat('can');
                var _this = $(this);
                if(!can){
                    var anchorPfid = _this.attr("data-uid");
                    let follow = !_this.hasClass("followed");
                    api.followAnchor(anchorPfid, follow)
                        .then(res => {
                            if (res.ret_code == "0") {
                                var msg = res.ret_msg || (follow ? "取消追蹤成功" : "追蹤成功");
                                if (follow) {
                                    _this.addClass("followed");

                                } else {
                                    _this.removeClass("followed");

                                }
                                _this.html(T.followIcon({ followed: follow }));

                                // 局部粉絲數量刷新
                                let funs = parseInt(_this.attr("data-funs"));
                                $this._funsAddOrDown(follow,funs,_this);

                                Toast.send(msg);
                            }else if(res.ret_code == "45"){
                                Toast.send("不能追蹤自己！");
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }else{
                    return 
                }
                
            }
            this.$replayAnchorBox.on("click", ".user-follow", canClick);
        }
        // 4 追蹤或者取消粉絲的增減
        _funsAddOrDown(follow,funs,$node){
            let $this = this;
            $this.$funsCount = $(".follow-count");
            if(follow){
                funs += 1;
                $node.attr("data-funs",funs);
                $this.$funsCount.html(Utils.numberToK(funs));
            }else{
                funs -= 1;
                $node.attr("data-funs",funs);
                $this.$funsCount.html(Utils.numberToK(funs));
            }

        }
        // 5 图片懒加载
        _startLazyLoad() {
            $('.lazy-load-bg').imgLazyLoad({
                callback: function (data) {
                }
            });
        }
        // 6 沒有或者出錯
        _errorHotLives(){
            let str="<div class='empty-hot-live'><p>抱歉暫時沒有推薦直播哦~</p></div>"
            this.$hotAnchorsLists.html(str)
        }
    }

    var Videos = new ReplayVideos(true)
    window.Videos = Videos
    // 如果登錄
    $(window).on('signed', function () {
        // 局部刷新！
    })
})(window)
