import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './BookingConditionsStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';

class BookingConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      checked: false,
      dates: [],
      isDiplome: false,
      isCertification: false,
      beRecommended: false,
      profilChecked: false,
      getPicture: false,
      idChecked: false
    };
    this.stateButton = this.stateButton.bind(this)
  }

  stateButton(e){
    let name = e.target.name;
    console.log(name);
    this.setState({[e.target.name]: !this.state[name]});
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Vos conditions de réservation</Typography>
              </Grid>
              <Grid>
                <Grid>
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>Comment les utilisateurs peuvent réserver vos services ? </h3>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <ButtonSwitch style={{width : '100%'}} isOption={false} isPrice={false} label={"Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H."}/>
                  </Grid>
                  <Grid>
                    <ButtonSwitch  isOption={false} isPrice={false} label={"Les utilisateurs peuvent réserver mes services directement sans demande de réservation."}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={classes.bottomSpacer}>
                <Grid>
                  <h3 className={classes.policySizeSubtitle}>Pour réserver mes services, les utilisateurs doivent : </h3>
                </Grid>
                <Grid>
                  <Grid style={{marginBottom: 10}}>
                    <ButtonSwitch  isOption={false} isPrice={false} label={"Respecter les conditions My-Alfred (profil vérifié)"}/>
                  </Grid>
                  <Grid style={{marginBottom: 10}}>
                    <ButtonSwitch isOption={false} isPrice={false} label={"Avoir une photo de profil"}/>
                  </Grid>
                  <Grid style={{marginBottom: 10}}>
                    <ButtonSwitch isOption={false} isPrice={false} label={"Avoir déposer une pièce d’identité officielle"}/>
                  </Grid>
                  <Grid>
                    <ButtonSwitch isOption={false} isPrice={false} label={"Etre recommandé par d’autres Alfred"}/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
