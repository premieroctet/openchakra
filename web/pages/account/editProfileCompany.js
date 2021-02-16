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
const {snackBarSuccess, snackBarError} = require('../../utils/notifications');


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
      name: ''
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
          name: user.name
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

  handleChange = (event) => {
    let {name, value} = event.target;
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

  handleInvoice = ({suggestion}) =>{
    this.setState({ invoice_company : suggestion })
  };

  onSubmitProfilCompany = () =>{
    const {user} = this.state;

    const profilCompany = {
      id: user.company,
      activity: this.state.activityArea,
      size: this.state.sizeCompany,
      description: this.state.descriptionCompany,
      name: this.state.companyName,
      siret: this.state.siret,
      vat_number: this.state.vat_subject ? null : this.state.tva
    };

    axios.put('/myAlfred/api/companies/profile/editProfile', profilCompany
    ).then( res =>{
      snackBarSuccess("Profil modifié avec succès");
    }).catch( err => {
      err.response ?
        snackBarError(err.response.data) : null
    })
  };

  onSubmitAbout = () =>{

    const profilUser = {
      position: this.state.position,
      email: this.state.email,
      name: this.state.name,
      firstname: this.state.firstname,
    };

    axios.put('/myAlfred/api/users/profile/editProfile', profilUser)
      .then(res => {
        snackBarSuccess("Profil modifié avec succès");
       this.loadUser();
      })
      .catch(err => {
        err.response ?
          snackBarError(err.response.data) : null
      });
  };

  content = (classes) => {
    const{activityArea, sizeCompany, descriptionCompany, companyName, siret, tva, vat_subject, position, email, firstName, name, user} = this.state;

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
              placeholder='Adresse de facturation'
              options={{
                appId: 'plKATRG826CP',
                apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                language: 'fr',
                countries: ['fr'],
                type: 'address',
              }}
              className={classes.editProfilCompanyAlgoliaPlace}
              onChange={(suggestion) => this.handleInvoice(suggestion)}
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
            <h2 style={{whiteSpace: 'nowrap'}}>A propos de vous</h2>
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
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                value={position}
                name={'position'}
                placeholder={'Poste occupé'}
                variant={'outlined'}
                label={'Poste occupé'}
                classes={{root: classes.textField}}
                onChange={this.handleChange}

              />
            </Grid>
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
  }
}

export default withStyles(styles)(editProfileCompany)
