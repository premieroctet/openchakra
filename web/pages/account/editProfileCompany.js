import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/pages/profile/editProfileCompany/editProfileCompany';
import {Helmet} from "react-helmet";
import Hidden from "@material-ui/core/Hidden";
import LayoutAccount from "../../hoc/Layout/LayoutAccount";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import Router from "next/router";
import axios from "axios";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const {setAxiosAuthentication} = require('../../utils/authentication');
const {MAX_DESCRIPTION_LENGTH} = require('../../utils/consts');
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import AlgoliaPlaces from "algolia-places-react";
import {COMPANY_ACTIVITY, COMPANY_SIZE} from '../../utils/consts';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
const {snackBarSuccess, snackBarError} = require('../../utils/notifications');
const {is_b2b_admin} = require('../../utils/context');
import DateField from '../../components/DateField/DateField'
const moment=require('moment');
moment.locale('fr');

class editProfileCompany extends React.Component{
  constructor(props) {
    super(props);
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
      birthday : null,
    }

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
          user: user,
          email: user.email,
          firstName: user.firstname,
          name: user.name,
          position: user.position,
          birthday: user.birthday ? moment(user.birthday).format('YYYY-MM-DD') : null,
        });
        if(!is_b2b_admin(user)){
          Router.push({pathname: '/'});
        }
      })
      .catch(err => {
          console.error(err);
          if (err.response.status === 401 || err.response.status === 403) {
            Router.push({pathname: '/'});
          }
        },
      );

    axios.get('/myAlfred/api/companies/current').then(res =>{
      let company = res.data;
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
        website: company.website

      })
    }).catch(err => {
      console.error(err)
    })
  };

  handleChange = (event) => {
    let {name, value} = event.target;
    console.log(`onCHange:${name}=>${value}`)
    if (name === 'siret') {
      if(value.match(/^[0-9]*$/)){
        value = value.replace(/ /g, '');
        this.setState({[name] : value});
      }
    }
    else if(name === 'vat_subject') {
      this.setState({[name]: !this.state.vat_subject})
    }else{
      this.setState({[name] : value});
    }
  };

  onBillingAdressChange = ({suggestion}) =>{
    const newAddress = suggestion ?
      {
        city: suggestion.city,
        address: suggestion.name,
        zip_code: suggestion.postcode,
        country: suggestion.country,
        gps:{
          lat: suggestion.latlng.lat,
          lng: suggestion.latlng.lng,
        }
      }
      :
      null;
    this.setState({ billing_address : newAddress })
  };

  onSubmitProfilCompany = () =>{

    axios.put('/myAlfred/api/companies/profile/editProfile', {
      activity: this.state.activityArea,
      size: this.state.sizeCompany,
      description: this.state.descriptionCompany,
      name: this.state.companyName,
      siret: this.state.siret,
      vat_number: this.state.vat_subject ? this.state.tva : '',
      billing_address: this.state.billing_address,
      vat_subject: this.state.vat_subject,
      website: this.state.website
      }
    ).then( res =>{
      snackBarSuccess("Profil modifié avec succès");
      this.loadUser()
    }).catch( err => {
      snackBarError(err.response.data);
    })
  };

  onSubmitAbout = () =>{

    var postData = {
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
      .then(res => {
        snackBarSuccess("Profil modifié avec succès");
       this.loadUser();
      })
      .catch(err => {
        err.response ?
          snackBarError(err.response.data) : null
      });
  };

  sendEmail = () => {
    axios.get('/myAlfred/api/users/sendMailVerification')
      .then(() => {
        snackBarSuccess("Mail envoyé")
      })
      .catch( err => {
        snackBarError('Mail non envoyé')
      });
  };

  content = (classes) => {
    const{activityArea, sizeCompany, descriptionCompany, companyName, siret, tva, vat_subject, position, email, firstName, name, user, billing_address, placeholderAlgolia, birthday} = this.state;

    const position_width = this.is_legal_representative() ? 6 : 12
    return(
      <Grid>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>Mes informations</h2>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <h2 style={{whiteSpace: 'nowrap'}}>Votre profil entreprise</h2>
        </Grid>
        <Grid container spacing={3} style={{marginTop: '5vh'}}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              value={companyName}
              name={'companyName'}
              placeholder={'Nom de l’entreprise'}
              variant={'outlined'}
              label={'Nom de l’entreprise'}
              classes={{root: classes.textField}}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12} className={classes.containerAlgolia}>
            <AlgoliaPlaces
              key={moment()}
              placeholder={billing_address ? `${billing_address.address}, ${billing_address.zip_code}, ${billing_address.country}` : 'Adresse de facturation'}
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
              placeholder={'Siret'}
              variant={'outlined'}
              label={'Siret'}
              classes={{root: classes.textField}}
              onChange={this.handleChange}

            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              value={tva}
              name={'tva'}
              placeholder={'N° TVA'}
              variant={'outlined'}
              label={'N° TVA'}
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
                      name="vat_subject"
                      onChange={this.handleChange}
                      color="primary"
                    />
                  }
                  label="Assujetti à la TVA"
                />
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
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
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
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
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextField
              value={descriptionCompany}
              multiline
              rows={5}
              variant={'outlined'}
              name={'descriptionCompany'}
              placeholder={'A propos'}
              label={'A propos'}
              classes={{root: classes.textField}}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
                style={{display: 'flex', alignItems: 'flex-end', width: '100%', flexDirection: 'column'}}>
            <Typography>{`${MAX_DESCRIPTION_LENGTH} caractères max`}</Typography>
          </Grid>
        </Grid>
        <Grid style={{marginBottom: '12vh'}}>
          <Grid style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5vh'}}>
            <Button
              onClick={this.onSubmitProfilCompany}
              variant="contained"
              color="primary"
              classes={{root: classes.button}}
            >
              Enregistrer
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h2 style={{whiteSpace: 'nowrap'}}>À propos de vous
            { this.is_legal_representative() ? " - vous êtes le représentant légal" : null }
            </h2>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '5vh'}}>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                value={name}
                name={'name'}
                placeholder={'Nom'}
                variant={'outlined'}
                label={'Nom'}
                classes={{root: classes.textField}}
                onChange={this.handleChange}

              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                value={firstName}
                name={'firstName'}
                placeholder={'Prénom'}
                variant={'outlined'}
                label={'Prénom'}
                classes={{root: classes.textField}}
                onChange={this.handleChange}

              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                value={email}
                name={'email'}
                placeholder={'Email'}
                variant={'outlined'}
                label={'Adresse email'}
                classes={{root: classes.textField}}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: email === user.email && user.is_confirmed === true ? <CheckCircleOutlineIcon /> : null
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6} style={{display: 'flex'}}>
              <Button
                variant="contained"
                color={'primary'}
                onClick={() => user.is_confirmed ? this.onSubmitAbout() : this.sendEmail()}
                disabled={user.email ? !!(email === user.email && user.is_confirmed) : true}
                classes={{root: classes.buttonCheckPhone}}
              >
                {email === user.email && user.is_confirmed === true ? 'Votre email est vérifié' : email !== user.email ? 'Enregistrer votre nouvel email' : 'Vérifier votre email'}
              </Button>
            </Grid>
            <Grid item xs={position_width} lg={position_width} md={position_width} sm={position_width} xl={position_width}>
              <TextField
                value={position}
                name={'position'}
                label={'Fonction'}
                placeholder={'Fonction'}
                variant={'outlined'}
                label={'Fonction'}
                classes={{root: classes.textField}}
                onChange={this.handleChange}
              />
            </Grid>
            { this.is_legal_representative() ?
              <Grid item xl={6} lg={6} xs={6} sm={6} md={6}>
                <DateField
                  classes={{root: classes.textFieldDatePicker}}
                  variant="outlined"
                  label={'Date de naissance'}
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
            <Button
              onClick={this.onSubmitAbout}
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

  is_legal_representative = () => {
    const {user, company}=this.state
    if (!user || !company) {
      return false
    }

    return company.representative == user._id
  }

  render() {
    const {classes, index} = this.props;
    const {user} = this.state;

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Profil - Modifier mon profil - My Alfred </title>
          <meta property="description"
                content="Plateforme d’échange de services entre particuliers. Services rémunérés à des prix justes ! Profitez des talents de nos Alfred et trouvez un Alfred bricoleur, petsitter, pâtissier, décorateur, près de chez vous dans toute la france ! Des milliers de services proposés, trouvez le vôtre !"/>
        </Helmet>
        <Hidden only={['xs', 'sm', 'md']}>
          <LayoutAccount index={index} contextUser={user}>
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
  }
}

export default withStyles(styles)(editProfileCompany)
