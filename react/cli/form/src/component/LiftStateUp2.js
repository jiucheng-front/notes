import React,{ component } from "react";
//1
function BoilingVerdict(props) {
    if(props.celsius>=100){
        return <p>水会烧开</p>;
    }
    return <p>水不会烧开</p>;
}
//2
const scaleName = {
    c:"Celsius",
    f:"Fashrenheit"
};
//5 转换函数
//转换为 摄氏度
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
// 转换为华氏度
function toFahrenheit(celsius) {
    return (celsius * 9 /5) + 32;
}
function tryConvert(temperature,convert) {
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
// 在React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升
//3
class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        //5.2
        // this.setState({temperature:e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }

    render(){
        //5.1
        // const temperature = this.state.temperature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleName[scale]} </legend>
                <input
                    value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}
//4
class CalculatorTwo extends React.Component{
    constructor(props){
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature:"",scale:"c"};
    }
    handleCelsiusChange(temperature){
        this.setState({scale:"c",temperature})
    }
    handleFahrenheitChange(temperature){
        this.setState({scale:"f",temperature});
    }
     render(){
        const scale = this.state.scale;
        const temperature=this.state.temperature;
        const celsius = scale ==="f" ? tryConvert(temperature,toCelsius) : temperature;
        const fahrenheit = scale ==="c" ? tryConvert(temperature,toFahrenheit) : temperature;
         return(
             <div>
                 <TemperatureInput scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                 <TemperatureInput scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                 <BoilingVerdict celsius={parseFloat(celsius)} />
             </div>
         );
     }
}

export default CalculatorTwo;