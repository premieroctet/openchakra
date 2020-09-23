import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class BecomeAlfred extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row', padding: '5%'}}>
        <Grid style={{display: 'flex', flexDirection: 'column'}}>
          <Grid>
            <h1>Devenir Alfred</h1>
          </Grid>
          <Grid>
            <p>Créez votre compte et proposez vos services</p>
          </Grid>
          <Grid>
            <Button variant={'contained'}>En savoir plus</Button>
          </Grid>
        </Grid>
        <Grid/>
      </Grid>
    );
  }
}

export default BecomeAlfred;
