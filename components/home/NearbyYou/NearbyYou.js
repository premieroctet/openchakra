import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import NearbyYouCard from './NearbyYou/NearbyYouCard';
import axios from 'axios';
import "../../../static/stylesfonts.css"


const { config } = require('../../../config/config');
const url = config.apiUrl;

const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '30px',
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
  media: {
    height: 0,
    borderRadius: '20px',
    paddingTop: '118.25%', // 16:9
    maxWidth: 345,
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
  textBox: {
    fontFamily: 'Helvetica',
    textAlign: 'center',
    fontSize: 15,
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 60,
    marginTop: 15,
  },
  grosHR: {
    height: '10px',
    backgroundColor: '#6ec1e4',
  },
});

class nearbyYou extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      service: [],
      logged: false
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
      //axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      axios.get(url+'myAlfred/api/serviceUser/home')
          .then(response => {
            let service = response.data;

            this.setState({service:service})
          })
    }

  render() {


    const {classes} = this.props;
    const {service} = this.state;
    const logged = this.state.logged;
    const near = <Typography variant="h5" className={classes.textBox}>
      Cela se passe près de chez vous
    </Typography>;
    const all = <Typography variant="h5" className={classes.textBox}>
    
    </Typography>;
    const cards = service.map(e => (
        <Grid item xs={12} sm={6} md={4} key={e._id}>
          <NearbyYouCard img={e.service.picture} title={e.service.label} alfred={e.user.firstname}
                         avatar={`../../../${e.user.picture}`} score={e.user.score} shop={e.user._id}/>
        </Grid>
    ));

    return (
        <Fragment>
          <Grid container className={classes.container}>
          <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <div>
                <Typography variant="h4" className={classes.textBox1}>
                  Nous sommes tous des Alfred !!!
                </Typography>
                <Grid container>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={2}><hr className={classes.grosHR}/></Grid>
                  <Grid item xs={5}></Grid>
                </Grid>
                <Typography className={classes.textBox}>
                  <span>Nous sommes tous des Alfred en puissance !!!<br/>
                  Une passion ? un savoir-faire ? ou simplement du temps, envie de partager…Devenez Alfred et
                  arrondissez vos fins de mois très simplement !</span>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={2}></Grid>

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
