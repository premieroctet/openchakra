import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SettingServiceStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



class SettingService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
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
                <h2>Paramètres votre service</h2>
              </Grid>
              <Grid >
                <h3>Quel(s) produit(s) / matériel(s) fournissez-vous dans le cadre de ce service ? </h3>
              </Grid>
              <Grid className={classes.contentTextSize}>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.contentRight}/>
        </Grid>
      </Grid>
    );
  }
}

SettingService.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (SettingService);
