/** 
 * 常用函数总结：持续更新
 * @Author: wangjianfei
 * @Date:   2017-04-28 15:32:29
 * @Last Modified by:   wangjianfei
 * @Last Modified time: 2017-05-22 11:16:44
 * 
 */
'use strict';

/**
 * 一、1.1 封裝AJAX函數
 * @param {*} option 必须，请求参数
 * option
 * 		ajaxType:必须，请求类型，GET/POST
 * 		urlStr:必须，接口URL
 * 		ajaxData:必须，GET时候为null,POST的时候为Object{ key:value }
 * @param {*} success 必须，成功回调函数
 * @param {*} error 必须，失败回调函数
 */

function nativeAjax(option, success, error) {
    // 定义domain,方便环境切换
    /*
     *window.location.host在IE中有兼容性
     */
    var domain = 'https://' + window.location.host + '/';
    // var domain='http://' + window.location.host + '/';
    var url = domain + option.urlStr;
    var type = option.ajaxType;
    var data = option.ajaxData;
    var xhrRequest = null;
    if (window.XMLHttpRequest) {
        xhrRequest = new XMLHttpRequest();
    } else {
        xhrRequest = new ActiveXObject('Microsoft.XMLHTTP')
    }
    var str = null;
    xhrRequest.open(type, url, true);
    if (type === "POST" && data != null) {
        xhrRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        for (var key in data) {
            str += '&' + key + '=' + data[key];
            str = str.slice(1);
        }
    }
    xhrRequest.onreadystatechange = function() {
        if (xhrRequest.readyState == 4) {
            if (xhrRequest.status == 200) {
                // 1.1、格式化返回的数据
                var responseData = JSON.parse(xhrRequest.responseText);
                // 1.2、这里操作数据--------
                success(responseData);
            } else {
                // 1.3、没成功返回HTTP状态码
                error(xhrRequest.status);
            }
        }
    }
    xhrRequest.send(str);
}
// Example、POST：定義請求參數
var postOption = {
    ajaxType: "POST",
    urlStr: "/info",
    ajaxData: {
        "HTTP_USER_TOKEN": token,
        "HTTP_USER_UID": pfid,
    }
}
nativeAjax(postOption, function(data) {
    console.log(data);
}, function(error) {
    console.log(error);
});
//	Example、GET：定义请求参数
var getOption = {
    ajaxType: "GET",
    urlStr: "/good_list",
    ajaxData: null
}
nativeAjax(getOption, function(data) {
    console.log(data);
}, function(error) {
    console.log(error);
});


/**
 * 一、1.2  使用Promise 封裝簡單的Ajax函數
 *  es6: Promise(resolve,reject) 
 * 	@param {resolve,reject} 2個參數都是回調函數，
 * 	resolve 類似：success 回調
 * 	rejcect 類似：error 回調
 * 
 **/

const Ajax = (method, url, data) => {
    let xhrRequest = null
    if (window.XMLHttpRequest) {
        xhrRequest = new XMLHttpRequest()
    } else {
        xhrRequest = new ActiveXObject('Microsoft.XMLHTTP')
    }

    return new Promise((resolve, reject) => {
        let str = null
        xhrRequest.open(method, url, true)

        if (method === "POST" && data != null) {
            xhrRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
            for (var key in data) {
                str += '&' + key + '=' + data[key]
                str = str.slice(1)
            }
        }

        xhrRequest.onreadystatechange = function() {
            if (xhrRequest.readyState == 4) {
                if (xhrRequest.status == 200) {
                    resolve(xhrRequest.responseText)
                } else {
                    reject(xhrRequest.status)
                }
            }
        }

        xhrRequest.send(str)
    })
}

module.exports = Ajax


Ajax("GET", "sss/cccas/ddd").then(response => {
    if (response) {
        // 成功了
    }
}).catch(error => {
    console.log(error)
})





/**
 * 二、判断是否是IOS
 * 
 */
function isIos() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    //ios终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isiOS;
}

