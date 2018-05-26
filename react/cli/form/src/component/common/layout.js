"use strict";
import React from 'react';
import Header from "./header"
import Footer from "./footer"

class Layout extends React.Component{
    render(){
        return(
            <div>
                <Header />
                <div>body</div>
                <Footer />
            </div>
        )
    }
}
export default Layout