### 面試題小結（！！）
#### vue 常见面试题：https://juejin.im/post/5aa00229f265da239b40fc02
### 一、javascript
#### 1、实现一个formDate方法，其能将一个Date日期对象，格式化为yyy-MM-dd HH:mm:ss的字符串形式

```javascript

	'use strict';
	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	// 例子：
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
	Date.prototype.format = function(format) { //author: meizz
	  let o = {
	    "M+": this.getMonth() + 1, //月份
	    "d+": this.getDate(), //日
	    "H+": this.getHours(), //小时
	    "m+": this.getMinutes(), //分
	    "s+": this.getSeconds(), //秒
	    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	    "f+": this.getMilliseconds() //毫秒
	  };
	  if (/(y+)/.test(format))
	    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	  for (let k in o)
	    if (new RegExp("(" + k + ")").test(format))
	      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	  return format;
	};

```
<p><code>
var a=new Date();a.format('yyyy/MM/dd HH:mm:ss');
</code></p>




#### 2、如何将JS中的arguments对象，转换成普通的数组(可以用ES6的语法)

```javascript

	方法一：
		var argumentsArr=[].slice.call(arguments);//(es5)
	方法二：
		let argumentsArr = Array.form(arguments);//(es6)

```

#### 3、请使用两种不同的方法实现数组去重(可以使用ES6语法)

```javascript

	// author:JsLin
	uniqueArray: function(arry) { //数组去重
	            var n = {},
	                r = []; //n为hash表，r为临时数组
	            for (var i = 0; i < arry.length; i++) //遍历当前数组
	            {
	                if (!n[arry[i]]) //如果hash表中没有当前项
	                {
	                    n[arry[i]] = true; //存入hash表
	                    r.push(arry[i]); //把当前数组的当前项push到临时数组里面
	                }
	            }
	            return r;
	        }

	// 一：利用filter
	// 利用 indexOf 总是返回第一个元素的位置，后续重复元素与indexOf 返回的位置不符
    var arr = [1, 2, 3, 1, 4, 3], r;
    r = arr.filter(function (ele, index, self) {
        return self.indexOf(ele) === index;
    })
    console.log(r);

	// 二：ES6
	function unique(arr){
        return Array.from(new Set(arr));
    };
    unique([1,2,3,3,'3', '']); // [1,2,3,'3', '']
	
	// 三：判断在s数组中是否存在，不存在则push到s数组中（javascript）
	var arr = ['abc','abcd','sss','2','d','t','2','ss','f','22','d'];
	//定义一个新的数组
	var s = [];
	//遍历数组
	for(var i = 0;i<arr.length;i++){
	    if(s.indexOf(arr[i]) == -1){  //判断在s数组中是否存在，不存在则push到s数组中
	        s.push(arr[i]);
	    }
	}
	console.log(s);

```

#### 4、请实现一个‘深拷贝’方法，（如jQuery.extend(true,{},{name:'Bob',schools:['保安中学'，'中山大学']})；）

#### 5、简要描述函数表达式与函数声明的区别，以及函数表达式的作用是什么？

```javascript

	A:函数声明
	function fun(){}
	fun()
	//1、函数声明必须有函数名
	//2、函数声明可以在任何地方调用

	B:函数表达式
	var fun=function(){}
	//1、函数的名字是可以省略的
	//2、想要调用的话必须在函数表达式声明的后面调用，否则报错some is not a function

```
#### 6、请简要解释作用域以及作用域链

```javascript

	A：作用域是函數內部可用，外部無法訪問，起到避免全局污染的作用
	B：作用域鏈是原型鏈中的的概念，是JS實現繼承的基礎。

```

####  7、请简要解释什么是原型链

