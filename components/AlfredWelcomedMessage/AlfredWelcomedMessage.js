import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './AlfredWelcomedMessageStyle'


class AlfredWelcomedMessage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      flexible_cancel:true
    }
  }
  render(){
    const {classes} = this.props;

    return (
      <Grid className={classes.contentPosition}>
        <Grid>
          <h3>Message de bienvenue</h3>
        </Grid>
        <Grid className={classes.containerPositionWelcome}>
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

AlfredWelcomedMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(AlfredWelcomedMessage);
