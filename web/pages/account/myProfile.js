import CustomButton from '../../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
const {clearAuthenticationToken, setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import Grid from '@material-ui/core/Grid'
import LayoutMobile from '../../hoc/Layout/LayoutMobile'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/pages/account/myProfile/myProfile'
import Router from 'next/router'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import SettingsIcon from '@material-ui/icons/Settings'
import Divider from '@material-ui/core/Divider'
import InfoIcon from '@material-ui/icons/Info'
import ViewComfyIcon from '@material-ui/icons/ViewComfy'
import UserAvatar from '../../components/Avatar/UserAvatar'
const {getRole}=require('../../utils/context')


class myProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      user: null,
    }

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        const user = res.data
        this.setState({user: user})
      })
      .catch(err => {
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      },
      )
  }

  logout2 = () => {
    localStorage.removeItem('path')
    clearAuthenticationToken()
    Router.push('/')
  };


  render() {
    const {classes} = this.props
    const {user} = this.state

    if (!user) {
      return null
    }

    return(
      <React.Fragment>
        <LayoutMobile currentIndex={4}>
          <Grid style={{display: 'flex', alignItems: 'center', marginTop: '5vh'}}>
            <Grid className={classes.cardPreviewContainerAvatar}>
              <UserAvatar alt={user.firstname} user={user} fireRefresh={() => this.componentDidMount()}/>
            </Grid>
            <Grid style={{marginLeft: '5vh'}}>
              <h2>{ReactHtmlParser(this.props.t('MY_PROFIL.hello')) + user.firstname}</h2>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <Grid>
              <CustomButton
                className={classes.button}
                startIcon={<PersonOutlineIcon />}
                onClick={() => Router.push(`/profile/about?user=${user._id}`)}
              >
                {ReactHtmlParser(this.props.t('MY_PROFIL.show_my_profil'))}
              </CustomButton>
            </Grid>
            { user && !getRole() ?
              <Grid style={{marginTop: '2vh', marginBottom: '2vh'}}>
                <CustomButton
                  className={classes.button}
                  startIcon={<ViewComfyIcon />}
                  onClick={() => (user.is_alfred ? Router.push(`/profile/services?user=${user._id}`) : Router.push('/creaShop/creaShop'))}
                >
                  {user.is_alfred ? ReactHtmlParser(this.props.t('MY_PROFIL.my_services')) : ReactHtmlParser(this.props.t('MY_PROFIL.propose_service'))}
                </CustomButton>
              </Grid>
              :
              null
            }
            <Grid style={{marginTop: '2vh', marginBottom: '2vh'}}>
              <CustomButton
                className={classes.button}
                startIcon={<ContactMailIcon />}
                onClick={() => Router.push('/account/personalInformation')}
              >
                {ReactHtmlParser(this.props.t('MY_PROFIL.my_informations'))}
              </CustomButton>
            </Grid>
            <Grid style={{marginTop: '2vh', marginBottom: '2vh'}}>
              <CustomButton
                className={classes.button}
                startIcon={<SettingsIcon />}
                onClick={() => Router.push('/account/parameters')}
              >
                {ReactHtmlParser(this.props.t('MY_PROFIL.my_settings'))}
              </CustomButton>
            </Grid>
          </Grid>
          { user.is_admin ?
            <Grid>
              <CustomButton
                className={classes.button}
                startIcon={<SettingsIcon />}
                onClick={() => Router.push('/dashboard')}
              >
                {ReactHtmlParser(this.props.t('MY_PROFIL.dashboard_alfred'))}
              </CustomButton>
            </Grid>
            :
            null
          }
          <Divider style={{marginTop: '5vh', marginBottom: '5vh'}}/>
          <Grid>
            <Grid>
              <CustomButton
                className={classes.button}
                startIcon={<InfoIcon />}
                onClick={() => Router.push('/footer/addService')}
              >
                {ReactHtmlParser(this.props.t('MY_PROFIL.how_it_work'))}
              </CustomButton>
            </Grid>
            <Grid style={{marginTop: '2vh', marginBottom: '2vh'}}>
              <CustomButton
                className={classes.button}
                startIcon={<InfoIcon />}
                onClick={() => Router.push('/faq')}
              >
                {ReactHtmlParser(this.props.t('MY_PROFIL.get_help'))}
              </CustomButton>
            </Grid>
            <Grid>
              <CustomButton
                className={classes.button}
                startIcon={<InfoIcon />}
                onClick={() => Router.push('/contact')}
              >
                {ReactHtmlParser(this.props.t('MY_PROFIL.contact_us'))}
              </CustomButton>
            </Grid>
          </Grid>
          <Divider style={{marginTop: '5vh', marginBottom: '5vh'}}/>
          <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '12vh'}}>
            <Grid style={{textAlign: 'center'}}>
              <Typography>{ReactHtmlParser(this.props.t('MY_PROFIL.all_rights'))}</Typography>
            </Grid>
            <Grid style={{textAlign: 'center'}}>
              <Typography>{ReactHtmlParser(this.props.t('MY_PROFIL.security'))}</Typography>
            </Grid>
            <Grid style={{marginTop: '5vh'}}>
              <CustomButton
                variant={'outlined'}
                onClick={this.logout2}
              >
                {ReactHtmlParser(this.props.t('MY_PROFIL.log_out'))}
              </CustomButton>
            </Grid>

          </Grid>
        </LayoutMobile>
      </React.Fragment>
    )
  }

}

export default withTranslation(null, {withRef: true})(withStyles(styles)(myProfile))