```javascript

	
	其實是js中原型链和作用域链根本不存在这样的链结构，而是通过查找引用，递归遍历，形式上是“链”结构。
	我們經常這樣
	function Person () {
        this.name = 'John';
    }
    var person = new Person();
    Person.prototype.say = function() {
        console.log('Hello,' + this.name);
    };
    person.say();//Hello,John
	上述代码非常简单，Person原型对象定义了公共的say方法，虽然此举在构造实例之后出现，但因为原型方法在调用之前已经声明，因此之后的每个实例将都拥有该方法。从这个简单的例子里，我们可以得出：
	原型对象的用途是为每个实例对象存储共享的方法和属性，它仅仅是一个普通对象而已。并且所有的实例是共享同一个原型对象，因此有别于实例方法或属性，原型对象仅有一份。所有就会有如下等式成立
	也許會這樣寫：
	function Person () {
        this.name = 'John';
    }
    var person = new Person();
    Person.prototype = {
        say: function() {
            console.log('Hello,' + this.name);
        }
    };
    person.say();//person.say is not a function
	很不幸，person.say方法没有找到，所以报错了。其实这样写的初衷是好的：因为如果想在原型对象上添加更多的属性和方法，我们不得不每次都要写一行Person.prototype,还不如提炼成一个Object来的直接。但是此例子巧就巧在构造实例对象操作是在添加原型方法之前，这样就会造成一个问题：
	当var person = new Person()时，Person.prototype为：Person {}(当然了，内部还有constructor属性),即Person.prototype指向一个空的对象{}。而对于实例person而言，其内部有一个原型链指针proto,该指针指向了Person.prototype指向的对象，即{}。接下来重置了Person的原型对象，使其指向了另外一个对象,即
	Object {say: function}，
	这时person.proto的指向还是没有变，它指向的{}对象里面是没有say方法的，因为报错。
	从这个现象我们可以得出：
	在js中，对象在调用一个方法时会首先在自身里寻找是否有该方法，若没有，则去原型链上去寻找，依次层层递进，这里的原型链就是实例对象的__proto__属性。
	若想让上述例子成功运行，最简单有效的方法就是交换构造对象和重置原型对象的顺序，即：
	function Person () {
	        this.name = 'John';
	    }
	    Person.prototype = {
	        say: function() {
	            console.log('Hello,' + this.name);
	        }
	    };
	    var person = new Person();
	    person.say();//person.say is not a function
	
	其实，只需要明白原型对象的结构即可：
	Function.prototype = {
        constructor : Function,
        __proto__ : parent prototype,
        some prototype properties: ...
    };
	总结：函数的原型对象constructor默认指向函数本身，原型对象除了有原型属性外，为了实现继承，还有一个原型链指针__proto__，该指针指向上一层的原型对象，而上一层的原型对象的结构依然类似，这样利用__proto__一直指向Object的原型对象上，而Object的原型对象用Object.prototype.__proto__ = null表示原型链的最顶端，如此变形成了javascript的原型链继承，同时也解释了为什么所有的javascript对象都具有Object的基本方法。
	

```

#### 8、阐述一下你对Ajax的理解（可以从单一、底层、对前端交互的影响等方面来说）

#### 9、JS中，如何单一类？如何实现类与类之间的继承？

#### 10、JS中，new运算符背后做了哪些事情？(或者说对一个function而言，使用new运算符调用与直接调用有何不同？)

#### 11、JS中，this关键字有几种指向？分别举例说明

#### 12、有一个字符串如：var str="abc345efgabcab",请写出3条JS语句分别实现如下3个功能
	+ 1) 去掉字符串中的a、b、c字符，形成结果为："345efg"
	+ 2) 将字符串中的数字用括号括起来，形成结果："abc34[5]efgabcab"
	+ 3) 将字符串中的每个数字的值分别乘以2，形成结果为："abc6810efgabcab"

```javascript

	var str="abc345efgabcab";
	//1
	str=str.replace(/[a]*[b]*[c]*/gi,'');
	console.log(str)//=>"345efg"

	//2
	str=str.replace(/[5]/gi,function(r){
		return '['+r+']';
	});
	console.log(str)//=>"abc34[5]efgabcab"

	//3
	var str="abc345efgabcab";
	var reg=/[0-9]/gi;
	str=str.replace(reg,function(s){
		return s*2;
	});
	console.log(str);

```

#### 13、有这样一个"URL=xxxx.aaa.bbb/index.php?abc=10&b=2000&c=999",请写出一段JS程序提取URL中的各个参数(参数名和参数值的个数不确定)，将去按key:value形式返回到一个json结构中，如：{aaa: "10", bbbd: "2000", ffc: "999"}

```javascript

	var ss="http://www.xxxx.net/article/46326.htm?abc=10&b=2000&c=999";
	var index=ss.indexOf("?")+1;
	var s1=ss.slice(index);
	var s2=s1.split("&");
	//console.log(s2);
	var object={};
	for(var i=0;i<s2.length;i++){
		var now=s2[i];
		var nowIndex=now.indexOf("=");
		// 	-------
		var k=now.slice(0,nowIndex);
		var value=now.slice(nowIndex+1).toString();
		object[k]=value;
		//console.log(k);
		//console.log(value);
		//console.log(object);
	}
	console.log(object);//=>{abc: "10", b: "2000", c: "999"},undefined未判断

```
```javascript

	var ss="http://www.xxxx.net/article/46326.htm?abc=10&b=2000&c=999";
	//获取到链接后的值,以对象的形式展示
	function getRequest(){
		var url=location.search;//获取url中"?"符后的字符串,
		var Request=new Object();
		if(url.indexOf("?")!=-1){
			var str=url.substr(1);//获取到"?"后的字符串
			var strs=str.split("&");
			for(var i=0;i<strs.length;i++){
				Request[strs[i].split("=")[0]]=strs[i].split("=")[1];
			}
			return Request
		}
	}

	//使用方法
	var ruquest=new getRequest();
	console.log(request.abc);
	console.log(request.b);
	console.log(request.c);
```

