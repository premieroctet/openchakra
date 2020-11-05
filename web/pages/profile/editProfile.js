import React, {Fragment} from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MultipleSelect from 'react-select';
import DatePicker, {registerLocale} from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import {toast} from 'react-toastify';
import {Helmet} from 'react-helmet';
import styles from '../../static/css/pages/profile/editProfile/editProfile';
import cookie from 'react-cookies';
import Hidden from "@material-ui/core/Hidden";
import LayoutAccount from "../../hoc/Layout/LayoutAccount";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import Divider from "@material-ui/core/Divider";

const {isPhoneOk} = require('../../utils/sms');

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
    };
    this.handleChangeLanguages = this.handleChangeLanguages.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({user: user, phone: user.phone});
        this.setState({birthday: user.birthday});
        this.setState({
          selectedLanguages: user.languages.map(b => ({
            label: b,
            value: b,
          })),
        });
      })
      .catch(err => {
          console.error(err);
          if (err.response.status === 401 || err.response.status === 403) {
            cookie.remove('token', {path: '/'});
            Router.push({pathname: '/login'});
          }
        },
      );
  }

  onChange = e => {
    const state = this.state.user;
    var {name, value} = e.target;
    if (name === 'phone') {
      const phoneOk = isPhoneOk(value);
      if (phoneOk && e.target.value.startsWith('0')) {
        value = '33' + value.substring(1);
      }
    }

    state[e.target.name] = value;
    this.setState({user: state});
  };

  onChangeBirthday = date => {
    this.setState({birthday: date});
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
        toast.info('Profil modifié avec succès');
        this.componentDidMount();

      })
      .catch();
  };

  content = (classes) =>{
    return(
      <Grid>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>Modifier votre profil</h2>
          </Grid>
        </Grid>
        <Grid style={{}}>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
        <Grid container spacing={3} style={{marginTop: '5vh'}}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              classes={{root: classes.textField}}
              value={this.state.user.firstname || ''}
              onChange={this.onChange}
              name={'firstname'}
              placeholder={'Prénom'}
              variant={'outlined'}
              label={'Prénom'}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              classes={{root: classes.textField}}
              value={this.state.user.name || ''}
              onChange={this.onChange}
              name={'name'}
              placeholder={'Nom'}
              variant={'outlined'}
              label={'Nom'}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              classes={{root: classes.textField}}
              value={this.state.user.description || ''}
              multiline
              rows={5}
              variant={'outlined'}
              onChange={this.onChange}
              name={'description'}
              label={'A propos de moi'}
            />
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
            <Grid item lg={2} xs={12} sm={5} md={3}>
              <TextField
                classes={{root: classes.textField}}
                value={this.state.user.gender || ''}
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
            <Grid item lg={3} xs={12} sm={6} md={3}>
              <TextField
                classes={{root: classes.textFieldDatePicker}}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputComponent:(inputRef) => {
                    return (
                      <DatePicker
                        selected={Date.parse(this.state.birthday)}
                        onChange={(date) => this.onChangeBirthday(date)}
                        locale='fr'
                        placeholderText="Date de naissance"
                        showYearDropdown
                        showMonthDropdown
                        className={classes.datePicker}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                      />
                    )
                  },
                  disableUnderline: true
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} md={6} sm={6}>
              <TextField
                classes={{root: classes.textField}}
                value={this.state.user.email || ''}
                onChange={this.onChange}
                margin="normal"
                name={'email'}
                placeholder={'Email'}
                variant={'outlined'}
                label={'Adresse email'}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6} md={6} sm={6}>
            <TextField
              classes={{root: classes.textField}}
              value={this.state.user.phone || ''}
              type={'number'}
              onChange={this.onChange}
              margin="normal"
              name={'phone'}
              placeholder={'Téléphone'}
              variant={'outlined'}
              label={'Téléphone'}
            />
          </Grid>
          <Grid item xs={12} lg={6} md={6} sm={6}>
            <TextField
              classes={{root: classes.textField}}
              value={this.state.user.emergency_phone || ''}
              type={'number'}
              onChange={this.onChange}
              margin="normal"
              name={'emergency_phone'}
              placeholder={'Numéro d\'urgence'}
              variant={'outlined'}
              label={'Numéro d\'urgence'}
            />
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h2>Informations facultatives</h2>
          </Grid>
          <Grid container style={{marginTop: '10vh'}}>
            <Grid item xs={12} lg={6} md={6} sm={6}>
              <TextField
                classes={{root: classes.textField}}
                value={this.state.user.diplomes || ''}
                onChange={this.onChange}
                name={'diplomes'}
                placeholder={'Diplomes'}
                variant={'outlined'}
                label={'Diplômes'}
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6}>
              <TextField
                classes={{root: classes.textField}}
                value={this.state.user.school || ''}
                onChange={this.onChange}
                margin="normal"
                name={'school'}
                placeholder={'Ecoles'}
                variant={'outlined'}
                label={'Ecoles'}
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6}>
              <TextField
                classes={{root: classes.textField}}
                value={this.state.user.job || ''}
                onChange={this.onChange}
                margin="normal"
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
            >
              Enregistrer
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  };


  render() {
    const {classes} = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>Profil - Modifier mon profil - My Alfred </title>
          <meta property="description"
                content="Plateforme d’échange de services entre particuliers. Services rémunérés à des prix justes ! Profitez des talents de nos Alfred et trouvez un Alfred bricoleur, petsitter, pâtissier, décorateur, près de chez vous dans toute la france ! Des milliers de services proposés, trouvez le vôtre !"/>
        </Helmet>
        <Hidden only={['xs', 'sm', 'md']}>
          <LayoutAccount>
            {this.content(classes)}
          </LayoutAccount>
        </Hidden>
        <Hidden only={['lg', 'xl']}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>
      </Fragment>
    );
  };
}

export default withStyles(styles)(editProfile);
