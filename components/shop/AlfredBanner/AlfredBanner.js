import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Share, FavoriteBorderOutlined, PermContactCalendar } from '@material-ui/icons';
import axios from 'axios';
const url = "https://myalfred.hausdivision.com/";

const style = theme => ({
  bannerContainer: {
    height: '55vh',
    backgroundImage: 'url("../../../static/photo-1538342014732-212dc8f76863-min.jpeg")',
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
      alfred: [],
      idAlfred:''
    };
    this.addFavoris = this.addFavoris.bind(this);

  }


  componentDidMount() {
    let self = this;


    const id_alfred = self.props.shop;
    axios.get(`${url}myAlfred/api/shop/alfred/${id_alfred}`)
        .then(function (response) {

          let shop = response.data;


          self.setState({
            alfred: shop.alfred,
            idAlfred: shop.alfred._id
          });
          let idAlfred = shop.alfred._id;
          axios.put(`${url}myAlfred/api/users/alfredViews/${idAlfred}`)
              .then(function (result) {
                console.log('Views updated');
              })
              .catch(function (err) {
                console.log(err);
              })




        })
        .catch(function (error) {
          console.log(error);
        });
  }
    addFavoris() {

    const test = {alfred: this.state.idAlfred};
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.post(`${url}myAlfred/api/favoris/add`,test)
        .then(response => {
          console.log('Favoris ajouté')
        })
        .catch(err => {
          console.log(err)
        })
  }
   render() {
    const { classes } = this.props;
    const {alfred} = this.state;



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
                    <FavoriteBorderOutlined style={{ color: 'white' }} onClick={this.addFavoris} />
                    <Typography variant="body1" style={{ color: 'white', fontSize: 20 }}>
                      Add to wishlist
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item className={classes.itemAvatar}>
                  <Avatar alt="John Doe" src={`../../../../${alfred.picture}`} className={classes.avatar} />
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
