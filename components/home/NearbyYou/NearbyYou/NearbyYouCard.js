import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: { 
    maxWidth: '350px',
      maxHeight: '400px',
      height: '400px',
      borderRadius: '5px',
  },
  media: {
    height: 200,
  },
  alfredname: {
    color: 'blue',
  },
};

const NearbyYouCard = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { classes, img } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title="Paysage"
        />
        <CardContent>
        <Typography className="servicename" gutterBottom variant="h5" component="h2">
            Service Name Here
          </Typography>
          <Typography className="alfredname" gutterBottom>
            By Alfred's name 
          </Typography>
          <Typography component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam vel pellentesque quam. Sed lobortis justo id pharetra laoreet.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Fab variant="extended"  size="small" color="primary" className={classes.fab}>
        Book Now
        </Fab>
      </CardActions>
    </Card>
  );
};

NearbyYouCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(styles)(NearbyYouCard);
