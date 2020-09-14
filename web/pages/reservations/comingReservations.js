import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import styles from './comingReservations/comingReservationsStyle';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
import UserAvatar from '../../components/Avatar/UserAvatar';
import Button from '@material-ui/core/Button';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import cookie from 'react-cookies';

moment.locale('fr');

class ComingReservations extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();

    this.state = {
      tabs: false,
      user: null,
      alfredReservations: [],
      userReservations: [],
      comingReservations: 0,
      isAlfred: false,
      userInfo: {},
    };
    this.callDrawer = this.callDrawer.bind(this);
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get('/myAlfred/api/users/current').then(res => {
      let result = res.data;
      this.setState({
        userInfo: result,
        user: result._id,
        isAlfred: result.is_alfred,
        tabs: !result.is_alfred,
      });


      axios.get('/myAlfred/api/booking/alfredBooking').then(res => {
        this.setState({alfredReservations: res.data});

        axios.get('/myAlfred/api/booking/userBooking').then(res => {
          this.setState({userReservations: res.data});

          this.state.alfredReservations.forEach(booking => {
            if (
              booking.status === 'Demande d\'infos' ||
              booking.status === 'En attente de confirmation' ||
              booking.status === 'Confirmée' ||
              booking.status === 'Pré-approuvée'
            ) {
              this.setState({
                comingReservations: this.state.comingReservations + 1,
              });
            }
          });

          this.state.userReservations.forEach(booking => {
            if (
              booking.status === 'Demande d\'infos' ||
              booking.status === 'En attente de confirmation' ||
              booking.status === 'Confirmée' ||
              booking.status === 'Pré-approuvée'
            ) {
              this.setState({
                comingReservations: this.state.comingReservations + 1,
              });
            }
          });
        });
      });
    });
  }

  handleClicktabs2 = () => {
    this.setState({tabs: true});
  };

  handleClicktabs = () => {
    this.setState({tabs: false});
  };

  callDrawer() {
    this.child.current.handleDrawerToggle();
  }

  render() {
    const {userInfo} = this.state;
    const {classes} = this.props;
    const tabs = this.state.tabs;

    return (
      <Fragment>
        <Layout>
          <Grid container className={classes.bigContainer}>
            {this.state.isAlfred ? (
              <Grid className={classes.navbarShopContainer}>
                <NavBarShop userId={this.state.user}/>
              </Grid>
            ) : null}

            {/*/////////////////////////////////////////////////////////////////////////////////////////*/}

            <Grid container>
              <Grid className={classes.toggle}>
                <Grid>
                  <ResponsiveDrawer ref={this.child} isActiveIndex={1} itemsDrawers={'reservation'} needMargin={true}/>
                </Grid>
                <Grid>
                  <Grid>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={this.callDrawer}
                      className={classes.menuButton}
                    >
                      <MenuIcon/>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={classes.paddresp} item xs={9} sm={9} md={7}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography style={{fontSize: '2rem', marginTop: '4%'}}>
                      Mes réservations à venir
                    </Typography>
                  </Grid>
                  <Typography style={{fontSize: '0.8rem', marginBottom: '4%'}}>
                    Vous avez {this.state.comingReservations} réservations à venir
                  </Typography>
                </Grid>
                {
                  userInfo.is_alfred ?
                    <Grid container className={classes.tabweb}>
                      <Grid item xs={6} style={{textAlign: 'center'}}>
                        <div>
                          <h2
                            onClick={this.handleClicktabs}
                            style={{
                              color: '#828181',
                              fontWeight: '100',
                              cursor: 'pointer',
                              marginLeft: '0%',
                              position: 'sticky',
                            }}
                          >
                            En tant qu'Alfred
                          </h2>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <h2
                          onClick={this.handleClicktabs2}
                          style={{
                            color: '#828181',
                            fontWeight: '100',
                            textAlign: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          {' '}
                          En tant qu'utilisateur
                        </h2>
                        <br/>
                      </Grid>

                      <Grid item xs={6}>
                        {tabs ? (
                          <React.Fragment>
                            <hr
                              className={classes.trait1}
                              style={{marginTop: '-25px'}}
                            />
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <hr
                              className={classes.trait3}
                              style={{marginTop: '-25px'}}
                            />
                          </React.Fragment>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        {tabs ? (
                          <React.Fragment>
                            <hr
                              className={classes.trait}
                              style={{marginTop: '-25px'}}
                            />
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <hr
                              className={classes.trait2}
                              style={{marginTop: '-25px'}}
                            />
                          </React.Fragment>
                        )}
                      </Grid>
                    </Grid>
                    : null
                }
                {
                  userInfo.is_alfred ?
                    <Grid container className={classes.tabmobile}>
                      <Grid item xs={6} style={{textAlign: 'center'}}>
                        <h2
                          onClick={this.handleClicktabs}
                          style={{
                            color: '#828181',
                            fontWeight: '100',
                            cursor: 'pointer',
                          }}
                        >
                          En tant qu'Alfred
                        </h2>
                      </Grid>
                      <Grid item xs={6}>
                        <h2
                          onClick={this.handleClicktabs2}
                          style={{
                            color: '#828181',
                            fontWeight: '100',
                            textAlign: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          En tant qu'utilisateur
                        </h2>
                        <br/>
                      </Grid>

                      <Grid item xs={6} style={{textAlign: 'center'}}>
                        {tabs ? (
                          <React.Fragment>
                            <hr className={classes.trait1}/>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <hr className={classes.trait3}/>
                          </React.Fragment>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        {tabs ? (
                          <React.Fragment>
                            <hr className={classes.trait}/>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <hr className={classes.trait2}/>
                          </React.Fragment>
                        )}
                      </Grid>
                    </Grid>
                    : null
                }
                {/************************************************************ début en tant que user web **************************************************/}

                {tabs ? (
                  <React.Fragment>
                    {this.state.userReservations.length ? (
                      this.state.userReservations.map((booking, i) => {
                        if (
                          booking.status === 'Confirmée' ||
                          booking.status === 'En attente de confirmation' ||
                          booking.status === 'Demande d\'infos' ||
                          booking.status === 'Pré-approuvée'
                        ) {
                          return (
                            <React.Fragment>
                              {/* Web */}
                              <Grid container className={classes.webrow}>
                                <Grid item xs={2} md={1} className={classes.avatarContainer}>
                                  <UserAvatar user={booking.alfred}/>
                                </Grid>
                                <Grid item xs={5} md={6} className={classes.descriptionContainer}>
                                  <Grid>
                                    <Typography
                                      style={{
                                        marginTop: '2%',
                                        fontSize: '0.8rem',
                                        color:
                                          booking.status === 'Confirmée'
                                            ? '#419F41'
                                            : booking.status ===
                                            'En attente de confirmation' ||
                                            booking.status === 'Demande d\'infos'
                                            ? '#F87280'
                                            : booking.status === 'Pré-approuvée'
                                              ? '#F89B72'
                                              : '#5D5D5D',
                                      }}
                                    >
                                      {booking.status} - {booking.alfred.firstname}
                                    </Typography>
                                  </Grid>
                                  <Grid>
                                    <Typography style={{color: '#9B9B9B', fontSize: '0.8rem'}}>
                                      {booking.date_prestation} -{' '}
                                      {moment(booking.time_prestation).format(
                                        'HH:mm',
                                      )}
                                    </Typography>
                                  </Grid>
                                  <Grid>
                                    <Typography style={{color: '#9B9B9B', fontSize: '0.8rem'}}>
                                      {booking.service}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid item xs={2} className={classes.priceContainer}>
                                  <Grid>
                                    <Typography style={{color: '#4FBDD7', fontWeight: '600'}}>
                                      {booking.amount.toFixed(2)}€
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid>
                                    <Link
                                      href={{pathname: '/reservations/detailsReservation', query: {id: booking._id}}}>
                                      <Button color={'primary'} variant={'outlined'}>Détail</Button>
                                    </Link>
                                  </Grid>
                                </Grid>
                                <hr className={classes.hrSeparator}/>
                              </Grid>

                              {/************************************************************ fin en tant que user web **************************************************/}

                              {/************************************************************ début en tant que user mobile **************************************************/}
                              {/* Mobile */}
                              <Grid
                                container
                                className={classes.mobilerow1}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}
                                >
                                  <UserAvatar user={booking.alfred}/>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  style={{
                                    textAlign: 'center',
                                    fontSize: '0.8rem',
                                  }}
                                >
                                  <Typography
                                    style={{
                                      marginTop: '2%',
                                      fontSize: '0.8rem',
                                      color:
                                        booking.status === 'Confirmée'
                                          ? '#419F41'
                                          : booking.status ===
                                          'En attente de confirmation' ||
                                          booking.status === 'Demande d\'infos'
                                          ? '#F87280'
                                          : booking.status === 'Pré-approuvée'
                                            ? '#F89B72'
                                            : '#5D5D5D',
                                    }}
                                  >
                                    {booking.status} -{' '}
                                    {booking.alfred.firstname}
                                  </Typography>
                                  <Typography
                                    style={{
                                      color: '#9B9B9B',
                                      fontSize: '0.8rem',
                                    }}>
                                    {booking.date_prestation} -{' '}
                                    {moment(booking.time_prestation).format(
                                      'HH:mm',
                                    )}
                                  </Typography>
                                  <Typography
                                    style={{
                                      color: '#9B9B9B',
                                      fontSize: '0.8rem',
                                    }}>
                                    {booking.service}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} style={{}}>
                                  <Typography
                                    style={{
                                      color: '#4FBDD7',
                                      fontWeight: '600',
                                      paddingTop: '5%',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {booking.amount.toFixed(2)}€
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} style={{}}>

                                  <Link href={{pathname: '/reservations/detailsReservation', query: {id: booking._id}}}>
                                    <Typography
                                      style={{
                                        height: '45px',
                                        backgroundColor: '#2FBCD3',
                                        color: 'white',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        lineHeight: '3',
                                        marginTop: '5%',
                                      }}
                                    >

                                      <a
                                        style={{
                                          textDecoration: 'none',
                                          color: 'white',
                                        }}
                                      >
                                        Détail
                                      </a>
                                    </Typography>
                                  </Link>
                                </Grid>
                              </Grid>

                            </React.Fragment>
                          );
                        } else {
                          return null;
                        }
                      })
                    ) : (
                      <p>
                        Vous n'avez aucune réservation en tant qu'utilisateur
                      </p>
                    )}
                    {/************************************************************ fin en tant que user mobile **************************************************/}

                  </React.Fragment>

                ) : this.state.alfredReservations.length ? (
                  this.state.alfredReservations.map((booking, i) => {
                    if (
                      booking.status === 'Confirmée' ||
                      booking.status === 'En attente de confirmation' ||
                      booking.status === 'Demande d\'infos' ||
                      booking.status === 'Pré-approuvée'
                    ) {
                      return (
                        <React.Fragment>
                          {/* Web */}
                          <Grid container className={classes.webrow}>
                            <Grid item xs={2} md={1} className={classes.avatarContainer}>
                              <UserAvatar user={booking.user}/>
                            </Grid>
                            <Grid item xs={5} md={6} className={classes.descriptionContainer}>
                              <Typography
                                style={{
                                  marginTop: '2%',
                                  fontSize: '0.8rem',
                                  color:
                                    booking.status === 'Confirmée'
                                      ? '#419F41'
                                      : booking.status ===
                                      'En attente de confirmation' ||
                                      booking.status === 'Demande d\'infos'
                                      ? '#F87280'
                                      : booking.status === 'Pré-approuvée'
                                        ? '#F89B72'
                                        : '#5D5D5D',
                                }}
                              >
                                {booking.status === 'Pré-approuvée'
                                  ? 'Invitation à réserver'
                                  : booking.status}{' '}
                                - {booking.user.firstname}
                              </Typography>
                              <Grid>
                                <Typography style={{color: '#9B9B9B', fontSize: '0.8rem'}}>
                                  {booking.date_prestation} -{' '}
                                  {moment(booking.time_prestation).format('HH:mm')}
                                </Typography>
                              </Grid>
                              <Grid>
                                <Typography style={{color: '#9B9B9B', fontSize: '0.8rem'}}>
                                  {booking.service}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item xs={2} className={classes.priceContainer}>
                              <Grid>
                                <Typography style={{color: '#4FBDD7', fontWeight: '600'}}>
                                  {(booking.amount - booking.fees).toFixed(2)}€
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid>
                                <Link href={{pathname: '/reservations/detailsReservation', query: {id: booking._id}}}>
                                  <Button color={'primary'} variant={'outlined'}>Détail</Button>
                                </Link>
                              </Grid>
                            </Grid>
                            <hr className={classes.hrSeparator}/>
                          </Grid>

                          {/* Mobile */}
                          <Grid
                            container
                            className={classes.mobilerow1}
                          >
                            <Grid
                              item
                              xs={12}
                              style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}
                            >
                              <UserAvatar user={booking.user}/>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              style={{textAlign: 'center', fontSize: '0.8rem'}}
                            >
                              <Typography
                                style={{
                                  fontSize: '0.8rem',
                                  marginTop: '2%',
                                  color:
                                    booking.status === 'Confirmée'
                                      ? '#419F41'
                                      : booking.status ===
                                      'En attente de confirmation' ||
                                      booking.status === 'Demande d\'infos'
                                      ? '#F87280'
                                      : booking.status === 'Pré-approuvée'
                                        ? '#F89B72'
                                        : '#5D5D5D',
                                }}
                              >
                                {booking.status === 'Pré-approuvée'
                                  ? 'Invitation à réserver'
                                  : booking.status}{' '}
                                - {booking.user.firstname}
                              </Typography>
                              <Typography style={{color: '#9B9B9B', fontSize: '0.8rem'}}>
                                {booking.date_prestation} -{' '}
                                {moment(booking.time_prestation).format('HH:mm')}
                              </Typography>
                              <Typography style={{color: '#9B9B9B', fontSize: '0.8rem'}}>
                                {booking.service}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                style={{
                                  color: '#4FBDD7',
                                  fontWeight: '600',
                                  paddingTop: '5%',
                                  textAlign: 'center',
                                }}
                              >
                                {(booking.amount - booking.fees).toFixed(2)}€
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Link href={{pathname: '/reservations/detailsReservation', query: {id: booking._id}}}>
                                <Typography
                                  style={{
                                    height: '45px',
                                    backgroundColor: '#2FBCD3',
                                    color: 'white',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    lineHeight: '3',
                                    marginTop: '5%',
                                  }}
                                >

                                  <a
                                    style={{
                                      textDecoration: 'none',
                                      color: 'white',
                                    }}
                                  >
                                    Détail
                                  </a>
                                </Typography>
                              </Link>
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      );
                    } else if (this.state.alfredReservations.length === i + 1) {
                      return (
                        <p>Vous n'avez aucune réservation en tant qu'Alfred</p>
                      );
                    } else {
                      return null;
                    }
                  })
                ) : (
                  <p>Vous n'avez aucune réservation en tant qu'Alfred</p>
                )}
              </Grid>
            </Grid>

            {/*/////////////////////////////////////////////////////////////////////////////////////////*/}
          </Grid>
        </Layout>
        <NavbarMobile userId={this.state.userId}/>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ComingReservations);
