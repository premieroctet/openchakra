import React from 'react';
import Grid from '@material-ui/core/Grid';

class OurServices extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    const {styles} = this.props;
    return(
      <Grid>
        <Grid style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
          <Grid>
            <p>mon illu</p>
          </Grid>
          <Grid>
            <h1>Nos services</h1>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default OurServices;
