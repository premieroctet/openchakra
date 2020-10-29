import React from 'react';
import Grid from "@material-ui/core/Grid";
import ScrollMenu from '../../components/ScrollMenu/SrollMenu';

class LayoutAccount extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      items: [
        {
          label: 'Notifications'
        },
        {
          label: 'Mode de paiement'
        },
        {
          label: 'Mon RIB'
        },
        {
          label: 'Mes adresses'
        },
        {
          label: 'Vérification'
        },
        {
          label: 'Sécurité'
        }
      ]
    }
  }

  render() {
    const{items}= this.state;
    return(
      <Grid>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          <h2>Mon Compte</h2>
        </Grid>
        <Grid>
          <ScrollMenu categories={items}/>
        </Grid>
      </Grid>
    );
  }
}

export default LayoutAccount
