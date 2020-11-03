import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {toast} from 'react-toastify';
import {Helmet} from 'react-helmet';
import styles from '../../static/css/pages/security/security';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {checkPass1, checkPass2} from '../../utils/passwords';
import cookie from 'react-cookies';
import LayoutAccount from "../../hoc/Layout/LayoutAccount";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";


moment.locale('fr');

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 72,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 2,
    '&$checked': {
      transform: 'translateX(46px)',
      color: 'rgba(248,207,97,1)',
      '& + $track': {
        backgroundColor: 'white',
        opacity: 1,
        border: `1px solid ${theme.palette.grey[400]}`,
      },
    },
    '&$focusVisible $thumb': {
      color: 'rgba(248,207,97,1)',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 20,
    height: 20,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});


class security extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      password: '',
      newPassword: '',
      newPassword2: '',
      check: false,
      check1: false,
      check2: false,
      wrongPassword: false,
      last_login: [],
      index_google: false,
      alfred: false,
      open: false,
      open2: false,
    };
  }

  static getInitialProps({query: {indexAccount}}) {
    return {index: indexAccount};

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({
          user: user,
          last_login: user.last_login,
          index_google: user.index_google,
          alfred: user.is_alfred
        });
      })
      .catch(err => {
        if (err.response.status === 401 || err.response.status === 403) {
          cookie.remove('token', {path: '/'});
          Router.push({pathname: '/'});
        }
      });
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  onChangePassword = e => {
    this.setState({[e.target.name]: e.target.value, wrongPassword: false});
    if (e.target.value !== '') {
      this.setState({check: true});

    } else {
      this.setState({check: false});
    }
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.checked});
    const data = {index_google: !this.state.index_google};
    axios.put('/myAlfred/api/users/account/indexGoogle', data)
      .then(() => {
        toast.info('Compte mis à jour');
      })
      .catch( err => {console.error(err)});
  };

  deleteShop = () => {
    axios.delete('/myAlfred/api/serviceUser/current/allServices')
      .then(() => {
        axios.delete('/myAlfred/api/shop/current/delete')
          .then(() => {
            axios.put('/myAlfred/api/users/users/deleteAlfred')
              .then(() => {
                this.setState({open: false});
                toast.error('Boutique supprimée');
                cookie.remove('token', {path: '/'});
                Router.push('/');
              })
              .catch(err => {console.error(err)});
          })
          .catch(err => {console.error(err)});


      })
      .catch(err => {console.error(err)});
    axios.delete('/myAlfred/api/availability/currentAlfred')
      .then()
      .catch(err => {console.error(err)});
  };

  deleteAccount = () => {
    if (this.state.alfred === true) {
      axios.delete('/myAlfred/api/serviceUser/current/allServices')
        .then(() => {
          axios.delete('/myAlfred/api/shop/current/delete')
            .then(() => {
              axios.put('/myAlfred/api/users/current/delete')
                .then(() => {
                  this.setState({open2: false});
                  toast.error('Compte désactivé');
                  cookie.remove('token', {path: '/'});
                  Router.push('/');
                })
                .catch(err => {console.error(err)});
            })
            .catch(err => {console.error(err)});
        })
        .catch(err => {console.error(err)});
      axios.delete('/myAlfred/api/availability/currentAlfred')
        .then()
        .catch(err => {console.error(err)});
    } else {
      axios.put('/myAlfred/api/users/current/delete')
        .then(() => {
          this.setState({open2: false});
          toast.error('Compte désactivé');
          cookie.remove('token', {path: '/'});
          Router.push('/');
        })
        .catch(err => {console.error(err)});
    }
  };

  onClick1 = () => {
    this.setState({
      check1: checkPass1(this.state.newPassword).check,
      check2: checkPass2(this.state.newPassword, this.state.newPassword2).check,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {password: this.state.password, newPassword: this.state.newPassword};
    axios
      .put('/myAlfred/api/users/profile/editPassword', data)
      .then(() => {
        toast.info('Mot de passe modifié');
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch(err => {
        console.error(err);
        if (err.response.data.wrongPassword) {
          this.setState({wrongPassword: true});
        }
      });
  };

  handleClickOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleClickOpen2() {
    this.setState({open2: true});
  }

  handleClose2() {
    this.setState({open2: false});
  }

  modalDeleteAccount = () =>{
    return(
      <Dialog
        open={this.state.open2}
        onClose={() => this.handleClose2()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Désactiver votre compte ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Attention, cette action est irréversible. Si vous souhaitez ne plus être référencé par les
            moteurs de recherche, vous pouvez désactiver l’indexation par les moteurs de recherche.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose2()} color="primary">
            Annuler
          </Button>
          <Button onClick={() => this.deleteAccount()} color="secondary" autoFocus>
            Désactiver
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  modalDeleteShop = () =>{
    return(
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Supprimer votre boutique ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Attention, cette action est irréversible. Si vous souhaitez garder votre boutique sans que les
            utilisateurs puissent réserver vos services, vous pouvez supprimer vos disponibilités sur votre
            calendrier.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Annuler
          </Button>
          <Button onClick={() => this.deleteShop()} color="secondary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };


  render() {
    const {classes, index} = this.props;
    const checkButtonValidate = this.state.check && this.state.check1 && this.state.check2;
    const {last_login, open, open2, user} = this.state;

    return (
      <Fragment>
        <Helmet>
          <title>Compte - Sécurité - My Alfred </title>
          <meta property="description"
                content="Modifiez votre mot de passe et gérer la sécurité de votre compte My Alfred. Des milliers de particuliers et auto-entrepreneurs proches de chez vous prêts à vous rendre service ! Paiement sécurisé. Inscription 100% gratuite !"/>
        </Helmet>
        <LayoutAccount index={index}>
          <Grid  style={{display: 'flex', flexDirection: 'column', width: '100%'}} >
            <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
              <Grid>
                <h2>Sécurité</h2>
              </Grid>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>Modifier votre mot de passe et gérer votre compte.</Typography>
              </Grid>
            </Grid>
            <Grid>
              <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
            </Grid>
            <Grid>
              <Grid>
                <h3>Mot de passe</h3>
              </Grid>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>Modifier votre mot de passe.</Typography>
              </Grid>
            </Grid>
            <Grid style={{marginTop: '10vh'}}>
              <Grid>
                <Grid style={{display: 'flex'}}>
                  <form onSubmit={this.onSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4} xl={12}>
                        <TextField
                          label={'Mot de passe actuel'}
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          variant={'outlined'}
                          error={this.state.wrongPassword}
                          helperText={this.state.wrongPassword ? 'Mot de passe erroné' : ''}
                          classes={{root: classes.textfield}}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}  xl={12}>
                        <TextField
                          id="standard-with-placeholder"
                          label={'Nouveau mot de passe'}
                          type="password"
                          name="newPassword"
                          value={this.state.newPassword}
                          onChange={this.onChange}
                          variant={'outlined'}
                          onKeyUp={this.onClick1}
                          error={checkPass1(this.state.newPassword).error}
                          helperText={checkPass1(this.state.newPassword).error}
                          classes={{root: classes.textfield}}

                        />
                      </Grid>
                      <Grid item xs={12} md={4}  xl={12}>
                        <TextField
                          id="standard-with-placeholder"
                          label={'Répéter le mot de passe'}
                          type="password"
                          name="newPassword2"
                          value={this.state.newPassword2}
                          onChange={this.onChange}
                          variant={'outlined'}
                          onKeyUp={this.onClick1}
                          error={checkPass2(this.state.newPassword, this.state.newPassword2).error}
                          helperText={checkPass2(this.state.newPassword, this.state.newPassword2).error}
                          classes={{root: classes.textfield}}

                        />
                      </Grid>
                    </Grid>
                    <Grid item style={{display: 'flex', justifyContent: 'left', marginTop: 30}}>
                      <Button disabled={!checkButtonValidate} type="submit" className={classes.buttonSave} variant="contained">
                        Valider
                      </Button>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
            </Grid>
            <Grid>
              <Grid>
                <h3>Mon compte</h3>
              </Grid>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>Gérez votre compte.</Typography>
              </Grid>
            </Grid>
            <Grid style={{marginTop: '10vh'}}>
              <Grid container style={{alignItems: 'center'}} spacing={3}>
                <Grid item xl={8}>
                  <h4>Je souhaite que mon compte apparaisse dans les résultats des moteurs de recherche</h4>
                </Grid>
                <Grid item xl={4} style={{flexDirection: 'row-reverse', display: 'flex'}}>
                  <IOSSwitch
                    checked={this.state.index_google}
                    onChange={this.handleChange('index_google')}
                    value={'index_google'}
                    color="primary"
                    inputProps={{'aria-label': 'primary checkbox'}}
                  />
                </Grid>
              </Grid>
              <Grid>
                {user.is_alfred ?
                  <Grid container spacing={3} style={{alignItems: 'center'}}>
                    <Grid item xl={8}>
                      <h4>Je souhaite supprimer ma boutique de services.</h4>
                    </Grid>
                    <Grid item  xl={4} style={{flexDirection: 'row-reverse', display: 'flex'}}>
                      <Button
                        onClick={() => this.handleClickOpen()}
                        variant="contained"
                        classes={{root: classes.buttonSave}}
                      >
                        Supprimer
                      </Button>
                    </Grid>
                  </Grid>
                  : null
                }
              </Grid>
              <Grid>
                <Grid container style={{alignItems: 'center'}} spacing={3}>
                  <Grid item xl={8} style={{display: 'flex', flexDirection: 'column'}}>
                    <Grid>
                      <h4>Je souhaite désactiver mon compte.</h4>
                    </Grid>
                    <Grid>
                      <Typography style={{color: 'rgba(39,37,37,35%)'}}>
                        Attention, cette action est irréversible !
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xl={4} style={{flexDirection: 'row-reverse', display: 'flex'}}>
                    <Button
                      onClick={() => this.handleClickOpen2()}
                      variant="contained"
                      classes={{root: classes.buttonSave}}
                      >
                      Désactiver
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {open ? this.modalDeleteShop : null}
          {open2 ? this.modalDeleteAccount : null}
        </LayoutAccount>
      </Fragment>
    );
  };
}

export default withStyles(styles)(security);
