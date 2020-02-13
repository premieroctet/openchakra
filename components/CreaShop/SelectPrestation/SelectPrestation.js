import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './SelectPrestationStyle';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import { Typography } from '@material-ui/core';
import axios from 'axios';

const { config } = require('../../../config/config');
const url = config.apiUrl;

class SelectPrestation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prestations:[]
    }
  }

  componentDidMount() {
    axios.get(`${url}myAlfred/api/prestation/${this.props.service}`)
      .then(res => {
        let data = res.data;
        console.log(data);
        this.setState({prestations: data});
        for(let i = 0 ; i < data.length; i++){

        }
      }).catch(error => {
      console.log(error);
    })
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
            <Grid style={{marginTop: 30}}>
              <Grid className={classes.contentTextSize}>
                <p className={classes.policySizeContent}>Quelles prestations souhaitez-vous réaliser ? Indiquez vos tarifs et votre unité de facturation. </p>
              </Grid>
              <Grid container style={{display: 'flex', marginTop: 30}} spacing={2}>
                {Object.keys(this.state.prestations).map( result => {
                  return (
                    <Grid item xl={6}>
                      <Grid item> {this.state.prestations[result].filter_presentation.label}</Grid>
                      <ButtonSwitch isOption={true} isPrice={true} width={"50%"} label={this.state.prestations[result].label} billing={this.state.prestations[result].billing}/>
                      <hr style={{
                        color: "rgb(255, 249, 249, 0.6)",
                        borderRadius: 10
                      }}/>
                    </Grid>
                  )
                })
                }
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
