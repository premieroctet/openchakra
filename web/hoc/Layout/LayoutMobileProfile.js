import React from 'react';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Router from "next/router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MobileNavbar from "./NavBar/MobileNavbar";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../static/css/components/Layout/LayoutMobileProfile/LayoutMobileProfile'
import axios from "axios";
import cookie from "react-cookies";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScrollMenu from "../../components/ScrollMenu/ScrollMenu";
import Divider from "@material-ui/core/Divider";
import UserAvatar from "../../components/Avatar/UserAvatar";
const {isEditableUser}=require('../../utils/functions');

class LayoutMobileProfile extends React.Component{

  constructor(props) {
    super(props);
    this.state= {
      currentUrlIndex: '',
      myProfilUrl: false,
      user: null,
    };
    this.nonlogged_items= [
      { label: 'À propos', url: '/about' },
      { label: 'Services', url: '/services' },
      //{ label: 'Photos', url: '/pictures' }, TODO : Albums 899538 899547
      { label: 'Avis', url: '/reviews' },
    ]
    this.logged_items= [
      { label: 'À propos', url: '/about' },
      { label: 'Mes services', url: '/services' },
      //{ label: 'Mes photos', url: '/pictures' }, TODO : Albums 899538 899547
      { label: 'Mes avis', url: '/reviews' },
    ];
    this.logged_alfred_items = [
      { label: 'À propos', url: '/about' },
      { label: 'Mes services', url: '/services' },
      //{ label: 'Mes photos', url: '/pictures' }, TODO : Albums 899538 899547
      { label: 'Mes avis', url: '/reviews' },
      { label: 'Mon calendrier', url: '/calendar' },
      { label: 'Mes statistiques', url: '/statistics'}
    ];
  }

  componentDidMount = () =>{
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then( res => {
        this.setState( { user: res.data})
      })
      .catch (err => console.error(err));
  };

  render() {
    const{children, classes, index, currentIndex} = this.props;
    const{user, items} = this.state;

    if (!user) {
      return null
    }

    const menuItems = isEditableUser(this.props.user) ? user.is_alfred ? this.logged_alfred_items : this.logged_items : this.nonlogged_items;


    return(
      <Grid>
        <Grid>
          <Grid className={classes.layoutMobileProfilHeader}>
            <IconButton aria-label="ArrowBackIosIcon" onClick={() => Router.back()}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid className={classes.layoutMobileLayoutProfileHeader}>
            <Grid className={classes.profilLayoutAvatar}>
              <UserAvatar alt={user.firstname} user={user} className={classes.cardPreviewLarge} />
            </Grid>
          </Grid>
          <Grid style={{display: 'flex',height: '40%', alignItems: 'center', marginTop: '10vh', marginLeft: '5vh'}}>
            <Grid style={{display: 'flex',flexDirection: 'column'}}>
              <Grid>
                <h3>{`Je m'appelle ${user ? user.firstname : ''}`}</h3>
              </Grid>
              <Grid>
                <Typography style={{color:'rgba(39,37,37,35%)'}}>et j’ai hâte de vous rencontrer !</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '5vh', marginLeft: '5vh'}}>
            <Grid>
              <CalendarTodayIcon/>
            </Grid>
            <Grid style={{marginLeft: '3vh'}}>
              <Typography>Membre depuis 2020</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{marginTop: '5vh'}}>
          <Divider/>
        </Grid>
        <Grid className={classes.profilLayoutScrollMenu}>
          <ScrollMenu categories={menuItems} mode={'profile'} indexCat={index} extraParams={{user: this.props.user}}/>
        </Grid>
        <Grid style={{padding: '10%'}}>
          {children}
        </Grid>
        <Grid style={{position: 'fixed', bottom: '3%', display: 'flex', justifyContent: 'center', width: '100%', zIndex: 4}}>
          <Grid style={{width: '90%'}}>
            <MobileNavbar currentIndex={currentIndex}/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles (styles) (LayoutMobileProfile);