/**
 * 三、关于原生JS操作className
 * 1：是否含有某个class,返回：true/false
 * 2：没有指定的className就追加指定的className
 * 3：有指定的className就删除指定的className
 * @param {*} elem 必须，原生DOM 
 * @param {*} cls 必须，String,指定的className
 */
// 1、是否函数指定的className
function hasClass(elem, cls) {
    return elem.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
// 2、没有就追加指定className
function addClass(elem, cls) {
    if (!hasClass(elem, cls)) {
        elem.className += " " + cls;
    }
}
// 3、有就移除指定className
function removeClass(elem, cls) {
    if (hasClass(elem, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        elem.className = elem.className.replace(reg, "");
    }
}


/**
 * 四、DOM操作
 * 
 */
// 4.1封装指定符号获取DOM
window.$ = HTMLElement.prototype.$ = function(selector) {
    return (this == window ? document : this).querySelectorAll(selector);
}
// 4.2根据ID获取指定DOM
function getEleId(id) {
    return document.getElementById(id);
}
// 4.3 向指定DOM追加HTML,id,html都是必须
function pushHtml(id, html) {
    return document.getElementById(id).innerHTML = html;
}


/**
 * 五、封装綁定事件
 * @param {*} type 必须，绑定事件类型
 * @param {*} selector 必须，nodeName / className / id
 * @param {*} callback 必须，绑定成功后的回调，继续操作DOM
 */
function on(type, selector, callback) {
    document.addEventListener(type, function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (selector == e.target.tagName.toLowerCase() || selector == e.target.className || selector == e.target.id) {
            callback(e);
        }
    })
}
// Example
on("click", "btn", function() {
    console.log("给btn按钮绑定了点击事件")
})



/**
 * 六、原生JS获取之前(prevAll)或者之后(nextAll)的所有兄弟元素
 * 	类似JQ的 prevAll和nextAll
 */
HTMLElement.prototype.prevAll = function() {
    var parent = this.parentElement;
    var children = parent.children;
    var arr = [];
    for (var i = 0; i < children.length; i++) {
        var previous = children[i];
        if (previous == this) {
            break;
        }
        arr.push(previous);
    }
    return arr;
}

HTMLElement.prototype.nextAll = function() {
    var parent = this.parentElement;
    var children = parent.children;
    var arr = [];
    for (var i = children.length - 1; i >= 0; i--) {
        var nexts = children[i];
        if (nexts == this) {
            break;
        }
        arr.unshift(nexts);
    }
    return arr;
}
// Example
var temp = function(dom) {
    console.log("prevAll=", dom.prevAll());
    console.log("nextAll=", dom.nextAll());
}


/**
 * 七、原生重置form 表单的action
 * @param {*} id 必须，string,元素ID 
 * @param {*} domain 必须
 * @param {*} urlStr 必须
 */
function resetFormActionDomian(id, domain, urlStr) {
    document.getElementById(id).action = domain + urlStr;
}



/**
 * 八、获取URL中指定某个参数的值
 * @param {*} strParame 必须,string，返回指定的值
 * 
 */
function getUrlParameter(strParame) {
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[argname] = value;
    }
    return args[strParame];
}
// Example	"dsaldlas.csadja.com/fhlfh.html?key=10&id=hello";
var key = getUrlParameter("key"); //10
var id = getUrlParameter("hello"); //10



/**
 * 九、简单的加密和解密
 * @param {*} str 必须，string,要加密的对象 
 * @param {*} xor 必须，加密解密的计算参数
 * @param {*} hex 必须，加密解密的计算参数
 */