#### 14、几种基本数据类型?复杂数据类型?值类型和引用数据类型?堆栈数据结构?

> 基本数据类型：Undefined、Null、Boolean、Number、String

> 值类型：数值、布尔值、null、undefined。

> 引用类型：对象、数组、函数。

> 堆栈数据结构：是一种支持后进先出(LIFO)的集合,即后被插入的数据,先被取出!

> js数组中提供了以下几个方法可以让我们很方便实现堆栈：

> shift:从数组中把第一个元素删除，并返回这个元素的值。

> unshift: 在数组的开头添加一个或更多元素，并返回新的长度

> push:在数组的中末尾添加元素，并返回新的长度

> pop:从数组中把最后一个元素删除，并返回这个元素的值。

#### 15、声明函数作用提升?声明变量和声明函数的提升有什么区别?

> (1) 变量声明提升：变量申明在进入执行上下文就完成了。
只要变量在代码中进行了声明，无论它在哪个位置上进行声明， js引擎都会将它的声明放在范围作用域的顶部；

> (2) 函数声明提升：执行代码之前会先读取函数声明，意味着可以把函数申明放在调用它的语句后面。
只要函数在代码中进行了声明，无论它在哪个位置上进行声明， js引擎都会将它的声明放在范围作用域的顶部；

> (3) 变量or函数声明：函数声明会覆盖变量声明，但不会覆盖变量赋值。
同一个名称标识a，即有变量声明var a，又有函数声明function a() {}，不管二者声明的顺序，函数声明会覆盖变量声明，也就是说，此时a的值是声明的函数function a() {}。注意：如果在变量声明的同时初始化a，或是之后对a进行赋值，此时a的值变量的值。eg: var a; var c = 1; a = 1; function a() { return true; } console.log(a);

#### 16、判断数据类型?

> typeof返回的类型都是字符串形式，可以判断function的类型；在判断除Object类型的对象时比较方便。
> 判断已知对象类型的方法： instanceof，后面一定要是对象类型，并且大小写不能错，该方法适合一些条件选择或分支。

#### 17、异步编程？

> 方法1：回调函数，优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度耦合（Coupling），流程会很混乱，而且每个任务只能指定一个回调函数。

> 方法2：时间监听，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以“去耦合”（Decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。

> 方法3：发布/订阅，性质与“事件监听”类似，但是明显优于后者。

> 方法4：Promises对象，是CommonJS工作组提出的一种规范，目的是为异步编程提供统一接口。
> 简单说，它的思想是，每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数。

#### 18、事件流?事件捕获？事件冒泡？

> 事件流：从页面中接收事件的顺序。也就是说当一个事件产生时，这个事件的传播过程，就是事件流。

> 事件捕获是不太具体的元素应该更早接受到事件，而最具体的节点应该最后接收到事件。他们的用意是在事件到达目标之前就捕获它；也就是跟冒泡的过程正好相反，以html的click事件为例，document对象（DOM级规范要求从document开始传播，但是现在的浏览器是从window对象开始的）最先接收到click事件的然后事件沿着DOM树依次向下传播，一直传播到事件的实际目标；

> IE中的事件流叫事件冒泡；事件冒泡：事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点（文档）。对于html来说，就是当一个元素产生了一个事件，它会把这个事件传递给它的父元素，父元素接收到了之后，还要继续传递给它的上一级元素，就这样一直传播到document对象（亲测现在的浏览器到window对象，只有IE8及下不这样

#### 19、如何清除一个定时器?

> window.clearInterval();

> window.clearTimeout();

#### 20、如何添加一个dom对象到body中?innerHTML和innerText区别?分别简述五个window对象、属性

> body.appendChild(dom元素)；

> innerHTML:从对象的起始位置到终止位置的全部内容,包括Html标签。

> innerText:从起始位置到终止位置的内容, 但它去除Html标签 

> 成员对象

> window.event window.document window.history 

> window.screen window.navigator window.external

> Window对象的属性如下：

> window //窗户自身

> window.self //引用本窗户window=window.self 

> window.name //为窗户命名 

> window.defaultStatus //设定窗户状态栏信息 

> window.location //URL地址,配备布置这个属性可以打开新的页面

#### 21、数据持久化技术(ajax)?简述ajax流程

> 1)客户端产生js的事件

> 2)创建XMLHttpRequest对象

> 3)对XMLHttpRequest进行配置

> 4)通过AJAX引擎发送异步请求

> 5)服务器端接收请求并且处理请求，返回html或者xml内容

> 6)XML调用一个callback()处理响应回来的内容

> 7)页面局部刷新

