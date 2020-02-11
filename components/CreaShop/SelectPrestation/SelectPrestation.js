import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './SelectPrestationStyle';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import { Typography } from '@material-ui/core';

class SelectPrestation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {classes} = this.props;

    return(
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid className={classes.contentLeft}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Indiquez vos prestations</Typography>
              </Grid>
            </Grid>
            <Grid style={{marginTop: 100}}>
              <Grid className={classes.contentTextSize}>
                <p className={classes.policySizeContent}>Quelles prestations souhaitez-vous réaliser ? Indiquez vos tarifs et votre unité de facturation. </p>
              </Grid>
              <Grid container style={{display: 'flex'}} spacing={2}>
                <Grid item   xl={6}>
                  <ButtonSwitch isOption={true} width={"50%"}/>
                  <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
                </Grid>
                <Grid  item   xl={6}>
                  <ButtonSwitch isOption={true} width={"50%"}/>
                  <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
                </Grid>
                <Grid  item   xl={6}>
                  <ButtonSwitch isOption={true} width={"50%"}/>
                  <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
                </Grid>
                <Grid  item   xl={6}>
                  <ButtonSwitch isOption={true} width={"50%"}/>
                  <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
                </Grid>
                <Grid  item   xl={6}>
                  <ButtonSwitch isOption={true} width={"50%"}/>
                  <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
                </Grid>
                <Grid  item   xl={6}>
                  <ButtonSwitch isOption={true} width={"50%"}/>
                  <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
                </Grid>
                <Grid  item   xl={6}>
                  <ButtonSwitch isOption={true} width={"50%"}/>
                  <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

SelectPrestation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (SelectPrestation);
