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

class MobileNavbar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      value: 0,
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
    }
  }

  render() {
    const{value, labels} = this.state;
    const{classes} = this.props;

    return(
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          this.setState({value: newValue});
        }}
        classes={{root: classes.navigationRoot}}
      >
        {
          labels.map((res, index) =>{
            return(
              <BottomNavigationAction classes={{root: classes.navigationActionRoot}} value={index} icon={res.icon} />
            )
          })
        }
      </BottomNavigation>
    );
  }
}

export default withStyles (styles) (MobileNavbar);
