import CustomButton from '../../components/CustomButton/CustomButton'
import {Helmet} from 'react-helmet'
import {withTranslation} from 'react-i18next'
import AlgoliaPlaces from 'algolia-places-react'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import Router from 'next/router'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles'
import {EDIT_PROFIL} from '../../utils/i18n'
import {
  COMPANY_ACTIVITY,
  COMPANY_SIZE,
  MAX_DESCRIPTION_LENGTH,
} from '../../utils/consts'
import BasePage from '../basePage'
import DateField from '../../components/DateField/DateField'
import LayoutAccount from '../../hoc/Layout/LayoutAccount'
import LayoutMobile from '../../hoc/Layout/LayoutMobile'
import styles from '../../static/css/pages/profile/editProfileCompany/editProfileCompany'
import ReactHtmlParser from 'react-html-parser'

const moment=require('moment')

const {isB2BAdmin} = require('../../utils/context')
const {setAxiosAuthentication} = require('../../utils/authentication')
const {snackBarSuccess, snackBarError} = require('../../utils/notifications')

moment.locale('fr')

class editProfileCompany extends BasePage {
  constructor(props) {
    super(props)
    this.state={
      user: {},
      activityArea: '',
      sizeCompany: '',
      descriptionCompany: '',
      companyName: '',
      siret: '',
      tva: '',
      vat_subject: false,
      position: '',
      email: '',
      firstName: '',
      name: '',
      company: {},
      billing_address: {},
      birthday: null,
    }

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    this.loadUser()
  }

