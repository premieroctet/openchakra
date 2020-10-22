import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class AddressService extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Grid>
        <Grid style={{display: 'flex', flexDirection: 'column'}}>
          <Grid>
            <Typography>Madame Caroline Lienard</Typography>
          </Grid>
          <Grid>
            <Typography>38 mail andrée putman</Typography>
          </Grid>
          <Grid>
            <Typography>76000 Rouen - france</Typography>
          </Grid>
          <Grid style={{marginTop: 30}}>
            <Typography>L'adresse de facturation est identique</Typography>
          </Grid>
          <Grid style={{marginTop: 30}}>
            <Button>Modifier</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default AddressService;
