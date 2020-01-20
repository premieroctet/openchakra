import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './AlfredConditionsStyle'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        <Grid className={classes.mainContainer}>
          <Grid className={classes.containerBooking}>
            <Grid>
              <h3>Les paramétres de réservation de Maelis</h3>
            </Grid>
            <Grid>
              <Button color="secondary" className={classes.button}>
                Modifier
              </Button>
            </Grid>
          </Grid>
          <hr className={classes.hrStyle}/>
          <Grid>
            <h3>Les conditions de réservation de Maelis</h3>
          </Grid>
          <Grid className={classes.containerBooking}>
            <Grid className={classes.conditionsAlfred}>
              <Grid>
                <h4>Conditions My-Alfred</h4>
              </Grid>
              <Grid className={classes.textStyle}>
                <p>Adresse email et numéro de téléphone confirmés, information de paiement et acceptation du règlement intérieur.</p>
              </Grid>
            </Grid>
            <Grid className={classes.conditionsAlfredPosition}>
              <Grid>
                <h4>Photo de profil </h4>
              </Grid>
              <Grid>
                <p>Ces utilisateurs ont fourni une photo de profil.</p>
              </Grid>
            </Grid>
            <Grid className={classes.conditionsAlfredPosition}>
              <Grid>
                <h4>Pièce d'identité officielle </h4>
              </Grid>
              <Grid>
                <p>Ces utilisateurs ont vérifié leur pièce d'identité.</p>
              </Grid>
            </Grid>
        </Grid>
          <hr className={classes.hrStyle}/>
          <Grid className={classes.containerPosition}>
            <Grid className={classes.contentPosition}>
              <Grid>
                <h3>Comment réserver Maelis</h3>
              </Grid>
              <Grid>
                <h4>Maelïs dispose de 24h pour répondre aux demandes de réservation</h4>
              </Grid>
              <Grid>
                <p>Dans le cadre d’une demande réservation d’un de ses services, Maëlis vous confirmera la réservation dans un délai maximum de 24h.</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr className={classes.hrStyle}/>
        <Grid className={classes.containerPosition}>
          <Grid className={classes.contentPosition}>
            <Grid>
              <h3>Conditions d’annulation de Maelis</h3>
            </Grid>
            <Grid>
              <h4>Flexible</h4>
            </Grid>
            <Grid>
              <p>En cas d’annulation jusqu’à 1 jour de la prestation, Maelîs procédera au remboursement intégral de la réservation. </p>
            </Grid>
          </Grid>
        </Grid>
        <hr className={classes.hrStyle}/>
        <Grid>
          <h3>Message de bienvenue</h3>
        </Grid>
        <Grid className={classes.containerPosition}>
          <Grid className={classes.contentWelcomePosition}>
            <Grid>
              <img src={'../../static/assets/img/iconCardAlfred/Castor applaudit.svg'} alt={'fatCastor'} title={'fatCastor'} className={classes.imgFatCastor}/>
            </Grid>
            <Grid className={classes.texfieldContent}>
              <TextField
                id="outlined-multiline-static"
                label="Message de bienvenue"
                multiline
                rows="4"
                defaultValue="Merci pour votre réservation !"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
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
