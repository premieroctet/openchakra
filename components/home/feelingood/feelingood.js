import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FeelingoodCard from './feelingoodCard/feelingoodCard';
import axios from 'axios';
import "../../../static/stylesfonts.css"

const url = "https://myalfred.hausdivision.com/";

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
    marginBottom: 60,
  },
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

class feelingood extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      service: [],
    }
  }

  componentDidMount() {

    axios.get(url+'myAlfred/api/service/all')
        .then(response => {
          let service = response.data;

          this.setState({service: service})

        })
  }

  render() {


    const {classes} = this.props;
    const {service} = this.state;
    const resdata = shuffleArray(service);

    const cards = resdata.slice(0, 4).map(e => (
        <Grid item xs={12} sm={6} md={3}>
          <FeelingoodCard img={e.picture} title={e.label} />
        </Grid>
    ));

    return (
        <Fragment>
          <Grid container className={classes.container}>
          <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <div>
                <Typography variant="h4" className={classes.textBox1}>
                  Se sentir bien chez soi...
                </Typography>
                <Grid container>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={2}><hr className={classes.grosHR}/></Grid>
                  <Grid item xs={5}></Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={2}></Grid>

            {cards}

          </Grid>
        </Fragment>
    );
  }
}

feelingood.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(feelingood);
