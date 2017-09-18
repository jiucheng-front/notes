import React,{ component } from "react";

function BoilingVerdict(props) {
    if(props.celsius>=100){
        return <p>水会烧开</p>;
    }
    return <p>水不会烧开</p>;
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        //1、1手动bind 绑定this
        // this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }
    // 2、箭头函数代替手动 bind
    handleChange = (e) => this.setState({
        temperature:e.target.value
    })
    //1、2 手动bind的函数，可以使用es6 箭头函数代替
    // handleChange(e){
    //     this.setState({temperature:e.target.value});
    // }
    render(){
        const temperature= this.state.temperature;
        return(
            <fieldset>
                <legend>输入一个摄氏温度</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange}/>
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}

export default Calculator;