import SnackBar from "../../components/SnackBar/SnackBar";
const {setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import About from '../../components/About/About'
import Presentation from '../../components/Presentation/Presentation'
import Skills from '../../components/Skills/Skills'
import Badges from '../../components/Badges/Badges'
import Hashtags from '../../components/Hashtags/Hashtags'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/profile/about/about';
import AskQuestion from "../../components/AskQuestion/AskQuestion";
import Box from "../../components/Box/Box";
import LayoutMobileProfile from "../../hoc/Layout/LayoutMobileProfile";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Topic from "../../hoc/Topic/Topic";
import MultipleSelect from "react-select";
import {LANGUAGES} from "../../utils/consts";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import {isEditableUser} from '../../utils/context';

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

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      company: null,
      showEdition: false,
      enabledEdition: true,
      languages: {},
      billing_address: {},
      newAddress: null,
      userLanguages: [],
      newLanguages: null,
      open: false
    }
  }

  componentDidMount() {
    this.loadUser();
  }

  openEdition = () => {
    const {company} = this.state;
    this.setState({
      showEdition: true,
      languages: company.languages.map(l => ({value: l, label: l})),
      newAddress: company.billing_address
    }, () => this.objectsEqual())
  }

  loadUser = () => {
    this.setState({showEdition: false});
    setAxiosAuthentication();
    axios.get(`/myAlfred/api/users/${this.props.user}`)
      .then(res => {
        const user = res.data;
        this.setState({
          company: user,
          userLanguages: user.languages.map(l => ({value: l, label: l})),
          billing_address: user.billing_address
        })
      })
      .catch(err => console.error(err))
  };

  closeEditDialog = () => {
    this.setState({showEdition: false, newLanguages: null, newAddress: null})
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
  save = () => {
    const {newAddress, languages} = this.state;
    setAxiosAuthentication();
    axios.put('/myAlfred/api/users/profile/billingAddress', newAddress).then(res => {
        axios.put('/myAlfred/api/users/profile/languages',
          {languages: languages.map(l => l.value)}).then(res => {
            this.setState({open: true}, () => setTimeout(this.loadUser, 1000))
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

  modalEditDialog = (classes) => {
    const {newAddress, showEdition, enabledEdition, languages} = this.state;
    const placeholder = newAddress ? `${newAddress.city}, ${newAddress.country}` : 'Entrez votre adresse';

    return (
      <Dialog
        open={showEdition}
        onClose={this.closeEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{root: classes.mydialogContainer}}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.closeEditDialog}/>
        <DialogContent>
          <Topic titleTopic={'Modifiez les informations de votre entreprise'}
                 titleSummary={'Ici, vous pouvez modifier les informations de votre entreprise'}
                 underline={true}/>
          <Grid container>
            <Grid container>
              <Grid item xs={12} lg={12} style={{marginTop: '2vh'}}>
                <Typography style={{fontWeight: 'bold', textTransform: 'initial'}}>Site Web</Typography>
              </Grid>
              <Grid item style={{width: '100%', marginTop: '3vh', marginBottom: '3vh'}}>
                /** TODO **/
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} lg={12} style={{marginTop: '2vh'}}>
                <Typography style={{fontWeight: 'bold', textTransform: 'initial'}}>Langues parlées</Typography>
              </Grid>
              <Grid item xs={12} style={{marginTop: '3vh', marginBottom: '3vh'}}>
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
                />
              </Grid>
            </Grid>
            <Grid style={{marginTop: '2vh', width: '100%'}}>
              <Divider/>
              <Grid style={{marginTop: '2vh', width: '100%'}}>
                <Button
                  onClick={() => {
                    this.save();
                  }}
                  variant="contained"
                  color={'primary'}
                  classes={{root: classes.buttonSave}}
                  disabled={enabledEdition}
                >
                  Modifier
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <SnackBar severity={"success"} message={'Profil mis à jour.'} open={this.state.open}
                  closeSnackBar={() => this.setState({open: false})}/>
      </Dialog>
    )
  };

  static getInitialProps({query: {user, indexAccount}}) {
    return {user: user, index: indexAccount}
  }

  content = (classes, user, company) => {
    const editable = isEditableUser(user);
    return (
      <Grid container spacing={3} style={{marginBottom: '12vh'}}>
        <Grid className={classes.profileLayoutContainer} item xl={5} lg={5} md={6} sm={12} xs={12}>
          <Box>
            <About user={user}/>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.layoutMobileProfileContainer} style={{marginTop: '5vh', position: 'relative'}}>
          {editable ?
            <Grid style={{position: 'absolute', right: 5}}>
              <IconButton aria-label="edit" onClick={this.openEdition}>
                <CreateIcon/>
              </IconButton>
            </Grid>
            :
            null
          }
          <Grid style={{display: 'flex', flexDirection: 'row'}}>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>Habite à </Typography>
            </Grid>
            <Grid style={{margin: 3}}/>
            <Grid>
              <Typography
                style={{color: 'black'}}>{company ? company.billing_address.city + ", " + company.billing_address.country : null}</Typography>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', flexDirection: 'row', marginTop: '4vh'}}>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>Parle </Typography>
            </Grid>
            <Grid style={{margin: 3}}/>
            <Grid>
              <Typography style={{color: 'black'}}>{company ? company.languages.join(', ') : null}</Typography>
            </Grid>
          </Grid>
          {
            company ?
              company.id_confirmed ?
                <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '4vh'}}>
                  <Grid>
                    <Typography
                      style={{color: 'rgba(39,37,37,35%)'}}>{company ? company.firstname : null}</Typography>
                  </Grid>
                  <Grid style={{margin: 3}}/>
                  <Grid>
                    <Typography style={{color: 'black'}}>à un profil vérifié</Typography>
                  </Grid>
                  <Grid>
                    <CheckCircleOutlineIcon/>
                  </Grid>
                </Grid> : null : null
          }
        </Grid>
        <Grid item xl={7} lg={7} md={6} sm={12} xs={12}>
          <Box>
            <Presentation user={user} classes={classes}/>
          </Box>
        </Grid>
        <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
          <Box>
            <Skills alfred={user}/>
          </Box>
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Box>
            <Badges user={user}/>
          </Box>
        </Grid>
        {false ?
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.aboutHastagsContainer}>
            <Box>
              <Hashtags user={user}/>
            </Box>
          </Grid>
          :
          null
        }
        {
          !editable ?
            <Grid className={classes.containerAskQuestion} item>
              <Grid style={{width: '70%'}}>
                <AskQuestion user={user}/>
              </Grid>
            </Grid>
          : null
        }

      </Grid>
    )
  }

  render() {
    const {classes, index, user} = this.props;
    const {company} = this.state;
    if (!user && company) {
      return null
    }
    return (
      <React.Fragment>
        <Grid className={classes.profileLayoutContainer}>
          <ProfileLayout user={user} index={index}>
            {this.content(classes, user, company)}
          </ProfileLayout>
        </Grid>
        <Grid className={classes.layoutMobileProfileContainer}>
          <LayoutMobileProfile user={user} index={index} currentIndex={4}>
            {this.content(classes, user, company)}
          </LayoutMobileProfile>
        </Grid>
        {this.modalEditDialog(classes)}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Company)
