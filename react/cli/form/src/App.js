import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


//1 开关切换组件
class Toogle extends React.Component {
    constructor( props ){
        super( props );
        this.state={ isSelected : true };
        this.handleToogle=this.handleToogle.bind(this);
    }
    handleToogle(){
        console.log(this.state.isSelected);
        this.setState(prevState => ({
            isSelected: !prevState.isSelected
        }));
    }
    render(){
        const isSelected=this.state.isSelected;
        let p=null;
        if(isSelected){
            p="开关打开";
        }else{
            p="开关关闭！";
        }
        return (
            <div className="box">
              <h3 className="title">开关</h3>
              <button onClick={ this.handleToogle }>
                  { this.state.isSelected ?"on":"off"}
              </button>
              <p>{ p }</p>
            </div>
        );
    }
}

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
        {/*开关组件*/}
        <Toogle />
      </div>
    );
  }
}

export default App;
