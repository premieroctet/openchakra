import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {toast} from 'react-toastify';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select2 from 'react-select';
import cookie from 'react-cookies';


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
      picture: '',
      location: {alfred: false, client: false, visio: false},
      category: '',
      tags: [],
      equipments: [],
      description: '',
      majoration: '',
      home: false,
      alfred: false,
      visio: false,
      isChecked: false,
      all_category: [],
      all_tags: [],
      all_equipments: [],
      selectedOption: null,
      selectedTags: null,
      travel_tax: false,
      pick_tax: false,
      errors: {},
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onTaxChange = this.onTaxChange.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');

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
    this.setState({[e.target.name]: e.target.value});
  };

  onChangeLocation = e => {
    const location = this.state.location;
    location[e.target.name] = e.target.checked;
    this.setState({location: location});
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

  onChangeFile(e) {
    this.setState({picture: e.target.files[0]});
  }

  handleChecked() {
    this.setState({isChecked: !this.state.isChecked});
  }

  handleChecked2() {
    this.setState({home: !this.state.home});
  }

  handleChecked3() {
    this.setState({alfred: !this.state.alfred});
  }

  handleChecked4() {
    this.setState({visio: !this.state.visio});
  }

  onTaxChange = e => {
    console.log('onTaxChange');
    this.setState({[e.target.name]: e.target.checked});
  };

  onSubmit = e => {
    e.preventDefault();
    let arrayEquipments = [];
    let arrayTags = [];
    if (this.state.selectedOption != null) {
      this.state.selectedOption.forEach(c => {

        arrayEquipments.push(c.value);

      });
    }

    if (this.state.selectedTags != null) {
      this.state.selectedTags.forEach(w => {

        arrayTags.push(w.value);

      });
    }

    console.log('Picture:' + JSON.stringify(this.state.picture));
    const formData = new FormData();
    formData.append('label', this.state.label);
    formData.append('picture', this.state.picture);
    formData.append('category', this.state.category);
    formData.append('tags', JSON.stringify(arrayTags));
    formData.append('equipments', JSON.stringify(arrayEquipments));
    formData.append('description', this.state.description);
    formData.append('majoration', this.state.majoration);
    formData.append('home', this.state.home);
    formData.append('alfred', this.state.alfred);
    formData.append('visio', this.state.visio);
    formData.append('travel_tax', this.state.travel_tax);
    formData.append('pick_tax', this.state.pick_tax);

    for (var [k, v] of Object.entries(this.state.location)) {
      formData.append('location.' + k, v);
    }

    console.log('POSTing');
    axios
      .post('/myAlfred/api/admin/service/all', formData)
      .then(res => {
        alert('Service ajouté');
        Router.push({pathname: '/dashboard/services/all'});
      })
      .catch(err => {
          toast.error(JSON.stringify(err.response.data, null, 2));
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
    const {all_category} = this.state;
    const {all_tags} = this.state;
    const {all_equipments} = this.state;
    const {errors} = this.state;

    const categories = all_category.map(e => (

      <MenuItem value={e._id}>{e.label}</MenuItem>

    ));
    const {isChecked} = this.state;

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
        <Grid container className={classes.signupContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>Ajouter un service</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    label="Label"
                    placeholder="Label"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="label"
                    value={this.state.label}
                    onChange={this.onChange}
                    error={errors.label}
                  />
                  <em>{errors.label}</em>
                </Grid>
                <Grid item style={{width: '100%'}}>
                  <FormControl className={classes.formControl} style={{width: '100%'}}>
                    <InputLabel shrink htmlFor="genre-label-placeholder">
                      Catégorie
                    </InputLabel>
                    <Select
                      input={<Input name="category" id="genre-label-placeholder"/>}
                      displayEmpty
                      name="category"
                      value={this.state.category}
                      onChange={this.onChange}
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        <em>...</em>
                      </MenuItem>
                      {categories}
                    </Select>
                    <FormHelperText>Sélectionner une catégorie</FormHelperText>
                  </FormControl>
                  <em>{errors.category}</em>
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
                  <em>{errors.tags}</em>
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
                  <em>{errors.equipments}</em>
                </Grid>
                <Grid item style={{width: '100%', marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Image du service</Typography>
                  <input type="file" name="picture" onChange={this.onChangeFile} accept="image/*"/>
                </Grid>
                <Grid item style={{marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Options possibles</Typography>
                  <div><em style={{color: 'red'}}>{errors.location}</em></div>
                  <FormControlLabel
                    control={
                      <Checkbox color="primary" icon={<CircleUnchecked/>} checkedIcon={<RadioButtonCheckedIcon/>}
                                checked={this.state.location.alfred} value={this.state.location.alfred} name="alfred"
                                onChange={this.onChangeLocation}/>
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>Chez l'Alfred</p></React.Fragment>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="primary" icon={<CircleUnchecked/>} checkedIcon={<RadioButtonCheckedIcon/>}
                                checked={this.state.location.client} value={this.state.location.client} name="client"
                                onChange={this.onChangeLocation}/>
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>Chez le client</p></React.Fragment>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="primary" icon={<CircleUnchecked/>} checkedIcon={<RadioButtonCheckedIcon/>}
                                checked={this.state.location.visio} value={this.state.location.visio} name="visio"
                                onChange={this.onChangeLocation}/>
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>En visioconférence</p></React.Fragment>}
                  />
                  <Typography style={{fontSize: 20}}>Frais possibles</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox color="primary" icon={<CircleUnchecked/>} checkedIcon={<RadioButtonCheckedIcon/>}
                                checked={this.state.travel_tax ? 'checked' : ''} value={this.state.travel_tax}
                                name="travel_tax" onChange={this.onTaxChange}/>
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>Frais de déplacement</p>
                    </React.Fragment>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="primary" icon={<CircleUnchecked/>} checkedIcon={<RadioButtonCheckedIcon/>}
                                checked={this.state.pick_tax ? 'checked' : ''} value={this.state.pick_tax}
                                name="pick_tax" onChange={this.onTaxChange}/>
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>Frais de retrait&livraison</p>
                    </React.Fragment>}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="standard-with-placeholder"
                    label="Description"
                    placeholder="Description"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                  />
                  <em>{errors.description}</em>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.home}
                        onChange={() => this.handleChecked2()}
                        value={this.state.home}
                        color="primary"
                        name={'home'}
                      />
                    }
                    label="Home"
                  />

                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.alfred}
                        onChange={() => this.handleChecked3()}
                        value={this.state.alfred}
                        color="primary"
                        name={'alfred'}
                      />
                    }
                    label="Alfred"
                  />

                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.visio}
                        onChange={() => this.handleChecked4()}
                        value={this.state.visio}
                        color="primary"
                        name={'visio'}
                      />
                    }
                    label="Visio"
                  />

                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.isChecked}
                        onChange={this.handleChecked}
                        value={this.state.isChecked}
                        color="primary"
                        name={'isChecked'}
                      />
                    }
                    label="Majoration ?"
                  />

                </Grid>
                {isChecked ?
                  <Grid item>
                    <TextField
                      id="standard-with-placeholder"
                      label="Majoration"
                      placeholder="Majoration"
                      margin="normal"
                      style={{width: '100%'}}
                      type="text"
                      name="majoration"
                      value={this.state.majoration}
                      onChange={this.onChange}
                    />
                  </Grid>
                  : ''}
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
