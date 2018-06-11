### JS高級程序設計
+ 5.5.5 函數屬性和方法

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

	function callSum1(num1,num2){
		return sum.apply(this, arguments); // 传入：arguments对象
	}

	function callSum2(num1,num2){
		return sum.apply(this, [num1,num2]) //传入：数组对象
	}

	console.log(callSum1(10,10)) // 20
	console.log(callSum2(10,20)) // 30
	
	//在上面的例子中，callSum1()在执行sum()函数时传入的this作为this值(因为在全局作用域中调用的，所以传入的就是window对象)和arguments对象。而callSum2()同样调用了sum()函数，但它传入的则是this和一个参数数组，都会正常执行。注：严格模式下，未指定环境对象而调用函数，则this只不会转型为window,除非明确把函数添加到某个对象或者调用apply()和call()，否则this值将是undefined。


	

```