#### 22、回调函数?

> 回调函数就是一个通过函数指针调用的函数。如果你把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。回调函数不是由该函数的实现方直接调用，而是在特定的事件或条件发生时由另外的一方调用的，用于对该事件或条件进行响应。

#### 23、什么是闭包?* 堆栈溢出有什么区别？ 内存泄漏? 那些操作会造成内存泄漏？怎么样防止内存泄漏？

> 闭包：就是能够读取其他函数内部变量的函数。

> 堆栈溢出：就是不顾堆栈中分配的局部数据块大小，向该数据块写入了过多的数据，导致数据越界，结果覆盖了别的数据。经常会在递归中发生。

> 内存泄露是指：用动态存储分配函数内存空间，在使用完毕后未释放，导致一直占据该内存单元。直到程序结束。指任何对象在您不再拥有或需要它之后仍然存在。

> 造成内存泄漏：

> setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。

> 闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

> 防止内存泄露：

> 1、不要动态绑定事件；

> 2、不要在动态添加，或者会被动态移除的dom上绑事件，用事件冒泡在父容器监听事件；

> 3、如果要违反上面的原则，必须提供destroy方法，保证移除dom后事件也被移除，这点可以参考Backbone的源代码，做的比较好；

> 4、单例化，少创建dom，少绑事件。

#### 24、平时工作中怎么样进行数据交互?如果后台没有提供数据怎么样进行开发?mock数据与后台返回的格式不同意怎么办?

> 由后台编写接口文档、提供数据接口实、前台通过ajax访问实现数据交互；
	
> 在没有数据的情况下寻找后台提供静态数据或者自己定义mock数据；
	
> 返回数据不统一时编写映射文件 对数据进行映射。

#### 25、简述ajax执行流程

```javascript
	
	//基本步骤：
	var xhr =null;//创建对象 
	if(window.XMLHttpRequest){
	       xhr = new XMLHttpRequest();
	}else{
	       xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open(“方式”,”地址”,”标志位”);//初始化请求 
	   xhr.setRequestHeader(“”,””);//设置http头信息 
	xhr.onreadystatechange =function(){}//指定回调函数 
	xhr.send();//发送请求 


```

#### 26、自执行函数?用于什么场景？好处?

> 自执行函数:1、声明一个匿名函数2、马上调用这个匿名函数。
作用：创建一个独立的作用域。

> 好处：防止变量弥散到全局，以免各种js库冲突。隔离作用域避免污染，或者截断作用域链，避免闭包造成引用变量无法释放。利用立即执行特性，返回需要的业务函数或对象，避免每次通过条件判断来处理

> 场景：一般用于框架、插件等场景

#### 27、html和xhtml有什么区别?

> HTML是一种基本的WEB网页设计语言，XHTML是一个基于XML的标记语言。

> 1.XHTML 元素必须被正确地嵌套。

> 2.XHTML 元素必须被关闭。

> 3.标签名必须用小写字母。

> 4.空标签也必须被关闭。

> 5.XHTML 文档必须拥有根元素。

#### 28、什么是构造函数？与普通函数有什么区别?

> 构造函数：是一种特殊的方法、主要用来创建对象时初始化对象，总与new运算符一起使用，创建对象的语句中构造函数的函数名必须与类名完全相同。
与普通函数相比只能由new关键字调用，构造函数是类的标示

#### 29、通过new创建一个对象的时候，函数内部有哪些改变

> 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。

> 属性和方法被加入到 this 引用的对象中。

> 新创建的对象由 this 所引用，并且最后隐式的返回 this 

```javascript

	//构造函数Person(),默认return this
    function Person(){
        this.name='xxxx';
        this.age=10;
        this.sad=function(){console.log(this.age)}
        this.speak=function(){
            console.log('I am '+this.name+' '+'今年 :'+this.age);
        }
    }
    var person1=new Person();
    person1.age=20;
    person1.sad();//20
    //注意 new操作符 :的内部原理
        1：创建一个空对象
        2：把this指向到这个空对象
        3：把空对象的内部原型(proto)指向构造函数的原型(prototype)对象
        4：当前构造函数执行完成后，如果没有return的话，就会把当前的空对象返回，一般都没有return
    //注意 new操作符原理：执行的时候类似在构造函数Person()内部，过程可以如下去理解，实际不是！！
    function Person(){
        var tt={};
        this=tt;
        tt.__proto__=Person.prototype;
        this.name='xxxx';
        this.age=10;
        this.sad=function(){...}
        return tt;
    }
    //prototype只有函数才有的原型
    //__proto__所有的对象都有的
    person1.__proto__===Person.prototype;//true
    person1.prototype===Person.prototype;//false
    person1===person2//false

    var person2=new Person();
    //可以把所有实例对象person1、person2...的公用方法封装到构造函数的的原型里面去,就可以减少空间,所以可以优化
    Person.prototype.speak=function(){
        console.log('I am '+this.name+' '+'今年 :'+this.age);
    }
    person2.name='person2';
    person2.age=100;
    person2.sad();//100
    person2.speak();//I am person2 今年 :100


```

