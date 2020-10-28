import React from 'react';
import Grid from "@material-ui/core/Grid";

class HeaderColor extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <Grid style={{height: '2vh', backgroundColor: 'rgba(178,204,251,1)'}}/>
    );
  }
}

export default HeaderColor;
