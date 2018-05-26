"use strict"
import React from "react"
import Comment from "./Comment"

class CommentList extends React.Component{
    render(){
        let commentNodes=this.props.data.map((comment,index) =>{
            return(
                //parent component send data to child,must set key attrbuite
                <Comment key={index} anchor={comment.anchor} content={comment.content} date={comment.date} />
            )
        })
        return(
            <div className="CommentList">
                { commentNodes }
            </div>
        )
    }
}

export default CommentList