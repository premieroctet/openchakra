import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import { StarRate, FavoriteBorderOutlined, LocationOn, PermContactCalendar } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  gridButton: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bookButton: {
    padding: '0 3rem !important',
  },
  media: {
    height: 200,
  },
  gpsText: {
    lineHeight: 2,
  },
  text: {
    paddingTop: '.7rem',
  },
  whiteLogo: {
    margin: '.5rem',
    color: 'white',
  },
  avatarContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    alignContent: 'start',
    justifySelf: 'center',
    height: 60,
    width: 60,
    //marginBottom: 35,
  },
  darkOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  locationGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  locationLogo: {
    color: 'white',
    marginLeft: 10,
  },
  locationText: {
    color: 'white',
    lineHeight: 2.3,
  },
  locationAvatarGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  rowLocation: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px 20px 0 0',
  },
});

const bodySearchCard = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { classes, img } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} title="Coiffure">
          <div className={classes.darkOverlay}>
            <Grid container className={classes.avatarContainer}>
              <Grid container className={classes.gridContainer}>
                <PermContactCalendar className={classes.whiteLogo} />
                <FavoriteBorderOutlined className={classes.whiteLogo} />
              </Grid>
              <Grid container className={classes.locationAvatarGrid}>
                <Avatar alt="John Doe" src="../../../../static/John-Doe.jpg" className={classes.avatar} />
                <Grid item className={classes.rowLocation}>
                  <LocationOn className={classes.locationLogo} />
                  <Typography className={classes.locationText}>300m</Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </CardMedia>
        <CardContent>
          <Typography variant="h6" component="h2">
            Nom du service
          </Typography>
          <Grid container>
            <Typography variant="body2" component="p">
              Par Jean
            </Typography>
            <div>
              <StarRate fontSize="small" />
              <StarRate fontSize="small" />
              <StarRate fontSize="small" />
              <StarRate fontSize="small" />
              <StarRate fontSize="small" />
            </div>
          </Grid>
          <Typography component="p" className={classes.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container className={classes.gridButton}>
          <Fab variant="extended" size="medium" color="primary" className={classes.bookButton}>
            Réservez
          </Fab>
        </Grid>
      </CardActions>
    </Card>
  );
};

bodySearchCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(styles)(bodySearchCard);


/**/

/*return (
  <Card className={classes.card}>
    <CardActionArea>
      <CardMedia component="div" alt="Nom du service" image="../../../../static/markus-spiske-502390-unsplash.jpg">
        <CardContent>
          <Grid container>
            <div />
            <Avatar alt="John Doe" src="../../../../static/John-Doe.jpg" />
          </Grid> 
        </CardContent>
      </CardMedia>
      <CardContent>
        <Grid container>
          <div />
          <Avatar alt="John Doe" src="../../../../static/John-Doe.jpg" />
        </Grid>
        <Grid container>
          <Typography variant="h5" component="h2">Service name</Typography>
        </Grid>
        <Grid container className={classes.gridContainer}>
          <Typography gutterBottom>
            Par Jean
          </Typography>
          <FavoriteBorderOutlined />
        </Grid>
        <Grid container>
          <div>
            <StarRate />
            <StarRate />
            <StarRate />
            <StarRate />
            <StarRate />
          </div>
          <Typography>(120)</Typography>
        </Grid>
        <Grid container>
          <LocationOn />
          <Typography className={classes.gpsText}>300m</Typography>
        </Grid>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Réservez maintenant
      </Button>
    </CardActions>
  </Card>
);*/