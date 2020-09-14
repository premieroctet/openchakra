import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../componentStyle';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import {CANCEL_MODE} from '../../../utils/consts.js';

class SettingShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome_message: this.props.welcome_message,
      cancel_mode: this.props.cancel_mode,
    };

    this.cancel_buttons = {};
    Object.values(CANCEL_MODE).forEach(v => this.cancel_buttons[v] = React.createRef());
    this.cancelModeChanged = this.cancelModeChanged.bind(this);
    this.welcomeMessageChanged = this.welcomeMessageChanged.bind(this);

  }

  welcomeMessageChanged(event) {
    let msg = event.target.value;
    this.setState({welcome_message: msg}, () => this.props.onChange(msg, this.state.cancel_mode));
  }

  cancelModeChanged(mode_id, checked) {
    console.log('canceModeChanged:' + mode_id, checked);
    this.setState({cancel_mode: mode_id}, () => this.props.onChange(this.state.welcome_message, mode_id));
    Object.values(CANCEL_MODE).forEach(v => {
      console.log(v);
      this.cancel_buttons[v].current.setState({checked: mode_id === v});
    });
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Indiquez votre message de bienvenue ! </Typography>
              </Grid>
              <Grid>
                <Grid>
                  <h3 className={classes.policySizeSubtitle}>Les utilisateurs recevront votre message lorsque vous
                    confirmerez leur réservation. </h3>
                </Grid>
              </Grid>
              <Grid>
                <Grid className={classes.texfieldContentWelcomedMessage}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Message de bienvenue"
                    multiline
                    rows="4"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.welcome_message}
                    onChange={this.welcomeMessageChanged}
                  />
                </Grid>
              </Grid>
              <Grid style={{marginBottom: 100}}>
                <Grid>
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>Indiquez vos conditions d’annulation</h3>
                  </Grid>
                  <Grid>
                    <p className={classes.policySizeContent}>Choisissez vos conditions en cas d'annulation de la part
                      des utilisateurs.</p>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <ButtonSwitch id={CANCEL_MODE.FLEXIBLE} checked={this.state.cancel_mode == CANCEL_MODE.FLEXIBLE}
                                  label={'Flexibles: Remboursement intégral jusqu\'à 1 jour avant la prestation'}
                                  onChange={this.cancelModeChanged} ref={this.cancel_buttons[CANCEL_MODE.FLEXIBLE]}/>
                  </Grid>
                  <Grid>
                    <ButtonSwitch id={CANCEL_MODE.MODERATE} checked={this.state.cancel_mode == CANCEL_MODE.MODERATE}
                                  label={'Modérées: Remboursement intégral jusqu\'à 5 jours avant la prestation'}
                                  onChange={this.cancelModeChanged} ref={this.cancel_buttons[CANCEL_MODE.MODERATE]}/>
                  </Grid>
                  <Grid>
                    <ButtonSwitch id={CANCEL_MODE.STRICT} checked={this.state.cancel_mode == CANCEL_MODE.STRICT}
                                  label={'Strictes: Remboursement intégral jusqu’à 10 jours avant la prestation'}
                                  onChange={this.cancelModeChanged} ref={this.cancel_buttons[CANCEL_MODE.STRICT]}/>
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

export default withStyles(styles, {withTheme: true})(SettingShop);
