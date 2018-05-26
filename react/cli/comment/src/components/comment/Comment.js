"use strict"
import React from "react"

class Comment extends React.Component{
    render(){
        return(
            <div className="comment">
                <span className="anchorName">{ this.props.anchor }</span>
                <span className="anchorContent">{ this.props.content }</span>
                <span className="anchorDate">{ this.props.date }</span>
            </div>
        )
    }
}

export default Comment