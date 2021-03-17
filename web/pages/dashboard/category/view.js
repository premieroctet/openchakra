const {clearAuthenticationToken}=require('../../../utils/authentication')
const {setAxiosAuthentication}=require('../../../utils/authentication')
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from 'next/router';
import Select2 from 'react-select';
import DocumentEditor from '../../../components/DocumentEditor/DocumentEditor';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const {snackBarSuccess, snackBarError} = require('../../../utils/notifications');

const styles = {
  loginContainer: {
    alignItems: 'center',
    height: '100vh',
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

class view extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      category: {particular_label: '', professional_label: ''},
      label: '',
      tags: [],
      description: '',
      all_tags: [],
      current_tags: [],
      selectedTags: null,
      particular_id: null,
      particular_file: null,
      particular_ext: null,
      professional_id: null,
      professional_file: null,
      professional_ext: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.onParticularImageChange=this.onParticularImageChange.bind(this)
    this.onProfessionalImageChange=this.onProfessionalImageChange.bind(this)
  }

  static getInitialProps({query: {id}}) {
    return {category_id: id};

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    const id = this.props.category_id;
    this.setState({
      particular_id: null,
      particular_file: null,
      particular_ext: null,
      professional_id: null,
      professional_file: null,
      professional_ext: null,
    })

    setAxiosAuthentication()
    axios.get(`/myAlfred/api/admin/category/all/${id}`)
      .then(response => {
        let category = response.data;
        this.setState({category: category, current_tags: category.tags});
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

    axios.get('/myAlfred/api/admin/tags/all')
      .then((response) => {
        let tags = response.data;
        this.setState({all_tags: tags});
      }).catch((error) => {
      console.log(error);
    });

  }

  onChange = e => {
    const state = this.state.category;
    state[e.target.name] = e.target.value;
    this.setState({category: state});
  };

  onChangeBool = event => {
    const {name, checked}=event.target
    const state = this.state.category
    state[name]=checked
    this.setState({category: state});
  }

  handleChangeTags = selectedTags => {
    this.setState({selectedTags});

  };

  onParticularImageChange = e => {
    this.setState({
      particular_id: e.target.files[0],
      particular_file: URL.createObjectURL(e.target.files[0]),
      particular_ext: e.target.files[0].name.split('.').pop()
    })
  }

  onProfessionalImageChange = e => {
    this.setState({
      professional_id : e.target.files[0],
      professional_file: URL.createObjectURL(e.target.files[0]),
      professional_ext: e.target.files[0].name.split('.').pop()
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const {description, particular_label, professional_label} = this.state.category;
    const {category, particular_id, professional_id} = this.state

    if (!category.particular_label) {
      snackBarError('Il faut au moins un label particuliers')
      return
    }

    if (!category.particular_picture && !particular_id) {
      snackBarError('Il faut au moins un illustration particuliers')
      return
    }

    let arrayTags = [];
    if (this.state.selectedTags != null) {
      this.state.selectedTags.forEach(w => {
        arrayTags.push(w.value);
      });
    }

    const tags = arrayTags;
    const id = this.props.category_id;
    const data={
      'particular_label': particular_label,
      'professional_label': professional_label,
      'description': description,
      'tags': tags,
    }

    axios.put(`/myAlfred/api/admin/category/all/${id || ''}`, data)
      .then(res => {
        const newCategory = res.data
        snackBarSuccess(`Catégorie ${id ? 'modifiée' : 'ajoutée' } avec succès`);
        if (particular_id || professional_id) {
          const formData = new FormData();
          if (particular_id) {
            formData.append('particular_picture', particular_id)
          }
          if (professional_id) {
            formData.append('professional_picture', professional_id)
          }
          axios.put(`/myAlfred/api/admin/category/editPicture/${newCategory._id}`, formData)
            .then (res => {
              snackBarSuccess('Illustrations mises à jour');
              Router.push(`/dashboard/category/view?id=${newCategory._id}`)
            })
        }
        else {
          Router.push(`/dashboard/category/view?id=${newCategory._id}`)
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleClick() {
    const id = this.props.category_id;
    axios.delete(`/myAlfred/api/admin/category/all/${id}`)
      .then(res => {
        alert('Categorie supprimée avec succès');
        Router.push({pathname: '/dashboard/category/all'});
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const {classes} = this.props;
    const {category, all_tags, current_tags} = this.state;
    const optionsTags = all_tags.map(tag => ({
      label: tag.label,
      value: tag._id,
    }));

    return (
      <Layout>
        <Grid container className={classes.loginContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                <Typography style={{fontSize: 30}}>{category.label}</Typography>
              </Grid>
              <form onSubmit={this.onSubmit}>
                <Grid item>
                  <Typography style={{fontSize: 20}}>Label particuliers</Typography>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="particular_label"
                    value={category.particular_label}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item>
                  <Typography style={{fontSize: 20}}>Label pro</Typography>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    name="professional_label"
                    value={category.professional_label}
                    onChange={this.onChange}
                  />
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
                <Grid item style={{marginTop: 20}}>
                  <Typography style={{fontSize: 20}}>Description</Typography>
                  <TextField
                    id="standard-with-placeholder"
                    margin="normal"
                    style={{width: '100%'}}
                    type="text"
                    multiline
                    rows="1"
                    name="description"
                    value={category.description}
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography style={{fontSize: 20}}>Illustration particulier</Typography>
                  <DocumentEditor
                    key={'particular'}
                    ext={this.state.ext}
                    ext_upload={this.state.particular_ext}
                    db_document={category.particular_picture}
                    uploaded_file={this.state.particular_file}
                    onChange={this.onParticularImageChange}
                    title={'Illu. particulier'}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <Typography style={{fontSize: 20}}>Illustration professionel</Typography>
                  <DocumentEditor
                    key={'professional'}
                    ext={this.state.ext}
                    ext_upload={this.state.professional_ext}
                    db_document={category.professional_picture}
                    uploaded_file={this.state.professional_file}
                    onChange={this.onProfessionalImageChange}
                    title={'Illu. pro'}
                  />
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                  <Button type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                    Enregistrer
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


export default withStyles(styles)(view);
