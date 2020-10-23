import React from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../Avatar/UserAvatar";
import styles from '../../static/css/components/Profile/Profile'
import withStyles from "@material-ui/core/styles/withStyles";

class Profile extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const {user, classes} = this.props;
    return(
      <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Grid>
          <UserAvatar user={user} className={classes.avatarLetter}/>
        </Grid>
        <Grid style={{display: 'flex', flexDirection: 'column', marginLeft: '3vh'}}>
          <Grid>
            <Typography>Membre depuis Mai 2020</Typography>
          </Grid>
          <Grid>
            <Typography>Carte d'identité vérifié</Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles (styles) (Profile);
