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
const url = "https://myalfred.hausdivision.com/";

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
  media2: {
    height: 200
  }

});

class serenityNeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
    }
  }

  componentDidMount() {

    axios.get(url+'myAlfred/api/service/random/home')
        .then(response => {
          let service = response.data;

          this.setState({service: service})

        })
  }

  render() {
    const {classes} = this.props;
    const {service} = this.state;
    const services = service.map(e => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={e._id}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                  className={classes.media2}
                  image={e.picture}
                  title="Paysage"
              />
              <CardContent>
                <Chip label={e.category.label} color="primary" />
                <Typography gutterBottom variant="h5" component="h2">
                  {e.label}
                </Typography>
                <Typography component="p">
                  {e.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link href={`/prestation?service=${e._id}`}>
              <Button size="small" color="primary">
                Toutes les prestations
              </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
    ));

    return (
        <Fragment>
          <Grid container className={classes.container}>
            <Typography variant="h5" className={classes.textBox}>
              Besoin de sérénité ?
            </Typography>
          </Grid>
          <Grid container className={classes.container} spacing={24} wrap="wrap">

            {services}
          </Grid>
        </Fragment>
    );
  }
};

serenityNeed.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(serenityNeed);
