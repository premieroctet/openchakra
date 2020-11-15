import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import {toast} from 'react-toastify';
import {Helmet} from 'react-helmet';
import styles from '../../static/css/pages/account/notifications/notifications';
import cookie from 'react-cookies';
import LayoutAccount from "../../hoc/Layout/LayoutAccount";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";


moment.locale('fr');

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 72,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 2,
    '&$checked': {
      transform: 'translateX(46px)',
      color: 'rgba(248,207,97,1)',
      '& + $track': {
        backgroundColor: 'white',
        opacity: 1,
        border: `1px solid ${theme.palette.grey[400]}`,
      },
    },
    '&$focusVisible $thumb': {
      color: 'rgba(248,207,97,1)',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 20,
    height: 20,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

class notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      messages_email: false,
      messages_push: false,
      messages_sms: false,
      rappel_email: false,
      rappel_push: false,
      rappel_sms: false,
      promotions_email: false,
      promotions_push: false,
      promotions_sms: false,
      promotions_phone: false,
      community_email: false,
      community_push: false,
      community_sms: false,
      assistance_email: true,
      assistance_push: false,
      assistance_sms: false,
    };
  }

  static getInitialProps({query: {indexAccount}}) {
    return {index: indexAccount};

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({user: user});
        this.setState({
          messages_email: user.notifications_message.email,
          messages_push: user.notifications_message.push,
          messages_sms: user.notifications_message.sms,
        });
        this.setState({
          rappel_email: user.notifications_rappel.email,
          rappel_push: user.notifications_rappel.push,
          rappel_sms: user.notifications_rappel.sms,
        });
        this.setState({
          promotions_email: user.notifications_promotions.email,
          promotions_push: user.notifications_promotions.push,
          promotions_sms: user.notifications_promotions.sms,
          promotions_phone: user.notifications_promotions.phone,
        });
        this.setState({
          community_email: user.notifications_community.email,
          community_push: user.notifications_community.push,
          community_sms: user.notifications_community.sms,
        });
        this.setState({
          assistance_email: user.notifications_assistance.email,
          assistance_push: user.notifications_assistance.push,
          assistance_sms: user.notifications_assistance.sms,
        });
      })
      .catch(err => {
          if (err.response.status === 401 || err.response.status === 403) {
            cookie.remove('token', {path: '/'});
            Router.push({pathname: '/login'});
          }
        },
      );
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.checked}, this.save);
  };

  save = () => {
    const data = {
      messages_email: this.state.messages_email,
      messages_push: this.state.messages_push,
      messages_sms: this.state.messages_sms,
      rappel_sms: this.state.rappel_sms,
      rappel_email: this.state.rappel_email,
      rappel_push: this.state.rappel_push,
      promotions_email: this.state.promotions_email,
      promotions_push: this.state.promotions_push,
      promotions_sms: this.state.promotions_sms,
      promotions_phone: this.state.promotions_phone,
      community_email: this.state.community_email,
      community_push: this.state.community_push,
      community_sms: this.state.community_sms,
      assistance_push: this.state.assistance_push,
      assistance_sms: this.state.assistance_sms,
    };

    axios.put('/myAlfred/api/users/account/notifications', data)
      .then(() => {
        toast.info('Compte mis à jour');
      })
      .catch();
  };

  content = (classes) =>{
    return(
      <Grid>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>Mes notifications</h2>
          </Grid>
          <Grid>
            <Typography>Choisissez les notifications que vous souhaitez recevoir </Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <Grid>
              <h2>Messages</h2>
            </Grid>
            <Grid>
              <Typography style={{color:'rgba(39,37,37,35%)'}}>Recevez des messages de la part des Alfred et des utilisateurs y compris les demandes de réservations.</Typography>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row', marginTop: '5vh'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.messages_email}
                  onChange={this.handleChange('messages_email')}
                  value={'messages_email'}
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>Notification push</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.messages_push}
                  onChange={this.handleChange('messages_push')}
                  value={'messages_push'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>SMS</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.messages_sms}
                  onChange={this.handleChange('messages_sms')}
                  value={'messages_sms'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
          </Grid>
          <Grid>
            <Grid>
              <h2>Rappel</h2>
            </Grid>
            <Grid>
              <Typography>
                Recevez des rappels de réservation, des demandes d’évaluation, des informations sur les tarifs et
                d’autres rappels relatifs à vos activités sur My-Alfred.
              </Typography>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row', marginTop: '5vh'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.rappel_email}
                  onChange={this.handleChange('rappel_email')}
                  value={'rappel_email'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>Notification push</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.rappel_push}
                  onChange={this.handleChange('rappel_push')}
                  value={'rappel_push'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>SMS</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.rappel_sms}
                  onChange={this.handleChange('rappel_sms')}
                  value={'rappel_sms'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
          </Grid>
          <Grid>
            <Grid>
              <h2>Promotions & Astuces</h2>
            </Grid>
            <Grid>
              <Typography>
                Recevez des coupons, des informations promotionnelles, des enquêtes, et des informations de la part
                de My-Alfred
                et de ses partenaires.
              </Typography>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row', marginTop: '5vh'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.promotions_email}
                  onChange={this.handleChange('promotions_email')}
                  value={'promotions_email'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>Notification push</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.promotions_push}
                  onChange={this.handleChange('promotions_push')}
                  value={'promotions_push'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>SMS</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.promotions_sms}
                  onChange={this.handleChange('promotions_sms')}
                  value={'promotions_sms'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>Appel téléphonique</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.promotions_phone}
                  onChange={this.handleChange('promotions_phone')}
                  value={'promotions_phone'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
          </Grid>
          <Grid>
            <Grid>
              <h2>Politique & communauté </h2>
            </Grid>
            <Grid>
              <Typography>
                Recevez des nouvelles sur les réglementations liées aux prestations de services
              </Typography>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row', marginTop: '5vh'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.community_email}
                  onChange={this.handleChange('community_email')}
                  value={'community_email'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>Notification push</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.community_push}
                  onChange={this.handleChange('community_push')}
                  value={'community_push'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>SMS</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.community_sms}
                  onChange={this.handleChange('community_sms')}
                  value={'community_sms'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
          </Grid>
          <Grid>
            <Grid>
              <h2>Assistance du compte </h2>
            </Grid>
            <Grid>
              <Typography>
                Vos réservations,
                des informations légales,
                des questions de sécurité et de confidentialité.
                Pour votre sécurité, vous ne pouvez pas désactiver les notifications par email.
              </Typography>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row', marginTop: '5vh'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.assistance_email}
                  onChange={this.handleChange('assistance_email')}
                  value={'assistance_email'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>Notification push</Typography>
              </Grid>
              <Grid item xl={3}  xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.assistance_push}
                  onChange={this.handleChange('assistance_push')}
                  value={'assistance_push'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
              <Grid item xl={3}  xs={6}>
                <Typography>SMS</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <IOSSwitch
                  checked={this.state.assistance_sms}
                  onChange={this.handleChange('assistance_sms')}
                  value={'assistance_sms'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
      </Grid>

    )
  };

  render() {
    const {classes, index} = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>Mon compte - Notifications - My Alfred </title>
          <meta property="description"
                content="Gérez vos notifications My Alfred depuis votre compte. Choisissez comment vous souhaitez être contacté en cas de réservation, de messages, d'annulation d'un service sur My Alfred. "/>
        </Helmet>
        <Hidden only={['xs', 'sm', 'md']}>
          <LayoutAccount index={index}>
            {this.content(classes)}
          </LayoutAccount>
        </Hidden>
        <Hidden only={['lg', 'xl']}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>

    </React.Fragment>
    );
  };
}

export default withStyles(styles)(notifications);
