import React from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../Avatar/UserAvatar";
import Avatar from "@material-ui/core/Avatar";

class Profile extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Grid style={{display: 'flex', flexDirection: 'row'}}>
        <Grid>
          <Avatar alt="Remy Sharp">CL</Avatar>
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
