import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Share, FavoriteBorderOutlined, PermContactCalendar } from '@material-ui/icons';
import axios from 'axios';

const style = theme => ({
  bannerContainer: {
    height: '55vh',
    backgroundImage: 'url("../../../static/photo-1538342014732-212dc8f76863.jpeg")',
    marginTop: 64,
  },
  darkOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  avatar: {
    height: 200,
    width: 200,
  },
  itemAvatar: {
    flexDirection: 'column',
  },
  itemShare: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    marginBottom: '2rem',
  },
  textAvatar: {
    textAlign: 'center',
    color: 'white',
    fontSize: 35,
  },
  textBio: {
    color: 'white',
    textAlign: 'center',
  },
  itemDispo: {
    alignSelf: 'flex-end',
    marginBottom: '2rem',
  },
  textDispo: {
    color: 'white',
  },
});



class alfredBanner extends React.Component{

  constructor(props) {
    super(props);
    this.state ={
      shop: [],
      alfred: []
    };


  }


  componentDidMount() {
    let self = this;


    const id = self.props.shop;
    axios.get(`http://localhost:5000/myAlfred/api/shop/${id}`)
        .then(function (response) {

          let shop = response.data;
          console.log(shop);

          self.setState({
            shop:shop,
            alfred: shop.alfred
          })




        })
        .catch(function (error) {
          console.log(error);
        });
  }

   render() {
    const { classes } = this.props;
    const {shop} =  this.state;
    const {alfred} = this.state;
    console.log(alfred);


    return (
        <Fragment>
          <Grid container className={classes.bannerContainer}>
            <Grid container className={classes.darkOverlay}>
              <Grid container className={classes.container}>
                <Grid item className={classes.itemShare}>
                  <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                    <Share style={{ color: 'white' }} />
                    <Typography variant="body1" style={{ color: 'white', fontSize: 20 }}>
                      Share
                    </Typography>
                  </Grid>
                  <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                    <FavoriteBorderOutlined style={{ color: 'white' }} />
                    <Typography variant="body1" style={{ color: 'white', fontSize: 20 }}>
                      Add to wishlist
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item className={classes.itemAvatar}>
                  <Avatar alt="John Doe" src="../../../../static/John-Doe.jpg" className={classes.avatar} />
                  <Typography className={classes.textAvatar}>{alfred.name} {alfred.firstname}</Typography>
                </Grid>
                <Grid item className={classes.itemDispo}>
                  <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                    <PermContactCalendar style={{ color: 'white' }} />
                    <Typography style={{ fontSize: 20 }} variant="body1" className={classes.textDispo}>Disponibilité</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Fragment>
    );
  }

}

export default withStyles(style)(alfredBanner);
