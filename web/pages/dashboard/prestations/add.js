const {clearAuthenticationToken, setAxiosAuthentication} = require('../../../utils/authentication')
import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select2 from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
const {snackBarSuccess, snackBarError}=require('../../../utils/notifications')

import Checkbox from '@material-ui/core/Checkbox';

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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      price: '',
      service: '',
      billing: '',
      filter_presentation: '',
      job: '',
      description: '',
      picture: null,
      tags: [],
      all_tags: [],
      all_service: [],
      all_billing: [],
      all_job: [],
      all_filter_presentation: [],
      selectedTags: null,
      selectedBilling: null,
      companies: [],
      // Selected company
      private_company: null,
      cesu_eligible: false,
      professional_access: false,
      particular_access: false,
      order: null,
      company_price: 0,
      errors: {},
    }
    this.onChangeFile = this.onChangeFile.bind(this)
    this.handleChangeTags = this.handleChangeTags.bind(this)
    this.handleChangeBilling = this.handleChangeBilling.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()

    axios.get('/myAlfred/api/admin/service/all')
      .then((response) => {
        let service = response.data;
        this.setState({all_service: service});
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('/myAlfred/api/admin/billing/all')
      .then((response) => {
        let billing = response.data;
        this.setState({all_billing: billing});
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('/myAlfred/api/admin/job/all')
      .then((response) => {
        let job = response.data;
        this.setState({all_job: job});
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('/myAlfred/api/admin/filterPresentation/all')
      .then((response) => {
        let filter_presentation = response.data;
        let filter_aucun = filter_presentation.find(f => f.label == 'Aucun')._id;
        this.setState({
          all_filter_presentation: filter_presentation,
          filter_presentation: filter_aucun,
        });
      }).catch((error) => {
      console.log(error);
    });

    axios.get('/myAlfred/api/admin/tags/all')
      .then(response => {
        let tags = response.data
        this.setState({all_tags: tags})
      })
      .catch(error => {
        console.log(error)
      })

    axios.get('/myAlfred/api/admin/companies/all')
      .then(response => {
        let companies = response.data
        this.setState({companies: companies})
      })
      .catch(error => {
        console.log(error)
      })

  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
    let {name, value} = e.target;
    console.log('onChange:' + name, value);
    if (name == 'service' && value != '') {
      let service = this.state.all_service.find(s => s._id == value);
      console.log(service);
    }
  };

  onAccessChange = e => {
    const {name, checked}=e.target
    this.setState({[name]:checked})
  }

  onCesuChange = e => {
    const checked = e.target.checked;
    this.setState({cesu_eligible: checked});
  };

  onChangeCompany = e => {
    const {value} = e.target
    const {prestation}=this.state
    this.setState({private_company: value})
    if (value) {
      this.setState({
        professional_access:true,
        particular_access:false,
      })
    }
  }

  handleChangeTags = selectedTags => {
    this.setState({selectedTags});

  };

  handleChangeBilling = selectedBilling => {
    this.setState({selectedBilling});

  };

  onChangeFile(e) {
    this.setState({picture: e.target.files[0]});
  }

  onSubmit = e => {
    let arrayFilter = [];
    let arrayTags = [];
    let arrayBilling = [];
    if (this.state.selectedTags != null) {
      this.state.selectedTags.forEach(w => {

        arrayTags.push(w.value);

      });
    }

    if (this.state.selectedBilling != null) {
      this.state.selectedBilling.forEach(t => {
        arrayBilling.push(t.value);
      });
    }
    e.preventDefault();
    let body={}
    body.label=this.state.label
    body.price=this.state.price
    body.service=this.state.service
    body.billing=arrayBilling
    body.calculating=null
    body.job=this.state.job
    body.filter_presentation=this.state.filter_presentation
    body.description=this.state.description
    body.picture=this.state.picture
    body.tags=arrayTags
    body.cesu_eligible=this.state.cesu_eligible
    body.particular_access=this.state.particular_access
    body.professional_access=this.state.professional_access
    body.private_company=this.state.private_company
    body.company_price = this.state.company_price
    body.order = this.state.order

    axios
      .post('/myAlfred/api/admin/prestation/all', body)
      .then(res => {
        snackBarSuccess('Prestation ajoutée');
        Router.push({pathname: '/dashboard/prestations/all'});
      })
      .catch(err => {
          console.error(err)
          snackBarError(Object.values(err.response.data))
          this.setState({errors: err.response.data});

          if (err.response.status === 401 || err.response.status === 403) {
            clearAuthenticationToken()
            Router.push({pathname: '/login'});
          }
        },
      );


  };

  render() {
    const {classes} = this.props
    const {all_service, all_billing, all_filter_presentation, all_job, all_tags} = this.state
    const {errors} = this.state
    const {companies, private_company, particular_access, professional_access, order, company_price} = this.state

    const optionsTags = all_tags.map(tag => ({
      label: tag.label,
      value: tag._id,
    }))

    const optionsBilling = all_billing.map(billing => ({
      label: billing.label,
      value: billing._id,
    }))

    return (
      <Layout>
        <Grid container className={classes.signupContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>Ajouter une prestation</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    label="Label*"
                    placeholder="Label"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="label"
                    value={this.state.label}
                    onChange={this.onChange}
                    error={errors.label}
                  />
                </Grid>
                <Grid item style={{marginTop: 20, display: 'flex', 'align-items': 'center'}}>
                  <Checkbox
                    name={`cesu_eligible`}
                    checked={this.state.cesu_eligible}
                    onChange={this.onCesuChange}
                  />
                  <Typography>Eligible au CESU</Typography>
                </Grid>
                <Grid item style={{marginTop: 20}}>
                  <TextField
                    id="standard-with-placeholder"
                    label="Prix moyen"
                    placeholder="Prix moyen"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="price"
                    value={this.state.price}
                    onChange={this.onChange}
                    error={errors.price}
                  />
                </Grid>
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <InputLabel shrink htmlFor="genre-label-placeholder">
                      Service*
                    </InputLabel>
                    <Select
                      input={<Input name="service" id="genre-label-placeholder"/>}
                      displayEmpty
                      name="service"
                      value={this.state.service}
                      onChange={this.onChange}
                      className={classes.selectEmpty}
                      error={errors.service}
                    >
                      <MenuItem value="">
                        <em>...</em>
                      </MenuItem>
                      {all_service.map(e => (
                        <MenuItem key={e._id} value={e._id}>
                          {e.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Sélectionner un service</FormHelperText>
                  </FormControl>
                  <em>{errors.service}</em>
                </Grid>
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 17}}>Méthodes de facturation*</Typography>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>

                    <Select2
                      value={this.state.selectedBilling}
                      onChange={this.handleChangeBilling}
                      options={optionsBilling}
                      isMulti
                      isSearchable
                      closeMenuOnSelect={false}
                      error={errors.billing}
                    />
                  </FormControl>
                  <em style={{color: 'red'}}>{errors.billing}</em>
                </Grid>
		              <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Ordre</Typography>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="order"
                    value={order}
                    onChange={this.onChange}
                  />
                </Grid>

                <Grid item style={{width: '100%', marginTop: 20}}>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <InputLabel shrink htmlFor="genre-label-placeholder">
                      Filtre de présentation*
                    </InputLabel>
                    <Select
                      input={<Input name="filter_presentation" id="genre-label-placeholder"/>}
                      displayEmpty
                      name="filter_presentation"
                      value={this.state.filter_presentation}
                      onChange={this.onChange}
                      className={classes.selectEmpty}
                      error={errors.filter_presentation}
                    >
                      <MenuItem value="">
                        <em>...</em>
                      </MenuItem>
                      {all_filter_presentation.map(e => (
                        <MenuItem key={e._id} value={e._id}>
                          {e.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Sélectionner un filtre de présentation</FormHelperText>
                  </FormControl>
                  <em>{errors.filter_presentation}</em>
                </Grid>
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <InputLabel shrink htmlFor="genre-label-placeholder">
                      Métier*
                    </InputLabel>
                    <Select
                      input={<Input name="job" id="genre-label-placeholder"/>}
                      displayEmpty
                      name="job"
                      value={this.state.job}
                      onChange={this.onChange}
                      className={classes.selectEmpty}
                      error={errors.job}
                    >
                      <MenuItem value="">
                        <em>...</em>
                      </MenuItem>
                      {all_job.map(e => (
                        <MenuItem key={e._id} value={e._id}>
                          {e.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Sélectionner un metier</FormHelperText>
                  </FormControl>
                  <em>{errors.job}</em>
                </Grid>
                <Grid item style={{marginTop: 20}}>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    multiline
                    rows={4}
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    label={'Description'}
                    placeholder="Description"
                    error={errors.description}
                  />
                  <em>{errors.description}</em>
                </Grid>
                <Typography style={{fontSize: 20}}>
                  Prestation proposée
                </Typography>
                <em style={{ color: 'red'}}>{this.state.errors.access}</em><br/>
                <FormControlLabel
                  control={
                    <Checkbox color="primary"
                              checked={particular_access ? 'checked' : ''}
                              name="particular_access" onChange={this.onAccessChange}
                              />
                  }
                  label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>aux particuliers</p></React.Fragment>}
                />
                <FormControlLabel
                  control={
                    <Checkbox color="primary"
                              checked={professional_access ? 'checked' : ''}
                              name="professional_access" onChange={this.onAccessChange}
                              />
                  }
                  label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>aux professionels</p>
                  </React.Fragment>}
                />
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                  <Typography style={{fontSize: 20}}>Restreindre à la compagnie</Typography>
                    <Select
                      input={<Input name="job" id="genre-label-placeholder"/>}
                      displayEmpty
                      name="private_company"
                      value={private_company ? private_company.toString():null}
                      onChange={this.onChangeCompany}
                      className={classes.selectEmpty}
                      error={this.state.errors.company}
                    >
                      <MenuItem key={''} value={null}>
                        <em>...</em>
                      </MenuItem>
                      {companies.map(e => (
                        <MenuItem key={e._id} value={e._id.toString()}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              { private_company &&
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <Typography style={{fontSize: 20}}>Tarif partenaire</Typography>
                    <TextField
                      name={'company_price'}
                      value={company_price || 0}
                      type={'number'}
                      variant={'outlined'}
                      classes={{root: classes.textField}}
                      onChange={this.onChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        inputProps: {min: 0},
                      }}
                      error={this.state.errors.company_price}
                    />
                  </FormControl>
                </Grid>
              }
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 17}}>Tags</Typography>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>

                    <Select2
                      value={this.state.selectedTags}
                      onChange={this.handleChangeTags}
                      options={optionsTags}
                      isMulti
                      isSearchable
                      closeMenuOnSelect={false}

                    />
                  </FormControl>
                  <em>{errors.tags}</em>
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                  <Button type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                    Ajouter
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Card>
        </Grid>
      </Layout>
    );
  };
}

export default withStyles(styles)(add);
