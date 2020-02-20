import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import { People } from '@material-ui/icons';
import PropTypes from 'prop-types';

const styles = theme => ({
  textcat: {
    textAlign: 'center',
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
    boxShadow: '0 5px 4px -2px lightgrey',  
  },
  cardAction: {
    height: '100%',
  },
  cardMedia: {
    height: '80%',
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

        </CardMedia>
        <CardContent>
          <Grid container className={classes.container}>
            <Grid item xs={12} className={classes.textContainer}>
              <Typography className={classes.textcat} variant="body2" color="textSecondary" component="p">
                {categorie}
              </Typography>
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
          </CardContent>
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
