import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import styles from '../componentStyle'
import {CUSTOM_PRESTATIONS_FLTR, generate_id} from '../../../utils/consts';

const { config } = require('../../../config/config');
const url = config.apiUrl;

class SelectPrestation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grouped: [],
      prestations:this.props.prestations || {},
      service: null,
      all_billlings:[],
    };
    this.prestationSelected = this.prestationSelected.bind(this)
    this.addCustomPrestation = this.addCustomPrestation.bind(this)
    this.removeCustomPrestation = this.removeCustomPrestation.bind(this)
  }

  componentDidMount() {
    axios.get(`${url}myAlfred/api/billing/all`)
      .then(res => {
        let billings=res.data;
        this.setState({all_billings: billings});
      });
    axios.get(`${url}myAlfred/api/prestation/${this.props.service}`)
      .then(res => {
        let data = res.data;
        let private_prestations = data.filter( p => p.private_alfred!=null);
        let public_prestations = data.filter( p => p.private_alfred==null);
        let grouped = _.mapValues(_.groupBy(public_prestations, 'filter_presentation.label'),
          clist => clist.map(public_prestations => _.omit(public_prestations, 'filter_presentation.label')));
        grouped={[CUSTOM_PRESTATIONS_FLTR]: private_prestations, ...grouped};
        this.setState({grouped : grouped});
      }).catch(error => {
      console.log(error);
    });
  }

  addCustomPrestation() {
    let grouped=this.state.grouped;
    let custom_presta = {_id: -generate_id(), label:"", service: this.state.service, billing:this.state.all_billings, description:'', price:0};
    console.log("Adding prestation:"+JSON.stringify(custom_presta));
    grouped[CUSTOM_PRESTATIONS_FLTR].push(custom_presta);
    this.setState({grouped: grouped});
  }

  removeCustomPrestation(presta_id) {
    let grouped=this.state.grouped;
    grouped[CUSTOM_PRESTATIONS_FLTR]=grouped[CUSTOM_PRESTATIONS_FLTR].filter(p => p._id != presta_id);
    this.setState({grouped: grouped});
  }

  prestationSelected(prestaId, checked, price, billing, label){
    let sel=this.state.prestations
    if (checked) {
      sel[prestaId]={_id:prestaId, label:label, price:price, billing:billing}
    }
    else {
      delete sel[prestaId];
    }
    this.setState({ prestations: sel});
    console.log("Selection:"+JSON.stringify(sel));
    this.props.onChange(sel);
  }

  render() {
    const {classes, service} = this.props;
    console.log(service, "service ")

    return(
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid style={{width: '100%'}}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>{(this.state.service||{}).label} : indiquez vos prestations</Typography>
              </Grid>
            </Grid>
            <Grid style={{marginTop: 30, width: '100%'}}>
              <Grid className={classes.bottomSpacer}>
                <p className={classes.policySizeContent}>Quelles prestations souhaitez-vous réaliser ? Indiquez vos tarifs et votre unité de facturation. </p>
              </Grid>

              <Grid container style={{display: 'flex', marginTop: 30, marginBottom: 100}} spacing={2}>
                {Object.keys(this.state.grouped).map((fltr, i) =>{
                  let prestas = this.state.grouped[fltr];
                  let isCustom = fltr==CUSTOM_PRESTATIONS_FLTR;
                  return (
                    <Grid item xl={6} lg={12} xs={12} key={i}>
                      <Grid item>
                        {fltr=='Aucun' ? '' : fltr}
                        {isCustom ? <Grid className={classes.buttonAdd} onClick={() => this.addCustomPrestation() } >+</Grid>:null }
                      </Grid>
                      {prestas.map((p, j) => {
                        let isEditable=parseInt(p._id)<0;
                        let presta=this.state.prestations[p._id];
                        return(
                          <React.Fragment key={p._id}>
                            <ButtonSwitch isOption={true} isPrice={true} width={"100%"} label={p.label} id={p._id} checked={presta!=null}
                                          billings={p.billing} onChange={this.prestationSelected} isEditable={isEditable} price={presta?presta.price:0}/>
                            <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
                            { isCustom ? <Grid className={classes.buttonRemove} onClick={() => this.removeCustomPrestation(p._id) } >-</Grid>:null }
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
