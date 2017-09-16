import React,{ component } from "react";

function BoilingVerdict(props) {
    if(props.celsius>=100){
        return <p>水会烧开</p>;
    }
    return <p>水不会烧开</p>;
}

const scaleName = {
    c:"Celsius",
    f:"Fashrenheit"
}

class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature:""};
    }

    handleChange(e){
        this.setState({temperature:e.target.value});
    }

    render(){
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleName[scale]} </legend>
                <input
                    value={temperature}
                    onChange={this.handleChange} />
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}

class CalculatorTwo extends React.Component{
     render(){
         return(
             <div>
                 <TemperatureInput scale="c" />
                 <TemperatureInput scale="f" />
             </div>
         );
     }
}

export default CalculatorTwo;