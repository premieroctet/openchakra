import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  card1: {
    display: 'flex',
    height: 'auto',

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
  card2: {
    display: 'flex',
    height: 'auto',

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
  },
  media: {
    height: 400,
  },
});

const becomeAlfredBanner = (props) => {
  const { classes, img } = props;

  return (
    <Fragment>
    <Card container className={classes.card1}>
      <CardMedia
        item
        xs={12}
        className={classes.cover}
        image={img}
        title="Live from space album cover"
      />
      <div item xs={12}  className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.padding}>
            Devenir Alfred
          </Typography>
          <Typography style={{width: '100%'}} variant="body1" color="textSecondary" className={classes.padding}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien justo,
            placerat ac commodo ut, aliquam non massa. Sed id nisl ut massa auctor
            dapibus et id risus. Integer suscipit, nisi at viverra elementum, sapien
            lectus ultricies mauris, eu aliquet elit enim laoreet velit. Aliquam
            laoreet orci eu porttitor egestas. Aliquam porttitor sem quam, sit amet
            semper ante rutrum sodales. Nulla aliquam ante ex.
          </Typography>
          <Button variant="contained" color="primary" className={classes.margin}>
            Créer mon shop
          </Button>
        </CardContent>
      </div>
    </Card>
    <Card className={classes.card2}>
    <div item xs={12}  className={classes.details}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title="Live from space album cover"
        />
        <CardContent>
          <Typography component="h5" variant="h5" className={classes.padding}>
          Devenir Alfred
        </Typography>
        <Typography  variant="body1" color="textSecondary" className={classes.padding}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien justo,
          placerat ac commodo ut, aliquam non massa. Sed id nisl ut massa auctor
          dapibus et id risus. Integer suscipit, nisi at viverra elementum, sapien
          lectus ultricies mauris, eu aliquet elit enim laoreet velit. Aliquam
          laoreet orci eu porttitor egestas. Aliquam porttitor sem quam, sit amet
          semper ante rutrum sodales. Nulla aliquam ante ex.
        </Typography>
        <Button variant="contained" color="primary" className={classes.margin}>
          Créer mon shop
        </Button>
        </CardContent>
      </CardActionArea>
      </div>
    </Card>
  </Fragment>
  );
};

becomeAlfredBanner.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(styles)(becomeAlfredBanner);
