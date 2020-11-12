import React from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Link from 'next/link'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../Avatar/UserAvatar";
import styles from '../../static/css/components/Profile/ProfileHeader'
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";

class ProfileHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state= {}
  }

  render() {
    const {user, classes}=this.props;
    const url = user.picture.match(/^https?:\/\//) ? user.picture : '/' + user.picture;

    if (!user) {
      return null
    }
    return (
      <React.Fragment>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid className={classes.profilHeaderBackground}/>
          <Grid className={classes.cardPreviewContainerAvatar}>
            <Avatar alt="Remy Sharp" src={url} className={classes.cardPreviewLarge} />
          </Grid>
          <Grid>
            <h3>{`Je m'appelle ${user ? user.firstname : ''}`}</h3>
          </Grid>
          <Grid>
            <Typography style={{color:'rgba(39,37,37,35%)'}}>et j’ai hâte de vous rencontrer !</Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles (styles) (ProfileHeader);
