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
      grouped: [],
      prestationsSelected:{},
    };
    this.generatePrestations = this.generatePrestations.bind(this);

  }

  componentDidMount() {
    axios.get(`${url}myAlfred/api/prestation/${this.props.service}`)
      .then(res => {
        let data = res.data;
        let grouped = _.mapValues(_.groupBy(data, 'filter_presentation.label'),
          clist => clist.map(data => _.omit(data, 'filter_presentation.label')));
        this.setState({grouped : grouped});
        console.log(this.state.grouped)
      }).catch(error => {
      console.log(error);
    })
  }

  generatePrestations(id){
    let prestas = this.state.prestationSelected;
    let newPresta = {price:0, billing:null};
    prestas[id] = newPresta;
    this.setState(({prestationsSelected: prestas[id]}));
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

              <Grid container style={{display: 'flex', marginTop: 30, marginBottom: 50}} spacing={2}>
                {Object.keys(this.state.grouped).map((fltr, i) =>{
                  let prestas = this.state.grouped[fltr];
                  return (
                    <Grid item xl={6} key={i}>
                      <Grid item> {fltr}</Grid>
                      {prestas.map((p, j) => {
                        return(
                          <React.Fragment key={p._id}>
                            <ButtonSwitch
                              isOption={true}
                              isPrice={true}
                              width={"50%"}
                              label={p.label}
                              billing={p.billing}
                              getId={this.generatePrestations}
                              idPrestation={p._id}
                            />
                            <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
                          </React.Fragment>
                      )
                      })}
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
