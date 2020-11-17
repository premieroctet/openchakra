import React from "react";
import Grid from "@material-ui/core/Grid";
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import TextsmsIcon from '@material-ui/icons/Textsms';
import Typography from "@material-ui/core/Typography";

class TrustAndSecurity extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      items:[
        {
          title:'Réservation en instantané',
          text: 'Avec un délai de prévenance bien sûr ;)',
          icon: <AlarmOnIcon fontSize="large"/>
        },
        {
          title:'Heureux ou remboursé',
          text: 'Ça arrive à tout le monde de se tromper',
          icon: <InsertEmoticonIcon fontSize="large"/>
        },
        {
          title:'Paiement 100% sécurisé',
          text: 'Par la Nasa et le Pentagone',
          icon: <VerifiedUserIcon fontSize="large"/>
        },
        {
          title:'Notre équipe',
          text: 'Toujours à votre écoute ',
          icon: <TextsmsIcon fontSize="large"/>
        }
        ]
    }
  }

  render() {
    const{items} = this.state;
    return(
      <Grid container style={{justifyContent: 'space-between'}}>
        {
          items.map((res, index) => (
            <Grid key={index} style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid>
                {res.icon}
              </Grid>
              <Grid style={{marginLeft: '3vh'}}>
                <Grid>
                  <Typography><strong>{res.title}</strong></Typography>
                </Grid>
                <Grid>
                  <Typography>{res.text}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

export default TrustAndSecurity;
