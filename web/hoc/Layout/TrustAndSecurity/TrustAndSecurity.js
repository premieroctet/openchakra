import React from "react";
import Grid from "@material-ui/core/Grid";
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import TextsmsIcon from '@material-ui/icons/Textsms';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../../static/css/components/TrustAndSecurity/TrustAndSecurity';

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
    const{classes} = this.props;
    return(
      <Grid contaienr spacing={2} style={{margin: 0, width: '100%'}} className={classes.trustAndSecurityMainContainer} >
        {
          items.map((res, index) => (
            <Grid key={index} item xl={4} lg={4} md={4} sm={4} xs={4} className={classes.trustAndSecurityContent}>
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

export default withStyles (styles) (TrustAndSecurity);
