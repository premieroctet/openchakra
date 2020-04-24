import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import axios from 'axios';

const styles = theme => ({
  container: {
    margin: 'auto',
    fontFamily: 'Helvetica',
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
    height: 400,
    borderRadius: '20px',
    margin: '1%'

  },
  card1: {
    marginTop: '10%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',
    marginBottom: '3%',

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
    height: '300px',
  },
  padding: {
    padding: '0.7rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 2,
    fontSize: 40,
    lineHeight: 1.5,
  },
  padding2: {
    padding: '0.7rem',
    textAlign: 'left',
    fontSize: 15,
  },
  margin: {
    margin: '0.7rem',
  },
  card: {
    display: 'flex',
    margin: '5px!important',
    minWidth: '300px!important',
    marginRight: '10px!important',
    marginLeft: '10px!important',
    boxShadow: '1px 3px 1px transparent'
  },
});

class Assureback extends React.Component{

  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    const {classes} = this.props;

    return (
        <Fragment>

          {/*Nous assurons vos arrière*/}
          <Grid container className={classes.container}>
          </Grid>
          <Grid container className={classes.container} style={{marginBottom:20}} wrap="wrap">
            <Grid item xs={12}>
              <Card  className={classes.card1}>
              <CardMedia
                    xs={12}
                    className={classes.cover}
                    image='../../static/assureback.jpg'
                    title="Proposeserviceimg"
                />
                <Grid item xs={12} className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5" className={classes.padding}>
                        Nous assurons vos arrières !
                    </Typography>
                    <Typography style={{width: '100%'}} variant="body1" color="textSecondary"
                                className={classes.padding2}>
                        Proposez vos services en toute sérénité, My-Alfred s’occupe de tout !
                        Une assurance en responsabilité vous est offerte pour toute réalisation de service !
                    </Typography>
                  </CardContent>
                </Grid>
              </Card>
              <Card className={classes.card22}>
                <Grid item xs={12} className={classes.details}>
                  <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image='../../static/assureback.jpg'
                        title="proposeserviceimg"
                    />
                    <CardContent>
                      <Typography component="h5" variant="h5" className={classes.padding}>
                        Nous assurons vos arrières !
                      </Typography>
                      <Typography variant="body1" color="textSecondary" className={classes.padding2}>
                      Proposez vos services en toute sérénité, My-Alfred s’occupe de tout !
                      Une assurance en responsabilité vous est offerte pour toute réalisation de service !
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Fragment>
    );
  }
}

Assureback.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Assureback);
