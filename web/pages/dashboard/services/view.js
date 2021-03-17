const {clearAuthenticationToken}=require('../../../utils/authentication')
const {setAxiosAuthentication}=require('../../../utils/authentication')
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select2 from 'react-select';
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


const styles = {
  loginContainer: {
    alignItems: 'center',
    height: '150vh',
    justifyContent: 'center',
    flexDirection: 'column',
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
      service: {},
      current_tags: [],
      current_equipments: [],
      current_category: '',
      all_category: [],
      all_tags: [],
      all_equipments: [],
      category: '',
      tags: [],
      equipments: [],
      location: {},
      isChecked: false,
      selectedOption: null,
      selectedTags: null,
      errors:{}
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onTaxChange = this.onTaxChange.bind(this);
  }

  static getInitialProps({query: {id}}) {
    return {service_id: id};

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    const id = this.props.service_id;
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/admin/service/all/${id}`)
      .then(response => {
        let service = response.data;
        this.setState({
          service: service,
          current_tags: service.tags,
          current_equipments: service.equipments,
          current_category: service.category,
          category: service.category._id,
          location: service.location,
        });

        this.setState({
          selectedOption: this.state.current_equipments.map(a => ({
            label: a.label,
            value: a._id,
          })),
        });

        this.setState({
          selectedTags: this.state.current_tags.map(b => ({
            label: b.label,
            value: b._id,
          })),
        });


      })
      .catch(err => {
        console.error(err);
        if (err.response.status === 401 || err.response.status === 403) {
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

    axios.get('/myAlfred/api/admin/tags/all')
      .then((response) => {
        let tags = response.data;
        this.setState({all_tags: tags});
      }).catch((error) => {
      console.log(error);
    });

    axios.get('/myAlfred/api/admin/equipment/all')
      .then((response) => {
        let equipments = response.data;
        this.setState({all_equipments: equipments});
      }).catch((error) => {
      console.log(error);
    });

  }

  onChange = e => {
    const state = this.state.service;
    state[e.target.name] = e.target.value;
    this.setState({service: state});
  };

  onChangeBool = e => {
    const state = this.state.service;
    const {name, checked} = e.target;
    state[name]=checked
    this.setState({service: state});
  };

  onChangeLocation = e => {
    const service = this.state.service;
    service.location[e.target.name] = e.target.checked;
    this.setState({service: service});
  };

  onChange2 = e => {
    this.setState({category: e.target.value});
  };

  handleChange = e => {
    this.setState({tags: e.target.value});


  };

  handleChange2 = e => {
    this.setState({equipments: e.target.value});
  };

  handleChangeSelect = selectedOption => {
    this.setState({selectedOption});

  };

  handleChangeTags = selectedTags => {
    this.setState({selectedTags});
  };

  onTaxChange = e => {
    let service = this.state.service;
    service[e.target.name] = e.target.checked;
    this.setState({service: service});
  };


  onSubmit = e => {
    e.preventDefault();
    let arrayEquipments = [];
    if (this.state.selectedOption != null) {
      this.state.selectedOption.forEach(c => {
        arrayEquipments.push(c.value);
      });
    }

    let tags = [];
    if (this.state.selectedTags != null) {
      this.state.selectedTags.forEach(w => {
        tags.push(w.value);
      });
    }

    const category = this.state.category;
    const equipments = arrayEquipments;
    const id = this.props.service_id;
    const service = this.state.service;
    const {label, description, location} = service;
    const {travel_tax, pick_tax, professional_access, particular_access} = service;

    axios.put(`/myAlfred/api/admin/service/all/${id}`,
      {label, description, tags, category, equipments, location, travel_tax, pick_tax,
      professional_access, particular_access})
      .then(res => {

        alert('Service modifié avec succès');
      })
      .catch(err => {
        console.error(err);
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/login'});
        }
        else {
          this.setState({errors: err.response.data})
        }
      });
  };

  handleClick() {
    const id = this.props.service_id;
    axios.delete(`/myAlfred/api/admin/service/all/${id}`)
      .then(res => {

        alert('Service supprimé avec succès');
        Router.push({pathname: '/dashboard/services/all'});
      })
      .catch(err => {
        console.error(err);
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/login'});
        }
      });


  };


  render() {
    const {classes} = this.props;
    const {service} = this.state;
    const {current_tags} = this.state;
    const {current_equipments} = this.state;
    const {current_category} = this.state;
    const {all_category} = this.state;
    const {all_tags} = this.state;
    const {all_equipments} = this.state;
    const {isChecked} = this.state;

    const categories = all_category.map(e => (
      <MenuItem value={e._id}>{`${e.particular_label}/${e.professional_label}`}</MenuItem>
    ));

    const options = all_equipments.map(equipment => ({
      label: equipment.label,
      value: equipment._id,
    }));

    const optionsTags = all_tags.map(tag => ({
      label: tag.label,
      value: tag._id,
    }));


    return (
      <Layout>
        <Grid container className={classes.loginContainer}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>{service.label}</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="label"
                    value={service.label}
                    onChange={this.onChange}

                  />
                </Grid>
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Catégorie</Typography>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <Select
                      input={<Input name="category" id="genre-label-placeholder"/>}
                      displayEmpty
                      name="category"
                      value={this.state.category}
                      onChange={this.onChange2}
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>...</em>
                      </MenuItem>
                      {categories}
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
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Equipements</Typography>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <Select2
                      value={this.state.selectedOption}
                      onChange={this.handleChangeSelect}
                      options={options}
                      isMulti
                      isSearchable
                      closeMenuOnSelect={false}

                    />
                  </FormControl>
                </Grid>
                <Grid item style={{marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Lieu du service</Typography>
                  <em style={{ color: 'red'}}>{this.state.errors.location}</em><br/>
                  <FormControlLabel
                    control={
                      <Checkbox color="primary"
                                checked={service.location ? service.location.alfred : false}
                                value={service.location ? service.location.alfred : false} name="alfred"
                                onChange={this.onChangeLocation}/>
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>chez l'Alfred</p></React.Fragment>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="primary"
                                checked={service.location ? service.location.client : false}
                                value={service.location ? service.location.client : false} name="client"
                                onChange={this.onChangeLocation}/>
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>chez le client</p></React.Fragment>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="primary"
                                checked={service.location ? service.location.visio : false}
                                value={service.location ? service.location.visio : false} name="visio"
                                onChange={this.onChangeLocation}/>
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>en visioconférence</p></React.Fragment>}
                  />
                  <Typography style={{fontSize: 20}}>Frais possibles</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox color="primary"
                                checked={service.travel_tax ? 'checked' : ''} value={service.travel_tax}
                                name="travel_tax" onChange={this.onTaxChange}/>
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>frais de déplacement</p>
                    </React.Fragment>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="primary"
                                checked={service.pick_tax ? 'checked' : ''} value={service.pick_tax} name="pick_tax"
                                onChange={this.onTaxChange}/>
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>frais de retrait&livraison</p>
                    </React.Fragment>}
                  />
                  <Typography style={{fontSize: 20}}>
                    Service proposé
                  </Typography>
                  <em style={{ color: 'red'}}>{this.state.errors.access}</em><br/>
                  <FormControlLabel
                    control={
                      <Checkbox color="primary"
                                checked={service.particular_access ? 'checked' : ''}
                                name="particular_access" onChange={this.onChangeBool}
                                />
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>aux particuliers</p>
                    </React.Fragment>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="primary"
                                checked={service.professional_access ? 'checked' : ''}
                                name="professional_access" onChange={this.onChangeBool}
                                />
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>aux professionels</p>
                    </React.Fragment>}
                  />
                </Grid>

                <Grid item style={{marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Description</Typography>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="description"
                    value={service.description}
                    onChange={this.onChange}
                    multiline
                    rows={4}

                  />
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
              <Link href={`editPicture?id=${this.props.service_id}`}>
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
