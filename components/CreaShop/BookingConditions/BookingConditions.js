import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './BookingConditionsStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Clear from '@material-ui/icons/Clear';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';

class BookingConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      checked: false,
      dates: [],
      isDiplome: false,
      isCertification: false
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid className={classes.contentLeft}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <h2>Vos conditions de réservation</h2>
              </Grid>
              <Grid>
                <Grid>
                  <h3>Comment les utilisateurs peuvent réserver vos services ? </h3>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <Grid>
                    <ButtonSwitch isOption={false} isPrice={false} label={"Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H."}/>
                  </Grid>
                  <Grid>
                    <ButtonSwitch isOption={false} isPrice={false} label={"Les utilisateurs peuvent réserver mes services directement sans demande de réservation."}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <Typography>Pour réserver mes services, les utilisateurs doivent : </Typography>
                </Grid>
                <Grid>
                  <Grid>
                    <Button variant="outlined" className={classes.button}>Respecter les conditions My-Alfred (profil vérifié)</Button>
                  </Grid>
                  <Grid>
                    <Button variant="outlined" className={classes.button}>Avoir une photo de profil</Button>
                  </Grid>
                  <Grid>
                    <Button variant="outlined" className={classes.button}>Avoir déposer une pièce d’identité officielle</Button>
                  </Grid>
                  <Grid>
                    <Button variant="outlined" className={classes.button}>Etre recommandé par d’autres Alfred</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.contentRight}/>
        </Grid>
      </Grid>
    );
  }
}

BookingConditions.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (BookingConditions);
