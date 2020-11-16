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

class LayoutMobileProfile extends React.Component{

  constructor(props) {
    super(props);
    this.state= {
      currentUrlIndex: '',
      myProfilUrl: false,
      user: null,
      items: [
        {
          label: 'À propos',
          url: '/about'
        },
        {
          label: 'Mes services',
          url: '/services'
        },
        {
          label: 'Mes photos',
          url: '/pictures'
        },
        {
          label: 'Mes avis',
          url: '/reviews'
        },
        {
          label: 'Mon calendrier',
          url: '/calendar'
        },
        {
          label: 'Mes statistiques',
          url: '/statistics'
        }
      ]
    }


  }

  componentDidMount = () =>{
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then( res => {
        this.setState( { user: res.data})
      })
      .catch (err => console.error(err));

    let currentUrl = Router.pathname;
    let firstParamUrl= currentUrl.split('/')[1].split('/')[0];
    if(currentUrl === '/account/myProfile'){
      this.setState({myProfilUrl: true})
    }

    switch (firstParamUrl) {
      case 'account':
        this.setState({currentUrlIndex: 4});
        break;
      case '/':
        this.setState({currentUrlIndex: 1});
        break;
      case 'Search':
        this.setState({currentUrlIndex: 2});
        break;
      default:
        this.setState({currentUrlIndex: ''});
    }


  };

  render() {
    const{children, classes, index} = this.props;
    const{currentUrlIndex, myProfilUrl, user, items} = this.state;

    if (!user) {
      return null
    }
    const url = user.picture.match(/^https?:\/\//) ? user.picture : '/' + user.picture;

    return(
      <React.Fragment>
        <Grid>
          <Grid className={classes.layoutMobileProfilHeader}>
            <IconButton aria-label="ArrowBackIosIcon" onClick={() => Router.back()}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid className={classes.layoutMobileLayoutProfileHeader}>
            <Grid className={classes.profilLayoutAvatar}>
              <Avatar alt={user.firstname} src={url} className={classes.cardPreviewLarge} />
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', flexDirection: 'row-reverse', marginTop: '5vh', marginRight: '3vh'}}>
            <Button variant={'outlined'} classes={{root: classes.button}}>
              Editer mon profil
            </Button>
          </Grid>
          <Grid style={{display: 'flex',height: '40%', alignItems: 'center', marginTop: '5vh', marginLeft: '5vh'}}>
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
          <ScrollMenu categories={items} mode={'profile'} indexCat={index} extraParams={{user: this.props.user}}/>
        </Grid>
        <Grid style={{padding: '10%'}}>
          {children}
        </Grid>
        <Grid style={{position: 'fixed', bottom: '3%', display: 'flex', justifyContent: 'center', width: '100%', zIndex: 1}}>
          <Grid style={{width: '90%'}}>
            <MobileNavbar currentUrlIndex={currentUrlIndex}/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles (styles) (LayoutMobileProfile);