#### 30、事件委托？有什么好处?

> 利用冒泡的原理，把事件加到父级上，触发执行效果

> 好处：新添加的元素还会有之前的事件；提高性能。

#### 31、window.onload ==? DOMContentLoaded ?

> 一般情况下，DOMContentLoaded事件要在window.onload之前执行，当DOM树构建完成的时候就会执行DOMContentLoaded事件，而window.onload是在页面载入完成的时候，才执行，这其中包括图片等元素。大多数时候我们只是想在DOM树构建完成后，绑定事件到元素，我们并不需要图片元素，加上有时候加载外域图片的速度非常缓慢。

#### 32、节点类型?判断当前节点类型?

> 1. 元素节点、属性节点 、文本节点、注释节点、文档节点

> 通过nodeObject.nodeType判断节点类型：其中，nodeObject 为DOM节点（节点对象）。该属性返回以数字表示的节点类型，例如，元素节点返回 1，属性节点返回 2 。

#### 33、如何合并两个数组？数组删除一个元素?

```javascript

	//三种方法。
	（1）var arr1=[1,2,3];
		var arr2=[4,5,6];
		arr1 = arr1.concat(arr2);
		console.log(arr1); 
	（2）var arr1=[1,2,3];
		var arr2=[4,5,6];
		Array.prototype.push.apply(arr1,arr2);
		console.log(arr1);
	（3） var arr1=[1,2,3];
		var arr2=[4,5,6];
		for (var i=0; i < arr2.length; i++) {
		   arr1.push( arr2[i] );
		}
		console.log(arr1);  

```

#### 34、强制转换 显式转换 隐式转换?

```javascript
	
	//强制类型转换：
	Boolean(0)                // => false - 零
	Boolean(new object())   // => true - 对象
	Number(undefined)       // =>   NaN
	Number(null)              // => 0
	String(null)              // => "null"
	parseInt( )
	parseFloat( )
	JSON.parse( )
	JSON.stringify ( )

```

> 隐式类型转换：

> 在使用算术运算符时，运算符两边的数据类型可以是任意的，比如，一个字符串可以和数字相加。之所以不同的数据类型之间可以做运算，是因为JavaScript引擎在运算之前会悄悄的把他们进行了隐式类型转换的（例如：x+"" //等价于String(x)+x //等价于Number(x)x-0 //同上!!x //等价于Boolean(x),是双叹号）

> 显式转换：

> 如果程序要求一定要将某一类型的数据转换为另一种类型，则可以利用强制类型转换运算符进行转换，这种强制转换过程称为显示转换。
显示转换是你定义让这个值类型转换成你要用的值类型，是底到高的转换。例 int 到float就可以直接转，int i=5,想把他转换成char类型，就用显式转换（char）i

#### 35、Jq中如何实现多库并存?就是“$ ”符号的冲突。
> 方法一： 利用jQuery的实用函数$.noConflict();这个函数归还$的名称控制权给另一个库，因此可以在页面上使用其他库。这时，我们可以用"jQuery "这个名称调用jQuery的功能。 

> 方法二： (function($){})(jQuery) 

> 方法三： jQuery(function($){}) 通过传递一个函数作为jQuery的参数，因此把这个函数声明为就绪函数。 我们声明$为就绪函数的参数，因为jQuery总是吧jQuery对象的引用作为第一个参数传递，所以就保证了函数的执行。

#### 36、Jq中get和eq有什么区别？
> get() :取得其中一个匹配的元素。num表示取得第几个匹配的元素，get多针对集合元素，返回的是DOM对象组成的数组 

> eq():获取第N个元素，下标都是从0开始，返回的是一个JQuery对象

#### 37、如何通过原生js 判断一个元素当前是显示还是隐藏状态?

```javascript

	if( document.getElementById("div").css("display")==='none')
	if( document.getElementById("div").css("display")==='block')
	$("#div").is(":hidden"); // 判断是否隐藏
	$("#div").is(":visible")

```

#### 38、Jq如何判断元素显示隐藏？

```javascript

	//第一种：使用CSS属性 
	var display =$('#id').css('display'); 
	if(display == 'none'){    alert("我是隐藏的！"); }
	//第二种：使用jquery内置选择器 
	<div id="test"> <p>仅仅是测试所用</p> </div>
	if($("#test").is(":hidden")){        $("#test").show();    //如果元素为隐藏,则将它显现 }else{       $("#test").hide();     //如果元素为显现,则将其隐藏 }
	//第三种：jQuery判断元素是否显示 是否隐藏
	var node=$('#id');
	if(node.is(':hidden')){　　//如果node是隐藏的则显示node元素，否则隐藏
	　　node.show();　
	}else{
	　　node.hide();
	}

```

