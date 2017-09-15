import React, { Component } from 'react';
class MoreInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isChecked:"on",
            isNumber:10
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        const target = event.target;
        const value = target.type==="checkbox"?target.checked:target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.isChecked);
        console.log(this.state.isNumber);
        console.log(typeof this.state.isNumber);
    }
    render(){
        return (
            <form action="#" onSubmit={this.handleSubmit}>
                <lable>
                    had on：
                    <input
                        name="isChecked"
                        type="checkbox"
                        checked={this.state.isChecked}
                        onChange={this.handleChange}/>
                </lable>
                <p></p>
                <lable>
                    <input
                        type="number"
                        name="isNumber"
                        value={this.state.isNumber}
                        onChange={this.handleChange}/>
                </lable>
                <input type="submit" value="提交" />
            </form>
        );
    }
}
export default MoreInput;