// import React,{ component } from "react";
import React from "react";
class NameForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        // this.setState({value:event.target.value});
        // 对用户输入做限制
        this.setState({value:event.target.value.toUpperCase()});
    }
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.value);
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <lable>
                    Name:
                    {/*<input type="text" value={this.state.value} onChange={this.handleChange} />*/}
                    <input type="text" onChange={this.handleChange} />
                </lable>
                <p>{this.state.value}</p>
                <input type="submit" value="提交"/>
            </form>
        )
    }
}

export default NameForm;