import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import axios from 'axios';
import styles from './AlfredBannerStyle';
import UserAvatar from '../../Avatar/UserAvatar';

const { config } = require('../../../config/config');
const url = config.apiUrl;

class alfredBanner extends React.Component{

  constructor(props) {
    super(props);
    this.state ={
      alfred: [], // to ensure not null
      idAlfred:'',
      shop: {},
      have_picture: false,
      avaterLetters: "",
    };
    this.addFavoris = this.addFavoris.bind(this);
  }

  componentDidMount() {
    let self = this;

    const id_alfred = self.props.shop;
    axios.get(`${url}myAlfred/api/shop/alfred/${id_alfred}`)
      .then(function (response) {
        let shop = response.data;
        if(typeof shop.picture != "undefined" && shop.picture != null) {
          self.setState({have_picture: true})
        }
        self.setState({
          alfred: shop.alfred,
          idAlfred: shop.alfred._id,
          shop:shop,
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

    console.log("Banner:alfred is :"+JSON.stringify(alfred));

    return (
        <Fragment>
          <Grid container className={classes.bannerContainer}
              style={{backgroundImage: `url('../../${shop.picture}')`,backgroundPosition: "center",
              backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
            <Grid container className={classes.darkOverlay}>
                <Grid container className={classes.container}>
                    <Grid item className={classes.itemAvatar}>
                      <UserAvatar user={alfred} className={classes.avatarLetter} />
                        <Typography style={{marginTop:20}} className={classes.textAvatar}>Boutique de {alfred.firstname}</Typography>
                    </Grid>
                </Grid>
            </Grid>
          </Grid>
        </Fragment>
    );
  }

}

export default  withStyles(styles, { withTheme: true })(alfredBanner);
