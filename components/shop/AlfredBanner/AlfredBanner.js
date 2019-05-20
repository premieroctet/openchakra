import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Share, FavoriteBorderOutlined, PermContactCalendar } from '@material-ui/icons';

const style = theme => ({
  bannerContainer: {
    height: '55vh',
    backgroundImage: 'url("../../../static/photo-1538342014732-212dc8f76863.jpeg")',
  },
  darkOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  avatar: {
    height: 200,
    width: 200,
  },
  itemAvatar: {
    flexDirection: 'column',
  },
  itemShare: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    marginBottom: '2rem',
  },
  textAvatar: {
    textAlign: 'center',
    color: 'white',
    fontSize: 35,
  },
  textBio: {
    color: 'white',
    textAlign: 'center',
  },
  itemDispo: {
    alignSelf: 'flex-end',
    marginBottom: '2rem',
  },
  textDispo: {
    color: 'white',
  },
});

const alfredBanner = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <Grid container className={classes.bannerContainer}>
        <Grid container className={classes.darkOverlay}>
          <Grid container className={classes.container}>
            <Grid item className={classes.itemShare}>
              <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                <Share style={{ color: 'white' }} />
                <Typography variant="body1" style={{ color: 'white', fontSize: 20 }}>
                  Share
                </Typography>
              </Grid>
              <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                <FavoriteBorderOutlined style={{ color: 'white' }} />
                <Typography variant="body1" style={{ color: 'white', fontSize: 20 }}>
                  Add to wishlist
                </Typography>
              </Grid>
            </Grid>
            <Grid item className={classes.itemAvatar}>
              <Avatar alt="John Doe" src="../../../../static/John-Doe.jpg" className={classes.avatar} />
              <Typography className={classes.textAvatar}>John Doe</Typography>
            </Grid>
            <Grid item className={classes.itemDispo}>
              <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                <PermContactCalendar style={{ color: 'white' }} />
                <Typography style={{ fontSize: 20 }} variant="body1" className={classes.textDispo}>Disponibilité</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(style)(alfredBanner);
