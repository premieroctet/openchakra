import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import styles from './AlfredBannerStyle';
import UserAvatar from '../../Avatar/UserAvatar';
import LocalSeeIcon from '@material-ui/icons/LocalSee';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import Modal from '@material-ui/core/Modal';
const {frenchFormat}=require('../../../utils/text')

class alfredBanner extends React.Component{

  constructor(props) {
    super(props);
    this.state ={
      alfred: [], // to ensure not null
      open: false,
    };
  }

    handleChange = () => {
      this.setState({open: !this.state.open});
    };

    onSubmitBanner = e =>{
      e.preventDefault();
      const data = {picture: e.target.label.value};
      axios.put('/myAlfred/api/shop/editBanner',data)
        .then(res => {
          toast.info('Photo modifiée');
          this.setState({open: false}, () =>  this.props.needRefresh() );
        })
        .catch(() => {
          toast.error('Erreur')
        })
    };

   render() {
    const { classes, isOwner, banner, shop, alfred } = this.props;

     const image = banner.map((e,index) => (
       <div key={index}>
         <img src={`../../../${e.picture}`} alt={e.label} />
         <div className="legend">
           <p>{e.label}</p>
           <form onSubmit={(event)=>this.onSubmitBanner(event)}><input type='hidden' value={e.picture} name='label'/><button type='submit'>Choisir</button></form>
         </div>
       </div>
     ));

     return (
        <Fragment>
          <Grid container className={classes.bannerContainer} style={{backgroundImage: `url('../../${shop.picture}')`}}>
            {isOwner ?
              <Grid item className={classes.bannerPics}>
                <LocalSeeIcon onClick={()=>this.handleChange()} style={{cursor:'pointer',color:"white",width:40}}/>
              </Grid> : null
            }

            <Grid container className={classes.darkOverlay}>
                <Grid container className={classes.container}>
                    <Grid item className={classes.itemAvatar}>
                      <UserAvatar classes={'avatarLetter'} user={alfred} className={classes.avatarLetter} />
                        <Typography style={{marginTop:20}} className={classes.textAvatar}>{frenchFormat(`Les services de ${alfred.firstname}`)}</Typography>
                    </Grid>
                </Grid>
            </Grid>
          </Grid>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleChange}
          >
            <div className={classes.paper}>
              <Carousel>
                {image}
              </Carousel>
            </div>
          </Modal>
        </Fragment>
    );
  }

}

export default  withStyles(styles, { withTheme: true })(alfredBanner);