// 加密
function encrypto(str, xor, hex) {
    if (typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
        return;
    }
    let resultList = [];
    hex = hex <= 25 ? hex : hex % 25;
    for (let i = 0; i < str.length; i++) {
        // 提取字符串每个字符的ascll码
        let charCode = str.charCodeAt(i);
        // 进行异或加密
        charCode = (charCode * 1) ^ xor;
        // 异或加密后的字符转成 hex 位数的字符串
        charCode = charCode.toString(hex);
        resultList.push(charCode);
    }
    let splitStr = String.fromCharCode(hex + 97);
    let resultStr = resultList.join(splitStr);
    return resultStr;
}
//解密
function decrypto(str, xor, hex) {
    if (typeof str !== 'string' || typeof xor !== 'number' || typeof hex !== 'number') {
        return;
    }
    let strCharList = [];
    let resultList = [];
    hex = hex <= 25 ? hex : hex % 25;
    // 解析出分割字符
    let splitStr = String.fromCharCode(hex + 97);
    // 分割出加密字符串的加密后的每个字符
    strCharList = str.split(splitStr);
    for (let i = 0; i < strCharList.length; i++) {
        // 将加密后的每个字符转成加密后的ascll码
        let charCode = parseInt(strCharList[i], hex);
        // 异或解密出原字符的ascll码
        charCode = (charCode * 1) ^ xor;
        let strChar = String.fromCharCode(charCode);
        resultList.push(strChar);
    }
    let resultStr = resultList.join('');
    return resultStr;
}
// Example
var pwd = "BLUE123456!";
var enPwd = encrypto(pwd, 135, 25);
var dePwd = decrypto(enPwd, 135, 25);
console.log(enPwd); //27z25z1lz2cz2oz2nz2mz34z33z32z3f
console.log(dePwd); //BLUE123456!



/**
 * 十、前端JS实现微信授权登录
 * 详细可参考官网文档
 */

window.onload = function() {
    var wechat = new Wechat();
    wechat.init();
}

function Wechat() {}

Wechat.prototype = {
    init: function() {
        var _this = this;
        // 先判断是否需要前端授权(暂时后台做)
        this.isAuthorizationOr();
    },
    //1、 授权还是自动注册
    isAuthorizationOr: function() {
        var _this = this;
        // 判断是微信浏览器打开
        var isWeChat = function() {
            var ua = window.navigator.userAgent.toLowerCase();
            return ua.match(/MicroMessenger/i) == 'micromessenger';
        }
        if (isWeChat()) {
            var code = _this.getUrlParameter("code");
            // code存在已久授权过了
            if (code) {
                _this.sendData(code);
            } else {
                // 不存在跳转到授权
                this.jumpWechat();
            }
        }
    },
    //2、 微信授权登录获取信息
    jumpWechat: function() {
        // 官方示例：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
        // scope为snsapi_userinfo 
        // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=
        // code&scope=snsapi_userinfo&state=STATE#wechat_redirect 
        // redirect_uri/?code=CODE&state=STATE：最终只是要code和state的值

        // 以下参数需要拼接(目前写死的)
        var redirect_uri = encodeURI('https://web-test.langlive.com/v2/html/activity/invite/indexShare.html?anchor_pfid=0&HTTP_USER_UID=1024432&HTTP_USER_TOKEN=1a4fa129ee3ec2da00f851cd48db9266&pfid=1024432&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect');
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx07e7877a19ca99cd&redirect_uri=' + redirect_uri;
        alert('aa');
    },
    //3、 send data去注册
    sendData: function(code) {
        // 发送给后台
        alert(code);
    },
    // 4、获取URL指定参数的值
    getUrlParameter: function(strParame) {
        var args = new Object();
        var query = location.search.substring(1);
        var pairs = query.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
            var argname = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            value = decodeURIComponent(value);
            args[argname] = value;
        }
        return args[strParame];
    }
}


/**
 * 十一、判断两个数组是否相等
 * @param {*} arr1 必须，Array 
 * @param {*} arr2 必须，Array
 * 返回：true/false
 */
function arrayEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length != arr2.length) return false;
    for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}



/**
 * 十二、 设置滚动条距顶部的距离
 * 
 */

function setScrollTop(value) {
    window.scrollTo(0, value);
    return value;
}


/**
 * 十三、 几种重置數字(保留小數)
 * 
 */
