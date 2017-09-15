import React, { Component } from 'react';
import logo from './logo.svg';

import './styles/App.css';

//1、导入toogle切换组件
import Toggle from "./component/Toggle.js";
//2、导入Form表单组件
import NameForm from "./component/Form";
//3、textarea 组件
import TextAreaForm from "./component/TextAreaForm";
//4、select 组件
import SelectForm from "./component/SelectForm";
//5、多个不同类型的input
import MoreInput from "./component/MoreInput";



class App extends Component {
    render() {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
              <div className="Toggle">
                  <h3 className="title">1、Toggle-component</h3>
                  <Toggle />
              </div>
              <div className="Form">
                  <h3>2、Form-component(Data bidirectional binding 双向绑定)</h3>
                  <NameForm />
              </div>
              <div className="TextAreaForm">
                  <h3>3、Textarea-Form-component</h3>
                  <TextAreaForm />
              </div>
              <div className="SelectForm">
                  <h3>4、Select-Form-component</h3>
                  <SelectForm />
              </div>
              <div className="MoreInput">
                  <h3>5、More about input</h3>
                  <MoreInput />
              </div>
          </div>
        );
    }
}

export default App;
