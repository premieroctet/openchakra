import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../hoc/Layout/Layout";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import styles from "./messages/messagesStyle";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import _ from 'lodash';
import UserAvatar from '../../components/Avatar/UserAvatar';
import moment from 'moment';
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
import Button from '@material-ui/core/Button';


class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idEmitter: "",
      currentUser: {},
      idRecipient: "",
      chatrooms: [],
      tabs: false,
      alfredReservations: [],
      userReservations: [],
      isAlfred: false,
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
    );
    axios.get("/myAlfred/api/users/current").then(res => {
      this.setState({ idEmitter: res.data._id,currentUser: res.data });
      if(res.data.is_alfred === true){
        this.setState({isAlfred: true})
      }
      if(this.state.isAlfred === false){
        this.setState({
          tabs : true
        })
      }
    });
    axios
        .get("/myAlfred/api/booking/alfredBooking")
        .then(res => {
          this.setState({ alfredReservations: res.data });
        })
        .catch(err => console.log(err));

    axios
        .get("/myAlfred/api/booking/userBooking")
        .then(res => {
          this.setState({ userReservations: res.data });
        })
        .catch(err => console.log(err));


    axios
        .get("/myAlfred/api/chatRooms/userChatRooms")
        .then(res => {
          this.setState({ chatrooms: res.data });

        });
  }

  isAlfred(){
    if(this.state.isAlfred === false){
      this.setState({tabs: true})
    }
  }

  handleClicktabs2 = () => {
    this.setState({ tabs: true });
  };

  handleClicktabs = () => {
    this.setState({ tabs: false });
  };



  render() {
    const { isAlfred } = this.state;
    const { classes } = this.props;
    const tabs = this.state.tabs;

    return (
        <Fragment>
          <Layout>
            <Grid container className={classes.bigContainer}>
              {this.state.currentUser.is_alfred === true?
                <Grid className={classes.navbarShopContainer}>
                  <NavBarShop userId={this.state.idEmitter}/>
                </Grid>

                  : null}


              {/*/////////////////////////////////////////////////////////////////////////////////////////*/}

              <Grid container>
                <Grid
                    className={classes.toggle}
                    item
                    xs={3}
                >
                  <div className={classes.trigger}/>
                  <Grid
                      container
                      style={{
                        justifyContent: "center"
                      }}
                  >
                    <Grid
                        item
                        style={{ marginTop: 30, width: 281, height: 70 }}
                        className={classes.hidesm}
                    >
                      <Link href={"/reservations/messages"}>
                        <div
                            style={{
                              border: "0.2px solid lightgrey",
                              lineHeight: "4",
                              paddingLeft: 5,
                              paddingRight: 5,
                              display: "flex",
                              height: 70
                            }}
                        >
                          <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                            Tous les messages
                          </a>
                        </div>
                      </Link>
                    </Grid>
                    <Grid item style={{marginTop: 30,width: 281}} className={classes.hidelg}>
                      <Link href={'/reservations/messages'}>
                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                          <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                            <img src={'../static/speech-bubble-2.svg'} alt={'user'} width={27} height={70} style={{marginRight: 4}}/>

                          </a>
                        </div>
                      </Link>
                    </Grid>

                    <Grid
                        item
                        style={{ marginTop: 10, width: 281, height: 70 }}
                        className={classes.hidesm}
                    >
                      <Link href={"/reservations/newMessages"}>
                        <div
                            style={{
                              border: "0.2px solid lightgrey",
                              lineHeight: "4",
                              paddingLeft: 5,
                              paddingRight: 5,
                              display: "flex",
                              height: 70
                            }}
                        >
                          <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                            Messages non lus
                          </a>
                        </div>
                      </Link>
                    </Grid>
                    <Grid item style={{marginTop: 30,width: 281}} className={classes.hidelg}>
                      <Link href={'/reservations/newMessages'}>
                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                          <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                            <img src={'../static/email.svg'} alt={'user'} width={27} height={70} style={{marginRight: 4}}/>

                          </a>
                        </div>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid style={{paddingLeft: '10px'}} item xs={9} sm={9} md={7}>
                  <Typography style={{ fontSize: "2rem", marginTop: "4%" }}>
                    Mes messages
                  </Typography>
                  <Typography style={{ fontSize: "0.8rem", marginBottom: "4%" }}>
                    Vous avez {this.state.chatrooms.length} conversations
                  </Typography>

                  {
                    isAlfred ?
                      <Grid container className={classes.tabweb}>
                        <Grid item xs={6} style={{ textAlign: "center" }}>
                          <div>
                            <h2
                              onClick={this.handleClicktabs}
                              style={{
                                color: "#828181",
                                fontWeight: "100",
                                cursor: "pointer",
                                marginLeft: "0%",
                                position: "sticky"
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
                              color: "#828181",
                              fontWeight: "100",
                              textAlign: "center",
                              cursor: "pointer"
                            }}
                          >
                            {" "}
                            En tant qu'utilisateur
                          </h2>
                          <br />
                        </Grid>

                        <Grid item xs={6}>
                          {tabs ? (
                            <React.Fragment>
                              <hr
                                className={classes.trait1}
                                style={{ marginTop: "-25px" }}
                              />
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <hr
                                className={classes.trait3}
                                style={{ marginTop: "-25px" }}
                              />
                            </React.Fragment>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          {tabs ? (
                            <React.Fragment>
                              <hr
                                className={classes.trait}
                                style={{ marginTop: "-25px" }}
                              />
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <hr
                                className={classes.trait2}
                                style={{ marginTop: "-25px" }}
                              />
                            </React.Fragment>
                          )}
                        </Grid>
                      </Grid>
                      : null
                  }
                  {
                    isAlfred ?
                      <Grid container className={classes.tabmobile}>
                        <Grid item xs={6} style={{ textAlign: "center" }}>
                          <h2
                            onClick={this.handleClicktabs}
                            style={{
                              color: "#828181",
                              fontWeight: "100",
                              cursor: "pointer",
                            }}
                          >
                            En tant qu'Alfred
                          </h2>
                        </Grid>
                        <Grid item xs={6}>
                          <h2
                            onClick={this.handleClicktabs2}
                            style={{
                              color: "#828181",
                              fontWeight: "100",
                              textAlign: "center",
                              cursor: "pointer"
                            }}
                          >
                            En tant qu'utilisateur
                          </h2>
                          <br />
                        </Grid>

                        <Grid item xs={6} style={{ textAlign: "center" }}>
                          {tabs ? (
                            <React.Fragment>
                              <hr className={classes.trait1} />
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <hr className={classes.trait3} />
                            </React.Fragment>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          {tabs ? (
                            <React.Fragment>
                              <hr className={classes.trait} />
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <hr className={classes.trait2} />
                            </React.Fragment>
                          )}
                        </Grid>
                      </Grid>
                      : null
                  }

                  {/************************************************************ début en tant que user web **************************************************/}

                  {tabs ? (
                      this.state.userReservations.length ? (
                          this.state.userReservations.map(booking => {
                            return (
                                <React.Fragment>
                                  {/* Web */}
                                  <Grid alt={booking.chatroom.name} container className={classes.webrow}>
                                    <Grid item xs={2} md={1} className={classes.avatarContainer}>
                                      <UserAvatar user={booking.alfred} />
                                    </Grid>
                                    <Grid item xs={5} md={6} className={classes.descriptionContainer}>
                                      <Grid>
                                        <Typography style={{ marginTop: "2%",fontSize: "0.8rem", color: booking.status === 'Confirmée' ? "#419F41" : booking.status === 'En attente de confirmation' || booking.status === "Demande d'infos" ? "#F87280" : booking.status === "Pré-approuvée" ? "#F89B72" : "#5D5D5D"}}>
                                          {booking.status} -{" "}
                                          {booking.alfred.firstname}
                                        </Typography>
                                      </Grid>
                                      {typeof _.last(booking.chatroom.messages) !== 'undefined' ?
                                          <Grid>
                                            <Grid>
                                              <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                                {typeof _.last(booking.chatroom.messages) !== 'undefined' ? _.last(booking.chatroom.messages).content : null}
                                              </Typography>
                                            </Grid>
                                            <Grid item>
                                              <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                                {typeof _.last(booking.chatroom.messages) !== 'undefined' ? moment(_.last(booking.chatroom.messages).date).format('DD/MM/YYYY') : null} - {typeof _.last(booking.chatroom.messages) !== 'undefined' ? moment(_.last(booking.chatroom.messages).date).format('HH:mm') : null}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                          :
                                        <Grid item>
                                          <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>Aucun message</Typography>
                                        </Grid>
                                      }
                                    </Grid>
                                    <Grid item xs={2} className={classes.priceContainer}>
                                      <Typography style={{ fontWeight: "600"}}/>
                                    </Grid>
                                      <Grid item>
                                        <Grid>
                                          <Link href={{pathname:"/reservations/messagesDetails", query: { id: booking.chatroom._id, booking: booking._id}}}>
                                            <Button color={"primary"} variant={"outlined"}>Voir</Button>
                                          </Link>
                                        </Grid>
                                      </Grid>
                                      <hr className={classes.hrSeparator}/>
                                  </Grid>

                                  {/* Mobile en tant que user*/}
                                  <Grid
                                      alt={booking.chatroom.name}
                                      container
                                      className={classes.mobilerow1}
                                      style={{
                                        boxShadow: "0px 0px 6px lightgray",
                                        borderRadius: "5px",
                                        width: "90%",
                                        margin: "15px auto"
                                      }}>
                                    <Grid
                                        item
                                        xs={12}
                                        style={{
                                          marginTop: "15px",
                                          display: 'flex',
                                          justifyContent: 'center'
                                        }}
                                    >
                                      <UserAvatar user={booking.alfred} />
                                    </Grid>
                                    <Grid item xs={12} style={{
                                      textAlign: "center",
                                      fontSize: "0.8rem"
                                    }}>
                                      <Typography
                                          style={{ marginTop: "2%", fontSize: "0.8rem", color: booking.status === 'Confirmée' ? "#419F41" : booking.status === 'En attente de confirmation' || booking.status === "Demande d'infos" ? "#F87280" : booking.status === "Pré-approuvée" ? "#F89B72" : "#5D5D5D"}}
                                      >
                                        {booking.status} -{" "}
                                        {booking.alfred.firstname}
                                      </Typography>
                                      {typeof _.last(booking.chatroom.messages) !== 'undefined' ?
                                          <>
                                            <Typography style={{ color: "#9B9B9B", fontSize: "0.8rem" }}>
                                              {typeof _.last(booking.chatroom.messages) !== 'undefined' ? _.last(booking.chatroom.messages).content : null}
                                            </Typography>
                                            <Typography style={{ color: "#9B9B9B", fontSize: "0.8rem" }}>
                                              {typeof _.last(booking.chatroom.messages) !== 'undefined' ? moment(_.last(booking.chatroom.messages).date).format('DD/MM/YYYY') : null} - {typeof _.last(booking.chatroom.messages) !== 'undefined' ? moment(_.last(booking.chatroom.messages).date).format('HH:mm') : null}
                                            </Typography>
                                          </>
                                          : <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>Aucun message</Typography>}
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign: 'center', fontSize: "0.8rem"}}>
                                      <Typography
                                          style={{ fontWeight: "600", paddingTop: "5%", fontSize: "0.8rem" }}
                                      ></Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{}}>
                                      <Link
                                          href={{
                                            pathname: '/reservations/messagesDetails',
                                            query: {
                                              id: booking.chatroom._id,
                                              booking: booking._id
                                            }
                                          }}
                                      >
                                      <Typography
                                          style={{
                                            height: "45px",
                                            backgroundColor: "#2FBCD3",
                                            color: "white",
                                            textAlign: "center",
                                            cursor: "pointer",
                                            lineHeight: "3",
                                            marginTop: "5%"
                                          }}
                                      >

                                          <a
                                              style={{
                                                textDecoration: "none",
                                                color: "white"
                                              }}
                                          >
                                            Voir
                                          </a>
                                      </Typography>
                                        </Link>
                                    </Grid>
                                  </Grid>
                                </React.Fragment>
                            );
                          })
                      ) : <p>Vous n'avez aucun message en tant qu'utilisateur</p>
                  ) : (

                      <React.Fragment>
                        {this.state.alfredReservations.length
                            ? this.state.alfredReservations.map(booking => {
                              return (
                                  <React.Fragment>
                                    {/* Web */}
                                    <Grid
                                        container
                                        className={classes.webrow}
                                    >
                                      <Grid
                                          item
                                          xs={2}
                                          md={1}
                                          className={classes.avatarContainer}
                                      >
                                        <UserAvatar user={booking.user} />
                                      </Grid>
                                      <Grid item xs={5} md={6} className={classes.descriptionContainer}>
                                        <Grid>
                                          <Typography
                                            style={{ marginTop: "2%",fontSize: "0.8rem", color: booking.status === 'Confirmée' ? "#419F41" : booking.status === 'En attente de confirmation' || booking.status === "Demande d'infos" ? "#F87280" : booking.status === "Pré-approuvée" ? "#F89B72" : "#5D5D5D" }}
                                          >
                                            {booking.status} -{" "}
                                            {booking.user.firstname}
                                          </Typography>
                                        </Grid>
                                        {typeof _.last(booking.chatroom.messages) !== 'undefined' ?
                                            <Grid>
                                              <Grid>
                                                <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                                  {typeof _.last(booking.chatroom.messages) !== 'undefined' ? _.last(booking.chatroom.messages).content : null}
                                                </Typography>
                                              </Grid>
                                              <Grid>
                                                <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                                  {typeof _.last(booking.chatroom.messages) !== 'undefined' ? moment(_.last(booking.chatroom.messages).date).format('DD/MM/YYYY') : null} - {typeof _.last(booking.chatroom.messages) !== 'undefined' ? moment(_.last(booking.chatroom.messages).date).format('HH:mm') : null}
                                                </Typography>
                                              </Grid>
                                            </Grid>
                                            : <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>Aucun message</Typography>}

                                      </Grid>
                                      <Grid item xs={2} className={classes.priceContainer}>
                                        <Typography style={{fontWeight: "600",fontSize: "0.8rem"}}/>
                                      </Grid>
                                      <Grid item>
                                        <Grid>
                                          <Link href={{pathname:"/reservations/messagesDetails", query: { id: booking.chatroom._id, booking: booking._id}}}>
                                            <Button color={"primary"} variant={"outlined"}>Voir</Button>
                                          </Link>
                                        </Grid>
                                      </Grid>
                                      <hr className={classes.hrSeparator}/>
                                    </Grid>

                                    {/* Mobile en tant qu'alfred*/}
                                    <Grid
                                        container
                                        className={classes.mobilerow1}
                                        style={{
                                          boxShadow: "0px 0px 6px lightgray",
                                          borderRadius: "5px",
                                          width: "90%",
                                          margin: "15px auto" }}
                                    >
                                      <Grid
                                          item
                                          xs={12}
                                          style={{ display: 'flex',justifyContent: 'center', marginTop: '15px'}}
                                      >
                                        <UserAvatar user={booking.user} />
                                      </Grid>
                                      <Grid item xs={12} style={{
                                        textAlign: "center",
                                        fontSize: "0.8rem"
                                      }}>
                                        <Typography
                                            style={{ marginTop: "2%",fontSize: "0.8rem", color: booking.status === 'Confirmée' ? "#419F41" : booking.status === 'En attente de confirmation' || booking.status === "Demande d'infos" ? "#F87280" : booking.status === "Pré-approuvée" ? "#F89B72" : "#5D5D5D" }}
                                        >
                                          {booking.status} -{" "}
                                          {booking.user.firstname}
                                        </Typography>
                                        {typeof _.last(booking.chatroom.messages) !== 'undefined' ?
                                            <>
                                              <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                                {typeof _.last(booking.chatroom.messages) !== 'undefined' ? _.last(booking.chatroom.messages).content : null}
                                              </Typography>
                                              <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                                {typeof _.last(booking.chatroom.messages) !== 'undefined' ? moment(_.last(booking.chatroom.messages).date).format('DD/MM/YYYY') : null} - {typeof _.last(booking.chatroom.messages) !== 'undefined' ? moment(_.last(booking.chatroom.messages).date).format('HH:mm') : null}
                                              </Typography>
                                            </>
                                            : <Typography>Aucun message</Typography>}

                                      </Grid>
                                      <Grid item xs={12} style={{}}>
                                        <Typography
                                            style={{
                                              fontWeight: "600",
                                              paddingTop: "5%",fontSize: "0.8rem"
                                            }}
                                        ></Typography>
                                      </Grid>
                                      <Grid item xs={12} style={{}}>
                                        <Link
                                            href={{
                                              pathname: '/reservations/messagesDetails',
                                              query: {
                                                id: booking.chatroom._id,
                                                booking: booking._id
                                              }
                                            }}
                                        >
                                        <Typography
                                            style={{
                                              height: "45px",
                                              backgroundColor: "#2FBCD3",
                                              color: "white",
                                              textAlign: "center",
                                              cursor: "pointer",
                                              lineHeight: "3",
                                              marginTop: "5%"
                                            }}
                                        >

                                            <a
                                                style={{
                                                  textDecoration: "none",
                                                  color: "white"
                                                }}
                                            >
                                              Voir
                                            </a>
                                        </Typography>
                                          </Link>
                                      </Grid>
                                    </Grid>
                                  </React.Fragment>
                              );
                            })
                            : <p>Vous n'avez aucun message en tant qu'Alfred</p>}
                      </React.Fragment>
                  )}
                </Grid>
              </Grid>

              {/*/////////////////////////////////////////////////////////////////////////////////////////*/}
            </Grid>
          </Layout>
          {this.state.currentUser.is_alfred === true?
            <NavbarMobile userId={this.state.idEmitter}/>
            : null}
        </Fragment>
    );
  }
}

export default withStyles(styles)(Messages);
