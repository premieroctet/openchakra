import React from 'react'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Typography from "@material-ui/core/Typography";

class GallerySlidePics extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <Grid container>
        {
          [...Array(4)].map((res, index) => (
            <Grid item xl={3} style={{height : '30vh', padding: '3%',}}>
              <Paper elevation={3} style={{height: '100%', width: '100%', backgroundColor: 'rgba(248, 207, 97, 1)', borderRadius: 17, boxShado: 'white'}}>
                <Grid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%'}}>
                  <Grid>
                    <WbSunnyIcon style={{color:'white'}}/>
                  </Grid>
                  <Grid style={{textAlign: 'center'}}>
                    <Typography style={{color: 'white'}}>Béatrice n'a pas encore d'album photo !</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    )
  }

}

export default GallerySlidePics
