import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import NearbyYouCard from './NearbyYou/NearbyYouCard';
import axios from 'axios';

const url = "https://myalfred.hausdivision.com/";

const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '30px',

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
  textBox: {
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 5,

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
    if (token) {
      this.setState({logged:true});
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      axios.get(url+'myAlfred/api/serviceUser/near')
          .then(response => {
            let service = response.data;

            this.setState({service:service})
          })
    } else {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      axios.get(url+'myAlfred/api/serviceUser/home')
          .then(response => {
            let service = response.data;

            this.setState({service:service})
          })
    }
  }

  render() {


    const {classes} = this.props;
    const {service} = this.state;
    const logged = this.state.logged;
    const near = <Typography variant="h5" className={classes.textBox}>
      Cela se passe près de chez vous
    </Typography>;
    const all = <Typography variant="h5" className={classes.textBox}>
      Exemple de service
    </Typography>;
    const cards = service.map(e => (
        <Grid item xs={12} sm={6} md={4} key={e._id}>
          <NearbyYouCard img={e.service.picture} title={e.service.label} alfred={e.user.firstname}
                         avatar={`../../../static/profile/${e.user.picture}`} score={e.user.score}/>
        </Grid>
    ));

    return (
        <Fragment>
          <Grid container className={classes.container}>
            {logged ? near : all}
          </Grid>
          <Grid container className={classes.container} spacing={24} wrap="wrap">
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
