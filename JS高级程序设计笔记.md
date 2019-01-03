### JS高級程序設計

> 5.1 Object 类型

```javascript

	function displayInfo(obj){
		var output = ""
		if(typeof obj.name == "string"){
			output += "Name:" + obj.name + "\n"
		}
		if(typeof obj.age == "number"){
			output += "Age:" + obj.age + "\n"
		}
		console.log(output)
	}
	displayInfo({name:"Jason",age:36})


```

#### 一、Array 

> 5.2.1 Array 检测

```javascript

	// isArray
	var arr = []
	if(Array.isArray(arr)){
		// do something
	}

```

> 5.2.3 栈方法：栈是一种LIFO(Last-In-First-Out,后进先出)的数据结构。push和pop(尾部移除并返回该项)

> 5.2.4 队列方法：队列数据结构的访问规则是FIFO(First-In-First-Out,先进先出)，列表尾部添加项，首部移除项。push和shift(首部移除并返回该项)

> 5.2.5 重排序方法：reverse和sort

```javascript

	var arr = [1,3,6,5,7]
	arr.reverse()  // [7,6,5,3,1]
	
	arr.sort(function(a,b){ return a-b }) //升序；   return b-a //降序
	

```

> 5.2.6 操作方法：concat、slice、splice

+ concat()返回新数组，没有参数返回原数组的副本
+ slice(startIndex) 只有一个参数从该参数到数组末尾的所有选项
+ slice(startIndex,endIndex) 从起始到结束之间的选项，不包括结束位置。slice不影响原数组
+ splice: 方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何
项，则返回一个空数组）,会改变原数组
+ splice:删除、插入、替换

> 5.2.7 位置方法：indexOf,lastIndexOf

> 5.2.8 迭代方法：

+ every() ：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true ，则返回 true
+ filter() ：对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组
+ forEach() ：对数组中的每一项运行给定函数。这个方法没有返回值
+ map() ：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组
+ some() ：对数组中的每一项运行给定函数，如果该函数对任一项返回 true ，则返回 true

```javascript
	
	// 数组去重
	var arr = ['aaa','bbb','ccc','bbb','aaa','ddd']
	var noRepeat = arr.filter(function(item,index,self){
		return self.indexOf(item) === index
	})
	console.log(noRepeat) // ["aaa", "bbb", "ccc", "ddd"]
	console.log(arr)      //['aaa','bbb','ccc','bbb','aaa','ddd']

```



> 5.5.5 函數屬性和方法

```javascript
	
	// 1 每個函數都有2個屬性：length,和prototype，length表示函數希望接收的命名參數的個數，如：
	
	function sayName(name){
		console.log(name);
	}

	function add(num1,num2){
		return num1 + num2
	}
	
	function sayHi(){
		console.log('HI')
	}
	
	console.log(sayName.length) // 1
	console.log(add.length)     // 2
	console.log(sayHi.length)   // 0

	// 2 每個函數包含2個非繼承而來的方法：apply()和call(),這2個方法都是在特定的作用域中調用函數，实际上等于设置函数体内的this对象的值。
	
	//2.1 apply():首先apply接收2个参数，一个是在其中运行的函数的作用域，另一个参数是数组。其中，第二个参数可以是Array的实例，也可以是arguments对象，如：
	
	function sum(num1,num2){
		return num1 + num2;
	}

	function applySum1(num1,num2){
		return sum.apply(this, arguments); // 传入：arguments对象
	}

	function applySum2(num1,num2){
		return sum.apply(this, [num1,num2]) //传入：数组对象
	}

	console.log(applySum1(10,10)) // 20
	console.log(applySum2(10,20)) // 30
	
	//在上面的例子中，callSum1()在执行sum()函数时传入的this作为this值(因为在全局作用域中调用的，所以传入的就是window对象)和arguments对象。而callSum2()同样调用了sum()函数，但它传入的则是this和一个参数数组，都会正常执行。注：严格模式下，未指定环境对象而调用函数，则this只不会转型为window,除非明确把函数添加到某个对象或者调用apply()和call()，否则this值将是undefined。


	//2.2 call()方法和apply()方法的作用相同，区别在于接收参数的方式不同，对于call()而言，第一个参数是this值没变，变化的是其余参数都是直接传递给函数。（使用call()方法时传递的参数必须逐个列举出来）如：

	function add(num1,num2){
		return num1+num2;
	}
	
	function callAdd(num1,num2){
		return add.call(this,num1,num2);
	}

	console.log(callAdd(10,10)) // 20
	
	注：事实上传递参数并非apply()和call()真正的用武之地，它们强大的是否是能够扩充函数赖以运行的作用域。如：
	
	window.color = "red";	
	var  obj = { color:"blue" };
	
	function sayColor(){
		console.log(this.color);
	}

	sayColor.call(this)    //red
	sayColor.call(window)  //red
	sayColor.call(obj)     //blue

	//2.3 ECMAScript5还定义了一个：bind()方法，该方法会创建一个实例，其this值会被绑定到传给bind()函数的值,如：
		
	var objSayColor = sayColor.bind(obj);
	objSayColor()  // blue
	

```