import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "../../Box/Box";

class IndexDashboard extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid container spacing={3} style={{marginTop: '3vh', width: '100%', margin: 0}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3>Tableau de bord</h3>
        </Grid>
        <Grid item xl={7} lg={7} md={6} sm={12} xs={12}>
          <Box/>
        </Grid>
        <Grid item xl={5} lg={5} md={6} sm={12} xs={12}>
          <Box/>
        </Grid>
      </Grid>
    );
  }

}

export default IndexDashboard;
