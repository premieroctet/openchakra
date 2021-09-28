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
import Button from '@material-ui/core/Button'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import SettingsIcon from '@material-ui/icons/Settings'
import Divider from '@material-ui/core/Divider'
import InfoIcon from '@material-ui/icons/Info'
import ViewComfyIcon from '@material-ui/icons/ViewComfy'
import UserAvatar from '../../components/Avatar/UserAvatar'
import {MY_PROFIL} from '../../utils/i18n'
const {isB2BAdmin, getRole}=require('../../utils/context')
const CompanyComponent = require('../../hoc/b2b/CompanyComponent')


class myProfile extends CompanyComponent {

  constructor(props) {
    super(props)
    this.state={
      user: null,
      company: null
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
        if (user.company) {
          axios.get(`/myAlfred/api/companies/companies/${user.company}`)
            .then(() => {
              const company = res.data
              this.setState({
                company: company,
              })
            })
            .catch(err => console.error(err))
        }

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
    const {user, company} = this.state

    if (!user) {
      return null
    }

    return(
      <React.Fragment>
        <LayoutMobile currentIndex={4}>
          <Grid style={{display: 'flex', alignItems: 'center', marginTop: '5vh'}}>
            <Grid className={classes.cardPreviewContainerAvatar}>
              <UserAvatar alt={!this.isModeCompany() ? user.firstname : company ? company.name : ''} user={!this.isModeCompany() ? user : company ? company : ''} fireRefresh={() => this.componentDidMount()}/>
            </Grid>
            <Grid style={{marginLeft: '5vh'}}>
              <h2>{MY_PROFIL.hello + user.firstname}</h2>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <Grid>
              <Button
                className={classes.button}
                startIcon={<PersonOutlineIcon />}
                onClick={() => Router.push(`/profile/about?user=${user._id}`)}
              >
                {MY_PROFIL.show_my_profil}
              </Button>
            </Grid>
            { user && !getRole() ?
              <Grid style={{marginTop: '2vh', marginBottom: '2vh'}}>
                <Button
                  className={classes.button}
                  startIcon={<ViewComfyIcon />}
                  onClick={() => (user.is_alfred ? Router.push(`/profile/services?user=${user._id}`) : Router.push('/creaShop/creaShop'))}
                >
                  {user.is_alfred ? MY_PROFIL.my_services : MY_PROFIL.propose_service}
                </Button>
              </Grid>
              :
              null
            }
            { isB2BAdmin() ?
              <Grid style={{marginTop: '2vh', marginBottom: '2vh'}}>
                <Button
                  className={classes.button}
                  startIcon={<SettingsIcon />}
                  onClick={() => Router.push('/company/dashboard/companyDashboard')}
                >
                  {MY_PROFIL.dashboard}
                </Button>
              </Grid>
              :
              <>
                <Grid style={{marginTop: '2vh', marginBottom: '2vh'}}>
                  <Button
                    className={classes.button}
                    startIcon={<ContactMailIcon />}
                    onClick={() => Router.push('/account/personalInformation')}
                  >
                    {MY_PROFIL.my_informations}
                  </Button>
                </Grid>
                <Grid style={{marginTop: '2vh', marginBottom: '2vh'}}>
                  <Button
                    className={classes.button}
                    startIcon={<SettingsIcon />}
                    onClick={() => Router.push('/account/parameters')}
                  >
                    {MY_PROFIL.my_settings}
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
                {MY_PROFIL.dashboard_alfred}
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
                {MY_PROFIL.how_it_work}
              </Button>
            </Grid>
            <Grid style={{marginTop: '2vh', marginBottom: '2vh'}}>
              <Button
                className={classes.button}
                startIcon={<InfoIcon />}
                onClick={() => Router.push('/faq')}
              >
                {MY_PROFIL.get_help}
              </Button>
            </Grid>
            <Grid>
              <Button
                className={classes.button}
                startIcon={<InfoIcon />}
                onClick={() => Router.push('/contact')}
              >
                {MY_PROFIL.contact_us}
              </Button>
            </Grid>
          </Grid>
          <Divider style={{marginTop: '5vh', marginBottom: '5vh'}}/>
          <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '12vh'}}>
            <Grid style={{textAlign: 'center'}}>
              <Typography>{MY_PROFIL.all_rights}</Typography>
            </Grid>
            <Grid style={{textAlign: 'center'}}>
              <Typography>{MY_PROFIL.security}</Typography>
            </Grid>
            <Grid style={{marginTop: '5vh'}}>
              <Button
                variant={'outlined'}
                onClick={this.logout2}
              >
                {MY_PROFIL.log_out}
              </Button>
            </Grid>

          </Grid>
        </LayoutMobile>
      </React.Fragment>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(myProfile))
