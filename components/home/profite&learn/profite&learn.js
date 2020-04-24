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

const styles = theme => ({
  container: {
    margin: 'auto',
    textAlign: 'center',
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
  hideSM: {
    [theme.breakpoints.down('md')]: { // medium: 960px or larger
      display: 'none',
    },
  },
  textdesc: {
    fontFamily: 'Helvetica',
    [theme.breakpoints.down('sm')]: {
      marginTop: '3%!important',
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: '3%!important',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '3%!important',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '3%!important',
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
    [theme.breakpoints.down('xs')]: {
      marginBottom: '10%',
      marginTop: '10%',
    },
    [theme.breakpoints.down('sm')]: { // medium: 960px or larger
      marginTop: '5%',
      marginBottom: '5%',
    },
    [theme.breakpoints.down('md')]: { // medium: 960px or larger
      marginTop: '5%',
      marginBottom: '5%',
    },
  },
  textBox2: {
    fontFamily: 'Helvetica',
    color: 'rgba(84,89,95,0.95)',
    marginBottom: '3%',
    fontSize: 27,
    fontWeight: 570,
    marginTop: '3%',
  },
  textBox3: {
    fontFamily: 'Helvetica',
    color: 'rgba(84,89,95,0.95)',
    fontSize: 16,
    textAlign: 'justify'
  },
  separatorBlue:{
    width: '50px'
  },
  contentTextBox: {
    fontFamily: 'Helvetica',
    paddingRight: 15,
    paddingLeft: 10,
    [theme.breakpoints.down('xs')]: { // medium: 960px or larger
      padding:'5%'
    },

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

class profiteandlearn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      tags: {},
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <Fragment>
        <Grid container className={classes.container}>
          <Grid item xs={2}/>
          <Grid item xs={8}>
            <div>
              <Typography variant="h4" className={classes.textBox1}>
                Proposez vos services, en 3 étapes !
              </Typography>
              <Grid container>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                <Grid item xs={2} sm={4} md={4}  lg={4} xl={4} style={{margin:'auto'}}>
                  <img alt={"séparateur"} src={'../../../static/separateur-bleu.svg'} className={classes.separatorBlue}/>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                <Grid item xs={5}/>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={2}/>
          {/*Partie 1*/}
          <Grid style={{display: 'flex', alignItems: 'center'}}>
          <Grid className={classes.hideSM} item md={6} xs={12}>
            <video width="75%" height="75%" style={{float: "left"}} autoPlay muted playsInline loop>
              <source src="../static/assets/img/Phone1.mp4" type="video/mp4"/>
            </video>
          </Grid>
          <Grid item md={6} xs={12} className={classes.textdesc}>
            <Grid container>
              <Grid item xs={12}>
                <img src={"../../../static/etape1.svg"} title="1" alt="1" style={{height:"80px", width:"80px",}}/>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.textBox2}>
                  Proposez vos services
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.contentTextBox}>
                <Typography className={classes.textBox3}>
                  Vous n'avez aucun frais à payer pour proposer vos services. Indiquez simplement vos prestations en vous appuyant sur une liste de plus de 2000 services
                   proposées sur My-Alfred. Un service n'apparaît pas ? Soumettez-le à nos équipes !
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12} lg={12} className={classes.textdesc}>
              <Grid container>
                <Grid item xs={12}>
                  <img src={"../../../static/etape2.svg"} title="2" alt="2" style={{height:"80px", width:"80px",}}/>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.textBox2}>
                    Fixez vos conditions
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.contentTextBox}>
                  <Typography className={classes.textBox3}>
                    Indiquez vos disponibilités (jours, heures...) ainsi que vos tarifs et tous les critères pour définir votre prestation. Si vous avez besoin d'aide, nous sommes là pour vous accompagner dans la création de votre boutique de compétences !                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12} lg={12} className={classes.textdesc}>
              <Grid container>
                <Grid item xs={12}>
                  <img src={"../../../static/etape3.svg"} title="3" alt="3" style={{height:"80px", width:"80px",}}/>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.textBox2}>
                    Réalisez vos premiers services
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.contentTextBox}>
                  <Typography className={classes.textBox3}>
                    Une fois votre boutique ouverte, les personnes intéressées par vos prestations pourront réserver vos services en ligne. Si vous avez des questions avant la prestation, vous pourrez les contacter !                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

profiteandlearn.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(profiteandlearn);
