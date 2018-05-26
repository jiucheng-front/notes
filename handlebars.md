### handlebars的教程
+ 关于each中获取索引 index

```javascript

	//1.3.01 注册一个Handlebars Helper：addOne,用来将索引+1，因为默认是从0开始的
	Handlebars.registerHelper("addOne",function(index,options){
		return parseInt(index)+1;
	});

```

+ 关于each中需要判断

```javascript

	// 1.3.06 注册helper：compare，用来比较判断不同的显示内容
	Handlebars.registerHelper("compare",function(temp,options){
		if(temp==1){
		//满足条件执行
			return '<i class="promotion"></i>';
		}else if(temp==0){
	　　　//不满足执行{{else}}部分
			return '<i class="nothing"></i>';
	　　}else if(temp==-1){
			return '<i class="out"></i>';
		}
	});

```