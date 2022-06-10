import CustomButton from '../../../components/CustomButton/CustomButton'
import {withTranslation} from 'react-i18next'
const {clearAuthenticationToken, setAxiosAuthentication} = require('../../../utils/authentication')
import React from 'react'

import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import FormControl from '@material-ui/core/FormControl'
import {snackBarError, snackBarSuccess} from '../../../utils/notifications'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import Router from 'next/router'
import Select from '@material-ui/core/Select'
import Select2 from 'react-select'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'

import DashboardLayout from '../../../hoc/Layout/DashboardLayout'

const styles = () => ({
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
})

class add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      picture: '',
      location: {alfred: false, client: false, visio: false, elearning: false},
      category: '',
      equipments: [],
      description: '',
      majoration: '',
      home: false,
      alfred: false,
      visio: false,
      elearning: false,
      isChecked: false,
      all_category: [],
      all_equipments: [],
      selectedOption: null,
      travel_tax: false,
      pick_tax: false,
      errors: {},
    }
    this.handleChecked = this.handleChecked.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
    this.onChangeLocation = this.onChangeLocation.bind(this)
    this.onTaxChange = this.onTaxChange.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()

    axios.get('/myAlfred/api/admin/category/all')
      .then(response => {
        let category = response.data
        this.setState({all_category: category})
      })
      .catch(error => {
        console.log(error)
      })

    axios.get('/myAlfred/api/admin/equipment/all')
      .then(response => {
        let equipments = response.data
        this.setState({all_equipments: equipments})
      })
      .catch(error => {
        console.log(error)
      })
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onChangeLocation = e => {
    const location = this.state.location
    location[e.target.name] = e.target.checked
    this.setState({location: location})
  }

  handleChange2 = e => {
    this.setState({equipments: e.target.value})
  }

  handleChangeSelect = selectedOption => {
    this.setState({selectedOption})
  }

  onChangeFile(e) {
    this.setState({picture: e.target.files[0]})
  }

  handleChecked() {
    this.setState({isChecked: !this.state.isChecked})
  }

  handleChecked2() {
    this.setState({home: !this.state.home})
  }

  handleChecked3() {
    this.setState({alfred: !this.state.alfred})
  }

  handleChecked4() {
    this.setState({visio: !this.state.visio})
  }

  handleChecked5() {
    this.setState({elearning: !this.state.elearning})
  }

  onTaxChange = e => {
    console.log('onTaxChange')
    this.setState({[e.target.name]: e.target.checked})
  }

  onSubmit = e => {
    e.preventDefault()
    let arrayEquipments = []
    if (this.state.selectedOption != null) {
      this.state.selectedOption.forEach(c => {
        arrayEquipments.push(c.value)
      })
    }

    const formData = new FormData()
    formData.append('label', this.state.label)
    formData.append('picture', this.state.picture)
    formData.append('category', this.state.category)
    formData.append('equipments', JSON.stringify(arrayEquipments))
    formData.append('description', this.state.description)
    formData.append('majoration', this.state.majoration)
    formData.append('home', this.state.home)
    formData.append('alfred', this.state.alfred)
    formData.append('visio', this.state.visio)
    formData.append('elearning', this.state.elearning)
    formData.append('travel_tax', this.state.travel_tax)
    formData.append('pick_tax', this.state.pick_tax)

    for (let [k, v] of Object.entries(this.state.location)) {
      formData.append(`location.${k}`, v)
    }

    axios
      .post('/myAlfred/api/admin/service/all', formData)
      .then(res => {
        snackBarSuccess('Service ajouté')
        Router.push(`/dashboard/services/view?id=${res.data._id}`)
      })
      .catch(err => {
        snackBarError(JSON.stringify(err.response.data, null, 2))
        this.setState({errors: err.response.data})
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/login'})
        }
      })

  }

  render() {
    const {classes, t} = this.props
    const {all_category, all_equipments, errors} = this.state

    const categories = all_category.map(e => (

      <MenuItem value={e._id}>{e.label}</MenuItem>

    ))
    const {isChecked} = this.state

    const options = all_equipments.map(equipment => ({
      label: equipment.label,
      value: equipment._id,
    }))

    return (
      <DashboardLayout>
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
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>{`Chez l'${t('DASHBOARD.alfred')}`}</p></React.Fragment>}
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
                  <FormControlLabel
                    control={
                      <Checkbox color="primary" icon={<CircleUnchecked/>} checkedIcon={<RadioButtonCheckedIcon/>}
                        checked={this.state.location.elearning} value={this.state.location.elearning} name="elearning"
                        onChange={this.onChangeLocation}/>
                    }
                    label={<React.Fragment><p style={{fontFamily: 'Helvetica'}}>En e-learning</p></React.Fragment>}
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
                    label={t('DASHBOARD.alfred')}
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
                        checked={this.state.elearning}
                        onChange={() => this.handleChecked5()}
                        value={this.state.elearning}
                        color="primary"
                        name={'elearning'}
                      />
                    }
                    label="E-learning"
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
                  <CustomButton type="submit" variant="contained" color="primary" style={{width: '100%'}}>
                    Ajouter
                  </CustomButton>
                </Grid>
              </form>
            </Grid>
          </Card>
        </Grid>
      </DashboardLayout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(add))
