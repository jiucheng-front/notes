#### react notes
+ ReactDOM.render(compon,root)组件渲染到根元素
+ 组件名称必须以大写字母开头。
+ 组合组件：在compon里嵌套其他组件

### 一、JSX
+ 1 原理：不是HTML，需要使用Babel转义器将JSX语法或者ES6语法转义为浏览器识别的JS
+ 2 语法：
```javascript

    //元素
    const title = <h1>React Learning</h1>
    //属性
    const title = <h1 id="main">React Learning</h1>
    const title = <h1 className="main">React Learning</h1>
    //嵌套元素，需要加上括号: ()
    const title = (
     <div>
       <h1 className="main">React Learning</h1>
       <p>Let's learn JSX</p>
     </div>
    )
    // JSX表达式,需要使用大括号 {} 括起来
    function speak(name) {
     return 'Hi,' + name;
    }
    const title = (
     <div>
       <h1 className="main">React Learning</h1>
       <p>Let's learn JSX. <span>{speak('you')}</span></p>
     </div>
    )

```

### 二、组件类型 来自:https://yubolun.com/react-learn-2-2/
+ 元素与组件 Element & Component
    + 组件由元素组成
+ 函数定义与类定义组件 Functional & Class
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
+ 展示与容器组件 Presentational & Container
+ 有状态与无状态组件 Stateful & Stateless
+ 受控与非受控组件 Controlled & Uncontrolled
+ 组合与继承 Composition & Inheritance