  loadUser = () => {
    setAxiosAuthentication()
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({
          user: user,
          email: user.email,
          firstName: user.firstname,
          name: user.name,
          position: user.position,
          birthday: user.birthday ? moment(user.birthday).format('YYYY-MM-DD') : null,
        })
        if(!isB2BAdmin(user)) {
          Router.push({pathname: '/'})
        }
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          Router.push({pathname: '/'})
        }
      },
      )

    axios.get('/myAlfred/api/companies/current').then(res => {
      let company = res.data
      this.setState({
        company: company,
        companyName: company.name,
        activityArea: company.activity,
        sizeCompany: company.size,
        siret: company.siret,
        tva: company.vat_number,
        descriptionCompany: company.description,
        billing_address: company.billing_address,
        vat_subject: company.vat_subject,
        website: company.website,

      })
    }).catch(err => {
      console.error(err)
    })
  }

  handleChange = event => {
    let {name, value} = event.target
    console.log(`onCHange:${name}=>${value}`)
    if (name === 'siret') {
      if(value.match(/^[0-9]*$/)) {
        value = value.replace(/ /g, '')
        this.setState({[name]: value})
      }
    }
    else if(name === 'vat_subject') {
      this.setState({[name]: !this.state.vat_subject})
    }
    else{
      this.setState({[name]: value})
    }
  }

  onBillingAdressChange = ({suggestion}) => {
    const newAddress = suggestion ?
      {
        city: suggestion.city,
        address: suggestion.name,
        zip_code: suggestion.postcode,
        country: suggestion.country,
        gps: {
          lat: suggestion.latlng.lat,
          lng: suggestion.latlng.lng,
        },
      }
      :
      null
    this.setState({billing_address: newAddress})
  }

  onSubmitProfilCompany = () => {

    axios.put('/myAlfred/api/companies/profile/editProfile', {
      activity: this.state.activityArea,
      size: this.state.sizeCompany,
      description: this.state.descriptionCompany,
      name: this.state.companyName,
      siret: this.state.siret,
      vat_number: this.state.vat_subject ? this.state.tva : '',
      billing_address: this.state.billing_address,
      vat_subject: this.state.vat_subject,
      website: this.state.website,
    })
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('EDIT_PROFIL.snackbar_profil_update')))
        this.loadUser()
      })
      .catch(err => {
        snackBarError(err.response.data)
      })
  }

  onSubmitAbout = () => {

    let postData = {
      position: this.state.position,
      email: this.state.email,
      name: this.state.name,
      firstname: this.state.firstName,
      birthday: this.state.birthday,
    }

    if (this.is_legal_representative()) {
      postData.birthday=this.state.birthday
    }

    axios.put('/myAlfred/api/users/profile/editProProfile', postData)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('EDIT_PROFIL.snackbar_profil_update')))
        this.loadUser()
      })
      .catch(err => {
        console.error(err)
        if (err.response) {
          snackBarError(err.response.data)
        }
      })
  }

  sendEmail = () => {
    axios.get('/myAlfred/api/users/sendMailVerification')
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('EDIT_PROFIL.snackbar_send_email')))
      })
      .catch(err => {
        snackBarError(ReactHtmlParser(this.props.t('EDIT_PROFIL.snackbar_error_email')) + err)
      })
  }

  content = classes => {
    const {activityArea, sizeCompany, descriptionCompany, companyName, siret, tva, vat_subject, position, email, firstName, name, user, billing_address, birthday} = this.state

    const position_width = this.is_legal_representative() ? 6 : 12
    return(
      <Grid>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>{ReactHtmlParser(this.props.t('EDIT_PROFIL.information'))}</h2>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <h2 style={{whiteSpace: 'nowrap'}}>{ReactHtmlParser(this.props.t('EDIT_PROFIL.company_profil'))}</h2>
        </Grid>
        <Grid container spacing={3} style={{marginTop: '5vh'}}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              value={companyName}
              name={'companyName'}
              placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_company'))}
              variant={'outlined'}
              label={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_company'))}
              classes={{root: classes.textField}}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12} className={classes.containerAlgolia}>
            <AlgoliaPlaces
              key={moment()}
              placeholder={billing_address ? `${billing_address.address}, ${billing_address.zip_code}, ${billing_address.country}` : ReactHtmlParser(this.props.t('EDIT_PROFIL.invoice_company'))}
              options={{
                appId: 'plKATRG826CP',
                apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                language: 'fr',
                countries: ['fr'],
                type: 'address',
              }}
              className={classes.editProfilCompanyAlgoliaPlace}
              onChange={this.onBillingAdressChange}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              value={siret}
              name={'siret'}
              placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.siret_placeholder'))}
              variant={'outlined'}
              label={ReactHtmlParser(this.props.t('EDIT_PROFIL.siret_placeholder'))}
              classes={{root: classes.textField}}
              onChange={this.handleChange}

            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              value={tva}
              name={'tva'}
              placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.company_tva'))}
              variant={'outlined'}
              label={ReactHtmlParser(this.props.t('EDIT_PROFIL.company_tva'))}
              classes={{root: classes.textField}}
              onChange={this.handleChange}
              disabled={!vat_subject}
            />
            <Grid style={{display: 'flex', flexDirection: 'row-reverse'}}>
              <FormHelperText>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={vat_subject}
                      name='vat_subject'
                      onChange={this.handleChange}
                      color='primary'
                    />
                  }
                  label={ReactHtmlParser(this.props.t('EDIT_PROFIL.company_assujeti'))}
                />
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='demo-simple-select-outlined-label'>{ReactHtmlParser(this.props.t('EDIT_PROFIL.size_company'))}</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={sizeCompany}
                onChange={this.handleChange}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.size_company'))}
                name={'sizeCompany'}
                placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.size_company'))}
              >
                {
                  Object.keys(COMPANY_SIZE).map(res => (
                    <MenuItem key={res} value={res}>{COMPANY_SIZE[res]}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='demo-simple-select-outlined-label'>{ReactHtmlParser(this.props.t('EDIT_PROFIL.activity_sector'))}</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={activityArea}
                onChange={this.handleChange}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.activity_sector'))}
                name={'activityArea'}
                placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.activity_sector'))}
              >
                {
                  Object.keys(COMPANY_ACTIVITY).map(res => (
                    <MenuItem key={res} value={res}>{COMPANY_ACTIVITY[res]}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextField
              value={descriptionCompany}
              multiline
              rows={5}
              variant={'outlined'}
              name={'descriptionCompany'}
              placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.about_company'))}
              label={ReactHtmlParser(this.props.t('EDIT_PROFIL.about_company'))}
              classes={{root: classes.textField}}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
            style={{display: 'flex', alignItems: 'flex-end', width: '100%', flexDirection: 'column'}}>
            <Typography>{ReactHtmlParser(this.props.t('EDIT_PROFIL.char_max', {maxchars: MAX_DESCRIPTION_LENGTH}))}</Typography>
          </Grid>
        </Grid>
        <Grid style={{marginBottom: '12vh'}}>
          <Grid style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5vh'}}>
            <CustomButton
              onClick={this.onSubmitProfilCompany}
              variant='contained'
              color='primary'
              classes={{root: classes.button}}
            >
              {ReactHtmlParser(this.props.t('EDIT_PROFIL.save_button'))}
            </CustomButton>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h2 style={{whiteSpace: 'nowrap'}}>
              {ReactHtmlParser(this.props.t('EDIT_PROFIL.about_you')) + this.is_legal_representative() ? ReactHtmlParser(this.props.t('EDIT_PROFIL.admin')) : null }
            </h2>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '5vh'}}>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                value={name}
                name={'name'}
                placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.name_company'))}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.name_company'))}
                classes={{root: classes.textField}}
                onChange={this.handleChange}

              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                value={firstName}
                name={'firstName'}
                placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.firstname_company'))}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.firstname_company'))}
                classes={{root: classes.textField}}
                onChange={this.handleChange}

              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                value={email}
                name={'email'}
                placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.email_company'))}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.email_company'))}
                classes={{root: classes.textField}}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: email === user.email && user.is_confirmed === true ? <CheckCircleOutlineIcon /> : null,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6} style={{display: 'flex'}}>
              <CustomButton
                variant='contained'
                color={'primary'}
                onClick={() => (user.is_confirmed ? this.onSubmitAbout() : this.sendEmail())}
                disabled={user.email ? !!(email === user.email && user.is_confirmed) : true}
                classes={{root: classes.buttonCheckPhone}}
              >
                {email === user.email && user.is_confirmed === true ? ReactHtmlParser(this.props.t('EDIT_PROFIL.email_checked')) : email !== user.email ? ReactHtmlParser(this.props.t('EDIT_PROFIL.new_email')) : ReactHtmlParser(this.props.t('EDIT_PROFIL.check_new_email'))}
              </CustomButton>
            </Grid>
            <Grid item xs={position_width} lg={position_width} md={position_width} sm={position_width} xl={position_width}>
              <TextField
                value={position}
                name={'position'}
                placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.fonction_company'))}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.fonction_company'))}
                classes={{root: classes.textField}}
                onChange={this.handleChange}
              />
            </Grid>
            { this.is_legal_representative() ?
              <Grid item xl={6} lg={6} xs={6} sm={6} md={6}>
                <DateField
                  classes={{root: classes.textFieldDatePicker}}
                  variant='outlined'
                  label={ReactHtmlParser(this.props.t('EDIT_PROFIL.birthdate_admin'))}
                  name={'birthday'}
                  value={birthday}
                  onChange={this.handleChange}
                />
              </Grid>
              :
              null
            }
          </Grid>
        </Grid>
        <Grid style={{marginBottom: '12vh'}}>
          <Grid style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5vh'}}>
            <CustomButton
              onClick={this.onSubmitAbout}
              variant='contained'
              color='primary'
              classes={{root: classes.button}}
            >
              {ReactHtmlParser(this.props.t('EDIT_PROFIL.save_button'))}
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  is_legal_representative = () => {
    const {user, company}=this.state
    if (!user || !company) {
      return false
    }

    return company.representative == user._id
  }

  render() {
    const {classes} = this.props
    const {user} = this.state
    const index=this.getURLProps().indexAccount

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Profil - Modifier mon profil - My Alfred </title>
          <meta property='description'
            content='Plateforme d’échange de services entre particuliers. Services rémunérés à des prix justes ! Profitez des talents de nos Alfred et trouvez un Alfred bricoleur, petsitter, pâtissier, décorateur, près de chez vous dans toute la france ! Des milliers de services proposés, trouvez le vôtre !'/>
        </Helmet>
        <Grid className={classes.layoutAccountContainer}>
          <LayoutAccount index={index} contextUser={user}>
            {this.content(classes)}
          </LayoutAccount>
        </Grid>
        <Grid className={classes.layoutMobileContainer}>
          <LayoutMobile currentIndex={4}>
            {this.content(classes)}
          </LayoutMobile>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(editProfileCompany))
