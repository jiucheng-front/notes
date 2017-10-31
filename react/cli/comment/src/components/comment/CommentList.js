"use strict"
import React from "react"

class CommentList extends React.Component{
    render(){
        return(
            <div className="CommentList">
                <p>作者：{this.props.anchor}</p>
                <p>内容:{this.props.content}</p>
                <p>时间:{this.props.date}</p>
            </div>
        )
    }
}

export default CommentList