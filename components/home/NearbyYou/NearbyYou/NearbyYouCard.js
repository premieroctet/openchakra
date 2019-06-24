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
// eslint-disable-next-line object-curly-newline
import { StarRate, FavoriteBorderOutlined, LocationOn, PermContactCalendar } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';

// eslint-disable-next-line no-unused-vars
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

const nearbyYouCard = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { classes, img, desc, title,alfred,avatar,score,shop } = props;

  return (
    <Card className={classes.card}>
      <Link href={`/shop?id_alfred=${shop}`}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} title="Coiffure">
          <div className={classes.darkOverlay}>
            <Grid container className={classes.avatarContainer}>
              <Grid container className={classes.gridContainer}>

              </Grid>
              <Grid container className={classes.locationAvatarGrid}>
                <Avatar alt="John Doe" src={avatar} className={classes.avatar} />
              </Grid>
            </Grid>
          </div>
        </CardMedia>
        <CardContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Grid container>
            <Typography variant="body2" component="p">
              Par {alfred}
            </Typography>
            <div>
              {score}/5
            </div>
          </Grid>
          <Typography component="p" className={classes.text}>

          </Typography>
        </CardContent>

      </CardActionArea>
      </Link>
      <CardActions>
        <Grid container className={classes.gridButton}>
          <Link style={{color:'white !important',textdecoration:'none' }} href={`/shop?id_alfred=${shop}`}>
          <Fab variant="extended" size="medium" color="primary" className={classes.bookButton}>
            Voir le shop
          </Fab>
          </Link>
        </Grid>
      </CardActions>
    </Card>
  );
};

nearbyYouCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(styles)(nearbyYouCard);
