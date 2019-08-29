import React, { Component } from 'react';
import Router from "next/router";

   

class disconnected extends Component{
componentDidMount() {
    Router.push('/'); 
};

render() {
    
    return(
        <p>disconnected</p>
    );
}
}
export default disconnected;