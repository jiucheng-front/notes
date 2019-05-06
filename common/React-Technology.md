> 一、配置

+ react-hot-loader：热更新，[http://gaearon.github.io/react-hot-loader/](http://gaearon.github.io/react-hot-loader/)
+ react-helmet：html head管理,[https://github.com/nfl/react-helmet#readme](https://github.com/nfl/react-helmet#readme "head")
+ react-intl：国际化 [https://github.com/yahoo/react-intl](https://github.com/yahoo/react-intl "国际化")

> 二、UI

+ react-slick：轮播 [https://github.com/akiran/react-slick](https://github.com/akiran/react-slick)
+ slick-carousel：轮播[https://github.com/kenwheeler/slick/](https://github.com/kenwheeler/slick/)
+ react-loadable：组件懒加载，[https://github.com/jamiebuilds/react-loadable#readme](https://github.com/jamiebuilds/react-loadable#readme "地址")
+ react-cropper：图片裁剪，[http://roadmanfong.github.io/react-cropper/](http://roadmanfong.github.io/react-cropper/ "地址")
+ react-custom-scrollbars：滚动条，[https://malte-wessel.com/react-custom-scrollbars/](https://malte-wessel.com/react-custom-scrollbars/ "地址")

> 三、状态

+ redux：状态管理
	+ 中文：[https://www.redux.org.cn/](https://www.redux.org.cn/) 
	+ 英文：[https://redux.js.org/introduction/getting-started](https://redux.js.org/introduction/getting-started)
+ react-redux：[https://react-redux.js.org/](https://react-redux.js.org/)
+ redux-actions：[https://github.com/redux-utilities/redux-actions](https://github.com/redux-utilities/redux-actions)
+ redux-saga：[https://redux-saga.js.org/](https://redux-saga.js.org/)
+ reselect：[https://github.com/reduxjs/reselect](https://github.com/reduxjs/reselect)

> 方式

- 1 怎么配置 
- 2 在组件里怎么获取 
- 3 怎么更新 

### 理解
> 一、 Redux中store、action、reducer之间的关系：
> 解答这个问题并不困难：唯一的要求是你熟悉React。
不要光听别人描述名词，理解起来是很困难的。
从需求出发，看看使用React需要什么：

+ 1、 React有props和state: props意味着父级分发下来的属性，state意味着组件内部可以自行管理的状态，并且整个React没有数据向上回溯的能力，也就是说数据只能单向向下分发，或者自行内部消化。理解这个是理解React和Redux的前提。
+ 2、 一般构建的React组件内部可能是一个完整的应用，它自己工作良好，你可以通过属性作为API控制它。但是更多的时候发现React根本无法让两个组件互相交流，使用对方的数据。然后这时候不通过DOM沟通（也就是React体制内）解决的唯一办法就是提升state，将state放到共有的父组件中来管理，再作为props分发回子组件。
+ 3、 子组件改变父组件state的办法只能是通过onClick触发父组件声明好的回调，也就是父组件提前声明好函数或方法作为契约描述自己的state将如何变化，再将它同样作为属性交给子组件使用。这样就出现了一个模式：数据总是单向从顶层向下分发的，但是只有子组件回调在概念上可以回到state顶层影响数据。这样state一定程度上是响应式的。
+ 4、 为了面临所有可能的扩展问题，最容易想到的办法就是把所有state集中放到所有组件顶层，然后分发给所有组件。
+ 5、 为了有更好的state管理，就需要一个库来作为更专业的顶层state分发给所有React应用，这就是Redux。让我们回来看看重现上面结构的需求：

	+ a. 需要回调通知state (等同于回调参数) -> action
	+ b. 需要根据回调处理 (等同于父级方法) -> reducer
	+ c. 需要state (等同于总状态) -> store
+ 6、对Redux来说只有这三个要素：
	+ a. action是纯声明式的数据结构，只提供事件的所有要素，不提供逻辑。
	+ b. reducer是一个匹配函数，action的发送是全局的：所有的reducer都可以捕捉到并匹配与自己相关与否，相关就拿走action中的要素进行逻辑处理，修改store中的状态，不相关就不对state做处理原样返回。 combineReducers是 Redux 提供的一个方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reduce。
	+ c. store负责存储状态并可以被react api回调，发布action.当然一般不会直接把两个库拿来用，还有一个binding叫react-redux, 提供一个Provider和connect。很多人其实看懂了redux卡在这里。
		+ 1. Provider是一个普通组件，可以作为顶层app的分发点，它只需要store属性就可以了。它会将state分发给所有被connect的组件，不管它在哪里，被嵌套多少层。 
		+ 2. connect是真正的重点，它是一个科里化函数，意思是先接受两个参数（数据绑定mapStateToProps和事件绑定mapDispatchToProps），再接受一个参数（将要绑定的组件本身）：
		+ 3. mapStateToProps：构建好Redux系统的时候，它会被自动初始化，但是你的React组件并不知道它的存在，因此你需要分拣出你需要的Redux状态，所以你需要绑定一个函数，它的参数是state，简单返回你关心的几个值。
		+ 4. mapDispatchToProps：声明好的action作为回调，也可以被注入到组件里，就是通过这个函数，它的参数是dispatch，通过redux的辅助方法bindActionCreator绑定所有action以及参数的dispatch，就可以作为属性在组件里面作为函数简单使用了，不需要手动dispatch。这个mapDispatchToProps是可选的，如果不传这个参数redux会简单把dispatch作为属性注入给组件，可以手动当做store.dispatch使用。这也是为什么要科里化的原因。

+ 7、做好以上流程Redux和React就可以工作了。简单地说就是：

	+ 1、<code>view ---> action ---> reducer ---> store(state) ---> view</code>
	+ 2、如果放入一个web app中，首先store(state)决定了view，然后用户与view的交互会产生action，这些action会触发reducer因而改变state，然后state的改变又造成了view的变化
	+ 3、顶层分发状态，让React组件被动地渲染。
	+ 4、监听事件，事件有权利回到所有状态顶层影响状态。
	+ 5、摘自[https://www.zhihu.com/question/41312576/answer/90782136](https://www.zhihu.com/question/41312576/answer/90782136)

-----------------------------
> reselect：一旦redux从react的数据层来理解，很多问题都似乎找到了理论依据，所谓名正言顺。在web框架中都会用数据库做数据持久层，在查表的时候会为了效率做缓存，reselect是同样的目的。给state做缓存减少不必要的计算和更新！


```javascript

	1 action
		(无需参数直接：'XX_AAA')
		带参数：aaBBcc,AA_BB_CC: data => ({data})

	2 saga 
		import aaBBcc from '../aaBBcc'
		takeEvery(aaBBcc,postFunc)
		function* postFunc(action){
			kkRequest...
		}

	3 如果接口拿到后需要缓存，再次更新给组件
		function* api([param]){
			const result = kkrequest({
				...
			})
			if(result.ret_code==='0'){
				yeild put(xxSave(result))
			}
		}
		// 1 action 添加xxSave
		// 2 reducer 添加xxSave, someData
		// 3 selector 添加 
		getSomeData  = state => (state[namespace].someData || {})

	4 Component 内 引入对应的 selector--getSomeData
		mapStateToProps = state => ({
			xxData: getSomeData(state)
		}) 

```




