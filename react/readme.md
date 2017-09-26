#### react notes
+ ReactDOM.render(compon,root)组件渲染到根元素
+ 组件名称必须以大写字母开头。
+ 组合组件：在compon里嵌套其他组件

### 一、JSX
+ 1 原理：不是HTML，需要使用Babel转义器将JSX语法或者ES6语法转义为浏览器识别的JS
+ 2 语法：
```javascript

    //1 元素
    const title = <h3>React Learning</h3>
    //2 属性
    const title = <h3 id="main">React Learning</h3>
    const title = <h3 className="main">React Learning</h3>
    //3 嵌套元素，需要加上括号: ()
    const title = (
     <div>
       <h3 className="main">React Learning</h3>
       <p>Let's learn JSX</p>
     </div>
    )
    //4 JSX表达式,需要使用大括号 {} 括起来
    function speak(name) {
     return 'Hi,' + name;
    }
    const title = (
     <div>
       <h3 className="main">React Learning</h3>
       <p>Let's learn JSX. <span>{speak('you')}</span></p>
     </div>
    )

```

### 二、组件类型 来自:https://yubolun.com/react-learn-2-2/
#### 1 元素与组件 Element & Component
+ 组件由元素组成

####  2 函数定义与类定义组件 Functional & Class
```javascript

    //函数定义
    function Title(props) {
      return <h1>Hello, {props.name}</h1>
    }
    //es6
    const Title = props => <h1>Hello, {props.name}</h1>
    // class定义
    class Title extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>
      }
    }

```

#### 3 展示与容器组件 Presentational & Container
+ 展示组件
    + 主要负责组件内容如何展示
    + 从props接收父组件传递来的数据
    + 大多数情况可以通过函数定义组件声明
+ 容器组件
    + 主要关注组件数据如何交互
    + 拥有自身的state，从服务器获取数据，或与redux等其他数据处理模块协作
    + 要通过类定义组件声明，并包含生命周期函数和其他附加方法
+ 好处：
    + 解耦了界面和数据的逻辑
    + 更好的可复用性，比如同一个回复列表展示组件可以套用不同数据源的容器组件
    + 利于团队协作，一个人负责界面结构，一个人负责数据交互

```javascript

    // 展示组件
    class CommentList extends React.Component {
      constructor(props) {
        super(props)
      }
      renderComment({body, author}) {
        return <li>{body}—{author}</li>
      }

      render() {
        return <ul> {this.props.comments.map(this.renderComment)} </ul>
      }

    }
    // 容器组件
    class CommentListContainer extends React.Component {
      constructor() {
        super()
        this.state = { comments: [] }
      }

      componentDidMount() {
        $.ajax({
          url: "/my-comments.json",
          dataType: 'json',
          success: function(comments) {
            this.setState({comments: comments})
          }.bind(this)
        })
      }

      render() {
        return <CommentList comments={this.state.comments} />
      }
    }

```

#### 4 有状态与无状态组件 Stateful & Stateless
+ 有状态 : state,可以this.state初始化或者this.setState调用
+ 无状态 ：this.props调用

#### 5 受控与非受控组件 Controlled & Uncontrolled (常与表单关联)
+ 受控组件的值由props或state传入
+ 非受控 用户输入不会直接引起应用state的变化，需要使用一个特殊的ref属性，defaultValue初始化一個值即可

#### 6 组合与继承 Composition & Inheritance