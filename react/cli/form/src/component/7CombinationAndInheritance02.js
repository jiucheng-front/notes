import React,{ component } from "react";

function Contacts() {
    return <div className="Contacts" />;
}

function Chat() {
    return <div className="Chat" />;
}
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function Contentbox() {
    return (
        <SplitPane
            left={<Contacts />}
            right={<Chat />} />
    );
}
export default Contentbox;
