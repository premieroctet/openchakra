import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../hoc/Layout/Layout";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import styles from './newMessages/newMessagesStyle'
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import _ from 'lodash';
import moment from 'moment';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
import UserAvatar from '../../components/Avatar/UserAvatar';
import Button from '@material-ui/core/Button';

class NewMessages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idEmitter: "",
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
      this.setState({ idEmitter: res.data._id });
      if(res.data.is_alfred === true){
        this.setState({isAlfred: true})
      }
    });
    axios.get('/myAlfred/api/chatRooms/nonViewedMessages')
        .then(res => {
          this.setState({
            alfredReservations: res.data[0],
            userReservations: res.data[1]
          })
        })


    axios
        .get("/myAlfred/api/chatRooms/userChatRooms")
        .then(res => {
          this.setState({ chatrooms: res.data });
        });
  }
  handleClicktabs2 = () => {
    this.setState({ tabs: true });
  };

  handleClicktabs = () => {
    this.setState({ tabs: false });
  };


  render() {
    const { classes } = this.props;
    const tabs = this.state.tabs;

    return (
        <Fragment>
          <Layout>
            <Grid container className={classes.bigContainer}>
              {this.state.isAlfred ?
                  <Grid
                      container
                      className={classes.topbar}
                      justify="center"
                      style={{
                        backgroundColor: "#4fbdd7",
                        marginTop: -3,
                        height: "52px"
                      }}
                  >
                    <Grid item xs={1} className={classes.shopbar}/>
                    <Grid
                        item
                        xs={2}
                        className={classes.shopbar}
                        style={{ textAlign: "center" }}
                    >
                      <Link href={"/myShop/services"}>
                        <a style={{ textDecoration: "none" }}>
                          <p style={{ color: "white", cursor: "pointer" }}>
                            Ma boutique
                          </p>
                        </a>
                      </Link>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        className={classes.shopbar}
                        style={{
                          textAlign: "center",
                          borderBottom: "2px solid white",
                          zIndex: 999
                        }}
                    >
                      <Link href={"/reservations/messages"}>
                        <a style={{ textDecoration: "none" }}>
                          <p style={{ color: "white", cursor: "pointer" }}>
                            Messages
                          </p>
                        </a>
                      </Link>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        className={classes.shopbar}
                        style={{ textAlign: "center" }}
                    >
                      <Link href={"/reservations/allReservations"}>
                        <a style={{ textDecoration: "none" }}>
                          <p style={{ color: "white", cursor: "pointer" }}>
                            Mes réservations
                          </p>
                        </a>
                      </Link>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        className={classes.shopbar}
                        style={{ textAlign: "center" }}
                    >
                      <Link href={"/myShop/myAvailabilities"}>
                        <a style={{ textDecoration: "none" }}>
                          <p style={{ color: "white", cursor: "pointer" }}>
                            Mon calendrier
                          </p>
                        </a>
                      </Link>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        className={classes.shopbar}
                        style={{ textAlign: "center" }}
                    >
                      <Link href={"/performances/revenus"}>
                        <a style={{ textDecoration: "none" }}>
                          <p style={{ color: "white", cursor: "pointer" }}>
                            Performances
                          </p>
                        </a>
                      </Link>
                    </Grid>
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
                        justifyContent: "center",
                        position: "sticky",
                        top: 100
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
                            <img src={'../static/speech-bubble.svg'} alt={'user'} width={27} height={70} style={{marginRight: 4}}/>

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
                            <img src={'../static/unread-email-2.svg'} alt={'user'} width={27} height={70} style={{marginRight: 4}}/>

                          </a>
                        </div>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid className={classes.Rightcontent} item xs={9} sm={9} md={7}>
                  <Typography style={{ fontSize: "2rem", marginTop: "4%" }}>
                    Mes messages non lus
                  </Typography>
                  <Typography style={{ fontSize: "0.8rem", marginBottom: "4%" }}>
                    vous avez {this.state.alfredReservations.length + this.state.userReservations.length} nouveaux messages
                  </Typography>
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
                  <Grid container className={classes.tabmobile}>
                    <Grid item xs={6} style={{ textAlign: "center" }}>
                      <h2
                          onClick={this.handleClicktabs}
                          style={{
                            color: "#828181",
                            fontWeight: "100",
                            cursor: "pointer",
                            marginLeft: "25%"
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
                  {tabs ? (
                      this.state.userReservations.length ? (
                          this.state.userReservations.map(chatroom => {
                            return (
                                <React.Fragment>
                                  {/* Web */}
                                  <Grid
                                      alt={chatroom.name}
                                      container
                                      className={classes.webrow}
                                  >
                                    <Grid item xs={2} md={1} className={classes.avatarContainer}>
                                      <UserAvatar user={chatroom.booking.alfred} />
                                    </Grid>
                                    <Grid item xs={5} md={6}  className={classes.descriptionContainer}>
                                      <Grid>
                                        <Typography
                                          style={{ marginTop: "2%", color: "#419F41" }}
                                        >
                                          {chatroom.booking.status} -{" "}
                                          {chatroom.recipient.firstname}
                                        </Typography>
                                      </Grid>
                                      <Grid>
                                        <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                          {typeof _.last(chatroom.messages) !== 'undefined' ? _.last(chatroom.messages).content : null}
                                        </Typography>
                                      </Grid>
                                     <Grid>
                                       <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                         {typeof _.last(chatroom.messages) !== 'undefined' ? moment(_.last(chatroom.messages).date).format('DD/MM/YYYY') : null} - {typeof _.last(chatroom.messages) !== 'undefined' ? moment(_.last(chatroom.messages).date).format('HH:mm') : null}
                                       </Typography>
                                     </Grid>
                                    </Grid>
                                    <Grid item xs={2} className={classes.priceContainer}>
                                      <Typography
                                          style={{ fontWeight: "600", fontSize: "0.8rem" }}
                                      ></Typography>
                                    </Grid>
                                    <Grid item>
                                      <Grid>
                                        <Link href={{pathname:"/reservations/messagesDetails", query: {id: chatroom._id, booking: chatroom.booking._id}}}>
                                          <Button color={"primary"} variant={"outlined"}>Voir</Button>
                                        </Link>
                                      </Grid>
                                    </Grid>
                                    <hr className={classes.hrSeparator}/>
                                  </Grid>

                                  {/* Mobile */}
                                  <Grid
                                      alt={chatroom.name}
                                      container
                                      className={classes.mobilerow}
                                      style={{
                                        boxShadow: "0px 0px 6px lightgray",
                                        borderRadius: "5px",
                                        width: "90%",
                                        margin: "15px auto"
                                      }}
                                  >
                                    <Grid
                                        item
                                        xs={12}
                                        style={{
                                          textAlign: "center",
                                          marginTop: "15px" }}
                                    >
                                      <img
                                          src={`../../${chatroom.booking.alfred.picture}`}
                                          alt={"picture"}
                                          style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "50%",
                                            objectFit: "cover"
                                          }}
                                      ></img>
                                    </Grid>
                                    <Grid item xs={12}
                                          style={{
                                            textAlign: "center",
                                            fontSize: "0.8rem"
                                          }}>
                                      <Typography
                                          style={{ marginTop: "2%", color: "#419F41",fontSize: "0.8rem" }}
                                      >
                                        {chatroom.booking.status} -{" "}
                                        {chatroom.recipient.firstname}
                                      </Typography>
                                      <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                        {typeof _.last(chatroom.messages) !== 'undefined' ? _.last(chatroom.messages).content : null}
                                      </Typography>
                                      <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                        {typeof _.last(chatroom.messages) !== 'undefined' ? moment(_.last(chatroom.messages).date).format('DD/MM/YYYY') : null} - {typeof _.last(chatroom.messages) !== 'undefined' ? moment(_.last(chatroom.messages).date).format('HH:mm') : null}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{}}>
                                      <Typography
                                          style={{ fontWeight: "600", paddingTop: "5%",fontSize: "0.8rem" }}
                                      ></Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{}}>
                                      <Link
                                          href={{
                                            pathname: '/reservations/messagesDetails',
                                            query: {
                                              id: chatroom._id,
                                              booking: chatroom.booking._id
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
                      ) : <p>Vous n'avez aucun nouveau message en tant qu'utilisateur</p>
                  ) : (
                      <React.Fragment>
                        {this.state.alfredReservations.length
                            ? this.state.alfredReservations.map(chatroom => {
                              return (
                                  <React.Fragment>

                                    {/* Web */}
                                    <Grid
                                        alt={chatroom.name}
                                        container
                                        className={classes.webrow}
                                    >
                                      <Grid
                                        item
                                        xs={2}
                                        md={1}
                                        className={classes.avatarContainer}
                                      >
                                        <UserAvatar user={chatroom.booking.alfred} />
                                      </Grid>
                                      <Grid item xs={5} md={6} className={classes.descriptionContainer}>
                                        <Grid>
                                          <Typography
                                            style={{ marginTop: "2%", color: "#419F41",fontSize: "0.8rem" }}
                                          >
                                            {chatroom.booking.status} -{" "}
                                            {chatroom.recipient.firstname}
                                          </Typography>
                                        </Grid>
                                        <Grid>
                                          <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                            {_.last(chatroom.messages).content}
                                          </Typography>
                                        </Grid>
                                        <Grid>
                                          <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                            {moment(_.last(chatroom.messages).date).format('DD/MM/YYYY')} - {moment(_.last(chatroom.messages).date).format('HH:mm')}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                      <Grid item xs={2} className={classes.priceContainer}>
                                        <Typography
                                            style={{
                                              fontWeight: "600",
                                              fontSize: "0.8rem"
                                            }}
                                        ></Typography>
                                      </Grid>
                                      <Grid item>
                                        <Grid>
                                          <Link href={{pathname:"/reservations/messagesDetails", query: {id: chatroom._id, booking: chatroom.booking._id}}}>
                                            <Button color={"primary"} variant={"outlined"}>Voir</Button>
                                          </Link>
                                        </Grid>
                                      </Grid>
                                      <hr className={classes.hrSeparator}/>
                                    </Grid>


                                    {/* Mobile */}
                                    <Grid
                                        alt={chatroom.name}
                                        container
                                        className={classes.mobilerow1}
                                        style={{
                                          boxShadow: "0px 0px 6px lightgray",
                                          borderRadius: "5px",
                                          width: "90%",
                                          margin: "15px auto"
                                        }}
                                    >
                                      <Grid
                                          item
                                          xs={12}
                                          style={{
                                            textAlign: "center",
                                            marginTop: "15px"}}
                                      >
                                        <img
                                            src={`../../${chatroom.booking.user.picture}`}
                                            alt={"picture"}
                                            style={{
                                              width: "80px",
                                              height: "80px",
                                              borderRadius: "50%",
                                              objectFit: "cover"
                                            }}
                                        ></img>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Typography
                                            style={{ marginTop: "2%", color: "#419F41",fontSize: "0.8rem" }}
                                        >
                                          {chatroom.booking.status} -{" "}
                                          {chatroom.recipient.firstname}
                                        </Typography>
                                        <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                          {_.last(chatroom.messages).content}
                                        </Typography>
                                        <Typography style={{ color: "#9B9B9B",fontSize: "0.8rem" }}>
                                          {moment(_.last(chatroom.messages).date).format('DD/MM/YYYY')} - {moment(_.last(chatroom.messages).date).format('HH:mm')}
                                        </Typography>
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
                                                id: chatroom._id,
                                                booking: chatroom.booking._id
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
                            : <p>Vous n'avez aucun nouveau message en tant qu'Alfred</p>}
                      </React.Fragment>
                  )}
                </Grid>
              </Grid>

              {/*/////////////////////////////////////////////////////////////////////////////////////////*/}
            </Grid>
          </Layout>
          {this.state.isAlfred ?
            <NavbarMobile userId={this.state.userId}/>
              : null}
        </Fragment>
    );
  }
}

export default withStyles(styles)(NewMessages);
