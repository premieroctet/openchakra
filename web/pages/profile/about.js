import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import About from '../../components/About/About'
import Presentation from '../../components/Presentation/Presentation'
import Skills from '../../components/Skills/Skills'
import Badges from '../../components/Badges/Badges'
import Hashtags from '../../components/Hashtags/Hashtags'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/profile/about/about';
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import AskQuestion from "../../components/AskQuestion/AskQuestion";
import Box from "../../components/Box/Box";
import LayoutMobileProfile from "../../hoc/Layout/LayoutMobileProfile";
import axios from "axios";
import cookie from "react-cookies";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';



class ProfileAbout extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      user: props.user,
      alfred:null
    }

  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then( res => {
        this.setState( { alfred: res.data})
      })
      .catch (err => console.error(err))
  };

  static getInitialProps({query: {user, indexAccount}}) {
    return {user: user, index: indexAccount};
  }

  content = (classes, user, alfred) =>{

    return(
      <Grid container spacing={3}>
        <Hidden only={['xs']}>
          <Grid item xl={5} lg={5} md={6} sm={12} xs={12}>
            <Box>
              <About user={user} />
            </Box>
          </Grid>
        </Hidden>
        <Hidden only={['sm','md','lg','xl']}>
          <Grid style={{marginTop: '5vh'}}>
            <Grid style={{display: 'flex', flexDirection: 'row'}}>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>Habite à </Typography>
              </Grid>
              <Grid style={{margin: 3}}/>
              <Grid>
                <Typography style={{color:'black'}}>{alfred ? alfred.billing_address.city + ", " + alfred.billing_address.country : null}</Typography>
              </Grid>
            </Grid>
            <Grid style={{display: 'flex', flexDirection: 'row', marginTop: '4vh'}}>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>Parle </Typography>
              </Grid>
              <Grid style={{margin: 3}}/>
              <Grid>
                <Typography style={{color:'black'}}>{alfred ? alfred.languages.join(',') || 'Français' : null}</Typography>
              </Grid>
            </Grid>
            {
              alfred ?
                alfred.id_confirmed ?
                <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '4vh'}}>
                  <Grid>
                    <Typography style={{color: 'rgba(39,37,37,35%)'}}>{alfred ? alfred.firstname : null}</Typography>
                  </Grid>
                  <Grid style={{margin: 3}}/>
                  <Grid>
                    <Typography style={{color:'black'}}>à un profil vérifié</Typography>
                  </Grid>
                  <Grid>
                    <CheckCircleOutlineIcon/>
                  </Grid>
                </Grid> : null : null
            }
          </Grid>
        </Hidden>
        <Grid item xl={7} lg={7} md={6} sm={12} xs={12}>
          <Box>
            <Presentation user={user} />
          </Box>
        </Grid>
        <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
          <Box>
            <Skills alfred={user} />
          </Box>
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Box>
            <Badges user={user} />
          </Box>
        </Grid>
        { false ?
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.aboutHastagsContainer}>
            <Box>
              <Hashtags user={user} />
            </Box>
          </Grid>
          :
          null
        }
        <Hidden only={['sm', 'xs']}>
          <Grid item style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Grid style={{width: '70%'}}>
              <AskQuestion user={user}/>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    )
  };

  render() {
    const {classes, index, user}=this.props;
    const {alfred}=this.state;

    if(!user && alfred){
      return null
    }

    return (
      <React.Fragment>
        <Hidden only={['xs']}>
          <ProfileLayout user={user} index={index}>
            {this.content(classes, user, alfred)}
          </ProfileLayout>
        </Hidden>
        <Hidden only={['lg', 'xl',  'sm', 'md']}>
          <LayoutMobileProfile user={user} index={index}>
            {this.content(classes, user, alfred)}
          </LayoutMobileProfile>
        </Hidden>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ProfileAbout)
