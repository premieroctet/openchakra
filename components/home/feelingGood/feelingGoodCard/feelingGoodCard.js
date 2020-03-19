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
import Link from 'next/link';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  card: {
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    padding:10,
    border:'solid thin #ccc',
    backgroundColor:'transparent',
    textAlign:'center',
    margin:10,
    boxShadow: '1px 3px 1px transparent',
    height: '90%',
    [theme.breakpoints.down('xs')]: { // tel
      maxWidth: '100%',
    },
    [theme.breakpoints.down('sm')]: { // medium: 960px or larger
      maxWidth: '100%',
    },
    [theme.breakpoints.down('md')]: { // ipad
      maxWidth: '100%',
    },
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign:'center'
  },
  gridButton: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bookButton: {
    padding: '0 3rem !important',
  },
  media: {
    height: 200,
  },
  gpsText: {
    lineHeight: 2,
  },
  text: {
    paddingTop: '.7rem',
    textAlign:'center',
  },
  whiteLogo: {
    margin: '.5rem',
    color: 'white',
  },
  avatarContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    alignContent: 'start',
    justifySelf: 'center',
    height: 60,
    width: 60,
  },
  lightOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  locationGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  locationLogo: {
    color: 'white',
    marginLeft: 10,
  },
  locationText: {
    color: 'white',
    lineHeight: 2.3,
  },
  locationAvatarGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  rowLocation: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px 20px 0 0',
  },
});



class FeelingGoodCard extends React.Component{

  render() {
    // eslint-disable-next-line object-curly-newline
    const { classes, img, desc, title,alfred,avatar,score,shop,id,gps } = this.props;

    return (
   
    
      <Link href={'serviceByService?service='+id+'&gps='+JSON.stringify(gps)}>
      <Card className={classes.card}>
        <CardActionArea style={{cursor:'default'}}>

        <CardMedia className={classes.media} image={img}>
          <div className={classes.lightOverlay}>
            <Grid container className={classes.avatarContainer}>
              <Grid container className={classes.gridContainer}>

              </Grid>
            </Grid>
          </div>
        </CardMedia>
        <CardContent>
          <Typography variant="h6" component="h2" style={{textAlign:'center'}}>
            <center>{title}</center>
          </Typography>

          <Grid container>



          </Grid>

        </CardContent>

      </CardActionArea>

    </Card>
    </Link>
  )
}

};

FeelingGoodCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(styles)(FeelingGoodCard);
function newFunction() {
  return <Fragment></Fragment>;
}

