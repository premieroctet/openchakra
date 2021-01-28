import SnackBar from "../../components/SnackBar/SnackBar";

const {clearAuthenticationToken}=require('../../utils/authentication');
const {setAxiosAuthentication}=require('../../utils/authentication');
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
const {MAX_DESCRIPTION_LENGTH}=require('../../utils/consts')
const {isPhoneOk} = require('../../utils/sms');
const moment = require('moment');

registerLocale('fr', fr);
moment.locale('fr');

const options = [
  {value: 'Français', label: 'Français'},
  {value: 'Anglais', label: 'Anglais'},
  {value: 'Allemand', label: 'Allemand'},
  {value: 'Espagnol', label: 'Espagnol'},
  {value: 'Chinois', label: 'Chinois'},
  {value: 'Arabe', label: 'Arabe'},
  {value: 'Portugais', label: 'Portugais'},
  {value: 'Russe', label: 'Russe'},
  {value: 'Japonais', label: 'Japonais'},
];

const momentDateFormat = 'dd/MM/yyyy';

class editProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      phone: '',
      languages: [],
      selectedLanguages: null,
      birthday: null,
      dpDate: moment().toDate(),
      ipDate: moment().format(momentDateFormat),
      errors:{},
      open: false,
      openErrors: false
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
          selectedLanguages: user.languages.map(b => ({
            label: b,
            value: b,
          })),
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
    if(name === 'name' || name === 'firstname'){
      value = value.charAt(0).toUpperCase() + value.slice(1)
    }
    if(name === 'description'){
      value = value.slice(0, MAX_DESCRIPTION_LENGTH)
    }
    state[e.target.name] = value;
    this.setState({user: state});
  };

  onChangeBirthday = e => {
    this.setState({birthday: e.target.value});
  };

  handleChangeLanguages = selectedLanguages => {
    this.setState({selectedLanguages});

  };

  onSubmit = e => {
    e.preventDefault();
    let arrayLanguages = [];
    if (this.state.selectedLanguages != null) {
      this.state.selectedLanguages.forEach(w => {
        arrayLanguages.push(w.value);
      });
    }
    const languages = arrayLanguages;
    const birthday = this.state.birthday;
    const {email, name, firstname, description, gender, phone, job, diplomes, school, emergency_phone} = this.state.user;

    axios.put('/myAlfred/api/users/profile/editProfile', {
      email, name, firstname, birthday, description, gender, phone, job, diplomes, school,
      emergency_phone, languages,
    })
      .then(res => {
        this.setState({errors: {}, open: true}, () => this.loadUser());
      })
      .catch( err => {
        this.setState({openErrors: true, errors: err.response.data});
      });
  };

  content = (classes) =>{
    const {errors, user}=this.state;
    var birthday = moment(this.state.birthday).format('YYYY-MM-DD').toString();
    var today = moment(new Date()).format('YYYY-MM-DD').toString();

    return(
      <Grid>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>Modifier votre profil</h2>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
        <Grid container spacing={3} style={{marginTop: '5vh'}}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              classes={{root: classes.textField}}
              value={user.firstname || ''}
              onChange={this.onChange}
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
              onChange={this.onChange}
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
          <Grid style={{ display: 'flex', alignItems: 'flex-end', width: '100%', flexDirection: 'column' }}>
              <Typography>{`${MAX_DESCRIPTION_LENGTH} caractères max`}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h2 style={{whiteSpace: 'nowrap'}}>Informations personnelles</h2>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '10vh'}}>
            <Grid item xl={6} lg={6} xs={12} sm={5} md={3}>
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
            <Grid item xl={6} lg={6} xs={12} sm={6} md={3}>
              <TextField
                classes={{root: classes.textFieldDatePicker}}
                id="filled-with-placeholder"
                variant="outlined"
                type="date"
                value={birthday}
                onChange={this.onChangeBirthday}
                InputLabelProps={{ shrink: true }}
                InputProps={{inputProps: { min: "1900-01-01", max: today} }}
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
                helperText={errors.email}
                error={!!(errors && errors.email)}
              />
            </Grid>
          <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
            <TextField
              classes={{root: classes.textField}}
              value={user.phone || ''}
              onChange={this.onChange}
              name={'phone'}
              placeholder={'Téléphone'}
              variant={'outlined'}
              label={'Téléphone'}
            />
          </Grid>
          <Grid item xs={12} lg={12} md={6} sm={6} xl={12}>
            <TextField
              classes={{root: classes.textField}}
              value={user.emergency_phone || ''}
              type={'number'}
              onChange={this.onChange}
              name={'emergency_phone'}
              placeholder={'Numéro d\'urgence'}
              variant={'outlined'}
              label={'Numéro d\'urgence'}
            />
          </Grid>
        </Grid>
      </Grid>
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
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
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChange}
                name={'job'}
                placeholder={'Emploi'}
                variant={'outlined'}
                label={'Emploi'}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h2>Langues</h2>
          </Grid>
          <Grid container style={{marginTop: '10vh'}}>
            <Grid item xs={12}>
              <MultipleSelect
                value={this.state.selectedLanguages}
                onChange={this.handleChangeLanguages}
                options={options}
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
        </Grid>
        <Grid style={{marginBottom: '12vh'}}>
          <Grid style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5vh'}}>
            <Button
              onClick={this.onSubmit}
              variant="contained"
              color="primary"
              classes={{root: classes.button}}
              disabled={user.firstname === "" || user.name === "" || user.email === "" || user.phone === "" }
            >
              Enregistrer
            </Button>
          </Grid>
        </Grid>
        <SnackBar severity={"success"} message={'Profil modifié avec succès'} open={this.state.open} closeSnackBar={() => this.setState({open: false})}/>
        {
          this.state.errors ?
            Object.keys(this.state.errors).map(res => {
              return(
                <SnackBar severity={"error"} message={this.state.errors[res]} open={this.state.openErrors} closeSnackBar={() => this.setState({openErrors: false})}/>
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
      </React.Fragment>
    );
  };
}

export default withStyles(styles)(editProfile);
