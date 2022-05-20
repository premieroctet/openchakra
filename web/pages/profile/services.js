

import {withStyles} from '@material-ui/core/styles'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import axios from 'axios'

import AddService from '../../components/AddService/AddService'
import AlfredConditions from '../../components/AlfredConditions/AlfredConditions'
import AskQuestion from '../../components/AskQuestion/AskQuestion'
import BasePage from '../basePage'
import Box from '../../components/Box/Box'
import LayoutMobileProfile from '../../hoc/Layout/LayoutMobileProfile'
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import Services from '../../components/Services/Services'
import styles from '../../static/css/pages/profile/services/services'
import Head from 'next/head'

const {isEditableUser}=require('../../utils/context')

class ProfileServices extends BasePage {

  constructor(props) {
    super(props)
    this.state={
      shop: {},
    }
  }

  componentDidMount() {
    axios.get(`/myAlfred/api/shop/alfred/${this.getURLProps().user}`)
      .then(response => {
        let shop = response.data
        this.setState({
          shop: shop,
        })
      }).catch(err => console.error(err))
  }

  onDelete = () => {
    this.componentDidMount()
  }

  content = (classes, user, shop) => {

    const editable = isEditableUser(user)


    return(
      <Grid container spacing={3} className={classes.servicesConntainer}>
        {isEditableUser(user) ? <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
          <Box>
            <AddService user={user}/>
          </Box>
        </Grid> : null
        }
        {
          shop.services ? shop.services.length ? <Grid item xs={12} xl={12}>
            <Box>
              <Services key={shop.services} user={user} shop={shop} onDelete={this.onDelete}/>
            </Box>
          </Grid> : null : null
        }
        {isEditableUser(user) && shop.services && shop.services.length ? <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
          <Box>
            <AlfredConditions shop={shop}/>
          </Box>
        </Grid> : null
        }
        {
          !editable ? <Grid item className={classes.containerAskQuestion}>
            <Grid style={{width: '70%'}}>
              <AskQuestion user={user}/>
            </Grid>
          </Grid> : null
        }
      </Grid>
    )
  };

  render() {
    const {classes}=this.props
    const {shop}=this.state
    const {user}=this.getURLProps()

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Head>
          <title>{user ? user.full_name : 'Mes services'}</title>
          <meta property="og:description" content={user ? user.firstname : ''}/>
          <meta property="description" content={user ? user.firstname : ''}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://my-alfred.io"/>
        </Head>
        <Grid className={classes.profileLayoutContainer}>
          <ProfileLayout user={user}>
            {this.content(classes, user, shop)}
          </ProfileLayout>
        </Grid>
        <Grid className={classes.containerLayoutMobileProfile}>
          <LayoutMobileProfile user={user} currentIndex={4}>
            {this.content(classes, user, shop)}
          </LayoutMobileProfile>
        </Grid>
      </React.Fragment>
    )
  }

}
export default withTranslation('custom', {withRef: true})(withStyles(styles)(ProfileServices))
