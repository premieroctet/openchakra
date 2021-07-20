import React from 'react'
import Grid from '@material-ui/core/Grid'
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import AddService from '../../components/AddService/AddService'
import Services from '../../components/Services/Services'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../static/css/pages/profile/services/services'
import AskQuestion from '../../components/AskQuestion/AskQuestion'
import Box from '../../components/Box/Box'
import axios from 'axios'
import LayoutMobileProfile from '../../hoc/Layout/LayoutMobileProfile'
import BookingConditions from '../../components/CreaShop/BookingConditions/BookingConditions'
import AlfredConditions from '../../components/AlfredConditions/AlfredConditions'
const {isEditableUser}=require('../../utils/context')

class ProfileServices extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      user: props.user,
      shop: {},
    }
  }

  componentDidMount() {
    axios.get(`/myAlfred/api/shop/alfred/${this.state.user}`)
      .then(response => {
        let shop = response.data
        this.setState({
          shop: shop,
        })
      }).catch(err => console.error(err))
  }

  static getInitialProps({query: {user}}) {
    return {user: user}
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
              <Services user={user} shop={shop} onDelete={this.onDelete}/>
            </Box>
          </Grid> : null : null
        }
        {isEditableUser(user) ? <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
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
    const {shop, user}=this.state

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
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
export default withStyles(styles)(ProfileServices)
