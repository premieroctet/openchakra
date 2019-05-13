import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    display: 'flex',
    height: 'auto',
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
};

const becomeAlfredBanner = (props) => {
  const { classes, img } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={img}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.padding}>
            Devenir Alfred
          </Typography>
          <Typography variant="body1" color="textSecondary" className={classes.padding}>
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
  );
};

becomeAlfredBanner.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(styles)(becomeAlfredBanner);
