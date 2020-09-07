import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {RestaurantMenu} from '@material-ui/icons';
import PropTypes from 'prop-types';

const styles = theme => ({
    textUp: {
      textAlign: 'left',
      paddingTop: '1rem',
      fontFamily: 'Helvetica',
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
      fontFamily: 'Helvetica',
      fontSize: '17px',
      color: 'white',
    },
    textContainer: {
      flex: 1,
    },
    container: {
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
    center: {
      alignSelf: 'center',
    },
    enbas: {
      alignSelf: 'flex-end',
    },
  });

  const TemptedByCard = (props) => {
    // eslint-disable-next-line object-curly-newline
    const { img, classes, desc, avatar } = props;

    return (
      <Card className={classes.card}>
        <CardActionArea className={classes.cardAction}>
          <CardMedia component="div" alt="color" image={img} className={classes.cardMedia}>
            <Grid container className={classes.container}>
              <Grid container xs={12} className={classes.row}>
                <Grid item xs={5}></Grid>
                <Grid item xs={4}></Grid>
                <Grid container item xs={3}>
                 <RestaurantMenu style={{color: 'white', fontSize: '4rem', maxWidth: '100%'}}/>
                 {/*<Typography className={classes.textUp}>Icon</Typography>*/}
                </Grid>
              </Grid>
              {/*<Grid container xs={12} className={classes.row}>
                <Grid item xs={1}>
                  <Typography className={classes.textDown}></Typography>
                </Grid>
                <Grid item xs={10} className={classes.enbas}>
                  <Typography className={classes.textDown}><h3>Prestation</h3></Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography className={classes.textDown}></Typography>
                </Grid>
                </Grid>*/}
              <Grid container xs={12} className={classes.row}>
                <Grid item xs={1}>
                  <Typography className={classes.textDown}></Typography>
                </Grid>
                <Grid item xs={9} className={classes.center}>
                  <Typography className={classes.textDown}><span className={classes.leh3}>Prestation</span><br/>{desc}</Typography>
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

  TemptedByCard.propTypes = {
    img: PropTypes.string.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    desc: PropTypes.string.isRequired,
  };

  export default withStyles(styles)(TemptedByCard);
