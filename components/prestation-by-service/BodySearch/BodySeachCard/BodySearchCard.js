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
import {StarRate, FavoriteBorderOutlined, LocationOn, PermContactCalendar, RestaurantMenu} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: 920,
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: 1170,
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: 1366,
    },
  },
  media: {
    height: 0,
    borderRadius: '20px',
    paddingTop: '118.25%', // 16:9
  },
  textBox: {
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 30,
    marginTop: 35,
  },
  textUp: {
    textAlign: 'left',
    paddingTop: '1rem',
    fontFamily: 'helvetica',
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'white',
    letterSpacing: '.2rem',
  },
  leh3: {
    fontWeight: 'bold',
  },
  textDown: {
    textAlign: 'left',
    fontFamily: 'roboto',
    fontSize: '17px',
    color: 'white',
  },
  textContainer: {
    flex: 1,
  },
  container2: {
    flexDirection: 'column',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  card: {
    maxHeight: '300px',
    height: '200px',
    borderRadius: '5px',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: { // xs: 600px or larger
      maxWidth: 450,
      maxHeight: 300,
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
    },
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      maxWidth: 350,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300
    },
  },
  cardAction: {
    height: '100%',
  },
  cardMedia: {
    height: '100%',
  },




});

const bodySearchCard = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { classes,label, price, filter } = props;
  const background = ["../../static/bleumarine.PNG","../../static/saumonorange.PNG","../../static/bleuclair.PNG"
    ,"../../static/violetclair.PNG"];

  return (
      <Card className={classes.card}>
        <CardActionArea className={classes.cardAction}>
          <CardMedia component="div" alt="color" image={background[Math.floor(Math.random() * background.length)]} className={classes.cardMedia}>
            <Grid container className={classes.container2}>
              <Grid container xs={12} className={classes.row}>
                <Grid item xs={5}></Grid>
                <Grid item xs={4}></Grid>
                <Grid container item xs={3}>
                  <RestaurantMenu style={{color: 'white', fontSize: '4rem', maxWidth: '100%'}}/>
                </Grid>
              </Grid>
              <Grid container xs={12} className={classes.row}>
                <Grid item xs={1}>
                  <Typography className={classes.textDown}></Typography>
                </Grid>
                <Grid item xs={9} className={classes.center}>
                  <Typography className={classes.textDown}><span className={classes.leh3}>{label} ({filter})</span><br/>{price}€</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography className={classes.textDown}></Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardMedia>
        </CardActionArea>
      </Card>
  );
};

bodySearchCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(bodySearchCard);
