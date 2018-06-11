### JS高級程序設計
+ 5.5.5 函數屬性和方法

```javascript
	
	1 每個函數都有2個屬性：length,和prototype，length表示函數希望接收的命名參數的個數，如：
	
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

```