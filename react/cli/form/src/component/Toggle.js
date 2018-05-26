//1 开关切换组件
// import React, { Component } from 'react';
import React from 'react';
class Toggle extends React.Component {
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
            <div className="toggleTab">
                <button onClick={ this.handleToogle }>
                    { this.state.isSelected ?"on":"off"}
                </button>
                <p>{ p }</p>
            </div>
        );
    }
}

export default Toggle;