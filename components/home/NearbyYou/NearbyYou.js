import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import NearbyYouCard from './NearbyYou/NearbyYouCard';
import axios from 'axios';
const { config } = require('../../../config/config');
const url = config.apiUrl;

const styles = theme => ({
  container: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',

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
    fontFamily: 'Helvetica',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%',
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
      axios.get(url+'myAlfred/api/serviceUser/home')
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
                         avatar={`../../../${e.user.picture}`} score={e.user.score} shop={e.user._id}/>
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
                  <Grid item xs={4}/>
                  <Grid item xs={2} lg={5} style={{margin:'auto'}}>
                    <img alt={"séparateur"} src={'../../../static/separateur-rouge.svg'} className={classes.separatorRed}/>
                  </Grid>
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