// 1 转换为万或者千万，最大支持千万
function numberToMillion(count) {
    var end = '';
    count = count.toString();
    var length = count.length;
    if (length >= 6 && length < 9) {
        end = (count / 10000).toFixed(1);
        var index = end.indexOf(".");
        var last = end.slice(index + 1);
        if (!Number(last)) {
            end = end.slice(0, index);
        }
        end = end + "萬";
    } else if (length >= 9) {
        end = (count / 10000000).toFixed(1);
        var index = end.indexOf(".");
        var last = end.slice(index + 1);
        if (!Number(last)) {
            end = end.slice(0, index);
        }
        end = end + "千萬";
    } else if (length < 6) {
        end = count;
    }
    return end;
}
// Example
numberToMillion(12346589) // => "1234.7萬"

// 2 转换为带K(或者指定符号)
function numberToK(count) {
    var end = '';
    count = count.toString();
    return end = count.length > 4 ? (count / 1000).toFixed(1) + "K" : count;
}
// Example
numberToK(456798) // => "456.8K"

// 3 从尾部每三位用符号隔开
function numberWithComma(num) {
    var num = (num || 0).toString(),
        result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}
// Example 
numberWithComma(4567889798) // => "4,567,889,798"



/**
 * 十四、限制点击（单击）次数
 *  repeat(id,num) @param {id:"String",哪個按鈕的點擊；num:"Number",多少秒后可以點擊}
 * 
 */
const CAN_STORE = {
    repeatTemp: [],
    initTime: function() {
        return new Date().getTime();
    }
}
const CAN_IS_REPEAT = {
    repeat: function(id, num) {
        /**
         *  id ：string,標識符，哪個點擊事件
         *  num : 整數 t秒內只可以點擊一次
         *  num 不存在，限制执行频率，默认为60秒 允许执行时返回false  毫秒
         */
        let t = num ? num * 1000 : 60000;
        let time = CAN_STORE.initTime()
        if (!CAN_STORE.repeatTemp[id]) {
            CAN_STORE.repeatTemp[id] = time
            //允许
            return false
        } else {
            let ts = t - (time - CAN_STORE.repeatTemp[id]);
            ts = parseInt(ts / 1000)
            if (ts > 0) {
                //禁止执行
                return true
            } else {
                //更新时间
                CAN_STORE.repeatTemp[id] = time
                //允许
                return false
            }
        }
    }
}

function canClick() {
    // 3 秒內只能點擊一次
    let isRepeat = CAN_IS_REPEAT.repeat("repeat", 3)
    if (!isRepeat) {
        // 正常todo
    } else {
        // 操作頻繁
    }
}
// Example
document.getElementById("btn").addEventListener("click", canClick)


/**
 * 十五、滾動加載
 */

var Scroll = {
    init() {
        this.finished = 0
        this.pageIndex = 1
        this.pageSize = 20
        this.timer = null
        this._loadList(this.pageIndex, this.pageSize)
    },
    _loadList(pageIndex, pageSize) {
        ajax("GET", "xxxx/aaa").then(res => {
            if (res.ret_code == "0") {
                // 1 操作数据和DOM
                // 2 是否需要滚动加载
                if (res.data.total > this.pageSize) {
                    this.scrollLoadList();
                }
            }
        }).catch(error => {
            console.log(error)
        })
    },
    scrollLoadList() {
        var $this = this;

        function loadmore(obj) {
            if ($this.finished == 0) {
                // 4.1加载参数
                var scrollTop = $(obj).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(obj).height();
                // if(scrollTop + windowHeight > scrollHeight - 60 ){
                if (scrollTop + windowHeight == scrollHeight) {
                    // 限制
                    $this.finished = 1;
                    // 参数变化
                    $this.pageIndex += 1;
                    // 延迟
                    setTimeout(function() {
                        api.getReplayList($this.pageIndex, $this.pageSize, $this.anchorPfid)
                            .then(function(res) {
                                if (res.ret_code == "0") {
                                    let list = res.data.list;
                                    // 渲染列表

                                    // 4.3 清楚加载中loading效果
                                    $this.$replayLoadingWrap.html("");
                                    // 4.4 是否还有数据
                                    let listNowLength = $(".list-anchor-detail").length;
                                    $this.finished = 0;
                                    if (listNowLength == $this.totalCount) {
                                        // $this.scrollLoadList();
                                        $this.finished = 1;
                                        // 4.5 加载完毕
                                        console.log("加載了" + listNowLength + "条数据！");
                                    }
                                    // 如果错误也是加载完毕
                                } else {
                                    // error
                                }
                            })
                            .catch(function(error) {
                                console.log(error)
                            })
                    }, 1000)
                }
            }
        }
        $(window).scroll(function() {
            loadmore($(this));
        });
    }
}
// Example
Scroll.init()


