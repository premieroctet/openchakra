import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
const { config } = require('../../../config/config');
const url = config.apiUrl;


const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: 920,
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: 1170,
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: 1366,
    },
  },
  container1: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      width: 350,
    },
    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: 920,
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: 1170,
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: 1366,
    },
  },
  media: {
    height: 400,
    borderRadius: '20px',
    paddingTop: '30.25%', // 16:9
  },
  mediaLittleCard: {
    height: 0,
    borderRadius: '20px',
    paddingTop: '32.25%', // 16:9
  },
  textBox: {
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 30,
    marginTop: 35,

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: 920,
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: 1170,
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: 1366,
    },
  },
  card1: {
    marginTop: '10%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',

    [theme.breakpoints.up('xs')]: { // medium: 960px or larger
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: { // medium: 960px or larger
      display: 'none',
    },
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      display: 'flex',
    },
    [theme.breakpoints.up('lg')]: { // medium: 960px or larger
      display: 'flex',
    },
    [theme.breakpoints.up('xl')]: { // medium: 960px or larger
      display: 'flex',
    },
  },
  card22: {
    marginTop: '10%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',

    [theme.breakpoints.up('xs')]: { // medium: 960px or larger
      display: 'flex',
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: { // medium: 960px or larger
      display: 'flex',
      width: '100%'
    },
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: { // medium: 960px or larger
      display: 'none',
    },
    [theme.breakpoints.up('xl')]: { // medium: 960px or larger
      display: 'none',
    },
  },
  details: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '50%',
    height: 'auto',
  },
  padding: {
    padding: '0.7rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 2,
    fontSize: 40,
    lineHeight: 1.5,

  },
  padding2: {
    padding: '0.7rem',
    fontFamily: 'Helvetica',
    textAlign: 'left',
    fontSize: 15,
  },
  margin: {
    margin: '0.7rem',
  },
  margin2: {
    margin: '0.7rem',
  },

  card: {
    display: 'flex',
    margin: '5px!important',
    minWidth: '300px!important',
    marginRight: '10px!important',
    marginLeft: '10px!important',
    boxShadow: '1px 3px 1px transparent'

  },
  personName: {
    alignSelf: 'center',
    fontWeight: 'bold',
    padding: '.5rem',
    textAlign: 'right!important',
    color: '#33558B',
  },
  personName2: {
    alignSelf: 'center',
    padding: '.5rem',
    textAlign: 'right!important',
    fontSize: '0.8rem',
    color: '#33558B',
  },
  card11: {
    display: 'flex',
    margin: '5px!important',
    minWidth: '300px!important',
    marginRight: '10px!important',
    marginLeft: '10px!important',
    marginTop: '30px!important',
    marginBottom: '40px!important',
    boxShadow: '1px 3px 1px transparent',
  },
  imgavat: {
    marginTop: '60%',
  },
  petitpaddingpers: {
    marginLeft: '-20%',
  },  
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 15,
    marginTop: 80,
  },  
  textBox2: {
    color: 'rgba(84,89,95,0.95)',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 28,
    fontWeight: 570,
    marginTop: 10,
  },
  grosHR: {
    height: '10px',
    backgroundColor: '#6ec1e4',
  },
  textdesc: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '10%!important',    
    },
    marginTop: '2%',  
  },
});

class Façon extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      alfred: []
    }
  }

  componentDidMount() {
    axios.get(url+'myAlfred/api/users/home/alfred')
        .then(response => {
          let alfred = response.data;

          this.setState({alfred:alfred})
        })
  }

  render() {
    const {classes} = this.props;
    const {alfred} = this.state;

    

    return (
        <Fragment>

          {/*Créez votre boutique*/}
          <Grid container>
          <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <div>
                <Typography variant="h4" className={classes.textBox1}>
                    Créez votre boutique à votre façon
                </Typography>
                <Grid container>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={2}><hr className={classes.grosHR}/></Grid>
                  <Grid item xs={5}></Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={3}></Grid>
            
            <Grid item xs={2}></Grid>
            <Grid item md={4} xs={12} className={classes.textdesc}>
            <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.textBox2}>
                    Vous proposez vos services
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 16}}>
                  <Typography style={{paddingLeft:15,lineHeight: 2, fontSize: 18}}>
                    A travers la création de votre boutique vous proposez vos services en
                    décrivant l'ensemble de vos prestations. vous pouvez à tout moment
                    revenir sur votre boutique, ajouter ou supprimer des services. Les
                    différentes étapes de création de votre boutique sont extrêmement 
                    simple. À vous de jouer !
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4} xs={12} className={classes.textdesc} style={{marginRight: 15}}>
            <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.textBox2}>
                    Vous affichez vos disponibilités
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 16}}>
                  <Typography style={{paddingLeft:15,lineHeight: 2, fontSize: 18}}>
                    Vous indiquez vos disponibilités (jours, heures...) ainsi que vos tarifs et
                    tous les critères pour définir votre prestations. Vous pouvez synchroniser 
                    votre calendrier My-Alfred avec vos autres calendriers et éviter de manquer
                    un rendez-vous. Tous vos calendriers sont mis à jour automatiquement               
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}></Grid>

            
            <Grid item md={4} xs={12} className={classes.textdesc}>
            <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.textBox2}>
                    Vous fixez vos prix
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 16}}>
                  <Typography style={{paddingLeft:15,lineHeight: 2, fontSize: 18}}>
                    C'est à vous de fixer les prix de vos services et nos outils de tarifications
                    sont la  pour vous aider à proposer le meilleur prix pour être sélectionné.
                    Vous pouvez facilement ajouter des éléments personnalisés, notamment : - des tarifs de week end - des tarifs de nuit -
                    des packages de services... 
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4} xs={12} className={classes.textdesc} style={{marginRight: 15}}>
            <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.textBox2}>
                    Vous déterminez vos règles
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 16}}>
                  <Typography style={{paddingLeft:15,lineHeight: 2, fontSize: 18}}>
                    Pour que les utilisateurs  de My-Alfred puissent facilement comprendre 
                    vos services, vous définissez vos règles avant qu'ils puissent réserver.
                    Si ils enfreignent les règles après avoir réserver, vous pourrez annuler 
                    leur réservation sans aucune pénalités.               
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}></Grid>
            
            </Grid>
        </Fragment>
    );
  }
}

Façon.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Façon);
