import React from 'react';
import Grid from "@material-ui/core/Grid";

class NeedHelp extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const {style} = this.props;

    return(
      <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Grid style={{display: 'flex', flexDirection: 'column'}}>
          <Grid>
            <h2>Des questions sur nos services ?</h2>
          </Grid>
          <Grid>
            <p>Pour toutes questions sur nos services, vous pouvez consulter notre <strong>FAQ services</strong></p>
          </Grid>
          <Grid>
            <p>Vous pouvez aussi nous contacter via <strong>le chat en direct</strong> ( de 10H à 18H du lundi au vendredi )</p>
          </Grid>
        </Grid>
        <Grid>
          <p>mon image</p>
        </Grid>

      </Grid>
    );
  }

}

export default NeedHelp;
