import React,{ component } from "react";

function BoilingVerdict(props) {
    if(props.celsius>=100){
        return <p>水会烧开</p>;
    }
    return <p>水不会烧开</p>;
}

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={ temperature:""};
    }
    handleChange(e){
        this.setState({temperature:e.target.vlue});
    }
    render(){
        const temperature= this.state.temperature;
        return(
            <fieldset>
                <legend>输入一个摄氏温度</legend>
                <input type="text"
                    value={temperature}
                    onChange={this.handleChange}/>
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}

export default Calculator;