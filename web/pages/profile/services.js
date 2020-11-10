import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../components/Profile/ProfileLayout'
import AddService from '../../components/AddService/AddService'
import Services from '../../components/Services/Services'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/profile/services/services';
import AskQuestion from "../../components/AskQuestion/AskQuestion";
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import Box from "../../components/Box/Box";
import axios from "axios";

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

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  content = (classes, user, shop) => {
    return(
      <Grid container spacing={3} className={classes.servicesConntainer}>
        <Grid item xs={12}>
          <Box>
           <AddService user={user}/>
          </Box>
        </Grid>
        <Grid item xs={12} xl={12}>
          <Box>
           <Services user={user} shop={shop}/>
          </Box>
        </Grid>
        <Hidden only={['sm', 'xs']}>
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
    const {classes}=this.props;
    const {shop, user}=this.state;

    return (
      <React.Fragment>
        <Hidden only={['xs', 'sm', 'md']}>
          <ProfileLayout user={user}>
            {this.content(classes, user, shop)}
          </ProfileLayout>
        </Hidden>
        <Hidden only={['lg', 'xl']}>
          <LayoutMobile>
            {this.content(classes, user, shop)}
          </LayoutMobile>
        </Hidden>
      </React.Fragment>
    )
  }

}
export default withStyles(styles)(ProfileServices)
