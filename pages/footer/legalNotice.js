import React, { Fragment } from 'react';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Footer from '../../hoc/Layout/Footer/Footer';

const styles = theme => ({
  hideed:{
    padding: '0 300px',
    marginTop:80,
    textAlign: 'justify',
    [theme.breakpoints.down('sm')]: {
      padding: '0 20px',
    },
  },
  a:{
    textDecoration: 'none',
    color: '#2FBCD3',
  },

});

class Privacypolicy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <Grid container className={classes.hideed}>
          <Grid item xs={12} style={{textAlign:'center', marginBottom: 50}}>
            <h2>Mentions légales</h2>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#2FBCD3'}}>Editeur</h3>
            <p>Raison sociale : MY-ALFRED</p>
           <p> RCS : 850 148 867</p>
            <p> Société par Actions Simplifiée au capital social de 40.000€</p>
            <p> N° TVA intracommunautaire : FR5850148867</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#2FBCD3'}}> Adresse du siège social</h3>
            <p> 42 Rampe Bouvreuil</p>
            <p> 76000 Rouen</p>
            <p> France</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#2FBCD3'}}>  Directeur de la publication</h3>
            <p> Solène Vanuxem, Directrice Général</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#2FBCD3'}}> Hébergement</h3>
            <p> Amazon Web Services</p>
            <p> Adresse : Amazon Web Services EMEA SARL, Succursale Française</p>
            <p>  31 Place des Corolles, Tour Carpe Diem, 92400 Courbevoie</p>
            <p>  Contact : https://aws.amazon.com/fr/contact-us/</p>
            <p> Tél : 01.46.17.10.00</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#2FBCD3'}}>  Mail</h3>
            <p> hello@my-alfred.io</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#2FBCD3'}}>  Téléphone</h3>
            <p> 02 35 76 47 52</p>
          </Grid>
        </Grid>
        {/* <Footer/>*/}

      </Layout>
    );
  };
}

export default withStyles(styles)(Privacypolicy);
