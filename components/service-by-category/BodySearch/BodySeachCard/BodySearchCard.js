import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
// eslint-disable-next-line object-curly-newline
import { StarRate, FavoriteBorderOutlined, LocationOn, PermContactCalendar } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  card: {
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
  },
  media: {
    height: 200,
  },


});

const bodySearchCard = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { classes, img,service,desc } = props;

  return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
              className={classes.media}
              image={img}
              title="Paysage"
          />
          <CardContent>

            <Typography gutterBottom variant="h5" component="h2">
              {service}
            </Typography>
            <Typography component="p">
              {desc}
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
};

bodySearchCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(styles)(bodySearchCard);
