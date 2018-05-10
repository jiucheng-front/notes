/*
 * @Author: wangjianfei
 * @Date:   2017-04-28 15:32:29
 * @Last Modified by:   wangjianfei
 * @Last Modified time: 2017-05-22 11:16:44
 */
'use strict';
// 一、AJAX封装
// 1、封裝AJAX函數
function nativeAjax(option, success, error) {
	// 定义domain,方便环境切换
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
	xhrRequest.onreadystatechange = function () {
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
// 2、POST：定義請求參數
var postOption = {
	ajaxType: "POST",
	urlStr: "v2/html/broke/get_broke_ranked_info",
	ajaxData: {
		"HTTP_USER_TOKEN": token,
		"HTTP_USER_UID": pfid,
		"anchor_pfid": anchor_pfid,
		"broke_pfid": pfid,
		"date": date
	}
}
// 3、调用AJAX
nativeAjax(postOption, function (data) {
	// 3.1、请求成功回调
	console.log(data);
}, function (error) {
	// 3.2、请求失败回调,返回HTTP状态码
	console.log(error);
});
//4、GET：定义请求参数
var getOption = {
	ajaxType: "GET",
	urlStr: "v2/html/broke/get_broke_ranked_info",
	ajaxData: null
}
nativeAjax(getOption, function (data) {
	// 成功函数
	console.log(data);
}, function (error) {
	// 失败返回HTTP状态码
	console.log(error);

});
// 使用说明
// 、option必须
option = {
	//1、ajaxType必须："GET"或者"POST"
	ajaxType: "",
	//2、urlStr必须："string类型"
	urlStr: "",
	//3、必须：POST时候为object{key:value}，GET的时候直接为：null
	ajaxData: null
}
//  success请求成功回调必须
//  error请求失败回调必须


// 二、判断是否是IOS
function isIos() {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	//ios终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	return isiOS;
}

//1、ClassName切换,是否含有指定class
function hasClass(elem, cls) {
	return elem.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
// 2、没有就追加指定class
function addClass(elem, cls) {
	if (!hasClass(elem, cls)) {
		elem.className += " " + cls;
	}
}
// 3、有就移除指定class
function removeClass(elem, cls) {
	if (hasClass(elem, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		elem.className = elem.className.replace(reg, "");
	}
}


// 三、获取DOM
// 3.1
window.$ = HTMLElement.prototype.$ = function (selector) {
	return (this == window ? document : this).querySelectorAll(selector);
}
// 3.2
function getEleId(id) {
	return document.getElementById(id);
}
// 5、追加HTML
function pushHtml(id, html) {
	return document.getElementById(id).innerHTML = html;
}

// 四、封装綁定事件
function on(type, selector, callback) {
	document.addEventListener(type, function (e) {
		e.preventDefault();
		e.stopPropagation();
		if (selector == e.target.tagName.toLowerCase() || selector == e.target.className || selector == e.target.id) {
			callback(e);
		}
	})
}


// 五、类似JQ的 prevAll和nextAll
HTMLElement.prototype.prevAll = function () {
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

HTMLElement.prototype.nextAll = function () {
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

var temp = function (dom) {
	console.log("prevAll=", dom.prevAll());
	console.log("nextAll=", dom.nextAll());
}

// 六、重置form 表单的action

function resetFormActionDomian(id, domain, urlStr) {
	document.getElementById(id).action = domain + urlStr;
}

// 七、获取URL参数
// 6、获取url参数
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

// "dsaldlas.csadja.com/fhlfh.html?key=10&id=hello";
var key = getUrlParameter("key"); //10
var id = getUrlParameter("hello"); //10

// 八、简单的密码加密和解密

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

// 如何使用
var pwd = "BLUE123456!";
var enPwd = encrypto(pwd, 123, 25);
var dePwd = decrypto(enPwd, 123, 25);
console.log(enPwd); //27z25z1lz2cz2oz2nz2mz34z33z32z3f
console.log(dePwd); //BLUE123456!


// 九、前端JS实现微信授权登录
/**
 * 需要
 * 
 * 
 * 
 * 
 * 
 */

window.onload = function () {
	var wechat = new Wechat();
	wechat.init();
}
// 内部函数可以暂时忽略
function Wechat() {
	// 1 获取DOM(id)
	this.getDom = function (id) {
		return document.getElementById(id);
	}
	// 2 通用绑定事件
	this.bind = function (elem, eventType, callback) {
		if (elem.addEventListener) {
			elem.addEventListener(eventType, callback, false);
		} else {
			elem.attachEvent("on" + eventType, function () {
				callback.call(elem);
			});
		}
	}
	// 3 显示
	this.showDialog = function (elem) {
		elem.style.display = "block";
	}
	// 4 隐藏
	this.hideDialog = function (elem) {
			elem.style.display = "none";
		},
		// 获取url参数
		this.getUrlParameter = function (strParame) {
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

Wechat.prototype = {
	init: function () {
		var _this = this;
		// 先判断是否需要前端授权(暂时后台做)
		this.isAuthorizationOr();
	},
	//1、 授权还是自动注册
	isAuthorizationOr: function () {
		var _this = this;
		// 判断是微信浏览器打开
		var isWeChat = function () {
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
	jumpWechat: function () {
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
	sendData: function (code) {
		// 发送给后台
		alert(code);
	},
	// 4、获取URL指定参数的值
	getUrlParameter: function (strParame) {
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


//  十、判断两个数组是否相等
function arrayEqual(arr1, arr2) {
	if (arr1 === arr2) return true;
	if (arr1.length != arr2.length) return false;
	for (vari = 0; i < arr1.length; ++i) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}

/**
 * 
 * 十一、 设置滚动条距顶部的距离
 * 
 */

function setScrollTop(value) {
	window.scrollTo(0, value);
	return value;
}

/**
 * 
 * 十二、 重置數字(保留小數)
 * 
 */
const perateNumber = {
	numberToMillion: function (count) {
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
	},
	//numberToMillion(12346589) "1234.7萬"

	numberToK: function (count) {
		var end = '';
		count = count.toString();
		return end = count.length > 4 ? (count / 1000).toFixed(1) + "K" : count;
	},
	//numberToK(456798) "456.8K"

	numberWithComma: function (num) {
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
	// numberWithComma(1245) "1,245"
	// numberWithComma(4567889798) "4,567,889,798"
}

//十三、 限制点击次数

var VAR = {
	repeatTemp: []
}
var COM = {
	repeat: function (s, t) {
		//限制执行频率，默认为60秒 允许执行时返回false  毫秒
		t = t ? t * 1000 : 60000;
		var time = microtime();
		if (!VAR.repeatTemp[s]) {
			VAR.repeatTemp[s] = time;
			//允许
			return false;
		} else {
			var ts = t - (time - VAR.repeatTemp[s]);
			ts = parseInt(ts / 1000);
			if (ts > 0) {
				// alert("频率限制：还有"+ ts +" 秒才可以再执行！");
				//禁止执行
				return true;
			} else {
				//更新时间
				VAR.repeatTemp[s] = time;
				//允许
				return false;
			}
		}
	}
}

function microtime() {
	return new Date().getTime();
}

function canClick() {
	var can = COM.repeat('can');
	if (!can) {
		// 请求接口
		console.log("可以！")
	} else {
		return
	}

}
document.getElementById("btn").addEventListener("click", canClick)


//十四、 滾動加載

var Scroll = {
	init() {
		this.finished = 0;
		this.scrollLoadList();
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
					// 4.2 加载loading效果
					$this.$replayLoadingWrap.html(T.replayLoading({
						loading: true,
						loadingTips: "加載中......"
						// finished:true,
						// finishedTips:"没有更多数据了！"
					}))
					// 延迟
					setTimeout(function () {　　　　
						api.getReplayList($this.pageIndex, $this.pageSize, $this.anchorPfid)
							.then(function (res) {
								if (res.ret_code == "0") {
									let list = res.data.list;
									// console.log(list);
									$this.$replayContentList.append(T.replayList({
										// data: list,
										data: list,
										colCounts: 4,
										rows: 5,
										Utils
									}));
									// 4.3 清楚加载中loading效果
									$this.$replayLoadingWrap.html("");
									//图片赖加载
									$this.startLazyLoad();
									// 4.4 是否还有数据
									let listNowLength = $(".list-anchor-detail").length;
									$this.finished = 0;
									if (listNowLength == $this.totalCount) {
										// $this.scrollLoadList();
										$this.finished = 1;
										// 4.5 加载完毕
										$this.$replayLoadingWrap.html(T.replayLoading({
											finished: true,
											finishedTips: "沒有更多影片咯~"
										}));
										console.log("加載了" + listNowLength + "条数据！");
									}
									// 如果错误也是加载完毕
								} else {
									$this.$replayLoadingWrap.html(T.replayLoading({
										finished: true,
										finishedTips: "沒有更多影片咯~"
									}));
								}
							})
							.catch(function (error) {
								console.log(error)
							})
					}, 1000)　　
				}
			}
		}
		$(window).scroll(function () {
			loadmore($(this));
		});
	}
}

Scroll.init();

// 十五、es6 class用法
;
(function (window) {
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


// 十五、日期格式化

class ResetDate {
	timeToMillion(startStr, endStr) {
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
	/**
	 * timeToMillion(9613920)>"111天6小時32分鐘"
	 * 
	 * timeToMillion("2017-11-20 13:58:47", "2017-11-22 15:09:10")  >"2天1小時10分鐘"
	 * 
	 **/

}

/*
*十六 seconds秒數，返回剩餘的大概時間，有天數直接返回天數，沒天數有小時直接返回小時數，沒有小時數有分鐘數直接返回分鐘數，
* 沒有分鐘數直接返回傳入的秒數
*
**/ 

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
                }else{
                    return endOutStr = second + "秒"
                }
            }
        }
    } else {
        return endOutStr = 0
    }
}

timeToRemaining(600000) // 6天
timeToRemaining(70000) //19小數
timeToRemaining(600) // 10分鐘
timeToRemaining(40)  //40秒


// 十七、如何把秒數轉換為年月日時分秒
function getDateStr(seconds){
    var date = new Date(seconds*1000)
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        var currentTime = year + "-" + month + "-" + day + "  " + hour + ":" + minute + ":" + second;
        return currentTime
}
// getDateStr(1524637692)>"2018-4-25  14:28:12"

// 十八、如果数组的每一项的ID出现相同的就追加一个属性：如字体颜色
var arr=[{id:0},{id:0},{id:3},{id:2},{id:0},{id:4},{id:0},{id:1},{id:1},{id:2},{id:2}];
for(var i=0;i<arr.length;i++){
	for(var j=i+1;j<arr.length;j++){
		if(arr[i].id == arr[j].id){
			arr[i].color = "red";
			arr[j].color = "red"
		}
	}
}
console.log(arr)
//output
arr=[
	{id: 0, color: "red"},
	{id: 0, color: "red"},
	{id: 3},
	{id: 2, color: "red"},
	{id: 0, color: "red"},
	{id: 4},
	{id: 0, color: "red"},
	{id: 1, color: "red"},
	{id: 1, color: "red"},
	{id: 2, color: "red"},
	{id: 2, color: "red"}
]

// 十九、手机号过滤为*号

function resetPhone(phone) {
	var str = String(phone)
	var len = str.length;
	if (len >= 7) {
		var reg = str.slice(-7, -3)
		return str.replace(reg, "****")
	} else if (len < 7 && len >= 6) {
		//1234567
		var reg = str.slice(-4, -2)
		return str.replace(reg, "**")
	}
}

// 如果匹配的是连续相同的位置有误！


// 二十、JS的揭示模式
var myModule = function    (){
    var privateName = "Stephen Curry",
    publicMsg = "Hey there!";
    function privateHandle(){
        console.log("Name:"+privateName);
    }
    function publicSetName(strName){
        privateName = strName;
    }
    function publicGetName(){
        privateHandle();
    }
    return {
        setName : publicSetName,
        greeting : publicMsg,
        getName : publicGetName
    }
}();
myModule.setName("James")
myModule.getName()    //Name:James
myModule.greeting     //"Hey there!"


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

	合并过来的文件或者文件夹在主分支master上都是默认add过的，
	然后需要在master分支上commit,再push即可完成合并更新！



*/