/**
 * 十六、es6 class用法
 * 
 */
(function(window) {
    "use strict";
    class Video {
        constructor(signStatus) {
            this.signStatus = signStatus
            this.boxDom = document.getElementById("boxDom")
            this.init()
        }
        init() {
            this._getAnchorInfo()
        }
        _getAnchorInfo() {
            api.getInfo("/anchor/info").then(res => {
                // success
                if (res.ret_code == "0") {
                    let data = res.data
                    this._renderHtml(data)
                    // failed
                } else {
                    this._errorTips()
                }
            }).catch(error => {
                console.log(error)
            })
        }
        _renderHtml(data) {
            if (this.signStatus) {
                // 如果存在
            } else {
                this.boxDom.innerHTML = "</p>" + data + "</p>"
            }
        }
        _errorTips() {
            this.boxDom.innerHTML = "数据为空了~"
        }
    }

    var ReplayVideos = new Video()
    window.ReplayVideos = ReplayVideos

    // other status
    // var ReplayVideos = new Video(true)
    // 注意class中的this受限於是否使用箭頭函數！
})(window)



/**
 * 十七、计算2个标准日期的时间差，或者剩余时间
 * timeToMillion(startStr, endStr)
 * @param {startStr} 必须，endStr不存在时候是>0的秒数，endStr存在的时候startStr必须是标准时间格式且小于endStr
 * @param {endStr} 可选，如果存在必须是标准时间格式且大于startStr
 */
function timeToMillion(startStr, endStr) {
    var times;
    if (endStr) {
        var startT = new Date(startStr).getTime()
        var endT = new Date(endStr).getTime()
        times = (endT - startT) / 1000
    } else if (startStr && startStr != 0) {
        times = startStr
    }
    var day, hour, minute, endOutStr;
    if (times > 0) {
        // console.log(times)
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        // second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);

        if (parseInt(day) != 0) {
            endOutStr = day + "天" + hour + "小時" + minute + "分鐘"
        } else {
            if (parseInt(hour) != 0) {
                endOutStr = hour + "小時" + minute + "分鐘"
            } else {
                endOutStr = minute + "分鐘"
            }
        }
    } else {
        endOutStr = 0
    }
    // if (day <= 9) day = '0' + day;
    // if (hour <= 9) hour = '0' + hour;
    // if (minute <= 9) minute = '0' + minute;
    // if (second <= 9) second = '0' + second;
    return endOutStr
}
// Example
imeToMillion(9613920) // => "111天6小時32分鐘"
timeToMillion("2017-11-20 13:58:47", "2017-11-22 15:09:10") // => "2天1小時10分鐘"



/**
 * 十八 、返回剩余大概整数时间
 * @param {seconds} 必须，Number
 * seconds秒數，返回剩餘的大概時間，有天數直接返回天數，
 * 沒天數有小時直接返回小時數，沒有小時數有分鐘數直接返回分鐘數，
 * 沒有分鐘數直接返回傳入的秒數
 *
 */

function timeToRemaining(seconds) {
    var times = parseInt(seconds) || 0;
    var day, hour, minute, second, endOutStr;
    if (times && times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        // second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        second = times

        if (parseInt(day) != 0) {
            return endOutStr = day + "天"
        } else {
            if (parseInt(hour) != 0) {
                return endOutStr = hour + "小時"
            } else {
                if (parseInt(minute) != 0) {
                    return endOutStr = minute + "分鐘"
                } else {
                    return endOutStr = second + "秒"
                }
            }
        }
    } else {
        return endOutStr = 0
    }
}
//Example
timeToRemaining(600000) // 6天
timeToRemaining(600) // 10分鐘
timeToRemaining(40) //40秒


