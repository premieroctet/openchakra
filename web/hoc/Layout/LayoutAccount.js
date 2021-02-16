import React from 'react';
import Grid from "@material-ui/core/Grid";
import ScrollMenu from '../../components/ScrollMenu/ScrollMenu';
import Layout from "./Layout";
import {is_b2b_admin} from '../../utils/context';

class LayoutAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          label: 'Mes Informations',
          url: is_b2b_admin() ? '/editProfileCompany' : '/editProfile'
        },
        {
          label: 'Modes de paiement',
          url: '/paymentMethod'
        },
        {
          label: is_b2b_admin() ? 'Mes sites' : 'Mes adresses',
          url: '/myAddresses'
        },
        {
          label: 'Vérification',
          url: '/trustAndVerification'
        },
        {
          label: 'Sécurité',
          url: '/security'
        },
        {
          label: 'Notifications',
          url: '/notifications'
        },
      ],
    }
  }

  render() {
    const {items} = this.state;
    const {children} = this.props;

    return (
      <Layout>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          <Grid style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
              <h2>Mes paramètres</h2>
            </Grid>
            <Grid>
              <ScrollMenu categories={items} mode={'account'}/>
            </Grid>
            <Grid style={{backgroundColor: 'rgba(249,249,249, 1)', width: '100%'}}>
              <Grid style={{
                margin: '0 15%',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 27,
                border: '1px solid rgba(210, 210, 210, 0.5)',
                padding: '5% 10%',
                marginTop: '5vh',
                marginBottom: '5vh'
              }}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default LayoutAccount
