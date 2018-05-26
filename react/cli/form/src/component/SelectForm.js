// import React,{ component } from "react";
import React from "react";
class SelectForm extends React.Component{
    constructor(props){
        super(props);
        this.state={value:"ember"};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({value:event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.value);
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <p>Pick your favorite javascript framework</p>
                <lable>
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="react">React</option>
                        <option value="vue">Vue</option>
                        <option value="angular">Angular</option>
                        <option value="ember">Ember</option>
                    </select>
                </lable>
                <input type="submit" value="提交" />
            </form>
        );
    }
}

export default SelectForm;