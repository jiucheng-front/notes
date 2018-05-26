import React, { Component } from 'react';

//1、test scss
import "../styles/Toogle.scss";
//2、test less
import "../styles/Toogle.less";
//3 开关切换组件
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

export default Toogle;