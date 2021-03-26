import {TextField} from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
const {snackBarSuccess, snackBarError} = require('../../utils/notifications');
import LanguageIcon from '@material-ui/icons/Language';
const {setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/components/About/About';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import ListAlfredConditions from "../ListAlfredConditions/ListAlfredConditions";
import RoomIcon from '@material-ui/icons/Room';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import UserAvatar from '../Avatar/UserAvatar'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Topic from '../../hoc/Topic/Topic'
import AlgoliaPlaces from 'algolia-places-react'
import MultipleSelect from 'react-select'
import {COMPANY_ACTIVITY, COMPANY_SIZE, LANGUAGES} from '../../utils/consts'
import CreateIcon from '@material-ui/icons/Create'
import {isEditableUser} from '../../utils/functions'
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import {is_mode_company} from "../../utils/context";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const {frenchFormat} = require('../../utils/text');
const moment = require('moment');
moment.locale('fr');

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography {...other} className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class About extends React.Component {

  constructor(props) {
    super(props);
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
      company:{},

    };
  }

  componentDidMount = () => {
    this.loadUser()
  };

  loadUser = () => {
    this.setState({showEdition: false});
    setAxiosAuthentication();

      axios.get('/myAlfred/api/companies/current').then( res =>{
        const company = res.data;
        this.setState({
          company: company,
          website: company.website,
          activityArea: company.activity,
          sizeCompany: company.size,
        })
        }).catch(err => console.error(err))

      axios.get(`/myAlfred/api/users/users/${this.props.user}`)
        .then(res => {
          const user = res.data;
          this.setState({
            user: user,
            userLanguages: user.languages.map(l => ({value: l, label: l})),
            billing_address: user.billing_address
          })
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
        }
      }
      :
      null;
    this.setState({newAddress: newAddress}, () => this.objectsEqual())
  };

  onLanguagesChanged = languages => {
    this.setState({languages: languages}, () => this.objectsEqual())
  };

  save = () => {
    const {newAddress, languages} = this.state;
    setAxiosAuthentication();
    axios.put('/myAlfred/api/users/profile/billingAddress', newAddress).then(res => {
      axios.put('/myAlfred/api/users/profile/languages', {languages: languages.map(l => l.value)}).then(res => {
        snackBarSuccess('Profil modifié avec succès');
        setTimeout(this.loadUser, 1000)
        }
      ).catch(err => {
        console.error(err)
      })
    }
    ).catch(err => {
        console.error(err)
      }
    );
  };

  closeEditDialog = () => {
    this.setState({showEdition: false, newLanguages: null, newAddress: null})
  };


  openEdition = () => {
    const {user} = this.state;

    this.setState({
      showEdition: true,
      languages: user.languages.map(l => ({value: l, label: l})),
      newAddress: user.billing_address
    }, () => this.objectsEqual())
  };

  objectsEqual = () => {
    let o1 = this.state.languages;
    let o2 = this.state.userLanguages;
    let o3 = this.state.newAddress ? this.state.newAddress.gps : null;
    let o4 = this.state.billing_address.gps;

    if (o1 && o1.length !== 0 && o3 !== null) {
      if (o1.join('') === o2.join('') && o3.lat === o4.lat && o3.lng === o4.lng) {
        this.setState({enabledEdition: true})
      } else if (o1.join('') !== o2.join('') || o3.lat !== o4.lat && o3.lng !== o4.lng) {
        this.setState({enabledEdition: false})
      } else {
        this.setState({enabledEdition: false})
      }
    } else {
      this.setState({enabledEdition: true})
    }
  };

  handleChange = (event) => {
    let {name, value} = event.target;
    this.setState({[name] : value});
  };

  modalEditDialog = (classes) => {
    const {newAddress, showEdition, languages, enabledEdition, user, activityArea, sizeCompany, company, website} = this.state;
    const address = newAddress || (user ? user.billing_address : null)
    const placeholder = address ? `${address.city}, ${address.country}` : 'Entrez votre adresse';

    return (
      <Dialog
        open={showEdition}
        onClose={this.closeEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.closeEditDialog}
                     style={{position: 'absolute', right: 0}}/>
        <DialogContent>
          <Topic
            titleTopic={is_mode_company() ? 'Modifiez les informations de votre entreprises' : 'Modifiez vos informations'}
            titleSummary={is_mode_company() ? 'Ici, vous pouvez modifier les informations de votre entreprise' : 'Ici, vous pouvez modifier vos informations'}
            underline={true}/>
          <Grid container spacing={2} style={{width: '100%', margin: 0}}>
            <Grid item container spacing={2} style={{width: '100%', margin: 0}} xl={12} lg={12} sm={12} md={12} xs={12}>
              <Grid item xs={12} lg={12}>
                <h3 style={{
                  fontWeight: 'bold',
                  textTransform: 'initial'
                }}>
                  {is_mode_company() ? 'Site Web' : 'Lieu d\'habitation'}
                </h3>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                {
                  is_mode_company() ?
                    <TextField
                      name={'website'}
                      variant={'outlined'}
                      label={'Site Web'}
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
                    textTransform: 'initial'
                  }}>{is_mode_company() ? 'Taille de l\'entreprise' : 'Langues parlées'}</h3>
              </Grid>
              <Grid item xs={12}>
                {
                  !is_mode_company() ?
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
                      placeholder={'Sélectionnez vos langues'}
                      noOptionsMessage={() => 'Plus d\'options disponibles'}
                    /> :
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Taille de l’entreprise</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={sizeCompany}
                        onChange={this.handleChange}
                        label={'Taille de l’entreprise'}
                        name={'sizeCompany'}
                        placeholder={'Taille de l’entreprise'}
                      >
                        {
                          Object.keys(COMPANY_SIZE).map((res, index) =>(
                            <MenuItem key={index} value={res}>{COMPANY_SIZE[res]}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                }
              </Grid>
            </Grid>
              {
              is_mode_company() ?
                <Grid item container spacing={2} style={{width: '100%', margin: 0}} xl={12} lg={12} sm={12} md={12} xs={12}>
                  <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                    <h3
                      style={{
                        fontWeight: 'bold',
                        textTransform: 'initial'
                      }}>Secteur d’activité</h3>
                  </Grid>
                  <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Secteur d’activité</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={activityArea}
                        onChange={this.handleChange}
                        label={'Secteur d’activité'}
                        name={"activityArea"}
                        placeholder={'Secteur d’activité'}
                      >
                        {
                          Object.keys(COMPANY_ACTIVITY).map((res,index) =>(
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
                    this.save();
                  }}
                  variant="contained"
                  classes={{root: classes.buttonSave}}
                  color={'primary'}
                  disabled={enabledEdition}
                >
                  Modifier
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  };


  render() {
    const {displayTitlePicture, classes} = this.props;
    const {user, company} = this.state;
    var place = user ? user.billing_address.city : "Pas d'adresse";

    const editable = isEditableUser(user);


    const wrapperComponentProps = !is_mode_company()?
      [
        {
          label: 'Lieu',
          summary: place,
          IconName: user ? <RoomIcon fontSize="large"/> : ''
        },
        {
          label: 'Langues',
          summary: user ? user.languages.join(', ') || null : '',
          IconName: user ? <ChatBubbleOutlineOutlinedIcon fontSize="large"/> : ''
        },
        {
          label: 'Vérification',
          summary: user ? user.id_card_status_text : '',
          IconName: user ? <CheckCircleOutlineIcon fontSize="large"/> : ''
        },
      ]
      :
      [
        {
          label: 'Site web',
          summary: company.website ? company.website : 'Pas renseigner' ,
          IconName: <LanguageIcon fontSize="large"/>
        },
        {
          label: 'Taille de l’entreprise',
          summary: company.size !== '' ? Object.keys(COMPANY_SIZE).map((res) => {if(res === company.size){return COMPANY_SIZE[res]}}): 'Pas sélectionner',
          IconName: <BusinessIcon fontSize="large"/>
        },
        {
          label: 'Secteur d’activité',
          summary: company.activity !== '' ? Object.keys(COMPANY_ACTIVITY).map((res) => {if(res === company.activity){return COMPANY_ACTIVITY[res]}}) : 'Pas sélectionner',
          IconName: <WorkOutlineIcon fontSize="large"/>
        },
      ]

    return (
      <Grid style={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
        {displayTitlePicture ?
          <h3>{frenchFormat(`A propos de ${user ? user.firstname : ''}`)}</h3>
          : null
        }
        {editable ?
          <Grid style={{position: 'absolute', right: 0}}>
            <IconButton aria-label="edit" onClick={this.openEdition}>
              <CreateIcon/>
            </IconButton>
          </Grid>
          :
          null
        }
        <Grid style={{display: 'flex', flexDirection: 'row'}}>
          {displayTitlePicture ?
            <Grid style={{marginLeft: '1%', marginRight: '1%'}}>
              <UserAvatar user={user}/>
            </Grid>
            : null
          }
          <ListAlfredConditions wrapperComponentProps={wrapperComponentProps} columnsXl={12} columnsLG={12}
                                columnsMD={6} columnsSm={6} columnsXS={6}/>
        </Grid>
        {this.modalEditDialog(classes)}
      </Grid>
    )
  }
}

export default withStyles(styles)(About)
