import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import styles from '../componentStyle'

const { config } = require('../../../config/config');
const url = config.apiUrl;

class SelectPrestation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grouped: [],
      prestations:{},
      service_name: '',
    };
    this.prestationSelected = this.prestationSelected.bind(this)
  }

  componentDidMount() {
    axios.get(`${url}myAlfred/api/prestation/${this.props.service}`)
      .then(res => {
        let data = res.data;
        console.log("Prestations:"+JSON.stringify(data[0].service.label));
        this.setState({service_name: data[0].service.label});
        let grouped = _.mapValues(_.groupBy(data, 'filter_presentation.label'),
          clist => clist.map(data => _.omit(data, 'filter_presentation.label')));
        this.setState({grouped : grouped});
      }).catch(error => {
      console.log(error);
    })
  }

  prestationSelected(prestaId, checked, price, billing){
    console.log(prestaId+","+checked);
    let sel=this.state.prestations
    if (checked) {
      sel[prestaId]={price:price, billing:billing}
    }
    else {
      delete sel[prestaId];
    }
    this.setState({ prestations: sel});
    console.log("Selection:"+JSON.stringify(sel));
    this.props.onChange(sel);
  }

  render() {
    const {classes} = this.props;
    return(
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid style={{width: '100%'}}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>{this.state.service_name} : indiquez vos prestations</Typography>
              </Grid>
            </Grid>
            <Grid style={{marginTop: 30, width: '100%'}}>
              <Grid className={classes.bottomSpacer}>
                <p className={classes.policySizeContent}>Quelles prestations souhaitez-vous réaliser ? Indiquez vos tarifs et votre unité de facturation. </p>
              </Grid>

              <Grid container style={{display: 'flex', marginTop: 30, marginBottom: 100}} spacing={2}>
                {Object.keys(this.state.grouped).map((fltr, i) =>{
                  let prestas = this.state.grouped[fltr];
                  return (
                    <Grid item xl={6} lg={12} xs={12} key={i}>
                      <Grid item> {fltr=='Aucun' ? '' : fltr}</Grid>
                      {prestas.map((p, j) => {
                        return(
                          <React.Fragment key={p._id}>
                            <ButtonSwitch isOption={true} isPrice={true} width={"100%"} label={p.label} id={p._id}
                                          billing={p.billing} onChange={this.prestationSelected}/>
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
