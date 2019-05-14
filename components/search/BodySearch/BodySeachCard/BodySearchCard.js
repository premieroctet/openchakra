import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { StarRate, FavoriteBorderOutlined, LocationOn } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  media: {
    height: 200,
  },
  gpsText: {
    lineHeight: 2,
  },
});

const bodySearchCard = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { classes, img } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Grid container className={classes.gridContainer}>
            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
              Jean
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
  );
};

bodySearchCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(styles)(bodySearchCard);


/*return (
  <Card className={classes.card}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={img}
        title="Paysage"
      />
      <CardContent>
        <Chip label="Voyage" color="primary" />
        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          Service Sub Category
        </Typography>
        <Typography component="p" className={classes.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel pellentesque quam.
          Sed lobortis justo id pharetra laoreet.
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        En savoir plus
      </Button>
    </CardActions>
  </Card>
);
};*/