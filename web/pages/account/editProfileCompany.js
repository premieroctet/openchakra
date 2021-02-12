import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/pages/profile/editProfileCompany/editProfileCompany'
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



class editProfileCompany extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      user: {}
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

  content = (classes) => {
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
              value={''}
              name={'companyName'}
              placeholder={'Nom de l’entreprise'}
              variant={'outlined'}
              label={'Nom de l’entreprise'}
              classes={{root: classes.textField}}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              value={''}
              name={'invoice'}
              placeholder={'Adresse de facturation'}
              variant={'outlined'}
              label={'Adresse de facturation'}
              classes={{root: classes.textField}}

            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              value={''}
              name={'siret'}
              placeholder={'Siret'}
              variant={'outlined'}
              label={'Siret'}
              classes={{root: classes.textField}}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              value={''}
              name={'tva'}
              placeholder={'N° TVA'}
              variant={'outlined'}
              label={'N° TVA'}
              classes={{root: classes.textField}}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              value={''}
              name={'sizeCompany'}
              placeholder={'Taille de l’entreprise'}
              variant={'outlined'}
              label={'Taille de l’entreprise'}
              classes={{root: classes.textField}}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              value={''}
              name={'activityArea'}
              placeholder={'Secteur d’activité'}
              variant={'outlined'}
              label={'Secteur d’activité'}
              classes={{root: classes.textField}}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextField
              value={''}
              multiline
              rows={5}
              variant={'outlined'}
              name={'descriptionCompany'}
              placeholder={'A propos'}
              label={'A propos'}
              classes={{root: classes.textField}}

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
            <h2 style={{whiteSpace: 'nowrap'}}>A propos de vous</h2>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '5vh'}}>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                value={''}
                name={'name'}
                placeholder={'Nom'}
                variant={'outlined'}
                label={'Nom'}
                classes={{root: classes.textField}}
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                value={''}
                name={'firstName'}
                placeholder={'Prénom'}
                variant={'outlined'}
                label={'Prénom'}
                classes={{root: classes.textField}}
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                value={''}
                name={'email'}
                placeholder={'Email'}
                variant={'outlined'}
                label={'Adresse email'}
                classes={{root: classes.textField}}

              />
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <TextField
                value={''}
                name={'positionHeld'}
                placeholder={'Poste occupé'}
                variant={'outlined'}
                label={'Poste occupé'}
                classes={{root: classes.textField}}
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
