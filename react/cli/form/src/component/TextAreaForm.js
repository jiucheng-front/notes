// import React,{component} from "react";
import React from "react";

class TextAreaForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:"Please write an essay about your favorite DOM elements."
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({value:event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        console.log(this.state.value);
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>

                <lable>Name:</lable>
                <p>{this.state.value}</p>
                <textarea value={this.state.value} onChange={this.handleChange}
                          cols="30" rows="10"></textarea>
            </form>
        )
    }
}

export default TextAreaForm;