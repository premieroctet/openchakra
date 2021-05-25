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
import LayoutMobileProfile from "../../hoc/Layout/LayoutMobileProfile";
import {isEditableUser} from "../../utils/context";

class ProfileReviews extends React.Component {

  constructor(props) {
    super(props);
    this.state={}
  }

  static getInitialProps({query: {user}}) {
    return {user: user};
  }

  content = (classes, user) => {
    const editable = isEditableUser(user);

    return(
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <SummaryCommentary user={user} />
          </Box>
        </Grid>
        {
          !editable ?
            <Hidden only={['sm', 'xs']}>
              <Grid item style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Grid style={{width: '70%'}}>
                  <AskQuestion user={user}/>
                </Grid>
              </Grid>
            </Hidden> : null
        }
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
        <Hidden only={['xs']}>
          <ProfileLayout user={user}>
            {this.content(classes, user)}
          </ProfileLayout>
        </Hidden>
        <Hidden only={['lg', 'xl','sm', 'md']}>
          <LayoutMobileProfile user={user} currentIndex={4}>
            {this.content(classes, user)}
          </LayoutMobileProfile>
        </Hidden>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(ProfileReviews)
