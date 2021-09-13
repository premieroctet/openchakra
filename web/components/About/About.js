import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import {TextField} from '@material-ui/core'
import BusinessIcon from '@material-ui/icons/Business'
const {snackBarSuccess, snackBarError} = require('../../utils/notifications')
import LanguageIcon from '@material-ui/icons/Language'
const {setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../static/css/components/About/About'
import WorkOutlineIcon from '@material-ui/icons/WorkOutline'
import ListAlfredConditions from '../ListAlfredConditions/ListAlfredConditions'
import RoomIcon from '@material-ui/icons/Room'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'
import UserAvatar from '../Avatar/UserAvatar'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Topic from '../../hoc/Topic/Topic'
import AlgoliaPlaces from 'algolia-places-react'
import MultipleSelect from 'react-select'
import {COMPANY_ACTIVITY, COMPANY_SIZE, LANGUAGES} from '../../utils/consts'
import CreateIcon from '@material-ui/icons/Create'
import {isEditableUser} from '../../utils/context'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import {PROFIL, ABOUT} from '../../utils/i18n'
const CompanyComponent = require('../../hoc/b2b/CompanyComponent')
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const {frenchFormat} = require('../../utils/text')
const moment = require('moment')
moment.locale('fr')

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props
  return (
    <MuiDialogTitle disableTypography {...other} className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

class About extends CompanyComponent {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      newAddress: null,
      userLanguages: [],
      newLanguages: null,
      open: false,
      showEdition: false,
      languages: {},
      billing_address: {},
      enabledEdition: true,
      activityArea: '',
      sizeCompany: '',
      website: '',
      company: null,

    }
  }

  componentDidMount = () => {
    this.loadUser()
  };

  loadUser = () => {
    this.setState({showEdition: false})
    setAxiosAuthentication()

    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then(res => {
        const user = res.data
        if (user.company) {
          axios.get(`/myAlfred/api/companies/companies/${user.company}`)
            .then(res => {
              const company = res.data
              this.setState({
                user: user,
                userLanguages: user.languages.map(l => ({value: l, label: l})),
                company: company,
                website: company.website,
                activityArea: company.activity,
                sizeCompany: company.size,
                billing_address: company.billing_address,
                companyName: company.name,
                description: company.description,
                siret: company.siret,
                vat_number: company.vat_number,
                vat_subject: company.vat_subject,
              })
            })
            .catch(err => console.error(err))
        }
        else {
          this.setState({
            user: user,
            userLanguages: user.languages.map(l => ({value: l, label: l})),
            billing_address: user.billing_address,
          })
        }
      })
      .catch(err => console.error(err))
  };

  onAddressChanged = result => {
    const newAddress = result ?
      {
        city: result.suggestion.city,
        address: result.suggestion.name,
        zip_code: result.suggestion.postcode,
        country: result.suggestion.country,
        gps: {
          lat: result.suggestion.latlng.lat,
          lng: result.suggestion.latlng.lng,
        },
      }
      :
      null
    this.setState({newAddress: newAddress}, () => this.objectsEqual())
  };

  onLanguagesChanged = languages => {
    this.setState({languages: languages}, () => this.objectsEqual())
  };

  save = () => {
    const {newAddress, languages} = this.state
    setAxiosAuthentication()

    if(this.isModeCompany()) {
      axios.put('/myAlfred/api/companies/profile/editProfile', {
        activity: this.state.activityArea,
        size: this.state.sizeCompany,
        website: this.state.website,
        name: this.state.companyName,
        billing_address: this.state.billing_address,
        description: this.state.description,
        siret: this.state.siret,
        vat_number: this.state.vat_number,
        vat_subject: this.state.vat_subject,
      },
      ).then(() => {
        snackBarSuccess('Profil modifié avec succès')
        this.componentDidMount()
      }).catch(err => {
        snackBarError(err.response.data)
      })
    }
    else{
      axios.put('/myAlfred/api/users/profile/billingAddress', newAddress).then(() => {
        axios.put('/myAlfred/api/users/profile/languages', {languages: languages.map(l => l.value)}).then(() => {
          snackBarSuccess('Profil modifié avec succès')
          setTimeout(this.loadUser, 1000)
        },
        ).catch(err => {
          console.error(err)
        })
      },
      ).catch(err => {
        console.error(err)
      },
      )
    }
  };

  closeEditDialog = () => {
    this.setState({showEdition: false, newLanguages: null, newAddress: null})
  };


  openEdition = () => {
    const {user} = this.state

    this.setState({
      showEdition: true,
      languages: user.languages.map(l => ({value: l, label: l})),
      newAddress: user.billing_address,
    }, () => this.objectsEqual())
  };

  objectsEqual = () => {
    let o1 = this.state.languages
    let o2 = this.state.userLanguages
    let o3 = this.state.newAddress ? this.state.newAddress.gps : null
    let o4 = this.state.billing_address.gps

    if (o1 && o1.length !== 0 && o3 !== null) {
      if (o1.join('') === o2.join('') && o3.lat === o4.lat && o3.lng === o4.lng) {
        this.setState({enabledEdition: true})
      }
      else if (o1.join('') !== o2.join('') || o3.lat !== o4.lat && o3.lng !== o4.lng) {
        this.setState({enabledEdition: false})
      }
      else {
        this.setState({enabledEdition: false})
      }
    }
    else {
      this.setState({enabledEdition: true})
    }
  };

  handleChange = event => {
    let {name, value} = event.target
    this.setState({[name]: value})
  };

  modalEditDialog = classes => {
    const {newAddress, showEdition, languages, enabledEdition, user, activityArea, sizeCompany, website} = this.state
    const address = newAddress || (user ? user.billing_address : null)
    const placeholder = address ? `${address.city}, ${address.country}` : ReactHtmlParser(this.props.t('ABOUT.address_placeholder'))

    return (
      <Dialog
        open={showEdition}
        onClose={this.closeEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paper: classes.dialogPaper}}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.closeEditDialog}
        />
        <DialogContent>
          <Topic
            titleTopic={this.isModeCompany() ? ReactHtmlParser(this.props.t('ABOUT.b2b_title_topic')) : ReactHtmlParser(this.props.t('ABOUT.title_topic'))}
            titleSummary={this.isModeCompany() ? ReactHtmlParser(this.props.t('ABOUT.b2b_titlesummary_topic')) : ReactHtmlParser(this.props.t('ABOUT.titlesummary_topic'))}
            underline={true}/>
          <Grid container spacing={2} style={{width: '100%', margin: 0}}>
            <Grid item container spacing={2} style={{width: '100%', margin: 0}} xl={12} lg={12} sm={12} md={12} xs={12}>
              <Grid item xs={12} lg={12}>
                <h3 style={{
                  fontWeight: 'bold',
                  textTransform: 'initial',
                }}>
                  {this.isModeCompany() ? ReactHtmlParser(this.props.t('ABOUT.website')) : ReactHtmlParser(this.props.t('ABOUT.label_address'))}
                </h3>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                {
                  this.isModeCompany() ?
                    <TextField
                      name={'website'}
                      variant={'outlined'}
                      label={ReactHtmlParser(this.props.t('ABOUT.textfield_website'))}
                      value={website || ''}
                      style={{width: '100%'}}
                      onChange={this.handleChange}
                    />
                    :
                    <AlgoliaPlaces
                      key={moment()}
                      placeholder={placeholder}
                      options={{
                        appId: 'plKATRG826CP',
                        apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                        language: 'fr',
                        countries: ['fr'],
                        type: 'address',

                      }}
                      onChange={this.onAddressChanged}
                      onClear={() => this.onAddressChanged(null)}
                    />
                }
              </Grid>
            </Grid>
            <Grid item container spacing={2} style={{width: '100%', margin: 0}} xl={12} lg={12} sm={12} md={12} xs={12}>
              <Grid item xs={12} lg={12}>
                <h3
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'initial',
                  }}>{this.isModeCompany() ? ReactHtmlParser(this.props.t('ABOUT.size_company')) : ReactHtmlParser(this.props.t('ABOUT.spoken_languages'))}</h3>
              </Grid>
              <Grid item xs={12}>
                {
                  !this.isModeCompany() ?
                    <MultipleSelect
                      key={moment()}
                      value={languages}
                      onChange={this.onLanguagesChanged}
                      options={LANGUAGES}
                      styles={{
                        menu: provided => ({...provided, zIndex: 2}),
                      }}
                      isMulti
                      isSearchable
                      closeMenuOnSelect={false}
                      placeholder={ReactHtmlParser(this.props.t('ABOUT.textfield_languages'))}
                      noOptionsMessage={() => ReactHtmlParser(this.props.t('ABOUT.option_message'))}
                    /> :
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">{ReactHtmlParser(this.props.t('ABOUT.label_size_company'))}</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={sizeCompany}
                        onChange={this.handleChange}
                        label={ReactHtmlParser(this.props.t('ABOUT.textfield_size_company'))}
                        name={'sizeCompany'}
                        placeholder={ReactHtmlParser(this.props.t('ABOUT.textfield_size_company'))}
                      >
                        {
                          Object.keys(COMPANY_SIZE).map((res, index) => (
                            <MenuItem key={index} value={res}>{COMPANY_SIZE[res]}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                }
              </Grid>
            </Grid>
            {
              this.isModeCompany() ?
                <Grid item container spacing={2} style={{width: '100%', margin: 0}} xl={12} lg={12} sm={12} md={12} xs={12}>
                  <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                    <h3
                      style={{
                        fontWeight: 'bold',
                        textTransform: 'initial',
                      }}>{ReactHtmlParser(this.props.t('ABOUT.b2b_activity'))}</h3>
                  </Grid>
                  <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">{ReactHtmlParser(this.props.t('ABOUT.b2b_activity_label'))}</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={activityArea}
                        onChange={this.handleChange}
                        label={ReactHtmlParser(this.props.t('ABOUT.b2b_activity_label'))}
                        name={'activityArea'}
                        placeholder={ReactHtmlParser(this.props.t('ABOUT.b2b_activity_label'))}
                      >
                        {
                          Object.keys(COMPANY_ACTIVITY).map((res, index) => (
                            <MenuItem key={index} value={res}>{COMPANY_ACTIVITY[res]}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                : null
            }
            <Grid style={{marginTop: '2vh', width: '100%'}}>
              <Divider/>
              <Grid style={{marginTop: '2vh', width: '100%'}}>
                <Button
                  onClick={() => {
                    this.save()
                  }}
                  variant="contained"
                  classes={{root: classes.buttonSave}}
                  color={'primary'}
                  disabled={!this.isModeCompany() ? enabledEdition : false}
                >
                  {ReactHtmlParser(this.props.t('ABOUT.button_update'))}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  };


  render() {
    const {displayTitlePicture, classes} = this.props
    const {user, company, showEdition} = this.state

    let place = this.isModeCompany() ? company ? company.billing_address.city : ReactHtmlParser(this.props.t('PROFIL.noaddresses')) : user ? user.billing_address.city : PROFIL.noaddresses

    const editable = isEditableUser(user)

    const wrapperComponentProps = !this.isModeCompany()?
      [
        {
          label: ReactHtmlParser(this.props.t('PROFIL.place')),
          summary: place,
          IconName: user ? <RoomIcon fontSize="large"/> : ReactHtmlParser(this.props.t('PROFIL.nothing')),
        },
        {
          label: ReactHtmlParser(this.props.t('PROFIL.languages')),
          summary: user ? user.languages ? user.languages.join(', ') || null : ReactHtmlParser(this.props.t('PROFIL.nothing')) : '',
          IconName: user ? <ChatBubbleOutlineOutlinedIcon fontSize="large"/> : '',
        },
        {
          label: ReactHtmlParser(this.props.t('PROFIL.verification')),
          summary: user ? user.is_confirmed ? ReactHtmlParser(this.props.t('PROFIL.confirmed')) : ReactHtmlParser(this.props.t('PROFIL.nothing')) : ReactHtmlParser(this.props.t('PROFIL.unconfirmed')),
          IconName: user ? user.is_confirmed ? <CheckCircleOutlineIcon fontSize="large"/> : <HighlightOffIcon fontSize={'large'}/> : '',
        },
      ]
      :
      [
        {
          label: ReactHtmlParser(this.props.t('PROFIL.website')),
          summary: company.website ? company.website : ReactHtmlParser(this.props.t('PROFIL.nothing')),
          IconName: <LanguageIcon fontSize="large"/>,
        },
        {
          label: ReactHtmlParser(this.props.t('PROFIL.companysize')),
          summary: company.size !== '' ? Object.keys(COMPANY_SIZE).map(res => { if(res === company.size) { return COMPANY_SIZE[res] } }): ReactHtmlParser(this.props.t('PROFIL.nothing')),
          IconName: <BusinessIcon fontSize="large"/>,
        },
        {
          label: ReactHtmlParser(this.props.t('PROFIL.activity')),
          summary: company.activity !== '' ? Object.keys(COMPANY_ACTIVITY).map(res => { if(res === company.activity) { return COMPANY_ACTIVITY[res] } }) : ReactHtmlParser(this.props.t('PROFIL.nothing')),
          IconName: <WorkOutlineIcon fontSize="large"/>,
        },
      ]

    return (
      <>
        {editable ?
          <Grid className={classes.containerIcon}>
            <IconButton aria-label="edit" onClick={this.openEdition}>
              <CreateIcon/>
            </IconButton>
          </Grid>
          :
          null
        }
        <Grid style={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
          {displayTitlePicture ?
            <h3>{frenchFormat(`A propos de ${user ? user.firstname : ''}`)}</h3>
            : null
          }

          <Grid style={{display: 'flex', flexDirection: 'row'}}>
            {displayTitlePicture ?
              <Grid style={{marginLeft: '1%', marginRight: '1%'}}>
                <UserAvatar user={user}/>
              </Grid>
              : null
            }
            <ListAlfredConditions
              wrapperComponentProps={wrapperComponentProps}
              columnsXl={12}
              columnsLG={12}
              columnsMD={6}
              columnsSm={6}
              columnsXS={6}
            />
          </Grid>
          {showEdition ? this.modalEditDialog(classes) : null}
        </Grid>
      </>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(About))