#### 39、移动端上什么是点击穿透?
> 点击穿透现象有3种：

> 点击穿透问题：点击蒙层（mask）上的关闭按钮，蒙层消失后发现触发了按钮下面元素的click事件

> 跨页面点击穿透问题：如果按钮下面恰好是一个有href属性的a标签，那么页面就会发生跳转

> 另一种跨页面点击穿透问题：这次没有mask了，直接点击页内按钮跳转至新页，然后发现新页面中对应位置元素的click事件被触发了

> 解决方案：

> 1、只用touch最简单的解决方案，完美解决点击穿透问题把页面内所有click全部换成touch事件（ touchstart 、’touchend’、’tap’）

> 2、只用click下下策，因为会带来300ms延迟，页面内任何一个自定义交互都将增加300毫秒延迟

> 3、tap后延迟350ms再隐藏mask
改动最小，缺点是隐藏mask变慢了，350ms还是能感觉到慢的

> 4、pointer-events
比较麻烦且有缺陷， 不建议使用mask隐藏后，给按钮下面元素添上 pointer-events: none; 样式，让click穿过去，350ms后去掉这个样式，恢复响应缺陷是mask消失后的的350ms内，用户可以看到按钮下面的元素点着没反应，如果用户手速很快的话一定会发现

#### 40、Jq绑定事件的几种方式？on bind ?（新版JQ部分已经废除！）
> jQuery中提供了四种事件监听方式，分别是bind、live、delegate、on，对应的解除监听的函数分别是unbind、die、undelegate、off

> Bind( )是使用频率较高的一种，作用就是在选择到的元素上绑定特定事件类型的监听函数;

> Live( )可以对后生成的元素也可以绑定相应的事件,处理机制就是把事件绑定在DOM树的根节点上，而不是直接绑定在某个元素上;

> Delegate( )采用了事件委托的概念，不是直接为子元素绑定事件，而是为其父元素（或祖先元素也可）绑定事件，当在div内任意元素上点击时，事件会一层层从event target向上冒泡，直至到达你为其绑定事件的元素；

> on( )方法可以绑定动态添加到页面元素的事件，on()方法绑定事件可以提升效率；

#### 41、Jq中如何将一个jq对象转化为dom对象？

```javascript

	方法一：
	jQuery对象是一个数据对象，可以通过[index]的方法，来得到相应的DOM对象。 
	如：var $v =$("#v") ; //jQuery对象 
	var v=$v[0]; //DOM对象 
	alert(v.checked) //检测这个checkbox是否被选中 
	
	方法二：
	jQuery本身提供，通过.get(index)方法，得到相应的DOM对象 
	如：var $v=$("#v"); //jQuery对象 
	var v=$v.get(0); //DOM对象 
	alert(v.checked) //检测这个checkbox是否被选中

```

#### 42、Jq中有几种选择器?分别是什么?
> 层叠选择器、基本过滤选择器、内容过滤选择器、可视化过滤选择器、属性过滤选择器、子元素过滤选择器、表单元素选择器、表单元素过滤选择器

#### 43、Jq中怎么样编写插件?

```javascript

	//第一种是类级别的插件开发：
	//1.1 添加一个新的全局函数 添加一个全局函数，我们只需如下定义： 
	jQuery.foo = function() {
	 alert('This is a test. This is only a test.');  };   
	
	//1.2 增加多个全局函数 添加多个全局函数，可采用如下定义： 
	jQuery.foo = function() {
	   alert('This is a test. This is only a test.');  };  
	jQuery.bar = function(param) {
	  alert('This function takes a parameter, which is "' + param + '".');  };   调用时和一个函数的一样的:jQuery.foo();jQuery.bar();或者$.foo();$.bar('bar');
	//1.3 使用jQuery.extend(object);　 
	jQuery.extend({
	  foo: function() {
	      alert('This is a test. This is only a test.');
	    },
	  bar: function(param) {
	      alert('This function takes a parameter, which is "' + param +'".');
	    }
	 }); 
	//1.4 使用命名空间
	// 虽然在jQuery命名空间中，我们禁止使用了大量的javaScript函数名和变量名。
	// 但是仍然不可避免某些函数或变量名将于其他jQuery插件冲突，因此我们习惯将一些方法
	// 封装到另一个自定义的命名空间。
	jQuery.myPlugin = {         
		foo:function() {         
			alert('This is a test. This is only a test.');         
		},         
		bar:function(param) {         
			alert('This function takes a parameter, which is "' + param + '".');   
		}        
	}; 
	//采用命名空间的函数仍然是全局函数，调用时采用的方法： 
	$.myPlugin.foo();        
	$.myPlugin.bar('baz');
	//通过这个技巧（使用独立的插件名），我们可以避免命名空间内函数的冲突。
	
	//第二种是对象级别的插件开发
	//形式1： 
	(function($){    
	$.fn.extend({    
		pluginName:function(opt,callback){    
		         // Our plugin implementation code goes here.      
			}    
		})    
	})(jQuery);  
	
	//形式2：
	(function($) {      
	$.fn.pluginName = function() {    
	    // Our plugin implementation code goes here.    
	};     
	})(jQuery);
	//形参是$，函数定义完成之后,把jQuery这个实参传递进去.立即调用执行。
	//这样的好处是,我们在写jQuery插件时,也可以使用$这个别名,
	//而不会与prototype引起冲突

```

