import React from 'react';
import Grid from '@material-ui/core/Grid';

class OurDescription extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const {style} = this.props;
    return(
      <Grid style={{padding: '5%'}}>
        <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Grid style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
            <Grid>
              <q><cite>On était toujours à travailler dans le train ou au téléphone dans l’avion.
              A l’époque, on aurait voulu un assistant qui s’occupe de tous les petits tracas du quotidien
                qu’on n’avait pas le temps de gérer.</cite></q>
            </Grid>
            <Grid>
              <p>Solène et Wilfrid - FONDATEUR de My Alfred!</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default OurDescription;

