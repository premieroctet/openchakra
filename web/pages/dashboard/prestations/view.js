const {clearAuthenticationToken, setAxiosAuthentication} = require('../../../utils/authentication')
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import Select2 from 'react-select';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from 'next/router';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from 'next/link';

import Checkbox from '@material-ui/core/Checkbox';

const {snackBarSuccess, snackBarError}=require('../../../utils/notifications')

const styles = {
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 67,
  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
};

class view extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      prestation: {},
      current_service: '',
      current_category: '',
      current_billing: [],
      current_filter_presentation: '',
      current_job: null,
      current_tags: [],
      all_category: [],
      all_service: [],
      all_billing: [],
      all_job: [],
      all_filter_presentation: [],
      all_tags: [],
      category: '',
      service: '',
      billing: '',
      cesu_eligible: false,
      filter_presentation: '',
      job: '',
      description: '',
      tags: [],
      selectedTags: null,
      selectedBilling: null,
      companies: [],
      errors: {},
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.handleChangeBilling = this.handleChangeBilling.bind(this);
  }

  static getInitialProps({query: {id}}) {
    return {prestation_id: id};

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    const id = this.props.prestation_id;
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/admin/prestation/all/${id}`)
      .then(response => {
        let prestation = response.data;
        this.setState({
          prestation: prestation, current_service: prestation.service,
          current_billing: prestation.billing, current_category: prestation.category,
          current_job: prestation.job, current_filter_presentation: prestation.filter_presentation,
          current_tags: prestation.tags, cesu_eligible: prestation.cesu_eligible,
        });
        this.setState({
          service: prestation.service._id,
          billing: prestation.billing._id,
          filter_presentation: prestation.filter_presentation ? prestation.filter_presentation._id : null,
          job: prestation.job ? prestation.job._id : '',
        });

        this.setState({
          selectedTags: this.state.current_tags.map(b => ({
            label: b.label,
            value: b._id,
          })),
        });

        this.setState({
          selectedBilling: this.state.current_billing.map(q => ({
            label: q.label,
            value: q._id,
          })),
        });

      })
      .catch(err => {
        console.error(err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          clearAuthenticationToken()
          Router.push({pathname: '/login'});
        }
      });

    axios.get('/myAlfred/api/admin/category/all')
      .then((response) => {
        let category = response.data;
        this.setState({all_category: category});
      }).catch((error) => {
      console.log(error);
    });

    axios.get('/myAlfred/api/admin/service/all')
      .then((response) => {
        let service = response.data;
        this.setState({all_service: service});
      }).catch((error) => {
      console.log(error);
    });

    axios.get('/myAlfred/api/admin/billing/all')
      .then((response) => {
        let billing = response.data;
        this.setState({all_billing: billing});
      }).catch((error) => {
      console.log(error);
    });

    axios.get('/myAlfred/api/admin/job/all')
      .then((response) => {
        let job = response.data;
        this.setState({all_job: job});
      }).catch((error) => {
      console.log(error);
    });

    axios.get('/myAlfred/api/admin/filterPresentation/all')
      .then((response) => {
        let filter_presentation = response.data;
        this.setState({all_filter_presentation: filter_presentation});
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
    const {name, value}=e.target
    const state = this.state.prestation
    if (name=='order') {
      const val=parseInt(value)
      if (!isNaN(val)) {
        state[name] = val
      }
    }
    else {
      state[name] = value
    }
    this.setState({prestation: state})
  };

  onChangeBool = e => {
    const state = this.state.prestation
    const {name, checked} = e.target
    state[name]=checked
    this.setState({prestation: state})
  };

  onCesuChange = e => {
    const checked = e.target.checked
    this.setState({cesu_eligible: checked})
  };

  onChange2 = e => {
    const {name, value} = e.target
    this.setState({[name]: value})
    if (name == 'service') {
      this.setState({current_service: this.state.all_service.find(s => s._id.toString() == value.toString())})
    }
    if (name == 'filter_presentation') {
      this.setState({current_filter_presentation: this.state.all_filter_presentation.find(f => f._id.toString() == value.toString())})
    }
  };

  onChangeCompany = e => {
    const {value} = e.target
    const {prestation}=this.state
    prestation.private_company=value
    if (value) {
      prestation.professional_access=true
      prestation.particular_access=false
    }
    this.setState({prestation: prestation})
  }

  handleChangeTags = selectedTags => {
    this.setState({selectedTags})

  };

  handleChangeBilling = selectedBilling => {
    this.setState({selectedBilling})

  };

  onSubmit = e => {
    e.preventDefault()
    let arrayTags = []
    let arrayBilling = []

    if (this.state.selectedTags != null) {
      this.state.selectedTags.forEach(w => {
        arrayTags.push(w.value)
      })
    }

    if (this.state.selectedBilling != null) {
      this.state.selectedBilling.forEach(w => {
        arrayBilling.push(w.value)
      })
    }
    const tags = arrayTags
    const service = this.state.service
    const billing = arrayBilling
    const job = this.state.job
    const filter_presentation = this.state.filter_presentation
    const {label, price, description, professional_access, particular_access} = this.state.prestation
    const id = this.props.prestation_id
    const cesu_eligible = this.state.cesu_eligible
    const private_company = this.state.prestation.private_company
    const order = this.state.prestation.order

    axios.put(`/myAlfred/api/admin/prestation/all/${id}`, {
      label, price, billing, service, filter_presentation,
      job, description, tags, cesu_eligible, particular_access, professional_access,
      private_company, order,
    })
      .then(() => {
        snackBarSuccess('Prestation modifiée avec succès')
        this.componentDidMount()
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/login'})
        }
        else {
          this.setState({errors: err.response.data})
        }
      })
  };

  handleClick() {
    const id = this.props.prestation_id;
    axios.delete(`/myAlfred/api/admin/prestation/all/${id}`)
      .then(res => {
        snackBarSuccess('Prestation supprimée avec succès');
        Router.push({pathname: '/dashboard/prestations/all'});
      })
      .catch(err => {
        console.error(err);
      });


  };


  render() {
    const {classes} = this.props;
    const {prestation} = this.state;
    const {current_service} = this.state;
    const {current_billing} = this.state;
    const {current_category} = this.state;
    const {current_filter_presentation} = this.state;
    const {current_job} = this.state;
    const {current_tags} = this.state;
    const {all_category} = this.state;
    const {all_service} = this.state;
    const {all_billing} = this.state;
    const {all_filter_presentation} = this.state;
    const {all_job} = this.state;
    const {all_tags} = this.state;
    const {companies} = this.state;
    console.log(prestation.private_company)

    const categories = all_category.map(e => (
      <MenuItem value={e._id}>{e.label}</MenuItem>
    ));

    const optionsTags = all_tags.map(tag => ({
      label: tag.label,
      value: tag._id,
    }));

    const optionsBilling = all_billing.map(billing => ({
      label: billing.label,
      value: billing._id,
    }));


    return (
      <Layout>
        <Grid container className={classes.loginContainer}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>{prestation.label}</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="label"
                    value={prestation.label}
                    onChange={this.onChange}
                    error={this.state.errors.label}
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
                  <Typography style={{fontSize: 20}}>Prix moyen</Typography>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="price"
                    value={prestation.price}
                    onChange={this.onChange}

                  />
                </Grid>
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <Typography style={{fontSize: 20}}>Service</Typography>
                    <Select
                      input={<Input name="service" id="genre-label-placeholder"/>}
                      displayEmpty
                      name="service"
                      value={this.state.service}
                      onChange={this.onChange2}
                      className={classes.selectEmpty}
                      error={this.state.errors.service}
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
                  </FormControl>
                </Grid>
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Méthodes de facturations</Typography>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <Select2
                      value={this.state.selectedBilling}
                      onChange={this.handleChangeBilling}
                      options={optionsBilling}
                      isMulti
                      isSearchable
                      closeMenuOnSelect={false}
                    />
                  </FormControl>
                </Grid>
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Ordre</Typography>
                  <TextField
                  id="standard-with-placeholder"
                  margin="normal"
                  style={{width: '100%'}}
                  type="text"
                  name="order"
                  value={prestation.order}
                  onChange={this.onChange}
                  />
                </Grid>
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <Typography style={{fontSize: 20}}>Filtre de présentation</Typography>
                    <Select
                      input={<Input name="filter_presentation" id="genre-label-placeholder"/>}
                      displayEmpty
                      name="filter_presentation"
                      value={this.state.filter_presentation}
                      onChange={this.onChange2}
                      className={classes.selectEmpty}
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
                  </FormControl>
                </Grid>

                <Grid item style={{width: '100%', marginTop: 20}}>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                  <Typography style={{fontSize: 20}}>Métier</Typography>
                    <Select
                      input={<Input name="job" id="genre-label-placeholder"/>}
                      displayEmpty
                      name="job"
                      value={this.state.job}
                      onChange={this.onChange2}
                      className={classes.selectEmpty}
                      error={this.state.errors.job}
                    >
                      <MenuItem key={''} value="">
                        <em>...</em>
                      </MenuItem>
                      {all_job.map(e => (
                        <MenuItem key={e._id} value={e._id}>
                          {e.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item style={{marginTop: 20}}>
                <Typography style={{fontSize: 20}}>Description</Typography>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    multiline
                    rows={4}
                    name="description"
                    value={prestation.description}
                    onChange={this.onChange}
                    error={this.state.errors.description}
                  />
                </Grid>
                <Typography style={{fontSize: 20}}>
                  Prestation proposée
                </Typography>
                <em style={{ color: 'red'}}>{this.state.errors.access}</em><br/>
                <FormControlLabel
                  control={
                    <Checkbox color="primary"
                              checked={prestation.particular_access ? 'checked' : ''}
                              name="particular_access" onChange={this.onChangeBool}
                              />
                  }
                  label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>aux particuliers</p></React.Fragment>}
                />
                <FormControlLabel
                  control={
                    <Checkbox color="primary"
                              checked={prestation.professional_access ? 'checked' : ''}
                              name="professional_access" onChange={this.onChangeBool}
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
                      value={prestation.private_company ? prestation.private_company.toString():null}
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

                <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Tags</Typography>
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
                </Grid>


                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                  <Button type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                    Modifier
                  </Button>
                  <Button type="button" variant="contained" color="secondary" style={{width: '100%'}}
                          onClick={this.handleClick}>
                    Supprimer
                  </Button>
                </Grid>
              </form>
              <Link href={`editPicture?id=${this.props.prestation_id}`}>
                <Button type="button" variant="contained" color="primary" style={{width: '100%'}}>
                  Modifier la photo
                </Button>
              </Link>
            </Grid>
        </Grid>
      </Layout>
    );
  };
}


export default withStyles(styles)(view);