#### 44、$.map和$.each有什么区别
> map()方法主要用来遍历操作数组和对象，会返回一个新的数组。$.map()方法适用于将数组或对象每个项目新阵列映射到一个新数组的函数；
each()主要用于遍历jquery对象，返回的是原来的数组，并不会新创建一个数组。

#### 45、编写一个 getElementsByClassName 封装函数?

```javascript

	<body>   
	<input type="submit" id = "sub" class="ss confirm btn" value="提交"/>   
	<script> window.onload = function(){ 
	//方法一         
	    var Opt = document.getElementById('sub');
	    var getClass = function(className,tagName){
	        if(document.getElementsByTagName){
	            var Inp = document.getElementsByTagName(tagName);
	            for(var i=0; i<Inp.length; i++){
	                if((new RegExp('(\\s|^)' +className +'(\\s|$)')).test(Inp[i].className)){
	                      return Inp[i];
	                    }
	                }
	            }else if(document.getElementsByClassName){
	                return document.getElementsByClassName(className);
	        }
	    }                 
	//方法二
	    var aa = getClass("confirm", "input");
	        function getClass(className, targetName){
	            var ele = [];
	            var all = document.getElementsByTagName(targetName || "*");
	            for(var i=0; i<all.length; i++){
	                if(all[i].className.match(new RegExp('(\\s|^)'+confirm+'(\\s|$)'))){    
	                    ele[ele.length] = all[i];
	                }
	            }
	            return ele;
	        }
	//方法三
	    function getObjsByClass(tagName, className){
	           if(document.getElementsByClassName){
	               alert("document.getElementsByClassName");
	               return document.getElementsByClassName(className);
	           }else{
	               var el = [];
	               var _el = document.getElementsByTagName(tagName);
	               for(var i=0; i<_el.length; i++){
	                   if(_el[i].className.indexOf(className) > -1){
	                       alert(_el[i]);
	                       el[_el.length] = _el[i];
	                   }
	               }
	               alert(el);
	               return el;
	           }
	       }
	   }
	 </script>
	</body>

```

#### 46、一般使用什么版本控制工具?svn如何对文件加锁

> svn加锁目的：为了避免多个人同一时间对同一个文件改动的相互覆盖，版本控制系统就必须有一套冲突处理机制。

> svn加锁两种策略：乐观加锁：所有签出的文件都是可读写的，对文件的修改不必获得文件的锁，当你修改完文件签入时，会首先要求你更新本地文件，版本控制系统不会覆盖你的本地修改，而是会让你自己合并冲突后签入。

> 严格加锁：所有签出的文件都是只读的，任何对文件的修改必须要获得文件的锁，如果其他人没有拥有该文件的锁，那么版本控制系统就会授权给你文件的锁，并将文件设置为可编辑的。

> svn两种加锁步骤：乐观加锁：选择你想要获取锁定的文件，然后右键菜单点击TortoiseSVN 选取获取锁定。

> 严格加锁：在想要采取严格加锁的文件或目录上点击右键，使用TortoiseSVN 属性菜单，点击新建属性，选择需要锁定。

#### 47、Jq中 attr 和 prop 有什么区别
> 对于HTML元素本身就带有的固有属性，在处理时，使用prop方法。

> 对于HTML元素我们自己自定义的DOM属性，在处理时，使用attr方法。

#### 48、$(function(){})和window.onload 和 $(document).ready(function(){})
> window.onload:用于当页面的所有元素，包括外部引用文件，图片等都加载完毕时运行函数内的函数。load方法只能执行一次，如果在js文件里写了多个，只能执行最后一个。

> $(document).ready(function(){})和$(function(){})都是用于当页面的标准DOM元素被解析成DOM树后就执行内部函数。这个函数是可以在js文件里多次编写的，对于多人共同编写的js就有很大的优势，因为所有行为函数都会执行到。而且$(document).ready()函数在HMTL结构加载完后就可以执行，不需要等大型文件加载或者不存在的连接等耗时工作完成才执行，效率高。 

