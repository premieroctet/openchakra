import React from 'react';
import Grid from "@material-ui/core/Grid";
import Router from 'next/router';


class HeaderColor extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      bgColor: 'rgba(178,204,251,1)'
    }
  }

  componentDidMount() {
    if(Router.pathname === '/paymentSuccess'){
      this.setState({bgColor: 'rgba(248,207,97,1)'})
    }
  }

  render() {
    const {bgColor} = this.state;
    return(
        <Grid style={{height: '2vh', backgroundColor: bgColor}}/>
    );
  }
}

export default HeaderColor;
