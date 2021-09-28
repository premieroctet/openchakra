import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import ScrollMenu from '../../components/ScrollMenu/ScrollMenu'
import Layout from './Layout'
import axios from 'axios'
const {setAxiosAuthentication}=require('../../utils/authentication')
import {isB2BAdmin} from '../../utils/context'
import styles from '../../static/css/components/LayoutAccount/LayoutAccount'
import '../../static/assets/css/custom.css'
import {withStyles} from '@material-ui/core/styles'
import {LAYOUT_ACCOUNT} from '../../utils/i18n'

class LayoutAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        const user = res.data
        this.setState({
          items: [
            {
              label: LAYOUT_ACCOUNT.my_informations,
              url: isB2BAdmin(user) ? '/editProfileCompany' : '/editProfile',
            },
            {
              label: LAYOUT_ACCOUNT.payment_method,
              url: '/paymentMethod',
            },
            {
              label: isB2BAdmin(user) ? LAYOUT_ACCOUNT.my_sites : LAYOUT_ACCOUNT.my_adresses,
              url: '/myAddresses',
            },
            {
              label: LAYOUT_ACCOUNT.verification,
              url: '/trustAndVerification',
            },
            {
              label: LAYOUT_ACCOUNT.security,
              url: '/security',
            },
            {
              label: LAYOUT_ACCOUNT.notification,
              url: '/notifications',
            },
          ],
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const {items} = this.state
    const {children, classes} = this.props

    return (
      <Layout>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          <Grid style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
              <h2>{LAYOUT_ACCOUNT.my_settings}</h2>
            </Grid>
            <Grid>
              <ScrollMenu categories={items} mode={'account'}/>
            </Grid>
            <Grid className={`customlayoutaccountbackground ${classes.layoutaccountBackground}` }>
              <Grid className={`customboxlayoutaccount ${classes.boxlayout}`}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(LayoutAccount))
