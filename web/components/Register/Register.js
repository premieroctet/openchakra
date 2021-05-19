const {snackBarSuccess, snackBarError} = require('../../utils/notifications');
const {setAuthToken, setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react';
import {checkPass1, checkPass2} from '../../utils/passwords';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import {registerLocale} from 'react-datepicker';
import Button from '@material-ui/core/Button';
import fr from 'date-fns/locale/fr';
import styles from './RegisterStyle';
import {withStyles} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Router from 'next/router';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
var parse = require('url-parse');

const {isPhoneOk} = require('../../utils/sms');
const {STEPS}=require('../../utils/registerStep')
const {getLoggedUserId} = require('../../utils/functions')


registerLocale('fr', fr);

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      name: '',
      birthday: new Date(),
      email: '',
      password: '',
      password2: '',
      address: '',
      city: '',
      zip_code: '',
      country: '',
      checked: false,
      status1: {error: '', check: false},
      status2: {error: '', check: false},
      errors: {},
      lat: '',
      lng: '',
      activeStep: 0,
      file: null,
      picture: '',
      // Avatar link coming from Google or Facebook
      avatar: null,
      value: '',
      phone: '',
      phoneOk: false,
      // Phone sendVerificationSMS
      smsCodeOpen: false, // Show/hide SMS code modal
      smsCode: '', // Typed SMS code
      smsError: null,
      phoneConfirmed: false,
      serverError: false, // Si erreur serveur pour l''envoi du SMS, continuer quand même
      errorEmailType: '',
      emailValidator: false,
      firstPageValidator: true,
      secondPageValidator: true,
      errorExistEmail: false,
      birthdayError: '',
      cityError: '',
      open: false,
      registerIncomplete: false,
      showPassword: false,
      showPassword2: false
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
  }

  componentDidMount() {
    let query = parse(window.location.href, true).query;
    if (query.google_id) {
      this.setState({
        google_id: query.google_id,
        email: query.email,
        name: query.lastname,
        firstname: query.firstname,
        firstPageValidator: false,
        picture: query.picture,
        file: query.picture,
        avatar: query.picture,
      });
    }
    if (query.facebook_id) {
      this.setState({
        facebook_id: query.facebook_id,
        email: query.email,
        name: query.lastname,
        firstname: query.firstname,
        activeStep: 1,
        firstPageValidator: false,
        avatar: query.picture,
      });
    }
    if (query.error) {
      this.setState({errorExistEmail: true});
    }
    if (getLoggedUserId()) {
      snackBarError('Vous êtes déjà inscrit');
      Router.push('/');
    }
    if(localStorage.getItem('registerNotComplete') === 'true'){
      this.setState({registerIncomplete: true})
    }else{
      this.setState({registerIncomplete: false})
    }

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.activeStep !== prevState.activeStep) {
      this.props.sendParentData(this.state.activeStep);
    }
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value}, () => this.validatorFirstStep());
  };

  onChangePhone = (e) => {
    var {name, value} = e.target;
    this.setState({[name]: value});
    if (name === 'phone') {
      const phoneOk = isPhoneOk(value);
      if (phoneOk && value.startsWith('0')) {
        value = '33' + value.substring(1);
      }
      this.setState({'phone': value, phoneOk: isPhoneOk(value)});
    }
  };

  onChangePicture = e => {
    this.setState({picture: e.target.files[0]});
  };

  handleChange(event) {
    this.setState({
      file:
        event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : null,
    });
  }

  onChangeEmail = (event) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (event.target.value.match(regex)) {
      this.setState({emailValidator: true, emailError: ''});
    } else {
      this.setState({emailValidator: false, emailError: 'Veuillez entrer une adresse email valide.'});
    }
    this.setState({email: event.target.value}, () => this.validatorFirstStep());
  }


  onChangePassword = e => {
    this.setState({
      status1: checkPass1(this.state.password),
      status2: checkPass2(this.state.password, this.state.password2),
    }, () => this.validatorFirstStep());
  };

  onChangeAddress(result) {
    if (result) {
      const suggestion = result.suggestion
      this.setState({
        city: suggestion.city, address: suggestion.name, zip_code: suggestion.postcode, country: suggestion.country,
        lat: suggestion.latlng.lat, lng: suggestion.latlng.lng,
      })
    } else {
      this.setState({
        city: null, address: null, zip_code: null, country: null,
        lat: null, lng: null,
      })
    }
  }

  handleChecked = () => {
    this.setState({checked: !this.state.checked}, () => this.validatorSecondStep());
  };

  sendSms = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/users/sendSMSVerification', {phone: this.state.phone})
      .then(res => {
        var txt = 'Le SMS a été envoyé';
        snackBarSuccess(txt);
        this.setState({smsCodeOpen: true});
      })
      .catch(err => {
        snackBarError('Impossible d\'envoyer le SMS')
        this.setState({serverError: true});
      });
  };

  checkSmsCode = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/users/checkSMSVerification', {sms_code: this.state.smsCode})
      .then(res => {
        if (res.data.sms_code_ok) {
          snackBarSuccess('Votre numéro de téléphone est validé');
          this.setState({smsCodeOpen: false, phoneConfirmed: true});
          if(this.props.mode === 'incomplete'){
            Router.push('/creaShop/creaShop')
          }
        } else {
          snackBarError('Le code est incorrect');
        }
      })
      .catch(err => snackBarError('Erreur à la vérification du code'));
  };

  onSubmit = () => {

    const newUser = {
      google_id: this.state.google_id,
      facebook_id: this.state.facebook_id,
      firstname: this.state.firstname,
      name: this.state.name,
      birthday: this.state.birthday,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      address: this.state.address,
      zip_code: this.state.zip_code,
      city: this.state.city,
      country: this.state.country,
      lat: this.state.lat,
      lng: this.state.lng,
    };

    const username = this.state.email;
    const password = this.state.password;
    const google_id = this.state.google_id;
    const facebook_id = this.state.facebook_id;

    this.setState({cityError: null, birthdayError: null});

    axios
      .post('/myAlfred/api/users/register', newUser)
      .then(() => {
        axios.post('/myAlfred/api/users/login', {username, password, google_id, facebook_id})
          .then(() => {
            setAuthToken()
            setAxiosAuthentication()
          })
          .catch( err =>{
            console.error(err)
          })
          .then( () => {
            if(this.props.mode === 'incomplete'){
              this.submitPhone()
            }else{
              this.setState({activeStep: this.state.activeStep + 1})
            }
          }
          )
          .catch(
            err => {
              console.error(err)
            }
          )
          .then( () => {
            if(this.props.mode !== 'incomplete'){
              this.submitPhone()
            }
          }
          ).catch(
            err => {
              console.error(err)
            });
      })
      .catch(err => {
        const errors = err.response.data
        const errKeys = Object.keys(errors)
        this.setState({errors: err.response.data});
        if (errKeys.includes('email')) {
          this.setState({activeStep: 0});
        }
        if (errKeys.includes('address')) {
          this.setState({cityError: errors.address, activeStep: 1});
        }
        if (errKeys.includes('birthday')) {
          this.setState({birthdayError: errors.birthday, activeStep: 1});
        }
      });
  };

  submitPhone = e => {

    if(!this.state.phone && this.props.mode === 'incomplete'){
      Router.push('/creaShop/creaShop')
    }

    // Don't send empty phone number
    if (!this.state.phone) {
      return
    }
    if (!this.state.phoneConfirmed && !this.state.serverError) {
      this.sendSms();
    }

    const newPhone = {
      phone: this.state.phone,
      phone_confirmed: this.state.phoneConfirmed,
    };

    setAxiosAuthentication()
    axios
      .put('/myAlfred/api/users/profile/phone', newPhone)
      .then(res => {
        snackBarSuccess('Téléphone ajouté');
      })
      .catch(err =>
        console.error(err)
      );
  };

  onChangeBirthdayDate = (e) => {
    let day = new Date(this.state.birthday);
    day.setDate(e.target.value);
    this.setState({birthday: day});
  };

  onChangeBirthdayMonth = (e) => {
    let month = new Date(this.state.birthday);
    month.setMonth(e.target.value - 1);
    this.setState({birthday: month});
  };

  onChangeBirthdayYear = (e) => {
    let year = new Date(this.state.birthday);
    year.setFullYear(e.target.value);
    this.setState({birthday: year});
  };

  confirmLater = () => {
    this.setState({smsCodeOpen: false});
    if(this.props.mode === 'incomplete'){
      Router.push('/creaShop/creaShop')
    }
  };

  validatorFirstStep = () => {
    if (this.state.errorEmailType === '' && this.state.email !== '' && this.state.emailValidator && this.state.firstname !== '' && this.state.name !== '' && this.state.status1.check && this.state.status2.check) {
      this.setState({firstPageValidator: false});
    } else {
      this.setState({firstPageValidator: true});
    }
  };

  validatorSecondStep = () => {
    if (this.state.checked) {
      this.setState({secondPageValidator: false});
    } else {
      this.setState({secondPageValidator: true});
    }
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickShowPassword2 = () => {
    this.setState({ showPassword2: !this.state.showPassword2 });
  };

  handleMouseDownPassword = (event) =>{
    event.preventDefault();
  };

  renderSwitch = (stepIndex, mode) => {
    return STEPS[mode][stepIndex].component(this)

  }

  handleNext = (activeStep) => {
    if (activeStep === 1) {
      this.onSubmit();
    } else {
      this.setState({activeStep: this.state.activeStep + 1});
    }
  };


  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1});
  };

  dialogPhone = (classes) =>{
    return(
      <Dialog open={this.state.smsCodeOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirmation du numéro de téléphone</DialogTitle>
        <DialogContent>
          <DialogContentText>Saisissez le code reçu par SMS</DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="Code"
            type="number"
            placeholder="0000"
            maxLength="4"
            name={'smsCode'}
            value={this.state.smsCode}
            onChange={(e) => this.onChange(e)}
            fullWidth
            errors={this.state.smsError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.confirmLater()} color="primary">
            Confirmer plus tard
          </Button>
          <Button
            disabled={this.state.smsCode.length !== 4}
            onClick={() => this.checkSmsCode()}
            color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    )
  }



  render() {
    const {classes, callLogin, mode} = this.props;
    const {smsCodeOpen, activeStep, firstPageValidator, secondPageValidator} = this.state;

    return (
      <Grid className={classes.fullContainer}>
        <Grid>
          <Grid className={classes.newContainer}>
            {
              activeStep === 0 ?
                <Grid>
                  <h2 className={classes.titleRegister}>Inscription</h2>
                </Grid> : null
            }
            <Grid className={classes.containerSwitch}>
              {this.renderSwitch(activeStep, mode)}
            </Grid>
            {
              activeStep < 2 ?
                <Grid style={{marginTop: 10}}>
                  <hr/>
                  <Grid>
                    <MobileStepper
                      variant="progress"
                      steps={2}
                      position="static"
                      activeStep={activeStep}
                      className={classes.rootStepper}
                      classes={{
                        progress: classes.progress,
                      }}
                      nextButton={
                        <Button size="small" onClick={() => this.handleNext(activeStep)}
                                disabled={activeStep === 0 ? firstPageValidator : secondPageValidator}>
                          {activeStep === 0 ? 'Suivant' : 'Terminer'}
                          <KeyboardArrowRight/>
                        </Button>
                      }
                      backButton={
                        <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                          <KeyboardArrowLeft/>
                          Précédent
                        </Button>
                      }
                    />
                  </Grid>
                  <Grid container className={classes.bottomContainer}>
                    <Grid item>
                      <a color={'primary'} onClick={callLogin} style={{color: '#2FBCD3', cursor: 'pointer'}}>Vous
                        avez déjà un compte My Alfred ?</a>
                    </Grid>
                  </Grid>

                </Grid> : null
            }

          </Grid>
        </Grid>
        {smsCodeOpen ? this.dialogPhone(classes) : null}
      </Grid>
    );
  }

}

export default withStyles(styles)(Register);
