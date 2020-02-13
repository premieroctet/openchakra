import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SettingShopStyle'
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
import AlfredWelcomedMessage from '../../AlfredWelcomedMessage/AlfredWelcomedMessage';

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
                <h2>Indiquez votre message de bienvenue ! </h2>
              </Grid>
              <Grid>
                <Grid>
                  <h3>Les utilisateurs recevront votre message lorsque vous confirmerez leur réservation. </h3>
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
                    <Typography>Indiquez vos conditions d’annulation</Typography>
                  </Grid>
                  <Grid>
                    <Typography>Choisissez vos conditions en cas d'annulation de la part des utilisateurs.</Typography>
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
          <Grid className={classes.contentRight}/>
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
