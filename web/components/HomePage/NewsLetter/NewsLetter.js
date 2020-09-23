import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class NewsLetter extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid style={{padding: '5%'}}>
        <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Grid style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
            <Grid>
              <p>La Newsletter
                des supers Alfred</p>
            </Grid>
            <Grid>
              <p>Inscrivez-vous a notre super Newsletter pour recevoir
                les informations et les bons plans de la communauté.</p>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
            <Grid>
             <Button>google</Button>
            </Grid>
            <Grid>
              <p>ou</p>
            </Grid>
            <Grid>
              <Grid>
                <TextField id="outlined-basic" label="Email" variant="outlined" />
              </Grid>
              <Grid>
                <Button>Je m'inscris !</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default NewsLetter;
