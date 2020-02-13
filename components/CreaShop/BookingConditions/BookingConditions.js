import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './BookingConditionsStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
    }
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
          <Grid className={classes.contentLeft}>
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
              <Grid>
                <Grid>
                  <h3 className={classes.policySizeSubtitle}>Pour réserver mes services, les utilisateurs doivent : </h3>
                </Grid>
                <Grid>
                  <Grid style={{marginBottom: 10}}>
                    <input type={"button"} value={"Respecter les conditions My-Alfred (profil vérifié)"} name={"profilChecked"} onClick={this.stateButton} className={ this.state.profilChecked ? classes.activeButton : classes.button}/>
                  </Grid>
                  <Grid style={{marginBottom: 10}}>
                    <input type={"button"} value={"Avoir une photo de profil"} name={"getPicture"} onClick={this.stateButton} className={ this.state.getPicture ? classes.activeButton : classes.button}/>
                  </Grid>
                  <Grid style={{marginBottom: 10}}>
                    <input type={"button"} value={"Avoir déposer une pièce d’identité officielle"} name={"idChecked"} onClick={this.stateButton} className={ this.state.idChecked ? classes.activeButton : classes.button}/>
                  </Grid>
                  <Grid>
                    <input type={"button"} value={"Etre recommandé par d’autres Alfred"} name={"beRecommended"} onClick={this.stateButton} className={ this.state.beRecommended ? classes.activeButton : classes.button}/>
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
