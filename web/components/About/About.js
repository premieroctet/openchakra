import {withTranslation} from 'react-i18next'
import ReactHtmlParser from 'react-html-parser'
import {withStyles} from '@material-ui/core/styles'
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CloseIcon from '@material-ui/icons/Close'
import CreateIcon from '@material-ui/icons/Create'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'
import RoomIcon from '@material-ui/icons/Room'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import moment from 'moment'
import CustomIcon from '../CustomIcon/CustomIcon'
import CustomButton from '../CustomButton/CustomButton'
import {COMPANY_SIZE} from '../../utils/consts'
import {isEditableUser} from '../../utils/context'
import ListAlfredConditions from '../ListAlfredConditions/ListAlfredConditions'
import LocationSelect from '../Geo/LocationSelect'
import Topic from '../../hoc/Topic/Topic'
import UserAvatar from '../Avatar/UserAvatar'
import styles from '../../static/css/components/About/About'
import {snackBarSuccess} from '../../utils/notifications'
import {setAxiosAuthentication} from '../../utils/authentication'

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

class About extends React.Component {

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

    axios.put('/myAlfred/api/users/profile/billingAddress', newAddress).then(() => {
      axios.put('/myAlfred/api/users/profile/languages', {languages: languages.map(l => l.value)}).then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('ABOUT.snackbar_profil_update')))
        setTimeout(this.componentDidMount, 1000)
      },
      ).catch(err => {
        console.error(err)
      })
    },
    ).catch(err => {
      console.error(err)
    },
    )
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
            titleTopic={ReactHtmlParser(this.props.t('ABOUT.title_topic'))}
            titleSummary={ReactHtmlParser(this.props.t('ABOUT.titlesummary_topic'))}
            underline={true}/>
          <Grid container spacing={2} style={{width: '100%', margin: 0}}>
            <Grid item container spacing={2} style={{width: '100%', margin: 0}} xl={12} lg={12} sm={12} md={12} xs={12}>
              <Grid item xs={12} lg={12}>
                <h3 style={{
                  fontWeight: 'bold',
                  textTransform: 'initial',
                }}>
                  {ReactHtmlParser(this.props.t('ABOUT.label_address'))}
                </h3>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <LocationSelect
                  placeholder={placeholder}
                  onChange={this.onAddressChanged}
                  onClear={() => this.onAddressChanged(null)}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2} style={{width: '100%', margin: 0}} xl={12} lg={12} sm={12} md={12} xs={12}>
              <Grid item xs={12} lg={12}>
                <h3
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'initial',
                  }}>{ReactHtmlParser(this.props.t('ABOUT.spoken_languages'))}</h3>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">{ReactHtmlParser(this.props.t('ACCOUNT_COMPANY.size'))}</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={sizeCompany}
                    onChange={this.handleChange}
                    label={ReactHtmlParser(this.props.t('ACCOUNT_COMPANY.size'))}
                    name={'sizeCompany'}
                    placeholder={ReactHtmlParser(this.props.t('ACCOUNT_COMPANY.size'))}
                  >
                    {
                      Object.keys(COMPANY_SIZE).map((res, index) => (
                        <MenuItem key={index} value={res}>{COMPANY_SIZE[res]}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid style={{marginTop: '2vh', width: '100%'}}>
              <Divider/>
              <Grid style={{marginTop: '2vh', width: '100%'}}>
                <CustomButton
                  onClick={() => {
                    this.save()
                  }}
                  variant="contained"
                  classes={{root: classes.buttonSave}}
                  color={'primary'}
                  disabled={enabledEdition}
                >
                  {ReactHtmlParser(this.props.t('ABOUT.button_update'))}
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  };


  render() {
    const {displayTitlePicture, classes} = this.props
    const {user, showEdition} = this.state

    let place = user ? user.billing_address.city : ReactHtmlParser(this.props.t('PROFIL.noaddresses'))

    const editable = isEditableUser(user)

    const wrapperComponentProps =
      [
        {
          label: ReactHtmlParser(this.props.t('PROFIL.place')),
          summary: place,
          IconName: user ? <CustomIcon className={'customaboutplaceicon'} style={{height: 24, width: 24, backgroundSize: 'contain'}} materialIcon={<RoomIcon fontSize="large"/>}/> : ReactHtmlParser(this.props.t('PROFIL.nothing')),
        },
        {
          label: ReactHtmlParser(this.props.t('PROFIL.languages')),
          summary: user ? user.languages ? user.languages.join(', ') || null : ReactHtmlParser(this.props.t('PROFIL.nothing')) : '',
          IconName: user ? <CustomIcon className={'customaboutchaticon'} style={{height: 24, width: 24, backgroundSize: 'contain'}} materialIcon={<ChatBubbleOutlineOutlinedIcon fontSize="large"/>}/> : '',
        },
        {
          label: ReactHtmlParser(this.props.t('PROFIL.verification')),
          summary: user ? user.is_confirmed ? ReactHtmlParser(this.props.t('PROFIL.confirmed')) : ReactHtmlParser(this.props.t('PROFIL.nothing')) : ReactHtmlParser(this.props.t('PROFIL.unconfirmed')),
          IconName: user ? user.is_confirmed ? <CustomIcon className={'customaboutcheckcircleicon'} style={{height: 24, width: 24, backgroundSize: 'contain'}} materialIcon={<CheckCircleOutlineIcon fontSize="large"/>}/> : <CustomIcon className={'customaboutuncheckcircleicon'} style={{height: 24, width: 24, backgroundSize: 'contain'}} materialIcon={<HighlightOffIcon fontSize={'large'}/>}/> : '',
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
            <h3>{ReactHtmlParser(this.props.t('PROFIL.about', {firstname: user ? user.firstname : ''}))}</h3>
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

export default withTranslation(null, {withRef: true})(withStyles(styles)(About))
