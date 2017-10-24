// import React,{ component } from "react";
import React from "react";
// Stateful
class StatefulLink extends React.Component {
    constructor(props){
        super(props);
        this.state={
            active:false
        }
    }
    handleClick(){
        this.setState({
            active:!this.state.active
        })
    }
    render(){
        return <a style={{color : this.state.active?"red":"blue"}}
            onClick={this.handleClick.bind(this)}>
            Stateful Link(类似radio)
        </a>
    }
}

// Statefulless components
class StatelessLink extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    handleClick(){
        this.props.handleClick(this.props.router)
    }
    render(){
        const active = this.props.activeRouter === this.props.router;
        return (
            <li>
                <a style={{color:active?"red":"blue"}}
                onClick={this.handleClick.bind(this)}>
                    Stateless Link(类似TAB)
                </a>
            </li>
        )
    }
}

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state={activeRouter:"home"}
    }
    handleSwitch(router){
        this.setState({activeRouter:router});
    }
    render(){
        return(
            <ul>
                <StatefulLink />
                <StatelessLink activeRouter={this.state.activeRouter}
                    router="home"
                    handleClick={this.handleSwitch.bind(this)}/>
                <StatelessLink activeRouter={this.state.activeRouter}
                    router="blog"
                    handleClick={this.handleSwitch.bind(this)}/>
                <StatelessLink activeRouter={this.state.activeRouter}
                    router="about"
                    handleClick={this.handleSwitch.bind(this)}/>
            </ul>
        )
    }
}

export default Nav;