"use strict"
import React from "react"
import CommentList from "./CommentList"
import CommentForm from "./CommentForm"


class CommentBox extends React.Component{
    render(){
        return(
            <div className="CommentBox">
                <CommentList data={ this.props.data } />
                <CommentForm />
            </div>
        )
    }
}

export default CommentBox