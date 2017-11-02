"use strict"
import React from "react"
import CommentList from "./CommentList"
import CommentForm from "./CommentForm"


class CommentBox extends React.Component{
    // 1 自动执行
    constructor (props) {
        super(props)
        this.state = {
            data:[]
        }
        //3
        this.getData()
    }
    //2 use fetch load data
    getData() {
        // console.log(this.props.url)
        fetch(this.props.url).then( response =>response.json())
            .then(res =>{
                // console.log(res)
                this.setState({ data:res.data })
            })
            .catch(e =>console.log("Opps,error",e) )
    }
    render () {
        return(
            <div className="CommentBox">
                <CommentList data={ this.state.data } />
                <CommentForm />
            </div>
        )
    }
}

export default CommentBox