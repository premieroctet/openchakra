import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
//import SerenityNeedCard from './SerenityNeedCard/SerenityNeedCard';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import axios from 'axios';
import Link from 'next/link';


const { config } = require('../../../config/config');
const url = config.apiUrl;



const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
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
  media: {
    height: 0,
    borderRadius: '20px',
    paddingTop: '118.25%', // 16:9
    maxWidth: 345,
  },
  card: {

    backgroundColor:'transparent',
    textAlign:'center',
    margin:10,
    boxShadow: `1px 3px 1px transparent`,

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: { // xs: 600px or larger
      maxWidth: 450,
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
    },
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      maxWidth: 350,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300
    },

  },
  media2: {
    height: 200
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 15,
    marginTop: 60,
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

class Wellbeing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      tags: {},
    }
  }

  componentDidMount() {

    axios.get(url + 'myAlfred/api/tags/services/section7')
        .then(response => {
              let data = response.data;
              this.setState({tags:data});
              axios.get(url + 'myAlfred/api/service/all/tags/' + data._id)
                  .then(res => {
                    let service = res.data;

                    this.setState({service: service})

                  })
                  .catch(err => console.log(err))
            }
        )
        .catch(error => {
          console.log(error)
        });
  }

  render() {
    const {classes} = this.props;
    const {service} = this.state;
    const {tags} = this.state;
    const resdata = shuffleArray(service);
    const services = resdata.slice(0, 6).map(e => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={e._id}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia

                  className={classes.media2}
                  image={e.picture}
                  title={e.label}
              />
              <CardContent>

                <p style={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: '1.25rem',}}>
                  {e.label}
                </p>
                <p>
                  {e.description}
                </p>
              </CardContent>
            </CardActionArea>
            <CardActions>

            </CardActions>
          </Card>
        </Grid>
    ));

    return (
        <Fragment>
          <Grid container className={classes.container}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <div>
                <Typography variant="h4" className={classes.textBox1}>
                {tags.title}
                </Typography>
                <Grid container>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={2} style={{padding:'2%'}}>
                    <img alt={"séparateur"} src={'../../../static/separateur-bleu.svg'} style={{height:'15px'}}/>
                  </Grid>
                  <Grid item xs={5}></Grid>
                </Grid>
                <Typography className={classes.textBox}>
                  {tags.description}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={2}></Grid>
            {services}
          </Grid>
        </Fragment>
    );
  }
};

Wellbeing.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Wellbeing);
