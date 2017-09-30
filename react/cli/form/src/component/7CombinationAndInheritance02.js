import React,{ component } from "react";
//zuobian
function Contacts() {
    return <div className="Contacts" />;
}
//youbian
function Chat() {
    return <div className="Chat" />;
}
// 通过props 传递className
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
//展示组件(zuhe)
function Contentbox() {
    return (
        <SplitPane
            left={<Contacts />}
            right={<Chat />} />
    );
}
export default Contentbox;
