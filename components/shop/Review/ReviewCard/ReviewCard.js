import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { StarRate } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  reviewCard: {
    padding: '2rem 4rem',
    borderRadius: 10,
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatarPartContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatarContainer: {
    marginRight: '1rem',
  },
  avatar: {
    height: 55,
    width: 55,
  },
  nameAndStarContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  starAndQuickReviewContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  reviewTextContainer: {
    marginTop: '1rem',
  },
  dateContainer: {
    display: 'flex',
    marginTop: '1rem',
    justifyContent: 'flex-end',
  },
  nameText: {
    fontSize: 25,
  },
  starContainer: {
    marginRight: '1rem',
  },
  oneWordText: {
    fontSize: 20,
    lineHeight: 1,
  },
});

const reviewCard = (props) => {
  const { classes } = props;

  return (
    <Card className={classes.reviewCard}>
      <Grid container className={classes.reviewContainer}>
        <Grid container className={classes.avatarPartContainer}>
          <Grid item className={classes.avatarContainer}>
            <Avatar alt="John Doe" src="../../../../static/John-Doe.jpg" className={classes.avatar} />
          </Grid>
          <Grid item style={{ alignSelf: 'flex-end' }}>
            <Grid container className={classes.nameAndStarContainer}>
              <Grid item>
                <Typography className={classes.nameText}>John Doe</Typography>
              </Grid>
              <Grid item>
                <Grid container className={classes.starAndQuickReviewContainer}>
                  <Grid item className={classes.starContainer}>
                    <div>
                      <StarRate fontSize="small" />
                      <StarRate fontSize="small" />
                      <StarRate fontSize="small" />
                      <StarRate fontSize="small" />
                      <StarRate fontSize="small" />
                    </div>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.oneWordText}>&quot;Excellent&quot;</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.reviewTextContainer}>
          <Grid item>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor nisi quis
              ante ullamcorper, et pellentesque libero vehicula. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.dateContainer}>
          <Grid item>
            <Typography>30 avril 2019</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withStyles(styles)(reviewCard);
