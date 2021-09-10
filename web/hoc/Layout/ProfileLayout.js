import {withTranslation} from 'react-i18next'
import React from 'react'
const {setAxiosAuthentication} = require('../../utils/authentication')
import Layout from '../../hoc/Layout/Layout'
import Grid from '@material-ui/core/Grid'
import ScrollMenu from '../../components/ScrollMenu/ScrollMenu'
import axios from 'axios'
const {isEditableUser, isB2BStyle}=require('../../utils/context')
import styles from '../../static/css/components/Layout/ProfileLayout/ProfileLayout'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import UserAvatar from '../../components/Avatar/UserAvatar'
const CompanyComponent = require('../b2b/CompanyComponent')
import {LAYOUT_ABOUT} from '../../utils/i18n'

class ProfileLayout extends CompanyComponent {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      company: null,
    }
    this.nonlogged_items = [
      {label: LAYOUT_ABOUT.item_about, url: '/about'},
      {label: LAYOUT_ABOUT.item_service, url: '/services'},
      // { label: 'Photos', url: '/pictures' }, TODO : Albums 899538 899547
      {label: LAYOUT_ABOUT.item_review, url: '/reviews'},
    ]
    this.logged_items = [
      {label: LAYOUT_ABOUT.item_about, url: '/about'},
      {label: LAYOUT_ABOUT.item_my_services, url: '/services'},
      // { label: 'Mes photos', url: '/pictures' }, TODO : Albums 899538 899547
      {label: LAYOUT_ABOUT.item_my_reviews, url: '/reviews'},
    ]
    this.logged_alfred_items = [
      {label: LAYOUT_ABOUT.item_about, url: '/about'},
      {label: LAYOUT_ABOUT.item_my_services, url: '/services'},
      // { label: 'Mes photos', url: '/pictures' }, TODO : Albums 899538 899547
      {label: LAYOUT_ABOUT.item_my_reviews, url: '/reviews'},
      {label: LAYOUT_ABOUT.item_my_schedule, url: '/calendar'},
      {label: LAYOUT_ABOUT.item_my_stat, url: '/statistics'},
    ]
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
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
      .catch(err => console.error(err))
  };

  render() {
    const {user, company} = this.state
    const {children, index, classes} = this.props

    if (!user) {
      return null
    }

    const menuItems = isEditableUser(this.props.user) ? user.is_alfred ? this.logged_alfred_items : this.logged_items : this.nonlogged_items

    return (
      <Layout user={user}>
        <Grid className={classes.profilLayoutMainContainer}>
          <Grid className={classes.profilLayoutContainer}>
            <Grid className={classes.profilLayoutBackgroundContainer}>
              <Grid className={classes.profilLayoutMargin}>
                <Grid className={classes.profilLayoutBox}>
                  <Grid className={`customprofilbanner ${isB2BStyle() ? classes.profilLayoutBannerImgPro : classes.profilLayoutBannerImg}`}>
                    <Grid className={`customprofilbanneravatar ${classes.profilLayoutAvatar}`}>
                      <UserAvatar alt={!this.isModeCompany() ? user.firstname : company ? company.name : ''} user={!this.isModeCompany() ? user : company ? company : ''} fireRefresh={this.componentDidMount}/>
                    </Grid>
                  </Grid>
                  <Grid style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '40%',
                    alignItems: 'center',
                  }}>
                    <Grid style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                      <Grid>
                        {this.isModeCompany() ? <h3>{company ? company.name : ''}</h3> : <h3 className={'customprofilbannertitle'}>{`${LAYOUT_ABOUT.my_name_is} ${user ? user.firstname : ''}`}</h3>
                        }
                      </Grid>
                      {this.isModeCompany() ? null : <Grid>
                        <Typography className={'customprofilbannertext'} style={{color: 'rgba(39,37,37,35%)'}}>{LAYOUT_ABOUT.text}</Typography>
                      </Grid>
                      }

                    </Grid>
                  </Grid>
                  {
                    !this.isModeCompany() ? <Grid className={classes.profilLayoutScrollMenu}>
                      <ScrollMenu categories={menuItems} mode={'profile'} indexCat={index}
                        extraParams={{user: this.props.user}}/>
                    </Grid> : null}
                </Grid>
              </Grid>
              <Grid className={classes.profilLayoutChildren}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(ProfileLayout))
