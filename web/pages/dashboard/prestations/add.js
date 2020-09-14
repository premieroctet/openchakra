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
import cookie from 'react-cookies';
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
      cesu_eligible: false,
      errors: {},
    };
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.handleChangeBilling = this.handleChangeBilling.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');

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
      .then((response) => {
        let tags = response.data;
        this.setState({all_tags: tags});
      }).catch((error) => {
      console.log(error);
    });
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

  onCesuChange = e => {
    const checked = e.target.checked;
    this.setState({cesu_eligible: checked});
  };


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

    console.log('SelectedBilling:' + JSON.stringify(this.state.selectedBilling));
    if (this.state.selectedBilling != null) {
      this.state.selectedBilling.forEach(t => {

        arrayBilling.push(t.value);

      });
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append('label', this.state.label);
    formData.append('price', this.state.price);
    formData.append('service', this.state.service);
    formData.append('billing', JSON.stringify(arrayBilling));
    formData.append('calculating', null);
    formData.append('job', this.state.job);
    formData.append('filter_presentation', this.state.filter_presentation);
    formData.append('description', this.state.description);
    formData.append('picture', this.state.picture);
    formData.append('tags', JSON.stringify(arrayTags));
    formData.append('cesu_eligible', this.state.cesu_eligible);

    axios
      .post('/myAlfred/api/admin/prestation/all', formData)
      .then(res => {
        alert('Prestation ajoutée');
        Router.push({pathname: '/dashboard/prestations/all'});
      })
      .catch(err => {
          console.error(err);
          this.setState({errors: err.response.data});

          if (err.response.status === 401 || err.response.status === 403) {
            cookie.remove('token', {path: '/'});
            Router.push({pathname: '/login'});
          }
        },
      );


  };

  render() {
    const {classes} = this.props;
    const {all_service} = this.state;
    const {all_billing} = this.state;
    const {all_filter_presentation} = this.state;
    const {all_job} = this.state;
    const {all_tags} = this.state;
    const {errors} = this.state;

    console.log('State.billing:' + JSON.stringify(this.state.billing));

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
                <Grid item style={{marginTop: 20}}>
                  <Typography style={{fontSize: 17}}>Image</Typography>
                  <input type="file" name="picture" onChange={this.onChangeFile} accept="image/*"/>
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
