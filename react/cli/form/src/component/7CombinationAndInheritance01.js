// import React,{ component } from "react";
import React from "react";

function FancyBorder(props) {
    return (
        <div className={"FancyBorder Fancyborder-" + props.color}>
            {props.children}
        </div>
    );
}

function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">Welcome</h1>
            <p className="Dialog-content">
                Thank u for visiting our Company .
            </p>
        </FancyBorder>
    );
}

export default WelcomeDialog;