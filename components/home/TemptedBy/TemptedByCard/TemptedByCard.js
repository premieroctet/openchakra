import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
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
    container: {
      flexDirection: 'column',
      height: '100%',
    },
    row: {
      flexDirection: 'row',
      flex: 1,
    },
    card: {
      maxWidth: '300px',
      maxHeight: '300px',
      height: '200px',
      borderRadius: '5px',
  
      [theme.breakpoints.up('md')]: { // medium: 960px or larger
        height: '300px',
      },
      [theme.breakpoints.up('sm')]: { // medium: 960px or larger
        height: '250px',
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
    const { img, classes, desc } = props;
  
    return (
      <Card className={classes.card}>
        <CardActionArea className={classes.cardAction}>
          <CardMedia component="div" alt="color" image={img} className={classes.cardMedia}>
            <Grid container className={classes.container}>
              <Grid container xs={12} className={classes.row}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                 {/*<CardMedia
                    className={classes.media}
                    image='../../../../static/tools.png'
                    title="tools"
                 ></CardMedia>*/}
                 <Typography className={classes.textUp}>Icon</Typography>
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