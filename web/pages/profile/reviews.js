import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../components/Profile/ProfileLayout'
import SummaryCommentary from '../../components/SummaryCommentary/SummaryCommentary'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/homePage/index';
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import AskQuestion from "../../components/AskQuestion/AskQuestion";

class ProfileReviews extends React.Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  content = (classes, user) => {
    return(
      <Grid container>
        <Grid item xs={12}>
          <SummaryCommentary user={user} />
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

export default withStyles(styles)(ProfileReviews)
