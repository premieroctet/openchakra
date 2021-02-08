import SnackBar from "../../components/SnackBar/SnackBar";
const {snackBar} = require('../../utils/notifications');
const {clearAuthenticationToken} = require('../../utils/authentication');
const {setAxiosAuthentication} = require('../../utils/authentication');
import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MultipleSelect from 'react-select';
import {registerLocale} from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import {Helmet} from 'react-helmet';
import styles from '../../static/css/pages/profile/editProfile/editProfile';
import Hidden from "@material-ui/core/Hidden";
import LayoutAccount from "../../hoc/Layout/LayoutAccount";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
const {MAX_DESCRIPTION_LENGTH} = require('../../utils/consts');
import Visibility from '@material-ui/icons/Visibility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {toast} from "react-toastify";

const {isPhoneOk} = require('../../utils/sms');
const moment = require('moment');

registerLocale('fr', fr);
moment.locale('fr');

const momentDateFormat = 'dd/MM/yyyy';

class editProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      phone: '',
      languages: [],
      birthday: null,
      dpDate: moment().toDate(),
      ipDate: moment().format(momentDateFormat),
      errors: {},
      openErrors: false,
      smsCodeOpen: false,
      smsCode: '',
      checkPhoneMessage: '',
      checkPhoneSeverity: '',
      checkPhoneState: false,
      userEmail: '',
      checkEmailSeverity: '',
      checkEmailState: false,
      checkEmailMessage: ''
    };
  }

  static getInitialProps({query: {indexAccount}}) {
    return {index: indexAccount};

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    this.loadUser()
  }

  loadUser = () => {
    setAxiosAuthentication();
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({
          birthday: user.birthday,
          user: user,
          phone: user.phone,
          userEmail: user.email
        });
      })
      .catch(err => {
          console.error(err);
          if (err.response.status === 401 || err.response.status === 403) {
            clearAuthenticationToken();
            Router.push({pathname: '/'});
          }
        },
      );
  };

  onChange = e => {
    const state = this.state.user;
    var {name, value} = e.target;

    if (name === 'phone') {
      const phoneOk = isPhoneOk(value);
      if (phoneOk && e.target.value.startsWith('0')) {
        value = '33' + value.substring(1);
      }
    }
    if (name === 'description') {
      value = value.slice(0, MAX_DESCRIPTION_LENGTH)
    }
    state[e.target.name] = value;
    this.setState({user: state});
  };

  onChangeName = event => {
    const state = this.state.user;
    let value = event.target.value;

    if (value.match(/[0-9^@.&²"#{|(`)°=+},?;:/!\]\[§*$£µ%*\\<>~¤]/)) {
    } else {
      value = value.charAt(0).toUpperCase() + value.slice(1);
      state[event.target.name] = value;
      this.setState({user: state});
    }
  };
  onChangePhone = event => {
    const state = this.state.user;
    let value = event.target.value;

    if (value.match(/[a-zA-Z^@.&²"#{|(`)°=+},?;:/!\]\[§*$£µ%*\\<>~¤é¨'èùçà]/) || value.length > 11) {
    } else {

      const phoneOk = isPhoneOk(value);
      if (phoneOk && value.startsWith('0')) {
        value = '33' + value.substring(1);
      }
      state[event.target.name] = value;
      this.setState({user: state});
    }
  };

  submitPhone = () => {
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

    setAxiosAuthentication();
    axios
      .put('/myAlfred/api/users/profile/phone', newPhone)
      .then()
      .catch(err =>
        console.error(err)
      );
  };

  sendEmail = () => {
    axios.get('/myAlfred/api/users/sendMailVerification')
      .then(() => {
        this.setState({
          checkEmailSeverity: 'success',
          checkEmailState: true,
          checkEmailMessage: 'Mail envoyé'
        })
      })
      .catch( err => {
        this.setState({
        checkEmailSeverity: 'error',
        checkEmailState: true,
        checkEmailMessage: 'email non envoyé'
      })});
  };

  sendSms = () => {
    setAxiosAuthentication();
    axios.post('/myAlfred/api/users/sendSMSVerification', {phone: this.state.phone})
      .then(res => {
        this.setState({
          checkPhoneState: true,
          checkPhoneMessage: 'Le SMS a été envoyé',
          checkPhoneSeverity: 'success',
          smsCodeOpen: true
        }, () => this.onSubmit())
      })
      .catch(err => {
        this.setState({
          checkPhoneState: true,
          checkPhoneMessage: 'Impossible d\'envoyer le SMS',
          checkPhoneSeverity: 'error',
          smsCodeOpen: true,
          serverError: true
        });
      });
  };

  checkSmsCode = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/users/checkSMSVerification', {sms_code: this.state.smsCode})
      .then(res => {
        if (res.data.sms_code_ok) {
          this.setState({
            checkPhoneState: true,
            checkPhoneMessage: 'Votre numéro de téléphone est validé',
            checkPhoneSeverity: 'success',
            smsCodeOpen: false,
            phoneConfirmed: true
          }, () => this.onSubmit());
        } else {
          this.setState({
            checkPhoneState: true,
            checkPhoneMessage: 'Le code est incorrect',
            checkPhoneSeverity: 'error',
          });
        }
      })
      .catch(err =>
        this.setState({
          checkPhoneState: true,
          checkPhoneMessage: 'Erreur à la vérification du code',
          checkPhoneSeverity: 'warning',
        }));
  };

  dialogConfirmPhone = (classes) => {
    return (
      <Dialog open={this.state.smsCodeOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirmation du numéro de téléphone</DialogTitle>
        <DialogContent>
          <DialogContentText>Saisissez le code reçu par SMS</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Code"
            type="number"
            placeholder="0000"
            maxLength="4"
            value={this.state.smsCode}
            onChange={e => {
              this.setState({smsCode: e.target.value});
            }}
            fullWidth
            errors={this.state.smsError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({smsCodeOpen: false}, () => this.onSubmit())} color="primary">
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
  };


  onChangeBirthday = e => {
    this.setState({birthday: e.target.value});
  };

  onSubmit = e => {
    const birthday = this.state.birthday;
    const {email, name, firstname, description, gender, phone, job, diplomes, school} = this.state.user;
    snackBar("success", "Profil modifié avec succès");


    /*axios.put('/myAlfred/api/users/profile/editProfile', {
      email, name, firstname, birthday, description, gender, phone, job, diplomes, school,
    })
      .then(res => {
        snackBar("success", "Profil modifié avec succès");
        this.setState({errors: {}}, () => this.loadUser());
      })
      .catch(err => {
        this.setState({openErrors: true, errors: err.response.data});
      });*/
  };

  content = (classes) => {
    const {errors, user, phone, userEmail} = this.state;

    var birthday = moment(this.state.birthday).format('YYYY-MM-DD').toString();
    var today = moment(new Date()).format('YYYY-MM-DD').toString();

    return (
      <Grid>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>Modifier votre profil</h2>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid container spacing={3} style={{marginTop: '5vh'}}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              classes={{root: classes.textField}}
              value={user.firstname || ''}
              onChange={this.onChangeName}
              name={'firstname'}
              placeholder={'Prénom'}
              variant={'outlined'}
              label={'Prénom'}
              error={!!(errors && errors.firstname)}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              classes={{root: classes.textField}}
              value={user.name || ''}
              onChange={this.onChangeName}
              name={'name'}
              placeholder={'Nom'}
              variant={'outlined'}
              label={'Nom'}
              error={!!(errors && errors.name)}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextField
              classes={{root: classes.textField}}
              value={user.description || ''}
              multiline
              rows={5}
              variant={'outlined'}
              onChange={this.onChange}
              name={'description'}
              label={'A propos de moi'}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
                style={{display: 'flex', alignItems: 'flex-end', width: '100%', flexDirection: 'column'}}>
            <Typography>{`${MAX_DESCRIPTION_LENGTH} caractères max`}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h2 style={{whiteSpace: 'nowrap'}}>Informations personnelles</h2>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '10vh'}}>
            <Grid item xl={6} lg={6} xs={12} sm={6} md={6}>
              <TextField
                classes={{root: classes.textField}}
                value={user.gender || ''}
                select
                variant={'outlined'}
                onChange={this.onChange}
                name={'gender'}
                placeholder={'Sexe'}
                label={'Sexe'}
              >
                <MenuItem value={'Homme'}>
                  Homme
                </MenuItem>
                <MenuItem value={'Femme'}>
                  Femme
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xl={6} lg={6} xs={12} sm={6} md={6}>
              <TextField
                classes={{root: classes.textFieldDatePicker}}
                id="filled-with-placeholder"
                variant="outlined"
                type="date"
                value={birthday}
                onChange={this.onChangeBirthday}
                InputLabelProps={{shrink: true}}
                InputProps={{inputProps: {min: "1900-01-01", max: today}}}
                error={!!(errors && errors.birthday)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                classes={{root: classes.textField}}
                value={user.email || ''}
                onChange={this.onChange}
                name={'email'}
                placeholder={'Email'}
                variant={'outlined'}
                label={'Adresse email'}
                error={!!(errors && errors.email)}
                InputProps={{
                  endAdornment: userEmail === user.email && user.is_confirmed === true ? <CheckCircleOutlineIcon /> : null
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6} style={{display: 'flex'}}>
              <Button
                variant="contained"
                color={'primary'}
                onClick={() => user.is_confirmed ? this.onSubmit() : this.sendEmail()}
                disabled={user.email ? !!(userEmail === user.email && user.is_confirmed) : true}
                classes={{root: classes.buttonCheckPhone}}
              >
                {userEmail === user.email && user.is_confirmed === true ? 'Votre email est vérifié' : userEmail !== user.email ? 'Enregistrer votre nouvel email' : 'Vérifier votre email'}
              </Button>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                classes={{root: classes.textField}}
                value={user.phone || ''}
                onChange={this.onChangePhone}
                name={'phone'}
                placeholder={'Téléphone'}
                variant={'outlined'}
                label={'Téléphone'}
                InputProps={{
                  endAdornment: phone === user.phone && user.phone_confirmed === true ? <CheckCircleOutlineIcon /> : null
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6} style={{display: 'flex'}}>
              <Button
                variant="contained"
                color={'primary'}
                onClick={this.submitPhone}
                disabled={user.phone ? !!(phone === user.phone && user.phone_confirmed || user.phone.length !== 11) : true}
                classes={{root: classes.buttonCheckPhone}}
              >
                {phone === user.phone && user.phone_confirmed === true ? 'Votre téléphone est vérifié' : phone !== user.phone ? 'Enregistrer votre nouveau téléphone' : 'Vérifiez votre téléphone'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h2>Informations facultatives</h2>
          </Grid>
          <Grid container style={{marginTop: '10vh'}} spacing={3}>
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <TextField
                classes={{root: classes.textField}}
                value={user.diplomes || ''}
                onChange={this.onChangeName}
                name={'diplomes'}
                placeholder={'Diplomes'}
                variant={'outlined'}
                label={'Diplômes'}
              />
            </Grid>
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <TextField
                classes={{root: classes.textField}}
                value={user.school || ''}
                onChange={this.onChangeName}
                name={'school'}
                placeholder={'Ecoles'}
                variant={'outlined'}
                label={'Ecoles'}
              />
            </Grid>
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <TextField
                classes={{root: classes.textField}}
                value={user.job || ''}
                onChange={this.onChangeName}
                name={'job'}
                placeholder={'Emploi'}
                variant={'outlined'}
                label={'Emploi'}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid style={{marginBottom: '12vh'}}>
          <Grid style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5vh'}}>
            <Button
              onClick={this.onSubmit}
              variant="contained"
              color="primary"
              classes={{root: classes.button}}
              disabled={user.firstname === "" || user.name === "" || userEmail === "" || user.phone === ""}
            >
              Enregistrer
            </Button>
          </Grid>
        </Grid>
        <SnackBar severity={this.state.checkPhoneSeverity} message={this.state.checkPhoneMessage}
                  open={this.state.checkPhoneState} closeSnackBar={() => this.setState({checkPhoneState: false})}/>
        <SnackBar severity={this.state.checkEmailSeverity} message={this.state.checkEmailMessage}
                  open={this.state.checkEmailState} closeSnackBar={() => this.setState({checkEmailState: false})}/>

        {
          this.state.errors ?
            Object.keys(this.state.errors).map(res => {
              let response = Object.values(this.state.errors[res])
              return (
                < SnackBar severity={"error"} message={response}
                           open={this.state.openErrors}
                           closeSnackBar={() => this.setState({openErrors: false})}/>
              )
            }) : null
        }
      </Grid>
    )
  };

  render() {
    const {classes, index} = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>Profil - Modifier mon profil - My Alfred </title>
          <meta property="description"
                content="Plateforme d’échange de services entre particuliers. Services rémunérés à des prix justes ! Profitez des talents de nos Alfred et trouvez un Alfred bricoleur, petsitter, pâtissier, décorateur, près de chez vous dans toute la france ! Des milliers de services proposés, trouvez le vôtre !"/>
        </Helmet>
        <Hidden only={['xs', 'sm', 'md']}>
          <LayoutAccount index={index}>
            {this.content(classes)}
          </LayoutAccount>
        </Hidden>
        <Hidden only={['lg', 'xl']}>
          <LayoutMobile currentIndex={4}>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>
        {this.dialogConfirmPhone(classes)}
      </React.Fragment>
    );
  };
}

export default withStyles(styles)(editProfile);
