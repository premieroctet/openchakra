import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SettingShopStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';

class SettingShop extends React.Component {
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
                <Typography className={classes.policySizeTitle}>Indiquez votre message de bienvenue ! </Typography>
              </Grid>
              <Grid>
                <Grid>
                  <h3  className={classes.policySizeSubtitle}>Les utilisateurs recevront votre message lorsque vous confirmerez leur réservation. </h3>
                </Grid>
              </Grid>
              <Grid>
                <Grid className={classes.texfieldContentWelcomedMessage}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Message de bienvenue"
                    multiline
                    rows="4"
                    defaultValue={"Merci pour votre réservation ! "}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <Grid>
                    <h3  className={classes.policySizeSubtitle}>Indiquez vos conditions d’annulation</h3>
                  </Grid>
                  <Grid>
                    <p className={classes.policySizeContent}>Choisissez vos conditions en cas d'annulation de la part des utilisateurs.</p>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <ButtonSwitch isOption={false} label={"Flexibles: Remboursement intégral jusqu'à 1 jour avant la prestation"}/>
                  </Grid>
                  <Grid>
                    <ButtonSwitch isOption={false} isPrice={false} label={"Modérées: Remboursement intégral jusqu'à 5 jours avant la prestatio"}/>
                  </Grid>
                  <Grid>
                    <ButtonSwitch isOption={false} isPrice={false}  label={"Strictes: Remboursement intégral jusqu’à 10 jours avant la prestation"}/>
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

SettingShop.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (SettingShop);
