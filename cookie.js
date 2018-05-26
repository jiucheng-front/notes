window.onload=function onLoginLoaded() {
    if(isPostBack == "False") {
        GetLastUser();
    }
}
function GetLastUser() {
    var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";//GUID标识符
    var usr = GetCookie(id);
    if (usr != null) {
        document.getElementById('txtUserName').value = usr;
    }
    else {
        document.getElementById('txtUserName').value = "001";
    }
    GetPwdAndChk();
}
//点击登录时触发客户端事件
function SetPwdAndChk() {
//取用户名
    var usr = document.getElementById('txtUserName').value;
//                alert(usr);
//将最后一个用户信息写入到Cookie
    SetLastUser(usr);
//如果记住密码选项被选中
    if(document.getElementById('chkRememberPwd').checked == true) {
    //取密码值
        var pwd = document.getElementById('txtPassword').value;
//                    alert(pwd);
        var expdate = new Date();
        expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
    //将用户名和密码写入到Cookie
        SetCookie(usr, pwd, expdate);
    }
    else {
    //如果没有选中记住密码,则立即过期
        ResetCookie();
    }
}
function SetLastUser(usr) {
    var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";
    var expdate = new Date();
    //当前时间加上两周的时间
    expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
    SetCookie(id, usr, expdate);
}
//用户名失去焦点时调用该方法
function GetPwdAndChk() {
    var usr = document.getElementById('txtUserName').value;
    var pwd = GetCookie(usr);
    if (pwd != null) {
        document.getElementById('chkRememberPwd').checked = true;
        document.getElementById('txtPassword').value = pwd;
    }
    else {
        document.getElementById('chkRememberPwd').checked = false;
        document.getElementById('txtPassword').value = "";
    }
}
//取Cookie的值
function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        //alert(j);
        if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
var isPostBack = "<%= IsPostBack %>";
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}
//写入到Cookie
function SetCookie(name, value, expires) {
    var argv = SetCookie.arguments;
    //本例中length = 3
    var argc = SetCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
}
function ResetCookie() {
    var usr = document.getElementById('txtUserName').value;
    var expdate = new Date();
    SetCookie(usr, null, expdate);
}



// ---------------------------------------------------------------------------
/************************************************************************
|    函数名称： setCookie                                                |
|    函数功能： 设置cookie函数                                            |
|    入口参数： name：cookie名称；value：cookie值                        |
|    维护记录： Spark(创建）                                            |
|    版权所有： (C) 2006-2007 北京东方常智科技有限公司                    |
|    编写时间： 2007年9月13日 21:00                                        |
*************************************************************************/
function setCookie(name, value) 
{ 
    var argv = setCookie.arguments; 
    var argc = setCookie.arguments.length; 
    var expires = (argc > 2) ? argv[2] : null; 
    if(expires!=null) 
    { 
        var LargeExpDate = new Date (); 
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires*1000*3600*24));         
    } 
    document.cookie = name + "=" + escape (value)+((expires == null) ? "" : ("; expires=" +LargeExpDate.toGMTString())); 
}
/************************************************************************
|    函数名称： getCookie                                                |
|    函数功能： 读取cookie函数                                            |
|    入口参数： Name：cookie名称                                            |
|    维护记录： Spark(创建）                                            |
|    版权所有： (C) 2006-2007 北京东方常智科技有限公司                    |
|    编写时间： 2007年9月13日 21:02                                        |
*************************************************************************/
function getCookie(Name) 
{ 
    var search = Name + "=" 
    if(document.cookie.length > 0) 
    { 
        offset = document.cookie.indexOf(search) 
        if(offset != -1) 
        { 
            offset += search.length 
            end = document.cookie.indexOf(";", offset) 
            if(end == -1) end = document.cookie.length 
            return unescape(document.cookie.substring(offset, end)) 
        } 
        else return "" 
    } 
} 

/************************************************************************
|    函数名称： deleteCookie                                            |
|    函数功能： 删除cookie函数                                            |
|    入口参数： Name：cookie名称                                        |
|    维护记录： Spark(创建）                                        |
|    版权所有： (C) 2006-2007 北京东方常智科技有限公司                |
|    编写时间： 2007年9月15日 18:10                                    |
*************************************************************************/    
function deleteCookie(name) 
{ 
                     var expdate = new Date(); 
                     expdate.setTime(expdate.getTime() - (86400 * 1000 * 1)); 
    setCookie(name, "", expdate); 
}

// 使用方法：

//1、存储Cookie
//2、参数说明： 1、参数1：Cookie存储Name，参数2：Cookie要存储的值
//3、例子如下：
setCookie('Method',match);

//1、获取Cookie
//2、参数说明： 1、参数1：Cookie存储的Name
//3、例子如下：
getCookie('Method')

//1、删除Cookie
//2、参数说明： 1、参数1：Cookie存储的Name
//3、例子如下：
deleteCookie('Method');