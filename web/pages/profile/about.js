import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../components/Profile/ProfileLayout'
import About from '../../components/About/About'
import Presentation from '../../components/Presentation/Presentation'
import Skills from '../../components/Skills/Skills'
import Badges from '../../components/Badges/Badges'
import Hashtags from '../../components/Hashtags/Hashtags'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/homePage/index';
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import AskQuestion from "../../components/AskQuestion/AskQuestion";


class ProfileAbout extends React.Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  content = (classes, user) =>{
    return(
      <Grid container spacing={3}>
        <Grid item xl={5} lg={5}>
          <About user={user} />
        </Grid>
        <Grid  item xl={7} lg={7}>
          <Presentation user={user} />
        </Grid>
        <Grid item xl={8} lg={8}>
          <Skills alfred={user} />
        </Grid>
        <Grid  item xl={4} lg={4}>
          <Badges user={user} />
        </Grid>
        <Grid item xl={12} lg={12}>
          <Hashtags user={user} />
        </Grid>
        <Grid item style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Grid style={{width: '70%'}}>
            <AskQuestion user={user}/>
          </Grid>
        </Grid>
      </Grid>
    )
  };

  render() {
    const {user, classes}=this.props;

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Hidden only={['xs', 'sm', 'md']}>
          <ProfileLayout user={user}>
            {this.content(classes, user)}
          </ProfileLayout>
        </Hidden>
        <Hidden only={['lg', 'xl']}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ProfileAbout)
