import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
//import BecomeAlfredPersonsCard from './BecomeAlfredPersonsCard/BecomeAlfredPersonsCard';
//import Head from 'next/head';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios';
import Link from 'next/link';
import '../../../static/stylefixresponsive.css';
import { dark } from 'react-syntax-highlighter/dist/styles/hljs';
const {config} = require('../../../config/config');
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
  },
  margin: {
    margin: '0.7rem',
    color: 'white',
  },
  margin2: {
    margin: '0.7rem',
    color: 'white',
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
  centercontent: {
    textAlign: 'center!important',
  },
});

class becomeAlfred extends React.Component{

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
          <Grid container className={classes.container}>
          </Grid>
          <Grid container className={classes.container} spacing={24} wrap="wrap">
            <Grid item xs={12}>
              <Card className={classes.card1}>
                <CardMedia
                    xs={12}
                    className={classes.cover}
                    image='../../static/joshua-earle-133254-unsplash.jpg'
                    title="Live from space album cover"
                />
                <Grid item xs={12} className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5" className={classes.padding}>
                      Devenir Alfred
                    </Typography>
                    <Typography style={{width: '100%'}} variant="body1" color="textSecondary"
                                className={classes.padding}>
                      Créez en quelques minutes votre espace Alfred,
                      répertoriez vos services, indiquez vos disponibilités,
                      vos tarifs et profitez d’un complément de revenu !
                    </Typography>
                    <Link href={'/becomeAlfredForm'}>
                      <a style={{textDecoration:'none'}}>
                    <Button variant="contained" color={"primary"} className={classes.margin}>
                      Créer mon shop
                    </Button>
                      </a>
                    </Link>
                  </CardContent>
                </Grid>
              </Card>
              <Card className={classes.card22}>
                <Grid item xs={12} className={classes.details}>
                  <CardActionArea className={classes.centercontent}>
                    <CardMedia
                        className={classes.media}
                        image='../../static/joshua-earle-133254-unsplash.jpg'
                        title="Live from space album cover"
                    />
                    <CardContent>
                      <Typography component="h5" variant="h5" className={classes.padding}>
                        Devenir Alfred
                      </Typography>
                      <Typography variant="body1" color="textSecondary" className={classes.padding}>
                        Créez en quelques minutes votre espace Alfred,
                        répertoriez vos services, indiquez vos disponibilités,
                        vos tarifs et profitez d’un complément de revenu !
                      </Typography>
                    </CardContent>
                    <Link href={'/becomeAlfredForm'}>
                      <a style={{textDecoration:'none'}}>
                        <Button variant="contained" color={"primary"} className={classes.margin}>
                          Créer mon shop
                        </Button>
                      </a>
                    </Link>
                  </CardActionArea>
                </Grid>
              </Card>
            </Grid>
          </Grid>
          {/* 
          <div className="thewrap">
            <section className="card2">

              {cards}

            </section>
          </div>
          */}
        </Fragment>
    );
  }
}

becomeAlfred.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(becomeAlfred);
