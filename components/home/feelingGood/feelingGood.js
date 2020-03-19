import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FeelingGoodCard from './feelingGoodCard/feelingGoodCard';
import axios from 'axios';
import Link from 'next/link';

const { config } = require('../../../config/config');
const url = config.apiUrl;

const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign:'center',

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
    fontFamily: 'Helvetica',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '10%',
  },
  textBox: {
    fontFamily: 'Helvetica',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%'
  },
  separatorBlue:{
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

class FeelingGood extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      tags: {},
    }
  }

  componentDidMount() {
    axios.get(url + 'myAlfred/api/tags/services/section9')
        .then(response => {
              let data = response.data;
              this.setState({tags:data});
              axios.get(url + 'myAlfred/api/service/all/tags/' + data._id)
                  .then(res => {
                    let service = res.data;

                    this.setState({service: service})

                  })
                  .catch()
            }
        )
        .catch();
  }

  render() {
    const {classes, gps} = this.props;
    const {service} = this.state;
    const {tags} = this.state;
    const resdata = shuffleArray(service);

    const cards = resdata.slice(0, 4).map((e,index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Link href={'/serviceByService?service='+e._id+'&gps='+JSON.stringify(gps)}>
          <FeelingGoodCard id={e._id} img={e.picture} title={e.label} gps={gps}/>
          </Link>
        </Grid>
    ));

    return (
        <Fragment>
          <Grid container className={classes.container}>
          <Grid item xs={2}/>
            <Grid item xs={8}>
              <div>
                <Typography variant="h4" className={classes.textBox1}>
                  {tags.title}
                </Typography>
                <Grid container>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                  <Grid item xs={2} sm={4} md={4}  lg={4} xl={4} style={{margin:'auto'}}>
                    <img alt={"séparateur"} src={'../../../static/separateur-bleu.svg'} className={classes.separatorBlue}/>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                </Grid>
                <Typography className={classes.textBox}>
                  {tags.description}
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

FeelingGood.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(FeelingGood);
