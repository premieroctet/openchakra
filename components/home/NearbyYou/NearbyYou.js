import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import NearbyYouCard from './NearbyYou/NearbyYouCard';
import axios from 'axios';

const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign:'center',
    fontFamily: 'Helvetica',
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
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '3%',
  },
  textBox: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%',
    [theme.breakpoints.down('xs')]: { // extra-large: 1920px or larger
      marginBottom: '7%',
    },

  },
  separatorRed:{
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

class nearbyYou extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      service: [],
      logged: false
    }
  }

  componentDidMount() {
      axios.get('/myAlfred/api/serviceUser/home')
          .then(response => {
            let service = response.data;
            this.setState({service:service})
          })
    }

  render() {
    const {classes} = this.props;
    const {service} = this.state;
    const resdata = shuffleArray(service);

    const cards = resdata.slice(0, 6).map(e => (
        <Grid item xs={12} sm={6} md={4} key={e._id}>
          <NearbyYouCard img={e.service.picture} title={e.service.label} alfred={e.user.firstname}
                         user={e.user} score={e.user.score} />
        </Grid>
    ));

    return (
        <Fragment>
          <Grid container className={classes.container}>
          <Grid item xs={2}/>
            <Grid item xs={8}>
              <div>
                <Typography variant="h4" className={classes.textBox1}>
                  Nous sommes tous des Alfred !!!
                </Typography>
                <Grid container>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                  <Grid item xs={2} sm={4} md={4}  lg={4} xl={4} style={{margin:'auto'}}>
                    <img alt={"séparateur"} src={'../../../static/separateur-rouge.svg'} className={classes.separatorRed}/>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                  <Grid item xs={5}/>
                </Grid>
                <Typography className={classes.textBox}>
                  <span>Nous sommes tous des Alfred en puissance !!!<br/>
                  Une passion ? un savoir-faire ? ou simplement du temps, envie de partager…Devenez Alfred et
                  arrondissez vos fins de mois très simplement !</span>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={2}/>
            {cards}
          </Grid>
        </Fragment>
    );
  }
}

nearbyYou.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(nearbyYou);
