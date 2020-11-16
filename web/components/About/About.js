import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from './AboutStyle';
import cookie from 'react-cookies';
import ListAlfredConditions from "../ListAlfredConditions/ListAlfredConditions";
import RoomIcon from '@material-ui/icons/Room';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PersonIcon from '@material-ui/icons/Person';
import UserAvatar from '../Avatar/UserAvatar'
import Box from '../Box/Box'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Topic from '../../hoc/Topic/Topic'
import AlgoliaPlaces from 'algolia-places-react'
import MultipleSelect from 'react-select'
import {LANGUAGES} from '../../utils/consts'
import CreateIcon from '@material-ui/icons/Create'
import {isEditableUser} from '../../utils/functions'
import IconButton from "@material-ui/core/IconButton";


const {frenchFormat} = require('../../utils/text');
const moment=require('moment');
moment.locale('fr');

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other} className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
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
      newLanguages: null,
      showEdition: false,
    };
    this.save = this.save.bind(this);
    this.loadUser = this.loadUser.bind(this)
  }

  componentDidMount = () => {
    this.loadUser()
  };

  loadUser() {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then( res => {
        const user=res.data;

        this.setState({
          user: user,
        })
      })
      .catch (err => console.error(err))
  }

  onAddressChanged= result => {

    const newAddress = result ?
      {
          city: result.suggestion.city,
          address: result.suggestion.name,
          zip_code: result.suggestion.postcode,
          country: result.suggestion.country,
          lat: result.suggestion.latlng.lat,
          lng: result.suggestion.latlng.lng,
      }
      :
      null;
    this.setState({newAddress: newAddress})
  };

  onLanguagesChanged = languages => {
    this.setState({newLanguages: languages})
  };

  save = () => {
    // TODO: handle errors, remove timeout
    const {newAddress, newLanguages}=this.state;
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.put('/myAlfred/api/users/profile/billingAddress', newAddress);
    axios.put('/myAlfred/api/users/profile/languages', {languages: newLanguages.map( l => l.value)});
    this.setState({showEdition: false}, () => setTimeout(this.loadUser, 1000))
  };

  closeEditDialog = () => {
    this.setState({showEdition: false, newLanguages: null, newAddress: null})
  };

  modalEditDialog = (classes) =>{
    const {newLabel, newPicture, user, newAddress, newLanguages, showEdition}=this.state;
    const enabled = newAddress;
    const placeholder = newAddress ? `${newAddress.city}, ${newAddress.country}` : 'Entrez votre adresse';

    return(
      <Dialog
        open={showEdition}
        onClose={this.closeEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <Box>
          <Topic titleTopic={'Modifiez vos informations'} titleSummary={'Ici, vous pouvez modifier vos informations'} underline={true} />
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={12} style={{marginTop: '2vh'}}>
              <Typography style={{fontWeight: 'bold', textTransform: 'initial'}}>Lieu d'habitation</Typography>
            </Grid>
            <Grid item style={{width:'100%'}}>
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
                onClear = {() => this.onAddressChanged(null)}
              />
            </Grid>
            <Grid item xs={12} lg={12}  style={{marginTop: '2vh'}}>
              <Typography style={{fontWeight: 'bold', textTransform: 'initial'}}>Langues parlées</Typography>
            </Grid>
            <Grid item xs={12}>
              <MultipleSelect
                key={moment()}
                value={newLanguages}
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

              />
            </Grid>
            <Grid style={{marginTop: '2vh'}}>
            <Button
              onClick={() => {
                this.save();
                }}
              variant="contained"
              classes={{root: classes.buttonSave}}
              disabled={!enabled}
            >
              Modifier
            </Button>
            </Grid>
          </Grid>
          </Box>
        </DialogContent>
      </Dialog>
  )
  };

  openEdition = () => {
    const {user}=this.state;

    this.setState({
      showEdition: true,
      newLanguages: user.languages.map(l => ({value: l, label: l})),
      newAddress: user.billing_address
    })
  };

  render() {
    const {displayTitlePicture, classes} = this.props;
    const {user, newLanguages} = this.state;
    var places= user ?`${user.billing_address.city}, ${user.billing_address.country}` : '';
    if (user) {
      user.service_address.forEach( sa => {
        places+=`;${sa.city}, France`
        }
      )
    }

    const editable = isEditableUser(user);


    const wrapperComponentProps = user ?
      [
        {
          label: 'Lieux',
          summary: places,
          IconName: user.firstname ? <RoomIcon fontSize="large"/> : ''
        },
        {
          label: 'Langues',
          summary: user.languages.join(',') || 'Français',
          IconName:  user.firstname ? <ChatBubbleOutlineOutlinedIcon fontSize="large"/> : ''
        },
        {
          label: 'Membre depuis',
          summary: moment(user.creation_date).format("MMMM YYYY"),
          IconName: user.firstname ? <PersonIcon fontSize="large"/> : ''
        },
        {
          label:  'Vérification',
          summary: user.id_card_status_text,
          IconName:  user.firstname ? <CheckCircleOutlineIcon fontSize="large"/> : ''
        },
      ]
      :
      null;

    return (
      <Grid style={{display: 'flex', flexDirection:'column'}}>
        { displayTitlePicture ?
          <h3>{frenchFormat(`A propos de ${user ? user.firstname : ''}`)}</h3>
          : null
        }
        <Grid style={{display: 'flex', flexDirection:'row'}}>
          { displayTitlePicture ?
            <Grid style={{ marginLeft: '1%', marginRight: '1%'}}>
              <UserAvatar user={user} />
            </Grid>
            : null
          }
          <ListAlfredConditions wrapperComponentProps={wrapperComponentProps} columnsXl={12} columnsSm={6} />
          { editable ?
            <Grid>
              <Button classes={{root : classes.buttonAddService}} onClick={this.openEdition} startIcon={<CreateIcon />} />
            </Grid>
            :
            null
          }
        </Grid>
        {this.modalEditDialog(classes) }
      </Grid>
    )
  }
}

export default withStyles(styles)(About)
