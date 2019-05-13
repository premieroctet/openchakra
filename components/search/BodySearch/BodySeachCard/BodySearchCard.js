import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    height: 200,
  },
};

const bodySearchCard = (props) => {
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
          <Chip label="Voyage" color="primary" />
          <Typography gutterBottom variant="h5" component="h2">
            Service Sub Category
          </Typography>
          <Typography component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel pellentesque quam.
            Sed lobortis justo id pharetra laoreet. Curabitur sollicitudin iaculis dolor,
            nec faucibus libero.
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
