import React from 'react'
import Grid from "@material-ui/core/Grid";

class CSSTest extends React.Component{

  render() {

    return(
      <div style={{margin:'0 10%', display:'flex', justifyContent:'center'}}>
        <Grid container>
            <Grid item xs={6} style={{background: 'cyan'}}>Haut gauche</Grid>
            <Grid item xs={6} style={{background: 'yellow'}}>Haut droit</Grid>
            <Grid item xs={6} style={{background: 'magenta'}}>Bas gauche</Grid>
            <Grid item xs={6} style={{background: 'red'}}>Bas droit</Grid>
        </Grid>
      </div>
    );
  }

}

export default CSSTest