/**
 * 十九、如何把秒數轉換為:年月日時分秒
 * @param {seconds} 必须，单位秒，有效时间的秒数
 * @param {splitWith} 可以扩展添加分割符号：-/
 * 如：2018-4-25  14:28:12
 * 或：2018/4/25  14:28:12
 */
function getDateStr(seconds) {
    var date = new Date(seconds * 1000)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var currentTime = year + "-" + month + "-" + day + "  " + hour + ":" + minute + ":" + second;
    return currentTime
}
//Example
getDateStr(1524637692) // => "2018-4-25  14:28:12"


/**
 * 二十、过滤数组（双重遍历）根据某一项设定指定的属性
 * 如：如果数组的每一项的ID出现相同的就追加一个属性：如字体颜色
 * addProWithValue(arr, key)
 * @param {arr}：必须，arr[i](必须是Object)
 * @param {key}：arr[i]对象的一个属性名字
 * 可以继续扩展
 */

var arr = [{
    id: 0
}, {
    id: 0
}, {
    id: 3
}, {
    id: 2
}, {
    id: 0
}, {
    id: 4
}, {
    id: 2
}];

function addProWithValue(arr, key) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i][key] == arr[j][key]) {
                arr[i].color = "red";
                arr[j].color = "red"
            }
        }
    }
    console.log(arr)
    return arr;
}
// Example
addProWithValue(arr, "id")
// output
arr = [{
    id: 0,
    color: "red"
}, {
    id: 0,
    color: "red"
}, {
    id: 3
}, {
    id: 2,
    color: "red"
}, {
    id: 0,
    color: "red"
}, {
    id: 4
}, {
    id: 2,
    color: "red"
}];


/**
 * 二十一、手机号过滤为*号
 * @param {phone}：必须(Number/String)且length>=6
 * 返回：String
 * 非大陆地区可能有小于11位大于6位的手机号
 * 
 */

function resetPhone(phone) {
    var str = String(phone)
    var len = str.length;
    var prev, next;
    if (len >= 7) {
        prev = str.slice(-len, -7)
        next = str.slice(-3)
        str = prev + "****" + next
    } else if (len < 7 && len >= 6) {
        prev = str.slice(-len, -4)
        next = str.slice(-2)
        str = prev + "**" + next
    }
    console.log(str)
    return str
}
// Example
resetPhone(88613585673010) // => 8861358****010
resetPhone(13585673010) // => 1358****010


/**
 * 二十二、JS的揭示模式
 * 模块封装，属性私有化，对外抛出唯一的API可以操作内部属性和值，方便复用。
 * @param {}
 */
var myModule = function() {
    var privateName = "Stephen Curry",
        publicMsg = "Hey there!";

    function privateHandle() {
        console.log("Name:" + privateName);
    }

    function publicSetName(strName) {
        privateName = strName;
    }

    function publicGetName() {
        privateHandle();
    }
    return {
        setName: publicSetName,
        greeting: publicMsg,
        getName: publicGetName
    }
}();
// Example
myModule.setName("James")
myModule.getName() //Name:James
myModule.greeting //"Hey there!"


/**
 * 二十三、刪除数组指定的选项，
 * removeItem(arr[,value1,value2..])
 * @param {arr,value1,value2,..}
 * arr：必须，且length存在
 * value1..必须，要删除的指定项
 * arguments：隐形参数（要被删除的选项的值）
 * 
 */
function removeItem(arr) {
    var args = [].slice.call(arguments);
    args.slice(0, 1);
    var removeIndex;
    args.forEach(function(item, index) {
        while ((removeIndex = arr.indexOf(item)) >= 0) {
            arr.splice(removeIndex, 1)
        }
    })
}
// Example
var a = [0, 1, 'bb', 2, 3, 4, 'aa', ];
removeItem(a, 'aa', 1)
console.log(a) //[0, "bb", 2, 3, 4]


/**
 * 二十四、如何实现深浅拷贝Array/Object
 * 浅：被拷贝者变化，拷贝者也变化
 * 深：被拷贝者变化，拷贝者没有变化
 * deepClone(obj)
 * @param {obj} 必须Array/Object
 * Function 待
 */
