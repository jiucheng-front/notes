"use strict"
import React from "react"
import CommentForm from "./CommentForm"
import CommentList from "./CommentList"


class CommentBox extends React.Component{
    render(){
        let commentNodes=this.props.data.map((comment,index) =>{
            return(
                //想传递数据必须先添加key属性过去。不然会报错
                <CommentList key={comment.id} anchor={comment.anchor} content={comment.content} date={comment.date} />
            )
        })
        return(
            <div className="CommentBox">
                <h3>大山莨菪碱阿拉斯加</h3>
                { commentNodes }
            </div>
        )
    }
}

export default CommentBox