import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Share, FavoriteBorderOutlined, PermContactCalendar } from '@material-ui/icons';
import axios from 'axios';
const { config } = require('../../../config/config');
const url = config.apiUrl;

const style = theme => ({
  bannerContainer: {
    height: '55vh',
    //backgroundImage: 'url("../../../static/photo-1538342014732-212dc8f76863-min.jpeg")',
    marginTop: 56,
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
    height: 150,
    width: 150,
    position: 'absolute',
    top: '15%',
    left: '0%',
    right: '0%',
    margin: 'auto',
    display: 'block',
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
    position: 'absolute',
    top: '35%',
    left: '0%',
    right: '0%',
    margin: 'auto',
    fontSize: 30,
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
      idAlfred:'',
      shop: {},
      have_picture: false
    };
    this.addFavoris = this.addFavoris.bind(this);

  }


  componentDidMount() {
    let self = this;


    const id_alfred = self.props.shop;
    axios.get(`${url}myAlfred/api/shop/alfred/${id_alfred}`)
        .then(function (response) {

          let shop = response.data;

          if(typeof shop.picture != "undefined") {
            self.setState({have_picture: true})
          }

          self.setState({
            alfred: shop.alfred,
            idAlfred: shop.alfred._id,
            shop:shop
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
    const {shop} = this.state;
    const {have_picture} = this.state;



    return (
        <Fragment>
                <Grid container className={classes.bannerContainer}
                      style={{backgroundImage: `url('../../${shop.picture}')`,backgroundPosition: "center",
                      backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
                    <Grid container className={classes.darkOverlay}>
                        <Grid container className={classes.container}>
                            <Grid item className={classes.itemShare}>
                                <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Share style={{ color: 'white' }} />
                                    <Typography variant="body1" style={{ color: 'white', fontSize: 15 }}>
                                        Partager
                                    </Typography>
                                </Grid>
                                <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                                    <FavoriteBorderOutlined style={{ color: 'white' }} onClick={this.addFavoris} />
                                    <Typography variant="body1" style={{ color: 'white', fontSize: 15 }}>
                                        Ajouter à la wishlist
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.itemAvatar}>
                                <Avatar alt="photo de profil" src={`../../../../${alfred.picture}`} className={classes.avatar} />
                                <Typography style={{marginTop:20}} className={classes.textAvatar}>Boutique de {alfred.firstname}</Typography>
                            </Grid>
                            <Grid item className={classes.itemDispo}>
                                <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                                    <PermContactCalendar style={{ color: 'white' }} />
                                    <Typography style={{ fontSize: 15 }} variant="body1" className={classes.textDispo}>Disponibilité</Typography>
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
