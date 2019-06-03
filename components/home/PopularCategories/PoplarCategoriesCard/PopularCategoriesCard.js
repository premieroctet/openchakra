import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { People } from '@material-ui/icons';
import PropTypes from 'prop-types';

const styles = theme => ({
  textUp: {
    textAlign: 'center',
    paddingTop: '3rem',
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'white',
    letterSpacing: '.2rem',
  },
  textDown: {
    textAlign: 'left',
    fontFamily: 'roboto',
    fontSize: '16px',
    color: 'white',
    padding: '.7rem',
  },
  textContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    height: '100%',
    zIndex: '3',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  card: {
    maxWidth: '200px',
    maxHeight: '300px',
    height: '250px',
    borderRadius: '30px',
    margin: '5px!important',
    minWidth: '200px!important',
    marginRight: '10px!important',
    marginLeft: '10px!important',
    boxShadow: '0 12px 10px -5px grey',  
  },
  /*cardoverlay: {
    maxWidth: '250px',
    maxHeight: '350px',
    height: '300px',
    borderRadius: '30px',
    margin: '5px!important',
    minWidth: '250px!important',
    marginRight: '10px!important',
    marginLeft: '10px!important',
    position: 'absolute',
    top: '119%',
    zIndex: '2',
    width: '100%',
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,.4), rgba(0,0,0,.3), rgba(0,0,0,.2), rgba(255,255,255,0))',
  },*/
  cardAction: {
    height: '100%',
  },
  cardMedia: {
    height: '100%',
  },
  center: {
    alignSelf: 'center',
  },
});


const popularCategoriesCard = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { img, classes, categorie} = props;

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardAction}>
        <CardMedia component="div" alt="food" image={img} className={classes.cardMedia}>
          <Grid container className={classes.container}>
            <Grid item xs={12} className={classes.textContainer}>
              <Typography className={classes.textUp}>{categorie}</Typography>
            </Grid>
            <Grid container xs={12} className={classes.row}>
              {/*<Grid item xs={9} className={classes.center}>
                <Typography className={classes.textDown}>{desc}</Typography>
              </Grid>*/}
              <Grid item xs={3} className={classes.center}>
                {/*<Badge badgeContent={number} color="primary">*/}
              {/*<Avatar alt="Unknown" src={avatar}/>*/}
                {/*<People style={{color: 'lightgrey'}}/>*/}
              {/*</Badge>*/}
              </Grid>
            </Grid>
          </Grid>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

popularCategoriesCard.propTypes = {
  img: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  categorie: PropTypes.string.isRequired,
};

export default withStyles(styles)(popularCategoriesCard);
