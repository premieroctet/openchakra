import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import SummaryCommentary from '../../components/SummaryCommentary/SummaryCommentary'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/homePage/index';
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import AskQuestion from "../../components/AskQuestion/AskQuestion";
import Box from "../../components/Box/Box";

class ProfileReviews extends React.Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  static getInitialProps({query: {user, indexAccount}}) {
    return {user: user, index: indexAccount};
  }

  content = (classes, user) => {
    return(
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <SummaryCommentary user={user} />
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
    const {user, classes, index}=this.props;

    if (!user) {
      return null
    }
    return (
      <React.Fragment>
        <Hidden only={['xs', 'sm', 'md']}>
          <ProfileLayout user={user} index={index}>
            {this.content(classes, user)}
          </ProfileLayout>
        </Hidden>
        <Hidden only={['lg', 'xl']}>
          <LayoutMobile>
            {this.content(classes, user)}
          </LayoutMobile>
        </Hidden>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(ProfileReviews)
