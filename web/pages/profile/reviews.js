import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import SummaryCommentary from '../../components/SummaryCommentary/SummaryCommentary'
import {withStyles} from '@material-ui/core/styles';
import AskQuestion from "../../components/AskQuestion/AskQuestion";
import Box from "../../components/Box/Box";
import LayoutMobileProfile from "../../hoc/Layout/LayoutMobileProfile";
import {isEditableUser} from "../../utils/context";
import styles from '../../static/css/pages/profile/reviews/reviews'

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
            <Grid item className={classes.containerAskQuestion}>
              <Grid style={{width: '70%'}}>
                <AskQuestion user={user}/>
              </Grid>
            </Grid>
             : null
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
        <Grid className={classes.containerProfileLayout}>
          <ProfileLayout user={user}>
            {this.content(classes, user)}
          </ProfileLayout>
        </Grid>
        <Grid className={classes.containerLayoutMobileProfile}>
          <LayoutMobileProfile user={user} currentIndex={4}>
            {this.content(classes, user)}
          </LayoutMobileProfile>
        </Grid>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(ProfileReviews)