function deepClone(obj) {
    let cloneObj = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === "object") {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    cloneObj[key] = deepClone(obj[key])
                } else {
                    cloneObj[key] = obj[key]
                }
            }
        }
    }
    return cloneObj
}
// Example Array
var a = [0, [1, 2], 3, [4, 5], 6]
var b = deepClone(a)
a[1][0] = "a"
console.log(a)
console.log(b)
// Example Object
var c = {
    a: 0,
    b: {
        d: "d"
    },
    e: "e"
}
var e = deepClone(c)
c.b.d = "dd"
console.log(c, e)

/**
 * 二十五、倒计时
 * startDownTime($elem, date)
 * @param {$elem,date}
 * $elem：必须，DOM元素，可以为null,可以循环中调用startDownTime为多个DOM元素设定倒计时显示
 * date：必须, >0 && <= 2*60*60 的秒数,这里限制最大7200秒即2小时
 * 
 */
function startDownTime($elem, date) {
    // date是秒數：最大小時——2*60*60
    let time = date || 0
    if (time <= 0) {
        time = 0
        return
    } else if (time > 2 * 60 * 60) {
        time = 2 * 60 * 60
    }

    let hour = Math.floor(time / 3600)
    time = Math.round(time)

    let s = time % 60
    let m = Math.floor(time / 60 % 60)
    if (hour && hour > 0 && m == 0 && s == 0) {
        hour >= 0 && hour--
        m = 59
        s = 60
    }
    let str = ''
    // 定時器
    $elem.countId = setInterval(() => {
        if (time < 0) {
            m = 0
            s = 1
        }
        s--
        if (s < 0) {
            s = 59
            m > 0 && m--
        }

        if (m <= 0) {
            hour >= 0 && hour--
        }

        if (hour > 0) {
            str = `${hour}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
        } else {
            str = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
        }
        str += " 後要干嘛？"
        console.log(str)
        // 渲染到指定DOM:JQ/Native
        // $elem.html(str)
        // $elem.innerHTML = str
        if ((hour <= 0 && m <= 0 && s <= 0) || time < 0) {
            clearInterval($elem.countId)
            $elem.countId = -1
            // 如果倒计时为0要替换HTML
        }
    }, 1000)
}
//	Example
startDownTime(document.body, 2 * 60 * 60)

/**
 * 二十六、audio 队列播放(有就就播放，多个播放完当前就播放下一个)
 * 	原生：audio
 *  canplaythrough：src是否加载完成
 * 	ended：当前是否播放完毕
 * 
 */

//  可以考虑用状态
const AUDIO_STATE = {
    INIT: 0,
    CANPLAY: 1,
    END: 2,
}
class PlayAudio {
    constructor(option) {
        this.voiceUrlList = []
        this.audio = document.getElementById("audio-play")
        this._bindEvents()
        this._getSrcFromSocket()
    }
    _bindEvents() {
        // 当前是否播放完毕
        this.audio.addEventListener("ended", () => {
            this.voiceUrlList.shift()
            this._autoPlayAudio(this.voiceUrlList)
        })
    }
    // 实时监听函数
    _getSrcFromSocket(url) {
        this.voiceUrlList.push(url)
        this._autoPlayAudio(this.voiceUrlList)
    }
    _autoPlayAudio(list) {
        let length = list.length
        if (length) {
            let audio = document.getElementById("audio-play")
            let url = list[0]
            audio.src = url
            // 是否加载完毕可以播放
            audio.addEventListener("canplaythrough", () => {
                audio.play()
            })
        } else {
            document.getElementById("audio-play").src = ""
        }
    }
}


/**
 *  二十七、判斷數組是否符合某個標準
 *  如：列表的選項中是否有任意三個選項的數量是重複的，
 * 
 *  @param {list,minNum,minLength} 必須
 * 	list至少有 minLength 個大於等於minNum的選項
 * 
 */
function isEnough(list, minNum, minLength) {
    var length = list.length;
    var fullList = [];
    for (var i = 0; i < length; i++) {
        if (list[i].num >= minNum) {
            fullList.push(list[i])
        }
    }
    var totalNum = 0;
    var fullLength = fullList.length;
    if (fullLength && fullLength >= minLength) {
        for (var i = 0; i < fullLength; i++) {
            totalNum += fullList[i].num;
        }
        return totalNum >= (minNum * minLength) ? 1 : 0
    } else {
        return 0
    }
}

var enough1 = isEnough([{
    num: 2
}, {
    num: 1
}, {
    num: 3
}, {
    num: 4
}], 2, 3) // 1 (true)
var enough2 = isEnough([{
    num: 1
}, {
    num: 3
}, {
    num: 1
}, {
    num: 1
}], 2, 3) // 0 (false)


/**
 *  二十八、JS 如何獲得 uuid 
 * 	如："56733344-5702-9247-2196-AD3598C0388"
 * 
 *  @param {count} 非必須，要追加的隨機字母的個數
 * 
 */
function GetRandomStr(count) {
    var that = this;
    this.count = count || 3;
    this.ABC = ["A", "B", "C", "D", "E", "F", "G", "H"];
    // 1 随机获得 min-max 之间的正整数
    this.getRandomNum = function(max, min) {
        return String(Math.round(Math.random() * (max - min)) + min);
    }
    // 2 随机冲字母中获得指定个数个
    this.getRandomABC = function(ABC, count) {
        var abc = []
        for (var i = 0; i < count; i++) {
            abc.push(ABC[Math.floor(Math.random() * ABC.length)])
        }
        return abc
    }
    console.log(this.getRandomABC(this.ABC, this.count));
    // 3 向指定字符串中随机位置追加指定个数的字母:paramArr 字母数组
    this.outRandomSplice = function(paramArr) {
        var str = that.getRandomNum(99999999, 10000000)
        var strArr = str.split('')
        for (var i = 0; i < paramArr.length; i++) {
            strArr.splice(Math.floor(Math.random() * str.length), 0, paramArr[i])
        }
        return strArr.join('');
    }
    this.endOut = function() {
        return that.getRandomNum(99999999, 10000000) + "-" + that.getRandomNum(9999, 1000) + "-" + that.getRandomNum(9999, 1000) + "-" + that.getRandomNum(9999, 1000) + "-" + that.outRandomSplice(that.getRandomABC(that.ABC, that.count));
    }
}
var ss = new GetRandomStr()
ss.endOut() //"56733344-5702-9247-2196-AD3598C0388"

/**
 *  二十九、判斷輸入的是否是數字
 * 	@param {num} 必須
 */

function checkIsNum(num) {
    let reg = /^\d+$/
    return reg.test(num) ? 1 : 0
}

// example

let inputIsNum = checkIsNum(123456)
inputIsNum ? "是數字" : "不是數字"


/**
 *  三十、JS 位移判断，如：根据某个参数位移处理
 *  @param {flag,w} 必须，flag参数，w 将要位移的位置
 * 
 */

function publicIsTrue(flag, w) {
    if ((flag & 1 << w) == 1 << w) {
        return true
    } else {
        return false
    }
}

//example
var admin = publicIsTrue(2,1) // true





// 如何使用checkout 合并指定的文件夹和文件(合并后会覆盖)
/*	

	一、合并其他分支上指定的文件或者文件夹到当前分支的2个命令

	A：git checkout branchName folderName(合并指定分支上文件夹到当前分支)
	B：git checkout branchName path(合并指定分支上某个文件下的某个文件到当前路径)

	二、如何使用：以下都是在主分支master上执行的命令
	1 把dev1 分支上app下所有的文件合并到主分支master上.
	git checkout dev app

	2 部分更新，如单独合并app/css/index.css到master主分支上.
	git checkout dev app/css/index.css

	3 部分文件夹dev分支上app的js文件夹下有多个JS文件都更新了.
	git checkout dev app/js

	此时合并过来的文件或者文件夹都是默认add过的，
	然后需要在当前分支上commit,再push即可完成合并更新！
	默认合并过来的会覆盖当前分支上的(注意使用)


*/