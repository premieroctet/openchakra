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
import "../../../static/stylesfonts.css"
const {config} = require('../../../config/config');
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
  hideSM: {
    [theme.breakpoints.down('md')]: { // medium: 960px or larger
      display: 'none',
    },
  },
  media: {
    height: 0,
    borderRadius: '20px',
    paddingTop: '118.25%', // 16:9
    maxWidth: 345,
  },
  card: {

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
  textdesc: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '10%!important',
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
    marginTop: 80,
  },
  textBox2: {
    color: 'rgba(84,89,95,0.95)',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 27,
    fontWeight: 570,
    marginTop: 10,
  },
  textBox3: {
    color: 'rgba(84,89,95,0.95)',
    fontSize: 16,
  },
  grosHR: {
    height: '10px',
    backgroundColor: '#2FBCD3',
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

class profiteandlearn extends React.Component {
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
    const services = resdata.slice(0, 6).map(e => (
        <Grid item xs={12} sm={6} md={2} lg={2} key={e._id}>
          <Card className={classes.card} style={{
            height:'350px',
            backgroundColor:'transparent',
            textAlign:'center',
            margin:10,
            boxShadow: '1px 3px 1px transparent'}}>
            <CardActionArea style={{
              height:'350px',
            }}>
              <CardMedia
                  className={classes.media2}
                  image={e.picture}
                  title="Paysage"
                  style={{height:'280px'}}
              />
              <CardContent>

                <Typography gutterBottom variant="h5" component="p" style={{fontSize:15, fontWeight:100, textAlign:'center'}}>
                  {e.label}
                </Typography>

              </CardContent>
            </CardActionArea>

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
                  Profitez et apprenez des talents de vos Alfred...
                </Typography>
                <Grid container>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={2}><hr className={classes.grosHR}/></Grid>
                  <Grid item xs={5}></Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={2}></Grid>
            {services}
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <div>
                <Typography variant="h4" className={classes.textBox1}>
                  Proposez vos services, en 3 étapes !
                </Typography>
                <Grid container>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={2}><hr className={classes.grosHR}/></Grid>
                  <Grid item xs={5}></Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={2}></Grid>

            {/*Partie 1*/}
            <Grid item md={6} xs={12} className={classes.textdesc}>
              <Grid container>
                <Grid item xs={12}>
                  <img src="http://my-alfred.io/wp-content/uploads/2019/03/1.svg" title="1" alt="1" scale="0" style={{height:"40px", width:"40px",}}/>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.textBox2}>
                    Proposez vos services
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 10}}>
                  <Typography className={classes.textBox3}>
                    Vous n'avez aucun frais à payer pour proposer vos services. Indiquez simplement les prestations que vous souhaitez réaliser en vous appuyant sur une liste de plus de ..... services proposées sur My-Alfred. Un service n'apparait pas ? Proposez-le à nos équipes !
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={classes.hideSM} item md={6} xs={12}>
              <video width="75%" height="75%" style={{float: "right"}} autoPlay muted playsInline loop>
                <source src="../static/assets/img/Phone1.mp4" type="video/mp4"/>
              </video>
            </Grid>

            {/*Partie 2*/}
            <Grid className={classes.hideSM} item md={6} xs={12}>
              <video width="75%" height="75%" style={{float: "left"}} autoPlay muted playsInline loop>
                <source src="../static/assets/img/Phone2.mp4" type="video/mp4"/>
              </video>
            </Grid>

            <Grid item md={6} xs={12} className={classes.textdesc}>
              <Grid container>
                <Grid item xs={12}>
                  <img src="http://my-alfred.io/wp-content/uploads/2019/03/2.svg" title="2" alt="2" scale="0" style={{height:"40px", width:"40px",}}/>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.textBox2}>
                    Fixer vos conditions
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 10}}>
                  <Typography className={classes.textBox3}>
                    Indiquez vos disponibilités (jours, heures...) ainsi que vos tarifs et tous les critères pour définir votre prestation. Et si vous avez besoin d'aide, nous sommes là pour vous accompagner dans la création de votre boutique de compétences !                  </Typography>
                </Grid>
              </Grid>
            </Grid>


            {/*Partie 3*/}
            <Grid item md={6} xs={12} className={classes.textdesc}>
              <Grid container>
                <Grid item xs={12}>
                  <img src="http://my-alfred.io/wp-content/uploads/2019/03/3.svg" title="3" alt="3" scale="0" style={{height:"40px", width:"40px",}}/>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.textBox2}>
                    Réalisez vos premiers services
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{paddingRight: 15, paddingLeft: 10}}>
                  <Typography className={classes.textBox3}>
                    Une fois votre boutique en ligne, les personnes intéressées par vos prestations pourront réserver en ligne vos services. Si vous avez des questions avant la prestation, vous pourrez les contacter !                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={classes.hideSM} item md={6} xs={12}>
              <video width="75%" height="75%" style={{float: "right"}} autoPlay muted playsInline loop>
                <source src="../static/assets/img/Phone3.mp4" type="video/mp4"/>
              </video>
            </Grid>

          </Grid>
        </Fragment>
    );
  }
};

profiteandlearn.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(profiteandlearn);
