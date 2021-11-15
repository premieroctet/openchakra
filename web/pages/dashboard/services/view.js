import CustomButton from '../../../components/CustomButton/CustomButton'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import {Link} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import Router from 'next/router'
import Select from '@material-ui/core/Select'
import Select2 from 'react-select'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'

import {snackBarSuccess} from '../../../utils/notifications'
import BasePage from '../../basePage'
import DashboardLayout from '../../../hoc/Layout/DashboardLayout'

const {clearAuthenticationToken, setAxiosAuthentication} = require('../../../utils/authentication')

const styles = theme => ({
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
  cancelButton: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
  },
})

class View extends BasePage {

  constructor(props) {
    super(props)

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
      errors: {},
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
    this.handleChangeTags = this.handleChangeTags.bind(this)
    this.onChangeLocation = this.onChangeLocation.bind(this)
    this.onTaxChange = this.onTaxChange.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    const id = this.getURLProps().id
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/admin/service/all/${id}`)
      .then(response => {
        let service = response.data
        this.setState({
          service: service,
          current_tags: service.tags,
          current_equipments: service.equipments,
          current_category: service.category,
          category: service.category._id,
          location: service.location,
        })

        this.setState({
          selectedOption: this.state.current_equipments.map(a => ({
            label: a.label,
            value: a._id,
          })),
        })

        this.setState({
          selectedTags: this.state.current_tags.map(b => ({
            label: b.label,
            value: b._id,
          })),
        })


      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })

    axios.get('/myAlfred/api/admin/category/all')
      .then(response => {
        let category = response.data
        this.setState({all_category: category})
      }).catch(error => {
        console.error(error)
      })

    axios.get('/myAlfred/api/admin/tags/all')
      .then(response => {
        let tags = response.data
        this.setState({all_tags: tags})
      }).catch(error => {
        console.error(error)
      })

    axios.get('/myAlfred/api/admin/equipment/all')
      .then(response => {
        let equipments = response.data
        this.setState({all_equipments: equipments})
      }).catch(error => {
        console.log(error)
      })

  }

  onChange = e => {
    const state = this.state.service
    state[e.target.name] = e.target.value
    this.setState({service: state})
  };

  onChangeBool = e => {
    const state = this.state.service
    const {name, checked} = e.target
    state[name]=checked
    this.setState({service: state})
  };

  onChangeLocation = e => {
    const service = this.state.service
    service.location[e.target.name] = e.target.checked
    this.setState({service: service})
  };

  onChange2 = e => {
    this.setState({category: e.target.value})
  };

  handleChange = e => {
    this.setState({tags: e.target.value})
  };

  handleChange2 = e => {
    this.setState({equipments: e.target.value})
  };

  handleChangeSelect = selectedOption => {
    this.setState({selectedOption})

  };

  handleChangeTags = selectedTags => {
    this.setState({selectedTags})
  };

  onTaxChange = e => {
    let service = this.state.service
    service[e.target.name] = e.target.checked
    this.setState({service: service})
  };


  onSubmit = e => {
    e.preventDefault()
    let arrayEquipments = []
    if (this.state.selectedOption != null) {
      this.state.selectedOption.forEach(c => {
        arrayEquipments.push(c.value)
      })
    }

    let tags = []
    if (this.state.selectedTags != null) {
      this.state.selectedTags.forEach(w => {
        tags.push(w.value)
      })
    }

    const category = this.state.category
    const equipments = arrayEquipments
    const id = this.getURLProps().id
    const service = this.state.service
    const {label, description, location} = service
    const {travel_tax, pick_tax, professional_access, particular_access} = service

    axios.put(`/myAlfred/api/admin/service/all/${id}`,
      {label, description, tags, category, equipments, location, travel_tax, pick_tax,
        professional_access, particular_access})
      .then(() => {
        snackBarSuccess('Service modifié avec succès')
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
        else {
          this.setState({errors: err.response.data})
        }
      })
  };

  handleClick() {
    const id = this.getURLProps().id
    axios.delete(`/myAlfred/api/admin/service/all/${id}`)
      .then(() => {
        snackBarSuccess('Service supprimé avec succès')
        Router.push({pathname: '/dashboard/services/all'})
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })
  }

  render() {
    const {classes, t} = this.props
    const {service, all_category, all_tags, all_equipments} = this.state

    const categories = all_category.map(e => (
      <MenuItem value={e._id}>{`${e.particular_label}/${e.professional_label}`}</MenuItem>
    ))

    const options = all_equipments.map(equipment => ({
      label: equipment.label,
      value: equipment._id,
    }))

    const optionsTags = all_tags.map(tag => ({
      label: tag.label,
      value: tag._id,
    }))


    return (
      <DashboardLayout>
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
                <em className={classes.cancelButton}>{this.state.errors.location}</em><br/>
                <FormControlLabel
                  control={
                    <Checkbox color="primary"
                      checked={service.location ? service.location.alfred : false}
                      value={service.location ? service.location.alfred : false} name="alfred"
                      onChange={this.onChangeLocation}/>
                  }
                  label={<React.Fragment><p>{`chez l'${t('DASHBOARD.alfred')}`}</p></React.Fragment>}
                />
                <FormControlLabel
                  control={
                    <Checkbox color="primary"
                      checked={service.location ? service.location.client : false}
                      value={service.location ? service.location.client : false} name="client"
                      onChange={this.onChangeLocation}/>
                  }
                  label={<React.Fragment><p>chez le client</p></React.Fragment>}
                />
                <FormControlLabel
                  control={
                    <Checkbox color="primary"
                      checked={service.location ? service.location.visio : false}
                      value={service.location ? service.location.visio : false} name="visio"
                      onChange={this.onChangeLocation}/>
                  }
                  label={<React.Fragment><p>en visioconférence</p></React.Fragment>}
                />
                <Typography style={{fontSize: 20}}>Frais possibles</Typography>
                <FormControlLabel
                  control={
                    <Checkbox color="primary"
                      checked={service.travel_tax ? 'checked' : ''} value={service.travel_tax}
                      name="travel_tax" onChange={this.onTaxChange}/>
                  }
                  label={<React.Fragment><p>frais de déplacement</p>
                  </React.Fragment>}
                />
                <FormControlLabel
                  control={
                    <Checkbox color="primary"
                      checked={service.pick_tax ? 'checked' : ''} value={service.pick_tax} name="pick_tax"
                      onChange={this.onTaxChange}/>
                  }
                  label={<React.Fragment><p>frais de retrait&livraison</p>
                  </React.Fragment>}
                />
                <Typography style={{fontSize: 20}}>
                    Service proposé
                </Typography>
                <em style={{color: 'red'}}>{this.state.errors.access}</em><br/>
                <FormControlLabel
                  control={
                    <Checkbox color="primary"
                      checked={service.particular_access ? 'checked' : ''}
                      name="particular_access" onChange={this.onChangeBool}
                    />
                  }
                  label={<React.Fragment><p>aux particuliers</p>
                  </React.Fragment>}
                />
                <FormControlLabel
                  control={
                    <Checkbox color="primary"
                      checked={service.professional_access ? 'checked' : ''}
                      name="professional_access" onChange={this.onChangeBool}
                    />
                  }
                  label={<React.Fragment><p>aux professionels</p>
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
                <CustomButton type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                    Modifier
                </CustomButton>
                <CustomButton type="button" variant="contained" classes={{root: classes.cancelButton}} style={{width: '100%'}}
                  onClick={this.handleClick}>
                    Supprimer
                </CustomButton>
              </Grid>
            </form>
            <Link href={`editPicture?id=${this.getURLProps().id}`}>
              <CustomButton type="button" variant="contained" color="primary" style={{width: '100%'}}>
                  Modifier la photo
              </CustomButton>
            </Link>
          </Grid>
        </Grid>
      </DashboardLayout>
    )
  }
}


export default withTranslation('custom', {withRef: true})(withStyles(styles)(View))
