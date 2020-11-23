import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonIcon from '@material-ui/icons/Person';
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../../static/css/components/MobileNavbar/MobileNavbar';
import Router from 'next/router';
import axios from "axios";
import cookie from "react-cookies";

class MobileNavbar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      labels:[
        {
          icon: <HomeIcon/>
        },
        {
          icon:  <SearchIcon/>
        },
        {
          icon:  <CalendarTodayIcon/>
        },
        {
          icon:  <MailOutlineIcon/>
        },
        {
          icon:  <PersonIcon/>
        }
      ],
      user: {},
      indexAccount: props.indexAccount,
      currentIndex:0
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        this.setState({ user : res.data})
      }).catch(err => console.error(err));
  }

  handleNavigation = (event, newValue) =>{
    switch (newValue) {
      case 0:
        Router.push('/');
        break;
      case 1:
        Router.push('/search');
        break;
      case 2:
        Router.push('/reservations/reservations');
        break;
      case 3:
        Router.push(`/profile/messages?user=${this.state.user._id}`);
        break;
      case 4:
        Router.push('/account/myProfile');
        break;
      default:
        this.setState({currentUrlIndex: ''});
    }
  };


  render() {
    const{labels} = this.state;
    const{classes, currentIndex} = this.props;

    return(
      <BottomNavigation
        value={currentIndex}
        onChange={(event, newValue) => {
          this.handleNavigation(event,newValue)
        }}
        classes={{root: classes.navigationRoot}}
      >
        {
          labels.map((res, index) =>{
            return(
              <BottomNavigationAction key={index} classes={{root: classes.navigationActionRoot}} value={index} icon={res.icon}/>
            )
          })
        }
      </BottomNavigation>
    );
  }
}

export default withStyles (styles) (MobileNavbar);
