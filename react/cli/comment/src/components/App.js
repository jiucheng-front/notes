import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import "../styles/fontstyle.css"

import Toogle from "./Toogle";

//icon列表
import Icon from "./Icon.jsx"

import CommentBox from "./comment/CommentBox"
// 定义数据
let comments=[
    {
        id:"01",
        anchor:"你愁啥?",
        content:"瞅你咋地！",
        date:"1小时之前"
    },
    {
        id:"02",
        anchor:"装疯卖傻",
        content:"枪都不服就服你",
        date:"5小时之前"
    }
]
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/entry.js</code> and save to reload.
        </p>
        <h3>评论区</h3>
        <CommentBox data={comments} />
      </div>
    );
  }
}

export default App;
