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
import LogIn from "../../../components/LogIn/LogIn";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Register from "../../../components/Register/Register";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
const {getLoggedUserId}=require('../../../utils/functions');

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


class MobileNavbar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      user: {},
      indexAccount: props.indexAccount,
      currentIndex:0,
      anchorEl: null,
      setOpenLogin: false,
      setOpenRegister: false,
      activeStep: 0
    }
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        this.setState({ user : res.data})
      }).catch(err => console.error(err));
  }

  needRefresh = () => {
    this.setState({setOpenLogin: false});
    Router.push('/search');
  };

  getUserId() {
    return this.state.user._id || getLoggedUserId()
  }

  handleMenuClose = () => {
    this.setState({anchorEl: null});
  };

  handleOpenRegister = (e) => {
    this.handleMenuClose();
    this.setState({setOpenRegister: true, setOpenLogin: false});
  };

  handleOpenLogin = (e) => {
    this.handleMenuClose();
    this.setState({setOpenLogin: true, setOpenRegister: false});
  };

  handleCloseLogin = () => {
    this.setState({setOpenLogin: false});
  };


  handleCloseRegister = () => {
    if (this.state.activeStep === 2) {
      this.setState({setOpenRegister: false}, () => this.componentDidMount());
    } else {
      this.setState({setOpenRegister: false});
    }
  };

  getData = (e) => {
    this.setState({activeStep: e});
  };

  modalLogin = (classes) => {
    return (
      <Dialog
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.navbarModal}
        open={this.state.setOpenLogin}
        onClose={this.handleCloseLogin}
        TransitionComponent={Transition}
        classes={{paperWidthSm: classes.navbarPaperWidth}}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseLogin}/>
        <DialogContent classes={{root: classes.navbarWidthLoginContent}}>
          <Grid className={classes.navbarPaper}>
            <LogIn callRegister={this.handleOpenRegister} login={this.needRefresh}/>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  modalRegister = (classes) =>{
    return(
      <Dialog
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.navbarModal}
        open={this.state.setOpenRegister}
        onClose={this.handleCloseRegister}
        TransitionComponent={Transition}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseRegister}/>
        <DialogContent dividers={false} className={classes.navbarMuidialogContent}>
          <Grid className={classes.navbarPaper}>
            <Register callLogin={this.handleOpenLogin} sendParentData={this.getData}/>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  };

  render() {
    const{classes, currentIndex} = this.props;
    const{setOpenLogin, setOpenRegister} = this.state;

    const user = this.getUserId();

    return(
      <BottomNavigation
        value={currentIndex}
        classes={{root: classes.navigationRoot}}
      >
        <BottomNavigationAction onClick={() => Router.push('/')} classes={{root: classes.navigationActionRoot}} value={0} icon={<HomeIcon/>}/>
        <BottomNavigationAction onClick={() => Router.push('/search')} classes={{root: classes.navigationActionRoot}} value={1} icon={<SearchIcon/>}/>
        {
          user ?
            <BottomNavigationAction onClick={() => Router.push('/reservations/reservations')} classes={{root: classes.navigationActionRoot}} value={2} icon={<CalendarTodayIcon/>}/> : null
        }
        {
          user ?
            <BottomNavigationAction onClick={() =>  Router.push(`/profile/messages?user=${this.state.user._id}`)} classes={{root: classes.navigationActionRoot}} value={3} icon={<MailOutlineIcon/>}/> : null

        }
        <BottomNavigationAction onClick={user ? () => Router.push('/account/myProfile') : this.handleOpenLogin} classes={{root: classes.navigationActionRoot}} value={4} icon={ <PersonIcon/>}/>

        {setOpenLogin ? this.modalLogin(classes) : null}
        {setOpenRegister ? this.modalRegister(classes) : null}
      </BottomNavigation>
    );
  }

}

export default withStyles (styles) (MobileNavbar);
