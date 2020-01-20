import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './AlfredConditionsStyle'
import Button from '@material-ui/core/Button';

class About extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    const {classes} = this.props;

    return (
      <Grid container>
        <Grid style={{display:'flex', justifyContent: 'space-between', width: '100%'}}>
          <Grid>
            <h3>Les conditions de réservation de Maelis</h3>
          </Grid>
          <Grid>
            <Button color="secondary" className={classes.button}>
              Modifier
            </Button>
          </Grid>
        </Grid>
        <hr style={{width : '100%'}}/>
        <Grid style={{display: 'flex', width:'100%', justifyContent: 'space-between'}}>
          <Grid style={{display:'flex', flexDirection: 'column', alignItems: 'center', width: 300}}>
            <Grid>
              <h4>Conditions My-Alfred</h4>
            </Grid>
            <Grid>
              Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H.
            </Grid>
          </Grid>
          <Grid style={{display:'flex', flexDirection: 'column', alignItems: 'center', width: 300}}>
            <Grid>
              <h4>Photo de profil </h4>
            </Grid>
            <Grid>
              Si vous activez cette condition, vous ne pourrez voir les photos de profil des voyageurs qu'une fois la réservation confirmée.
            </Grid>
          </Grid>
          <Grid style={{display:'flex', flexDirection: 'column', alignItems: 'center', width: 300}}>
            <Grid>
              <h4>Pièce d'identité officielle </h4>
            </Grid>
            <Grid>
              Ces utilisateurs ont vérifié leur identité.
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(About);
