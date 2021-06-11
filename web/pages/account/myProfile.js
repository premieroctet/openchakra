const {clearAuthenticationToken, setAxiosAuthentication} = require('../../utils/authentication')
import React from "react";
import Grid from "@material-ui/core/Grid";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/pages/account/myProfile/myProfile'
import Router from "next/router";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from "@material-ui/core/Divider";
import InfoIcon from '@material-ui/icons/Info';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import UserAvatar from "../../components/Avatar/UserAvatar";

const {isB2BAdmin, getRole}=require('../../utils/context')

class myProfile extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      user:{}
    }

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        this.setState({user: res.data});

      })
      .catch(err => {
          if (err.response.status === 401 || err.response.status === 403) {
            clearAuthenticationToken()
            Router.push({pathname: '/'});
          }
        },
      );
  }

  logout2 = () => {
    localStorage.removeItem('path');
    clearAuthenticationToken()
    Router.push('/');
  };


  render() {
    const {classes} = this.props;
    const {user} = this.state;
    return(
      <React.Fragment>
        <LayoutMobile currentIndex={4}>
          <Grid style={{display: 'flex', alignItems: 'center', marginTop: '5vh'}}>
            <Grid className={classes.cardPreviewContainerAvatar}>
              <UserAvatar alt={user.firstName} user={user} fireRefresh={() => this.componentDidMount()}/>
            </Grid>
            <Grid style={{marginLeft: '5vh'}}>
              <h2>Hello {user.firstname}</h2>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <Grid>
              <Button
                className={classes.button}
                startIcon={<PersonOutlineIcon />}
                onClick={() => Router.push(`/profile/about?user=${user._id}`)}
              >
                Voir mon profil
              </Button>
            </Grid>
            { user && !getRole() ?
              <Grid style={{marginTop: '2vh', marginBottom: '2vh' }}>
                <Button
                  className={classes.button}
                  startIcon={<ViewComfyIcon />}
                  onClick={() => user.is_alfred ? Router.push(`/profile/services?user=${user._id}`) : Router.push('/creaShop/creaShop')}

                >
                  {user.is_alfred ? 'Mes Services' : 'Proposer mes services'}
                </Button>
              </Grid>
              :
              null
            }
            { isB2BAdmin() ?
              <Grid style={{marginTop: '2vh', marginBottom: '2vh' }}>
                <Button
                  className={classes.button}
                  startIcon={<SettingsIcon />}
                  onClick={() => Router.push('/company/dashboard/companyDashboard')}
                >
                  Dashboard
                </Button>
              </Grid>
              :
              <>
              <Grid style={{marginTop: '2vh', marginBottom: '2vh' }}>
                <Button
                  className={classes.button}
                  startIcon={<ContactMailIcon />}
                  onClick={() => Router.push('/account/personalInformation')}
                >
                  Mes informations
                </Button>
              </Grid>
              <Grid style={{marginTop: '2vh', marginBottom: '2vh' }}>
                <Button
                  className={classes.button}
                  startIcon={<SettingsIcon />}
                  onClick={() => Router.push('/account/parameters')}
                >
                  Mes paramètres
                </Button>
              </Grid>
              </>
            }
          </Grid>
          { user.is_admin ?
            <Grid>
              <Button
                className={classes.button}
                startIcon={<SettingsIcon />}
                onClick={() => Router.push('/dashboard/home')}
              >
                Dashboard My Alfred
              </Button>
            </Grid>
            :
            null
          }
          <Divider style={{marginTop: '5vh', marginBottom: '5vh'}}/>
          <Grid>
            <Grid>
              <Button
                className={classes.button}
                startIcon={<InfoIcon />}
                onClick={() => Router.push('/footer/addService')}
              >
                Comment ça marche ?
              </Button>
            </Grid>
            <Grid style={{marginTop: '2vh', marginBottom: '2vh' }}>
              <Button
                className={classes.button}
                startIcon={<InfoIcon />}
                onClick={() => Router.push('/faq')}
              >
                Obtenir de l’aide
              </Button>
            </Grid>
            <Grid>
              <Button
                className={classes.button}
                startIcon={<InfoIcon />}
                onClick={() => Router.push('/contact')}
              >
                Nous contacter
              </Button>
            </Grid>
          </Grid>
          <Divider style={{marginTop: '5vh', marginBottom: '5vh'}}/>
          <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '12vh'}}>
            <Grid style={{textAlign: 'center'}}>
              <Typography>© 2020 My Alfred, Tous droits réservés</Typography>
            </Grid>
            <Grid style={{textAlign: 'center'}}>
              <Typography>Sécurité - Informations légales - Confidentialité</Typography>
            </Grid>
            <Grid style={{marginTop: '5vh'}}>
              <Button
                variant={'outlined'}
                onClick={this.logout2}
              >
                Se deconnecter
              </Button>
            </Grid>

          </Grid>
        </LayoutMobile>
      </React.Fragment>
    );
  }

}

export default withStyles (styles) (myProfile);
