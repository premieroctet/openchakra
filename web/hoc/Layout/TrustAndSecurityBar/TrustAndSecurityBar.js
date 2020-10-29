import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

class TrustAndSecurityBar extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid style={{display: 'flex', justifyContent: 'center', backgroundColor: 'white', height: '8vh'}}>
        <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', width: '90%'}}>
          <Grid>
            <VerifiedUserIcon/>
          </Grid>
          <Grid style={{display: 'flex', flexDirection:'column'}}>
            <Grid>
              <Typography>Paiement</Typography>
            </Grid>
            <Grid>
              <Typography>100% sécurisé</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default TrustAndSecurityBar;
