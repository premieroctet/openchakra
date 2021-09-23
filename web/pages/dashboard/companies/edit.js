const {clearAuthenticationToken, setAxiosAuthentication}=require('../../../utils/authentication')
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from 'next/router';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
const util=require('util')
const {Siret}=require('../../../components/Siret/Siret')
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AlgoliaPlaces from 'algolia-places-react';

const {snackBarSuccess, snackBarError}=require('../../../utils/notifications')
const {COMPANY_SIZE, COMPANY_ACTIVITY, ADMIN, MANAGER, EMPLOYEE}=require('../../../utils/consts')
const {SIRET}=require('../../../config/config')
const {formatAddress}=require('../../../utils/text')

const styles = theme => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
  card: {
    padding: '1.5rem 3rem',
    marginTop: '100px',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
    lineHeight: 4.15,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

class view extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      company: null,
      suggestion_address : null,
      errors:{},
    };
    this.onChange = this.onChange.bind(this);
    this.SIZE_OPTIONS= Object.keys(COMPANY_SIZE).map( key => (
      <MenuItem value={key}>{COMPANY_SIZE[key]}</MenuItem>
    ))
    this.ACTIVITY_OPTIONS= Object.keys(COMPANY_ACTIVITY).map( key => (
      <MenuItem value={key}>{COMPANY_ACTIVITY[key]}</MenuItem>
    ))
  }

  static getInitialProps({query: {id}}) {
    return {company_id: id};
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    const id = this.props.company_id;
    if (!id) {
      this.setState({company: {}})
      return
    }
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/admin/companies/${id}`)
      .then(response => {
        let company = response.data;
        this.setState({ company: company });
      })
      .catch(err => {
        console.error(err);
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/login'});
        }
      });
  }

  checkSiret = siret => {
    if (!siret) {
      return
    }
    const config = {
      headers: {Authorization: `Bearer ${SIRET.token}`},
    };
    Promise.any([SIRET.siretUrl, SIRET.sirenUrl].map(u => axios.get(`${u}/${siret}`, config)))
      .then( res => {
        snackBarSuccess("Numéro SIRET/SIREN reconnu")
      })
      .catch(err => console.error(err))
  }

  onChange = e => {
    const {company} = this.state;
    var {name, value} = e.target
    if (name=='siret') {
      value = value.replaceAll(' ', '')
      this.checkSiret(value)
    }
    company[name] = value;
    this.setState({company: company});
  };

  onCheck = e => {
    const state = this.state.company;
    const {checked}=e.target;
    state.vat_subject = checked;
    if (!checked) {
      state.vat_number=null
    }
    this.setState({company: state});
  };

  onAddressChange = suggestion => {
    this.setState({suggestion_address : suggestion ? suggestion.suggestion : null})
  }

  onSubmit = e => {
    e.preventDefault();
    var {company, suggestion_address}=this.state
    const address = suggestion_address ? {
      address: suggestion_address.name,
      city: suggestion_address.city,
      zip_code: suggestion_address.postcode,
      country: suggestion_address.country,
      gps: {
        lat: suggestion_address.latlng.lat,
        lng: suggestion_address.latlng.lng
      }
    }
    :
    null

    if (address) {
      company.billing_address = address
    }

    axios.post(`/myAlfred/api/admin/companies`, {...company})
      .then ( res => {
        if (company._id) {
          this.setState({errors:{}})
          snackBarSuccess('Entreprise modifiée')
          this.componentDidMount()
        }
        else {
          snackBarSuccess('Entreprise créée')
          Router.push(`/dashboard/companies/edit?id=${res.data._id}`)
        }
      })
      .catch ( err => {
        console.error(err)
        snackBarError(err.response.data)
        this.setState({errors: err.response.data})
      })
  };

  render() {
    const {classes} = this.props;
    const {company, errors, suggestion_address} = this.state;

    const placeholder = formatAddress(company ? company.billing_address : null) || "Modifiez votre adresse"
    if (!company) {
      return null
    }

    return (
      <Layout>
        <Grid container className={classes.signupContainer}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>Nom</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <TextField
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="name"
                    value={company.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                  <Typography style={{fontSize: 20}}>Site web</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="website"
                    value={company.website}
                    onChange={this.onChange}
                    error={errors.website}
                  />
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                  <Typography style={{fontSize: 20}}>Adresse siège social</Typography>
                </Grid>
                <form>
                <AlgoliaPlaces
                  placeholder={placeholder}
                  options={{
                    appId: 'plKATRG826CP',
                    apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                    language: 'fr',
                    countries: ['fr'],
                    type: 'address',
                  }}
                  onChange={this.onAddressChange}
                  onClear={this.onAddressChange}
                />
                </form>


                <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Effectif de l'entreprise</Typography>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <Select
                      value={company.size}
                      onChange={this.onChange}
                      name={'size'}
                      error={errors.size}
                    >
                      {this.SIZE_OPTIONS}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Secteur d'activité</Typography>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <Select
                      value={company.activity}
                      onChange={this.onChange}
                      name={'activity'}
                      error={errors.activity}
                    >
                      {this.ACTIVITY_OPTIONS}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Assujetti à la TVA</Typography>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <Checkbox
                      onChange={this.onCheck}
                      name={'vat_subject'}
                      checked={company.vat_subject}
                    />
                  </FormControl>
                </Grid>
                { company.vat_subject ?
                  <>
                  <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                    <Typography style={{fontSize: 20}}>N° de TVA</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      margin="normal"
                      style={{width: '100%'}}
                      type="text"
                      name="vat_number"
                      value={company.vat_number}
                      onChange={this.onChange}
                      error={errors.vat_number}
                    />
                  </Grid>
                  </>
                  :
                  null
                }
                <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                  <Typography style={{fontSize: 20}}>N° de Siren/Siret</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="siret"
                    value={company.siret}
                    onChange={this.onChange}
                    error={errors.siret}
                  />
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                  <Typography style={{fontSize: 20}}>Ajouter un administrateur</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    margin="normal"
                    style={{width: '100%'}}
                    name="admin_firstname"
                    value={company.admin_firstname}
                    onChange={this.onChange}
                    error={errors.admin_firstname}
                    placeholder={'Prénom'}
                  />
                  <TextField
                    margin="normal"
                    style={{width: '100%'}}
                    name="admin_name"
                    value={company.admin_name}
                    onChange={this.onChange}
                    error={errors.admin_name}
                    placeholder={'Nom'}
                  />
                  <TextField
                    margin="normal"
                    style={{width: '100%'}}
                    name="admin_email"
                    value={company.admin_email}
                    onChange={this.onChange}
                    error={errors.admin_email}
                    placeholder={'Email'}
                  />
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                  <Button type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                    Enregistrer
                  </Button>
                </Grid>
              </form>
            </Grid>
        </Grid>
      </Layout>
    );
  };
}


export default withStyles(styles)(view);