#### 49、描述下 this 和自定义属性和方法的时候有什么区别?Prototype？
> this表示当前对象，如果在全局作用范围内使用this，则指代当前页面对象window； 如果在函数中使用this，则this指代什么是根据运行时此函数在什么对象上被调用。 我们还可以使用apply和call两个全局方法来改变函数中this的具体指向。

> prototype本质上还是一个JavaScript对象。 并且每个函数都有一个默认的prototype属性。

> 在prototype上定义的属性方法为所有实例共享，所有实例皆引用到同一个对象，单一实例对原型上的属性进行修改，也会影响到所有其他实例。

#### 50、什么是预编译语言|预编译处理器?

> less、sass、stylus都是CSS预处理器语言，通过编程方式生成CSS代码。因为可编程，所以操控灵活性自由度高，方便实现一些直接编写CSS代码较困难的代码。

> 同时，因为less、sass、stylus是生成CSS的语言，所以写出来的Sass文件是不能直接用的，必须经过编译器编译成CSS文件才能使用。

> CSS 预处理器是一种语言用来为 CSS 增加一些编程的的特性，无需考虑浏览器的兼容性问题，例如你可以在 CSS 中使用变量、简单的程序逻辑、函数等等在编程语言中的一些基本技巧，可以让你的 CSS 更见简洁，适应性更强，代码更直观等诸多好处。最常用的css预处理器有sass、less css、 stylus。

#### 51、ajax 和 jsonp区别？

> same:都是请求一个url

> different :ajax的核心是通过xmlHttpRequest获取内容
jsonp的核心则是动态添加<script>标签来调用服务器 提供的js脚本。

#### 52、ajax执行流程？
> 1. 创建XMLHttpRequest对象,也就是创建一个异步调用对象

> 2. 创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息

> 3. 设置响应HTTP请求状态变化的函数

> 4. 发送HTTP请求

> 5. 获取异步调用返回的数据

> 6. 使用JavaScript和DOM实现局部刷新

#### 53、xhr对象 status ? readystate?
> status是XMLHttpRequest对象的一个属性，表示响应的HTTP状态码。

> readyState是XMLHttpRequest对象的一个属性，用来标识当前XMLHttpRequest对象处于什么状态。

#### 54、readystate 0~4分别代表什么？

> 0 未初始化状态，此时已经创建了一个XMLHttpRequest对象

> 1 准时发送状态，此时已经调用了XMLHttpRequest对象的open方法，并且XMLHttpRequest对象以及准备好将一个请求发送到服务器

> 2 已经发送状态，此时已经通过send方法把一个请求发送到服务器，但是还没有收到一个响应

> 3 正在接受状态，此时已经收到HTTP响应头部信息，但是消息体部分还没有完全接收到

> 4 完成响应状态，此时已经完成了HTTP响应的接收

#### 55、 说出几个http协议状态码
> 200 请求成功

> 201 请求成功并且服务器创建了新的资源

> 302 服务器目前从不同位置的网页响应请求，但是请求者应继续使用原有位置来响应以后的请求

> 304 自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网页内容。

> 400 服务器不理解请求的语法

> 404 请求的资源不存在

> 500 内部服务器错误

#### 56、sessionStorage和localStorage以及cookie之间有什么关联，cookie最大存放多少字节
> SAME:都是保存在浏览器端，并且是同源的。

> DIFFEREND：

> 1 cookie在浏览器和服务器之间来回传递。二sessionStorage和localStorage不会自动把数据发给服务器，仅仅是在本地保存

> 2 存储大小限制也不同，cookie数据不能超过4k，sessionStorage和localStorage比cookie大得多，可以到达5M

> 3 数据有效期不同，sessionStorage尽在当前浏览器窗口关闭前有效，自然也就不可能持久保存;localStorage始终有效，窗口或者浏览器关闭也一直保存，因此用作持久保存数据；cookie只在设置了过期时间之前有效，即使窗口或者浏览器关闭。

> 4 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面(数据不共享)；localStorage在所有的同源窗口中都是共享的；cookie也是在所有的同源窗口中都是共享的

#### 57、Ajax中get和post的区别
> SAME:都是数据提交的方式

> DIFFERENT:

> 1 get 的数据是通过网址问号后面拼接的字符串进行传递对的，post是通过一个HTTP包体进行传递数据的

> 2 get传输量是有限制的，post是没有限制的

> 3 get安全性没有post高，所以一般用get来获取数据，post提交修改数据。

#### 58、GC机制是什么？为何闭包不会被回收变量和函数？
> 1 Gc垃圾回收机制

> 2 外部变量没释放，所以指向的大函数内的小函数也释放不了


#### 59、说说你对面向对象的理解？
> 万物皆对象，