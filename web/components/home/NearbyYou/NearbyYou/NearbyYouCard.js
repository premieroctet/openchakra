import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import {withStyles} from '@material-ui/core/styles';
import Link from 'next/link';
import UserAvatar from '../../../Avatar/UserAvatar';

const styles = theme => ({
  card: {
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    padding: 10,
    border: 'solid thin #ccc',
    backgroundColor: 'transparent',
    textAlign: 'center',
    margin: '15px auto',
    boxShadow: '1px 3px 1px transparent',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
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
    textAlign: 'center',
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
  const {classes, img, title, alfred, user} = props;
  return (


    <Card className={classes.card}>
      <Link href={`/shop?id_alfred=${user._id}`}>
        <CardActionArea>

          <CardMedia className={classes.media} image={img} title={alfred}>
            <div className={classes.darkOverlay}>
              <Grid container className={classes.avatarContainer}>
                <Grid container className={classes.gridContainer}>

                </Grid>
                <Grid container className={classes.locationAvatarGrid}>
                  <UserAvatar user={user} className={classes.avatar}/>
                </Grid>
              </Grid>
            </div>
          </CardMedia>
          <CardContent>
            <Typography variant="h6" component="h2">
              {alfred}
            </Typography>

            <Typography variant="body2" component="p" style={{textAlign: 'center'}}>
              {title}
            </Typography>

            <Grid container>


            </Grid>

          </CardContent>

        </CardActionArea>
      </Link>
    </Card>
  );
};

nearbyYouCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(styles)(nearbyYouCard);
