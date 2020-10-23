import React from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../Avatar/UserAvatar";

class Profile extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const {user, classes} = this.props;
    return(
      <Grid style={{display: 'flex', flexDirection: 'row'}}>
        <Grid>
          <UserAvatar classes={'avatarLetter'} user={user}/>
        </Grid>
        <Grid style={{display: 'flex', flexDirection: 'column'}}>
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

export default Profile;
