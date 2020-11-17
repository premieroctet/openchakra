import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import AddService from '../../components/AddService/AddService'
import Services from '../../components/Services/Services'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/profile/services/services';
import AskQuestion from "../../components/AskQuestion/AskQuestion";
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import Box from "../../components/Box/Box";
import axios from "axios";
import LayoutMobileProfile from "../../hoc/Layout/LayoutMobileProfile";
const {isEditableUser}=require('../../utils/functions');

class ProfileServices extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      user:props.user,
      shop: {}
    }
  }

  componentDidMount() {
    axios.get(`/myAlfred/api/shop/alfred/${this.state.user}`)
      .then(response => {
        let shop = response.data;
        this.setState({
          shop: shop,
        })
      }).catch(err => console.error(err))
  }

  static getInitialProps({query: {user, indexAccount}}) {
    return {user: user, index: indexAccount};
  }

  content = (classes, user, shop) => {

    return(
      <Grid container spacing={3} className={classes.servicesConntainer}>
        {isEditableUser(user) ?
          <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
            <Box>
             <AddService user={user}/>
            </Box>
          </Grid>
          :
          null
        }
        <Grid item xs={12} xl={12}>
          <Box>
           <Services user={user} shop={shop}/>
          </Box>
        </Grid>
        <Hidden only={['sm', 'xs', 'md']}>
          <Grid item style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Grid style={{width: '70%'}}>
              <AskQuestion user={user}/>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    )
  };

  render() {
    const {classes, index}=this.props;
    const {shop, user}=this.state;

    return (
      <React.Fragment>
        <Hidden only={['xs']}>
          <ProfileLayout user={user} index={index}>
            {this.content(classes, user, shop)}
          </ProfileLayout>
        </Hidden>
        <Hidden only={['lg', 'xl','sm', 'md']}>
          <LayoutMobileProfile user={user} index={index}>
            {this.content(classes, user, shop)}
          </LayoutMobileProfile>
        </Hidden>
      </React.Fragment>
    )
  }

}
export default withStyles(styles)(ProfileServices)
