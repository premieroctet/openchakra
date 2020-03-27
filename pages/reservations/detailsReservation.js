import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../hoc/Layout/Layout";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Footer from "../../hoc/Layout/Footer/Footer";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import axios from "axios";
import moment from "moment";
import getDistance from "geolib/es/getDistance";
import convertDistance from "geolib/es/convertDistance";
import StarRatings from 'react-star-ratings';
import io from "socket.io-client";
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';



moment.locale("fr");

/*var Rating = require('react-rating');*/
const { config } = require("../../config/config");
const url = config.apiUrl;

const styles = theme => ({
  exp1: {
    "&::before": {
      height: "0px!important"
    },
    [theme.breakpoints.down("sm")]: {
      width: '100%!important'
    }
  },
  bordernone:{
    [theme.breakpoints.down("sm")]: {
      border: 'none!important',
    },
  },
  displayn:{
    display: 'none'
  },
  bigContainer: {
    marginTop: 100,
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      marginTop: 250,
    }
  },
  marginbot: {
    marginBottom: "3.5%"
  },
  hiddenone: {
    [theme.breakpoints.down("sm")]: {
      display: "none!important"
    }
  },
  revealedone: {
    [theme.breakpoints.up("md")]: {
      display: "none!important"
    }
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    borderTop: "15px solid gray",
    margin: "0 auto",
    marginTop: -28
  },
  shopbar: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  bottombar: {
    visibility: "hidden",
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    [theme.breakpoints.down("sm")]: {
      visibility: "visible",
      boxShadow: "2px -5px 14px -15px rgba(0,0,0,0.75)"
    }
  },
  topbar: {
    visibility: "visible",
    position: "sticky",
    top: 75,
    zIndex: 999,
    [theme.breakpoints.down("sm")]: {
      display: "none",
      visibility: "hidden"
    }
  },
  hidesm: {
    minWidth: "271px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },

  hidelg: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },

  trait: {
    width: "100%",
    height: 4,
    backgroundColor: "rgb(47, 188, 211)",
    borderColor: "transparent",
    [theme.breakpoints.down("sm")]: {}
  },
  trait1: {
    width: "100%",

    height: 4,
    backgroundColor: "lightgray",
    borderColor: "transparent"
  },
  trait2: {
    width: "100%",
    height: 4,
    backgroundColor: "lightgray",
    borderColor: "transparent",
    [theme.breakpoints.down("sm")]: {}
  },
  trait3: {
    width: "100%",
    height: 4,
    backgroundColor: "rgb(47, 188, 211)",
    borderColor: "transparent"
  },
  tabweb: {
    visibility: "visible",
    width: "100%",
    position: "sticky",
    top: "115px",
    fontSize: 15,
    backgroundColor: "white",
    zIndex: "20",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      visibility: "hidden"
    }
  },

  tabmobile: {
    visibility: "hidden",
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    [theme.breakpoints.down("sm")]: {
      visibility: "visible",
      fontSize: "10px",
      fontWeight: "300",
      marginTop: "-100px",
      height: 90,
      backgroundColor: "white",
      position: "sticky",
      top: 55,
      zIndex: 20
    }
  },

  mobilerow: {
    marginTop: "1%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "15%"
    }
  },
  Rightcontent: {
    marginLeft: "4%"
  },
  toggle: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
});



class DetailsReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 4,
      rating: 3,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,

      booking_id: null,
      bookingObj: null,
      currentUser: null,
      splitAddress: null
    };
  }

  static getInitialProps({ query: { id, user } }) {
    return {
      booking_id: id,
      is_user: user
    };
  }

  componentDidMount() {
    const booking_id = this.props.booking_id;

    this.setState({ booking_id: this.props.booking_id });

    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    );

    axios.get(url + "myAlfred/api/users/current").then(res => {
      let result = res.data
      this.setState({ user: result._id });
    });

    axios.get(url + "myAlfred/api/booking/" + booking_id).then(res => {
      this.setState({ bookingObj: res.data });
      this.setState({ splitAddress: this.state.bookingObj.address.address.split(' ')})

      this.socket = io();
      this.socket.on("connect", socket => {
        this.socket.emit("booking", this.state.bookingObj._id)
      })
      this.socket.on("displayStatus", data => {
        this.setState({bookingObj: data})
      })
    });
  }

  changeStatus(status) {
    axios
      .put(
        url + "myAlfred/api/booking/modifyBooking/" + this.state.booking_id,
        { status: status }
      )
      .then(res => {
        this.setState({ bookingObj: res.data })

        this.socket.emit("changeStatus", this.state.bookingObj);
      })
      .catch(err => console.log(err));
  }

  handleOpen1() {
    this.setState({ modal1: true });
  }

  handleOpen2() {
    this.setState({ modal2: true });
  }

  handleOpen3() {
    this.setState({ modal3: true });
  }

  handleOpen4() {
    this.setState({ modal4: true });
  }

  handleClose() {
    this.setState({
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false
    });
  }

  render() {
    const { classes } = this.props;
    const value = this.state.value;
    const { modal1 } = this.state;
    const { modal2 } = this.state;
    const { modal3 } = this.state;
    const { modal4 } = this.state;
    const { bookingObj } = this.state;
    const { currentUser } = this.state;
    const { is_user } = this.props;
    const {splitAddress} = this.state;

    return (
        <Fragment>
          {bookingObj === null ||
          currentUser === null || splitAddress === null ? null : currentUser._id !==
          bookingObj.alfred._id && currentUser._id !== bookingObj.user._id ? (
              <p>Vous n'avez pas l'autorisation d'accéder à cette page</p>
          ) : (
              <>
                <Layout>
                  <Grid container className={classes.bigContainer}>
                    {currentUser.is_alfred === true ?
                      <Grid style={{width: '100%'}}>
                        <NavBarShop userId={this.state.user}/>
                      </Grid>
                     : null}

                    {/*/////////////////////////////////////////////////////////////////////////////////////////*/}

                    <Grid container style={{ marginBottom: "10%" }}>
                      <Grid
                          className={classes.toggle}
                          item
                          xs={3}
                          style={{
                            height: "100%",

                          }}
                      >
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
                            <Link href={"allReservations"}>
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
                                <a
                                    style={{ fontSize: "1.1rem", cursor: "pointer" }}
                                >
                                  Toutes mes réservations
                                </a>
                              </div>
                            </Link>
                          </Grid>

                          <Grid
                              item
                              style={{ marginTop: 10, width: 281, height: 70 }}
                              className={classes.hidesm}
                          >
                            <Link href={"comingReservations"}>
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
                                <a
                                    style={{ fontSize: "1.1rem", cursor: "pointer" }}
                                >
                                  Mes réservations à venir
                                </a>
                              </div>
                            </Link>
                          </Grid>

                          <Grid
                              item
                              style={{ marginTop: 10, width: 281, height: 70 }}
                              className={classes.hidesm}
                          >
                            <Link href={"finishedReservations"}>
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
                                <a
                                    style={{ fontSize: "1.1rem", cursor: "pointer" }}
                                >
                                  Mes réservations terminées
                                </a>
                              </div>
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                          className={classes.Rightcontent}
                          item
                          xs={12}
                          sm={9}
                          md={7}
                      >
                        <Typography
                            style={{
                              fontSize: "1.5rem",
                              marginTop: "4%",
                              color:
                                  bookingObj === null || currentUser === null
                                      ? null
                                      : bookingObj.status === "Confirmée"
                                      ? "#89CE2C"
                                      : bookingObj.status ===
                                      "En attente de confirmation" ||
                                      bookingObj.status === "Demande d'infos"
                                          ? "#F87280"
                                          : bookingObj.status === "Pré-approuvée"
                                              ? "#F89672"
                                              : "black"
                            }}
                        >
                          {bookingObj === null || currentUser === null
                              ? null
                              : bookingObj.status === "Pré-approuvée"
                                  ? currentUser._id === bookingObj.alfred._id
                                      ? "Pré-approuvée"
                                      : "Invitation à réserver"
                                  : bookingObj.status}
                        </Typography>

                        <Grid
                            container
                            className={classes.mobilerow}
                            style={{
                              borderBottom: "1.5px #8281813b solid",
                              marginTop: "5%"
                            }}
                        >
                          <Grid item xs={3} md={1} style={{ marginRight: "5%" }}>
                            {bookingObj === null ||
                            currentUser === null ? null : currentUser._id ===
                            bookingObj.alfred._id ? (
                                <img
                                    src={`../../${bookingObj.user.picture}`}
                                    alt={"picture"}
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      marginBottom: "20px"
                                    }}
                                ></img>
                            ) : (
                                <img
                                    src={`../../${bookingObj.alfred.picture}`}
                                    alt={"picture"}
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      marginBottom: "20px"
                                    }}
                                ></img>
                            )}
                          </Grid>
                          <Grid item xs={5} md={7}>
                            <Typography
                                style={{ marginTop: "-3%", fontSize: "1.7rem" }}
                            >
                              {bookingObj === null || currentUser === null ? null : currentUser._id === bookingObj.alfred._id ? (
                                  <span>{`${bookingObj.user.firstname} ${bookingObj.user.name}`}</span>
                              ) : <span>{`${bookingObj.alfred.firstname} ${bookingObj.alfred.name}`}</span> }
                            </Typography>
                            <Typography
                                style={{ marginTop: "2%", fontSize: "0.8rem" }}
                            >
                              Réservation {bookingObj.service} le{" "}
                              {bookingObj === null
                                  ? null
                                  : bookingObj.date_prestation}
                            </Typography>
                            <Typography
                                style={{
                                  color: "#4FBDD7",
                                  fontWeight: "600",
                                  fontSize: "1.1rem"
                                }}
                            >
                              {bookingObj === null || currentUser === null
                                  ? null
                                  : currentUser._id === bookingObj.alfred._id
                                      ? (bookingObj.amount - bookingObj.fees * 2).toFixed(
                                          2
                                      )
                                      : bookingObj.amount.match(/^-?\d+(?:\.\d{0,2})?/)[0]}
                              €
                            </Typography>
                          </Grid>
                          <Grid item xs={2} style={{ textAlign: "center" }}>
                            <div style={{ marginTop: "5%" }}>
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20.432"
                                  height="31.478"
                                  viewBox="0 0 55.432 66.478"
                              >
                                <path
                                    id="Tracé_12517"
                                    data-name="Tracé 12517"
                                    d="M300.251,5274l-1.352.1-1.352.2-1.463.206-1.241.311-1.352.3-2.59.814-2.362,1.125-2.365,1.223-2.03,1.428-2.03,1.633-1.8,1.832-1.577,1.836-1.352,2.141-1.238,2.144-.9,2.34-.339,1.227-.339,1.121-.225,1.329-.228,1.222L274,5297.76v1.323l.111,1.835.228,1.833.336,1.942.567,1.831.564,1.839.788,1.832.788,1.836.9,1.838,1.016,1.731,1.124,1.832,2.368,3.365,2.476,3.267,2.593,3.061,2.59,2.851,2.479,2.552,2.365,2.344,2.14,1.936,3.04,2.653,1.241,1.018,1.241-1.018,3.04-2.653,2.141-1.936,2.365-2.344,2.479-2.552,2.59-2.851,2.593-3.061,2.476-3.267,2.368-3.365,1.124-1.832,1.016-1.731.9-1.838.788-1.836.788-1.832.564-1.839.567-1.831.336-1.942.228-1.833.111-1.835v-1.323l-.111-1.225-.228-1.222-.225-1.329-.339-1.121-.339-1.227-.9-2.34-1.238-2.144-1.352-2.141-1.577-1.836-1.8-1.832-2.03-1.633-2.03-1.428-2.365-1.223-2.362-1.125-2.59-.814-1.352-.3-1.241-.311-1.463-.206-1.352-.2-1.355-.1Zm2.707,14.378,1.124.2,1.127.206,1.124.4,1.016.41,1.013.61.9.611.788.714.792.715.678.813.671.919.453.919.453,1.018.225,1.021.222,1.023v2.24l-.222,1.02-.225,1.018-.453,1.023-.453.912-.671.919-.678.819-.792.713-.788.715-.9.609-1.013.613-1.016.4-1.124.41-1.127.206-1.124.2h-2.483l-1.124-.2-1.127-.206-1.124-.41-1.016-.4-1.013-.613-.9-.609-.788-.715-.792-.713-.678-.819-.671-.919-.453-.912-.453-1.023-.225-1.018-.222-1.02v-2.24l.222-1.023.225-1.021.453-1.018.453-.919.671-.919.678-.812.792-.715.788-.714.9-.611,1.013-.61,1.016-.41,1.124-.4,1.127-.206,1.124-.2Z"
                                    transform="translate(-274.001 -5274)"
                                    fill="#848484"
                                    fill-rule="evenodd"
                                />
                              </svg>
                            </div>
                            <Typography
                                style={{ fontSize: "0.8rem", color: "#9B9B9B" }}
                            >
                              {bookingObj === null || currentUser === null
                                  ? null
                                  : convertDistance(
                                      getDistance(
                                          currentUser.billing_address.gps,
                                          bookingObj.address.gps
                                      ),
                                      "km"
                                  ).toFixed(2)}{" "}
                              km
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                            container
                            style={{
                              borderBottom: "1.5px #8281813b solid",
                              marginTop: "5%",
                              paddingBottom: "7%"
                            }}
                        >
                          <Grid item xs={12} md={7}>
                            <Typography
                                style={{ marginTop: "-3%", fontSize: "1.7rem", marginBottom: '15px'}}
                            >
                              A propos de{" "}
                              {bookingObj === null ||
                              currentUser === null ? null : currentUser._id ===
                              bookingObj.alfred._id ? (
                                  <span>{`${bookingObj.user.firstname} ${bookingObj.user.name}`}</span>
                              ) : (
                                  <span>{`${bookingObj.alfred.firstname} ${bookingObj.alfred.name}`}</span>
                              )}
                            </Typography>
                            <div style={{ marginLeft: "3%", marginBottom: '15px' }}>
                              {bookingObj === null ||
                              currentUser === null ? null : currentUser._id ===
                              bookingObj.alfred._id ?
                                      <StarRatings
                                          rating={bookingObj.user.score_client}
                                          starRatedColor={"#2FBCD3"}
                                          numberOfStars={5}
                                          name='rating'
                                          starDimension={'20px'}
                                          starHoverColor={'#2FBCD3'}
                                          starSpacing={'3px'}
                                      />
                               :
                                  <StarRatings
                                      rating={bookingObj.alfred.score}
                                      starRatedColor={"#2FBCD3"}
                                      numberOfStars={5}
                                      name='rating'
                                      starDimension={'20px'}
                                      starHoverColor={'#2FBCD3'}
                                      starSpacing={'3px'}
                                  />
                              }

                              <Grid style={{ marginLeft: "4%" }} container>
                                <Grid item xs={2} md={1}>
                                  <img
                                      style={{ width: "15px" }}
                                      src="../../static/stars/star-solid.png"
                                  ></img>
                                </Grid>
                                <Grid item xs={10} md={11}>
                                  <Typography
                                      style={{
                                        color: "rgb(47, 188, 211)",
                                        fontSize: "0.8rem",
                                        marginLeft: "-5%",
                                        cursor: "pointer"
                                      }}
                                  >
                                    {bookingObj === null || currentUser === null
                                        ? null
                                        : currentUser._id === bookingObj.alfred._id
                                            ? bookingObj.user.number_of_reviews
                                            : bookingObj.alfred.number_of_reviews}{" "}
                                    Commentaires
                                  </Typography>
                                </Grid>

                                {bookingObj === null ||
                                currentUser === null ? null : currentUser._id ===
                                bookingObj.alfred._id ? (
                                    bookingObj.user.id_confirmed === true ? (
                                        <>
                                          <Grid item xs={2} md={1}>
                                            <img
                                                style={{ width: "15px" }}
                                                src="../../static/statut/oui.png"
                                            ></img>
                                          </Grid>
                                          <Grid item xs={10} md={11}>
                                            <Typography
                                                style={{
                                                  fontSize: "0.8rem",
                                                  marginLeft: "-5%"
                                                }}
                                            >
                                              Pièce d’identité vérifiée
                                            </Typography>
                                          </Grid>
                                        </>
                                    ) : null
                                ) : bookingObj.alfred.id_confirmed === true ? (
                                    <>
                                      <Grid item xs={2} md={1}>
                                        <img
                                            style={{ width: "15px" }}
                                            src="../../static/statut/oui.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10} md={11}>
                                        <Typography
                                            style={{
                                              fontSize: "0.8rem",
                                              marginLeft: "-5%"
                                            }}
                                        >
                                          Pièce d’identité vérifiée
                                        </Typography>
                                      </Grid>
                                    </>
                                ) : null}

                                {bookingObj === null ||
                                currentUser === null ? null : currentUser._id ===
                                bookingObj.alfred._id ? (
                                    <>
                                      <Grid item xs={2} md={1}>
                                        <img
                                            style={{ width: "15px", margin: 'auto'}}
                                            src="../../static/statut/calendar.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10} md={11}>
                                        <Typography
                                            style={{
                                              fontSize: "0.8rem",
                                              marginLeft: "-5%"
                                            }}
                                        >
                                          Membre depuis le{" "}
                                          {moment(
                                              bookingObj.user.creation_date
                                          ).format("DD/MM/YYYY")}
                                        </Typography>
                                      </Grid>
                                    </>
                                ) : (
                                    <>
                                      <Grid item xs={2} md={1}>
                                        <img
                                            style={{ width: "15px", margin: 'auto' }}
                                            src="../../static/statut/calendar.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10} md={11}>
                                        <Typography
                                            style={{
                                              fontSize: "0.8rem",
                                              marginLeft: "-5%"
                                            }}
                                        >
                                          Membre depuis le{" "}
                                          {moment(
                                              bookingObj.alfred.creation_date
                                          ).format("DD/MM/YYYY")}
                                        </Typography>
                                      </Grid>
                                    </>
                                )}

                                {bookingObj === null ? null : bookingObj.alfred
                                    .is_alfred === true &&
                                bookingObj.user.is_alfred === true ? (
                                    <>
                                      <Grid item xs={2} md={1}>
                                        <img
                                            style={{ width: "15px" }}
                                            src="../../static/statut/beaver.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10} md={11}>
                                        <Typography
                                            style={{
                                              fontSize: "0.8rem",
                                              marginLeft: "-5%"
                                            }}
                                        >
                                          Il est également Alfred{" "}
                                        </Typography>
                                      </Grid>
                                    </>
                                ) : null}

                                {bookingObj === null ||
                                currentUser === null ? null : currentUser._id ===
                                bookingObj.alfred._id ? (
                                    <>
                                      <Grid item xs={2} md={1}>
                                        <img
                                            style={{ width: "15px" }}
                                            src="../../static/statut/chat.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10} md={11}>
                                        <Typography
                                            style={{
                                              fontSize: "0.8rem",
                                              marginLeft: "-5%"
                                            }}
                                        >
                                          Langue:{" "}
                                          {bookingObj.user.languages.length ? (
                                              bookingObj.user.languages.map(
                                                  language => language + ", "
                                              )
                                          ) : (
                                              <span>Français</span>
                                          )}{" "}
                                        </Typography>
                                      </Grid>
                                    </>
                                ) : (
                                    <>
                                      <Grid item xs={2} md={1}>
                                        <img
                                            style={{ width: "15px" }}
                                            src="../../static/statut/chat.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10} md={11}>
                                        <Typography
                                            style={{
                                              fontSize: "0.8rem",
                                              marginLeft: "-5%"
                                            }}
                                        >
                                          Langue:{" "}
                                          {bookingObj.alfred.languages.length ? (
                                              bookingObj.alfred.languages.map(
                                                  language => language + ", "
                                              )
                                          ) : (
                                              <span>Français</span>
                                          )}{" "}
                                        </Typography>
                                      </Grid>
                                    </>
                                )}
                                {bookingObj === null ||
                                currentUser == null ? null : currentUser._id ===
                                bookingObj.alfred._id ? (
                                    <Link
                                        href={{
                                          pathname: "../viewProfile",
                                          query: { id: bookingObj.user._id }
                                        }}
                                    >
                                      <Typography
                                          style={{
                                            color: "rgb(47, 188, 211)",
                                            fontSize: "0.8rem",
                                            cursor: "pointer"
                                          }}
                                      >
                                        Voir le profil
                                      </Typography>
                                    </Link>
                                ) : (
                                    <Link
                                        href={{
                                          pathname: "../viewProfile",
                                          query: { id: bookingObj.alfred._id }
                                        }}
                                    >
                                      <Typography
                                          style={{
                                            color: "rgb(47, 188, 211)",
                                            fontSize: "0.8rem",
                                            cursor: "pointer"
                                          }}
                                      >
                                        Voir le profil
                                      </Typography>
                                    </Link>
                                )}
                              </Grid>
                            </div>
                          </Grid>
                          <Grid item xs={2} style={{ textAlign: "center" }}>
                            <Link
                                href={{
                                  pathname: "/reservations/messagesDetails",
                                  query: {
                                    id:
                                        bookingObj === null
                                            ? null
                                            : bookingObj.chatroom,
                                    booking:
                                        bookingObj === null
                                            ? null
                                            : bookingObj._id
                                  }
                                }}
                            >
                            <div
                                style={{
                                  textAlign: "center",
                                  height: "40px",
                                  width: "200px",
                                  backgroundColor: "#4FBDD7",
                                  lineHeight: 2.5,
                                  borderRadius: "50px",
                                  marginTop: "20%",
                                  cursor: "pointer"
                                }}
                            >

                                <a style={{ textDecoration: "none", color: "white" }}>
                                  Envoyer un message
                                </a>
                            </div>
                              </Link>

                            {bookingObj === null ? null : bookingObj.status ===
                            "Confirmée" ? (
                                <>
                                  <div
                                      style={{
                                        textAlign: "center",
                                        height: "40px",
                                        width: "200px",
                                        backgroundColor: "#4FBDD7",
                                        lineHeight: 2.5,
                                        borderRadius: "50px",
                                        marginTop: "5%"
                                      }}
                                  >
                                    <a
                                        href={`tel:${
                                            bookingObj === null || currentUser === null
                                                ? null
                                                : currentUser._id === bookingObj.alfred._id
                                                ? bookingObj.user.phone
                                                : bookingObj.alfred.phone
                                        }`}
                                        style={{
                                          textDecoration: "none",
                                          color: "white"
                                        }}
                                    >
                                      Appeler
                                    </a>
                                  </div>

                                  <div
                                      style={{ textAlign: "center", width: "200px" }}
                                  >
                                    {bookingObj === null ||
                                    currentUser === null ? null : currentUser._id ===
                                    bookingObj.alfred._id ? (
                                        <Typography>{bookingObj.user.phone}</Typography>
                                    ) : (
                                        <Typography>
                                          {bookingObj.alfred.phone}
                                        </Typography>
                                    )}
                                  </div>
                                </>
                            ) : null}
                          </Grid>
                        </Grid>
                        {bookingObj === null ||
                        currentUser === null ? null : bookingObj.status ===
                        "Terminée" ? (
                            currentUser._id === bookingObj.alfred._id ? (
                                <Grid
                                    container
                                    style={{
                                      borderBottom: "1.5px #8281813b solid",
                                      marginTop: "5%",
                                      paddingBottom: "7%"
                                    }}
                                >
                                  <Grid container>
                                  <Typography
                                      style={{
                                        marginTop: "-3%",
                                        fontSize: "1.7rem",
                                        marginBottom: "5%"
                                      }}
                                  >
                                    Commentaires
                                  </Typography>
                                  </Grid>
                                  <div style={{ display: "flex", flexFlow: "row" }}>
                                    {bookingObj.user_evaluated ?
                                        <Grid container>
                                          <Grid item md={12} xs={12} style={{marginBottom: '35px'}}>
                                            <Typography>
                                              Vous avez déjà évalué votre client.
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                        :
                                    <Grid container>
                                      <Grid item md={6} xs={12}>
                                        <Typography>
                                          Vous avez 15 jours pour évaluer votre client. Une
                                          fois que votre client aura rédigé son commentaire,
                                          il pourra consulter votre évaluation et vous
                                          pourrez consulter la sienne !
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={2}></Grid>
                                      <Grid item md={4} xs={12}>
                                        <Link href={`/evaluateClient?booking=${bookingObj._id}&id=${bookingObj.serviceUserId}&client=${bookingObj.user._id}`}>
                                        <div
                                            style={{
                                              textAlign: "center",
                                              width: "200px",
                                              height: "40px",
                                              backgroundColor: "#F8727F",
                                              lineHeight: 2.5,
                                              borderRadius: "50px",
                                              cursor: 'pointer'
                                            }}
                                        >

                                            <a
                                                style={{
                                                  textDecoration: "none",
                                                  color: "white"
                                                }}
                                            >
                                              Evaluer mon client
                                            </a>
                                        </div>
                                          </Link>
                                      </Grid>
                                    </Grid> }


                                  </div>
                                </Grid>
                            ) : (

                                <Grid
                                    container
                                    style={{
                                      borderBottom: "1.5px #8281813b solid",
                                      marginTop: "5%",
                                      paddingBottom: "7%"
                                    }}
                                >
                                  <Grid container>
                                  <Typography
                                      style={{
                                        marginTop: "-3%",
                                        fontSize: "1.7rem",
                                        marginBottom: "5%"
                                      }}
                                  >
                                    Commentaires
                                  </Typography>
                                  </Grid>

                                  <div style={{ display: "flex", flexFlow: "row" }}>
                                    {bookingObj.alfred_evaluated ?
                                        <Grid container>
                                          <Grid item md={12} xs={12} style={{marginBottom: '35px'}}>
                                            <Typography>
                                              Vous avez déjà évalué votre Alfred.
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                        :
                                    <Grid container>
                                      <Grid item md={6} xs={12} style={{marginBottom: '35px'}}>
                                        <Typography>
                                          Vous avez 15 jours pour évaluer votre Alfred. Une
                                          fois que votre Alfred aura rédigé son commentaire,
                                          il pourra consulter votre évaluation et vous
                                          pourrez consulter la sienne !
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={2}></Grid>
                                      <Grid item md={4} xs={12}>
                                        <Link
                                            href={`/evaluate?booking=${bookingObj._id}&id=${bookingObj.serviceUserId}`}
                                        >
                                        <div
                                            style={{
                                              textAlign: 'center',
                                              width: "200px",
                                              height: "40px",
                                              backgroundColor: "#F8727F",
                                              lineHeight: 2.5,
                                              borderRadius: "50px",
                                              cursor:'pointer'
                                            }}
                                        >

                                            <a
                                                style={{
                                                  textDecoration: "none",
                                                  color: "white"
                                                }}
                                            >
                                              Evaluer mon Alfred
                                            </a>
                                        </div>
                                          </Link>
                                      </Grid>
                                    </Grid> }


                                  </div>
                                </Grid>

                            )
                        ) : null}
                        <Grid container style={{ borderBottom: "1.5px #8281813b solid", marginTop: "5%", paddingBottom: "7%" }}a>
                          <Grid item xs={12} md={9}>
                            <Grid container>
                              <Grid xs={12}>
                                <Typography
                                    style={{
                                      marginTop: "-3%",
                                      fontSize: "1.7rem",
                                      marginBottom: "5%"
                                    }}
                                >
                                  A propos de votre réservation
                                </Typography>
                              </Grid>

                              <Grid item xs={2} style={{ textAlign: "center" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="33.759"
                                    height="30.269"
                                    viewBox="0 0 83.759 80.269"
                                >
                                  <g
                                      id="Groupe_1096"
                                      data-name="Groupe 1096"
                                      transform="translate(0 23)"
                                  >
                                    <path
                                        id="Tracé_12590"
                                        data-name="Tracé 12590"
                                        d="M16.118-19.843l.889.254.889.5.634.509.634.763.384.758.249.888.13,1.018-.13.888-.249.883-.384.763-.634.763-.634.5-.889.509-.889.254-.889.125-.889-.125-.889-.254-.889-.509-.634-.5-.634-.763-.379-.763-.255-.883-.125-.888.125-1.018.255-.888.379-.758.634-.763.634-.509.889-.5.889-.254Zm53.3,0,.889.254.889.5.634.509.634.763.379.758.255.888.13,1.018-.13.888-.255.883-.379.763-.634.763-.634.5-.889.509-.889.254-.888.125-.889-.125-.888-.254-.889-.509-.634-.5-.634-.763-.379-.763-.255-.883-.13-.888.13-1.018.255-.888.379-.758.634-.763.634-.509.889-.5.888-.254ZM0-22V-8.049H83.759V-22Z"
                                        transform="translate(0 2.494)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12591"
                                        data-name="Tracé 12591"
                                        d="M0-2V.682l.13.939.255.807.379.67.379.67.634.538.764.4.759.269h77.16l.759-.269.764-.4.634-.538.379-.67.379-.67.255-.807.13-.939V-2l-.13.939-.255.8-.379.67-.379.67-.634.538-.764.4-.759.269H3.3l-.759-.269-.764-.4-.634-.538L.764.412.385-.258l-.255-.8Z"
                                        transform="translate(0 52.293)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12592"
                                        data-name="Tracé 12592"
                                        d="M5.327-23l-.583.269-.434.132-.434.407-.434.4-.149.4L3-20.851v9.662l.292.539.149.4.434.4.434.407.434.132.583.269H7.653L8.23-9.31l.44-.132.434-.407.434-.4.149-.4.292-.539v-9.662l-.292-.539-.149-.4-.434-.4L8.671-22.6l-.44-.132L7.653-23Z"
                                        transform="translate(7.47 0)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12593"
                                        data-name="Tracé 12593"
                                        d="M20.326-23l-.583.269-.434.132-.44.407-.434.4-.143.4L18-20.851v9.662l.291.539.143.4.434.4.44.407.434.132.583.269h2.319l.583-.269.434-.132.44-.407.434-.4.143-.4.291-.539v-9.662l-.291-.539-.143-.4-.434-.4-.44-.407-.434-.132L22.645-23Z"
                                        transform="translate(44.823 0)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12594"
                                        data-name="Tracé 12594"
                                        d="M7-11V2.949H17.465V-11Z"
                                        transform="translate(17.43 29.884)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12595"
                                        data-name="Tracé 12595"
                                        d="M7-14V-3.539H17.465V-14Z"
                                        transform="translate(17.43 22.413)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12596"
                                        data-name="Tracé 12596"
                                        d="M7-7V3.461H17.465V-7Z"
                                        transform="translate(17.43 39.843)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12597"
                                        data-name="Tracé 12597"
                                        d="M10-7V3.461H20.461V-7Z"
                                        transform="translate(24.903 39.843)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12598"
                                        data-name="Tracé 12598"
                                        d="M3-11V2.949H13.466V-11Z"
                                        transform="translate(7.474 29.884)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12599"
                                        data-name="Tracé 12599"
                                        d="M3-7V3.461H13.466V-7Z"
                                        transform="translate(7.474 39.843)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12600"
                                        data-name="Tracé 12600"
                                        d="M3-14V-3.539H13.466V-14Z"
                                        transform="translate(7.474 22.413)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12601"
                                        data-name="Tracé 12601"
                                        d="M10-11V2.949H20.461V-11Z"
                                        transform="translate(24.903 29.884)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12602"
                                        data-name="Tracé 12602"
                                        d="M75-9.506l.384.251.255.5.125.5V30.218l-.125.5-.255.378L75,31.338l-.5.128H9.264l-.5-.128-.385-.245-.249-.378-.13-.5V-8.258l.13-.5.249-.5.385-.251ZM0-17V35.838l.13.5.255.5.379.5.379.5.634.378.764.373.759.251h77.16l.759-.251.764-.373.634-.5.379-.624.379-.624.255-.752.13-.875V-17Z"
                                        transform="translate(0 14.943)"
                                        fill="#FBAEB6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12603"
                                        data-name="Tracé 12603"
                                        d="M18-7V3.461H28.47V-7Z"
                                        transform="translate(44.819 39.843)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12604"
                                        data-name="Tracé 12604"
                                        d="M18-11V2.949H28.47V-11Z"
                                        transform="translate(44.819 29.884)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12605"
                                        data-name="Tracé 12605"
                                        d="M18-14V-3.539H28.47V-14Z"
                                        transform="translate(44.819 22.413)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12606"
                                        data-name="Tracé 12606"
                                        d="M14-7V3.461H24.466V-7Z"
                                        transform="translate(34.863 39.843)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12607"
                                        data-name="Tracé 12607"
                                        d="M10-14V-3.539H20.461V-14Z"
                                        transform="translate(24.903 22.413)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12608"
                                        data-name="Tracé 12608"
                                        d="M14-11V2.949H24.466V-11Z"
                                        transform="translate(34.863 29.884)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                    <path
                                        id="Tracé_12609"
                                        data-name="Tracé 12609"
                                        d="M14-14V-3.539H24.466V-14Z"
                                        transform="translate(34.863 22.413)"
                                        fill="#fbaeb6"
                                        fill-rule="evenodd"
                                    />
                                  </g>
                                </svg>
                              </Grid>
                              <Grid item xs={10} style={{ paddingLeft: "3%" }}>
                                <Typography>
                                  {bookingObj === null
                                      ? null
                                      : `${bookingObj.date_prestation} - ${moment(bookingObj.time_prestation).format('HH:mm')}`}
                                </Typography>
                              </Grid>

                              <Grid item xs={2} style={{ textAlign: "center", marginTop: "3%" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25.432"
                                    height="36.478"
                                    viewBox="0 0 55.432 66.478"
                                >
                                  <path
                                      id="Tracé_12517"
                                      data-name="Tracé 12517"
                                      d="M300.251,5274l-1.352.1-1.352.2-1.463.206-1.241.311-1.352.3-2.59.814-2.362,1.125-2.365,1.223-2.03,1.428-2.03,1.633-1.8,1.832-1.577,1.836-1.352,2.141-1.238,2.144-.9,2.34-.339,1.227-.339,1.121-.225,1.329-.228,1.222L274,5297.76v1.323l.111,1.835.228,1.833.336,1.942.567,1.831.564,1.839.788,1.832.788,1.836.9,1.838,1.016,1.731,1.124,1.832,2.368,3.365,2.476,3.267,2.593,3.061,2.59,2.851,2.479,2.552,2.365,2.344,2.14,1.936,3.04,2.653,1.241,1.018,1.241-1.018,3.04-2.653,2.141-1.936,2.365-2.344,2.479-2.552,2.59-2.851,2.593-3.061,2.476-3.267,2.368-3.365,1.124-1.832,1.016-1.731.9-1.838.788-1.836.788-1.832.564-1.839.567-1.831.336-1.942.228-1.833.111-1.835v-1.323l-.111-1.225-.228-1.222-.225-1.329-.339-1.121-.339-1.227-.9-2.34-1.238-2.144-1.352-2.141-1.577-1.836-1.8-1.832-2.03-1.633-2.03-1.428-2.365-1.223-2.362-1.125-2.59-.814-1.352-.3-1.241-.311-1.463-.206-1.352-.2-1.355-.1Zm2.707,14.378,1.124.2,1.127.206,1.124.4,1.016.41,1.013.61.9.611.788.714.792.715.678.813.671.919.453.919.453,1.018.225,1.021.222,1.023v2.24l-.222,1.02-.225,1.018-.453,1.023-.453.912-.671.919-.678.819-.792.713-.788.715-.9.609-1.013.613-1.016.4-1.124.41-1.127.206-1.124.2h-2.483l-1.124-.2-1.127-.206-1.124-.41-1.016-.4-1.013-.613-.9-.609-.788-.715-.792-.713-.678-.819-.671-.919-.453-.912-.453-1.023-.225-1.018-.222-1.02v-2.24l.222-1.023.225-1.021.453-1.018.453-.919.671-.919.678-.812.792-.715.788-.714.9-.611,1.013-.61,1.016-.41,1.124-.4,1.127-.206,1.124-.2Z"
                                      transform="translate(-274.001 -5274)"
                                      fill="#FBAEB6"
                                      fill-rule="evenodd"
                                  />
                                </svg>
                              </Grid>
                              <Grid item xs={10} style={{ paddingLeft: "3%", marginTop: "3%" }}>
                                <Typography>
                                  {bookingObj === null
                                      ? null
                                      : bookingObj.address.address}
                                  <br />
                                  {bookingObj === null
                                      ? null
                                      : bookingObj.address.zip_code +
                                      " " +
                                      bookingObj.address.city}
                                </Typography>
                                <Typography
                                    style={{
                                      color: "rgb(47, 188, 211)",
                                      fontSize: "0.8rem",
                                      cursor: "pointer"
                                    }}
                                >
                                  <a style={{ color: "rgb(47, 188, 211)", fontSize: "0.8rem" }} href={`https://www.google.fr/maps/place/${splitAddress.join('+')},+${bookingObj.address.zip_code}+${bookingObj.address.city}/@${bookingObj.address.gps.lat},${bookingObj.address.gps.lng}`} target='_blank'>
                                    Voir sur la map
                                  </a>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={2}>
                            <Grid container style={{ marginTop: "50%" }}>
                              {bookingObj === null ||
                              currentUser === null ? null : bookingObj.status ===
                              "En attente de confirmation" ? (
                                  currentUser._id === bookingObj.alfred._id ? (
                                      <>
                                        <Typography style={{ minWidth: "250px" }}>
                                          Votre réservation doit être confirmée avant le{" "}
                                          {moment(bookingObj.date)
                                              .add(1, "d")
                                              .format("DD/MM/YYYY")}{" "}
                                          à {moment(bookingObj.date).format("HH:mm")}
                                        </Typography>
                                        <Link
                                            href={{
                                              pathname: "/reservations/confirm",
                                              query: { id: this.state.booking_id }
                                            }}
                                        >
                                        <div
                                            style={{
                                              textAlign: "center",
                                              height: "40px",
                                              minWidth: "250px",
                                              backgroundColor: "#F8727F",
                                              lineHeight: 2.5,
                                              borderRadius: "50px",
                                              marginTop: "20%",
                                              cursor: "pointer"
                                            }}
                                        >

                                            <a
                                                style={{
                                                  textDecoration: "none",
                                                  color: "white"
                                                }}
                                            >
                                              Confirmer la réservation
                                            </a>
                                        </div>
                                          </Link>
                                        <div
                                            style={{
                                              textAlign: "center",
                                              height: "40px",
                                              minWidth: "250px",
                                              lineHeight: 2.5,
                                              borderRadius: "50px",
                                              border: "1px solid black",
                                              marginTop: "20%",
                                              cursor: "pointer"
                                            }}
                                            onClick={() => this.changeStatus('Refusée')}
                                        >
                                          Refuser
                                        </div>
                                      </>
                                  ) : (
                                      <p>En attente de confirmation</p>
                                  )
                              ) : bookingObj.status === "Demande d'infos" &&
                              currentUser._id === bookingObj.alfred._id ? (
                                  <>
                                  <Link
                                      href={{
                                        pathname: "/reservations/preapprouve",
                                        query: { id: this.state.booking_id }
                                      }}
                                  >
                                    <div
                                        style={{
                                          textAlign: "center",
                                          height: "40px",
                                          minWidth: "250px",
                                          backgroundColor: "#F8727F",
                                          lineHeight: 2.5,
                                          borderRadius: "50px",
                                          marginTop: "20%",
                                          cursor:'pointer'
                                        }}
                                    >

                                        <a
                                            style={{
                                              textDecoration: "none",
                                              color: "white"
                                            }}
                                        >
                                          Pré-approuver
                                        </a>
                                    </div>
                                      </Link>
                                    <div
                                        style={{
                                          textAlign: "center",
                                          height: "40px",
                                          minWidth: "250px",
                                          lineHeight: 2.5,
                                          borderRadius: "50px",
                                          border: "1px solid black",
                                          marginTop: "20%",
                                          cursor: 'pointer'
                                        }}
                                        onClick={() => this.changeStatus('Refusée')}
                                    >
                                      Refuser
                                    </div>
                                  </>
                              ) : bookingObj.status === "Demande d'infos" &&
                              currentUser._id === bookingObj.user._id ? (
                                  null
                              ) : bookingObj.status === "Invitation à réserver" ? (
                                  <Link
                                      href={{
                                        pathname: "/reservations/messagesDetails",
                                        query: {
                                          id:
                                              bookingObj === null
                                                  ? null
                                                  : bookingObj.chatroom,
                                          booking:
                                              bookingObj === null
                                                  ? null
                                                  : bookingObj._id
                                        }
                                      }}
                                  >
                                  <div
                                      style={{
                                        textAlign: "center",
                                        height: "40px",
                                        minWidth: "250px",
                                        backgroundColor: "#F8727F",
                                        lineHeight: 2.5,
                                        borderRadius: "50px",
                                        marginTop: "20%",
                                        cursor: "pointer"
                                      }}
                                  >

                                      <a
                                          style={{ textDecoration: "none", color: "white" }}
                                      >
                                        Envoyer un message
                                      </a>
                                  </div>
                                    </Link>
                              ) : bookingObj.status === "Confirmée" ? (
                                  <>
                                    <Grid item xs={7} md={4}>
                                      <div
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            backgroundColor: "#A7D571",
                                            borderRadius: "100%",
                                            border:
                                                "0.4px solid rgba(112,112,112,0.26)",
                                            marginTop: "15%"
                                          }}
                                      ></div>
                                    </Grid>
                                    <Grid item xs={5} md={8}>
                                      <Typography style={{ color: "#A7D571" }}>
                                        Réservation confirmée
                                      </Typography>
                                    </Grid>
                                  </>
                              ) : bookingObj.status === "Expirée" ? (
                                  <>
                                    <Grid item xs={7} md={4}>
                                      <div
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            backgroundColor: "#C4C4C4",
                                            borderRadius: "100%",
                                            border:
                                                "0.4px solid rgba(112,112,112,0.26)",
                                            marginTop: "15%"
                                          }}
                                      ></div>
                                    </Grid>
                                    <Grid item xs={5} md={8}>
                                      <Typography style={{ color: "#C4C4C4" }}>
                                        Réservation expirée
                                      </Typography>
                                    </Grid>
                                  </>
                              ) : bookingObj.status === "Terminée" ? (
                                  <>
                                    <Grid item xs={7} md={4}>
                                      <div
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            backgroundColor: "#C4C4C4",
                                            borderRadius: "100%",
                                            border:
                                                "0.4px solid rgba(112,112,112,0.26)",
                                            marginTop: "15%"
                                          }}
                                      ></div>
                                    </Grid>
                                    <Grid item xs={5} md={8}>
                                      <Typography style={{ color: "#C4C4C4" }}>
                                        Réservation terminée
                                      </Typography>
                                    </Grid>
                                  </>
                              ) : bookingObj.status === "Annulée" ? (
                                  <>
                                    <Grid item xs={7} md={4}>
                                      <div
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            backgroundColor: "#C4C4C4",
                                            borderRadius: "100%",
                                            border:
                                                "0.4px solid rgba(112,112,112,0.26)",
                                            marginTop: "15%"
                                          }}
                                      ></div>
                                    </Grid>
                                    <Grid item xs={5} md={8}>
                                      <Typography style={{ color: "#C4C4C4" }}>
                                        Réservation annulée
                                      </Typography>
                                    </Grid>
                                  </>
                              ) : bookingObj.status === "Refusée" ? (
                                  <>
                                    <Grid item xs={7} md={4}>
                                      <div
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            backgroundColor: "#C4C4C4",
                                            borderRadius: "100%",
                                            border:
                                                "0.4px solid rgba(112,112,112,0.26)",
                                            marginTop: "15%"
                                          }}
                                      ></div>
                                    </Grid>
                                    <Grid item xs={5} md={8}>
                                      <Typography style={{ color: "#C4C4C4" }}>
                                        Réservation refusée
                                      </Typography>
                                    </Grid>
                                  </>
                              ) : bookingObj.status === "Pré-approuvée" ? (
                                  currentUser._id === bookingObj.alfred._id ? (
                                      <>
                                        <Grid item xs={7} md={4}>
                                          <div
                                              style={{
                                                width: "30px",
                                                height: "30px",
                                                backgroundColor: "#D5A771",
                                                borderRadius: "100%",
                                                border:
                                                    "0.4px solid rgba(112,112,112,0.26)",
                                                marginTop: "15%"
                                              }}
                                          ></div>
                                        </Grid>
                                        <Grid item xs={5} md={8}>
                                          <Typography style={{ color: "#D5A771" }}>
                                            Réservation pré-approuvée
                                          </Typography>
                                        </Grid>
                                      </>
                                  ) : (
                                      <Link href={`reserve?id=${bookingObj._id}`}>

                                      <div
                                          style={{
                                            textAlign: "center",
                                            height: "40px",
                                            minWidth: "250px",
                                            backgroundColor: "#F8727F",
                                            lineHeight: 2.5,
                                            borderRadius: "50px",
                                            marginTop: "20%",
                                            cursor:'pointer'
                                          }}
                                      >
                                        <a
                                            style={{
                                              textDecoration: "none",
                                              color: "white"
                                            }}
                                        >

                                            Réserver
                                          </a>
                                      </div>
                                        </Link>
                                  )
                              ) : null}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                            container
                            style={{
                              borderBottom: "1.5px #8281813b solid",
                              marginTop: "5%",
                              paddingBottom: "7%"
                            }}
                        >
                          <Grid className={classes.displayn} item xs={1} md={2}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="124.427"
                                height="139.307"
                                viewBox="0 0 174.427 189.307"
                            >
                              <g
                                  id="Groupe_1095"
                                  data-name="Groupe 1095"
                                  transform="translate(-274.638 -72.226)"
                              >
                                <g
                                    id="dessin"
                                    transform="translate(274.638 72.226)"
                                >
                                  <g id="Groupe_1091" data-name="Groupe 1091">
                                    <path
                                        id="Tracé_12564"
                                        data-name="Tracé 12564"
                                        d="M413.739,203.868a64.3,64.3,0,0,1-6.441,2.084c-.815.182-1.831-.54-2.755-.85.681-.627,1.26-1.587,2.058-1.832,18.086-5.555,25.314-19.333,27.907-36.656.1-.662.092-1.34.183-2,1.027-7.5-1.37-13.483-5.454-20.18a33.327,33.327,0,0,0-9.953-10.729c-1.569-.95-4.756-3.139-6.412-3.944-1.545-.751-1.983-1.6-.621-3.057a39.613,39.613,0,0,0,3.187-4.2c2.707-3.806,2.543-7.878.886-11.979-1.606-3.978-5.624-5.246-9.028-2.64-1.964,1.5-3.374,1.214-5.136-.052-4.757-3.419-10.144-4.792-15.954-5.344-6.617-.628-12.879.676-19.015,2.65-6.046,1.945-9.6,6.429-11.008,12.614a9.8,9.8,0,0,1-.732,1.358c-.384-1.245-.6-1.948-.818-2.65-.356-1.127-.443-2.461-1.119-3.344-4.832-6.311-6.677-17.719-.256-26.025,6.329-8.187,14.445-13.157,24.923-14.415,14.019-1.683,26.936,1.461,39.217,7.976a3.093,3.093,0,0,1,1.449,2.16c-2.357-1.155-4.686-2.375-7.077-3.455-10.7-4.836-21.939-6.952-33.594-5.445-9.249,1.2-17.547,4.905-22.842,12.99a22.317,22.317,0,0,0-2.515,20.709,44.993,44.993,0,0,0,3.033,5.521,23.055,23.055,0,0,1,11.965-11.421l-5.284-3,.353-.679c2.413.088,5.029.98,7.365-1.793a16.206,16.206,0,0,1-2.129-.369c-1.319-.46-2.837-.724-3.845-1.576a3.72,3.72,0,0,1-.86-3.063c.113-.6,1.551-1.4,2.322-1.326a11.24,11.24,0,0,1,4.456,1.337c2.223,1.275,2.826,1.035,3.092-1.564a48.7,48.7,0,0,1-4.97-2.9c-1.35-1.007-2.315-2.753-.9-4.054.656-.6,2.745-.116,3.912.444,1.111.533,1.868,1.8,3.155,3.138l1.837-4.853c1.717,1.286.962,2.8.4,4.365-1.319,3.676-2.512,7.4-3.849,11.066a37.41,37.41,0,0,1-1.926,3.823c2.894-.4,5.6-.8,8.3-1.157,7.937-1.044,15.577-.421,22.54,4.023a5.3,5.3,0,0,0,6.2.22c4.521-2.593,9.885-.023,11.4,5,1.93,6.406,1.031,12.256-3.366,17.441-.424.5-.782,1.056-1,1.358,3.773,2.506,7.586,4.744,11.068,7.412,6.614,5.068,10.69,12.18,14.639,19.3,8.479,15.291,12,31.883,12.8,49.2a98.355,98.355,0,0,1-1.853,26.272c-.487,2.172.679,2.506,2.291,2.483A45.907,45.907,0,0,1,471.22,235.2a37.268,37.268,0,0,1,5.881,2.815c3.245,1.958,4.508,6.164,3.426,9.968-1.592,5.6-5.834,8.471-10.78,10.444-6.746,2.69-13.891,2.436-20.842,1.426-5.76-.837-11.353-2.811-17.032-4.235a5.287,5.287,0,0,0-2.41-.137,261.158,261.158,0,0,1-37.245,5.636c-2.246.206-4.053.334-6.887.417a98.431,98.431,0,0,1-11.024-.333,5.028,5.028,0,0,1-4.633-4.593,5.242,5.242,0,0,1,2.91-5.908,40.177,40.177,0,0,1,10.74-3.154c9.953-1.237,17.966-5.169,22.7-14.448a11.559,11.559,0,0,1,1.329-1.558,6.876,6.876,0,0,1-.136,1.84c-3.723,7.6-9.138,13.157-17.815,14.86-3.368.661-6.721,1.445-10.024,2.376A7.942,7.942,0,0,0,376,252.591c-2.413,2.461-1.695,5.183,1.714,5.523,5.557.555,11.233,1.09,16.755.56,10.571-1.014,21.152-2.357,31.57-4.382,7.417-1.442,12.765-6.539,16.372-13.14,3.708-6.787,5.409-14.259,6.408-21.846a97.023,97.023,0,0,0-4.418-43.929c-1.293-3.865-2.955-7.607-4.447-11.4l-.709.029c-.306.891-.676,1.765-.909,2.674-2.53,9.835-5.913,19.386-12.626,27.138-3.39,3.915-7.993,6.781-12.047,10.121ZM372.046,87.156l.6-.793a17.633,17.633,0,0,0-2.113-2.9c-.381-.358-1.34-.1-2.037-.125.041.678-.183,1.7.172,1.972A21.538,21.538,0,0,0,372.046,87.156Z"
                                        transform="translate(-306.479 -72.226)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12565"
                                        data-name="Tracé 12565"
                                        d="M283.206,244.88c-1.025,2.78-1.488,2.907-4.424.91a10.222,10.222,0,0,1-2.043-1.446,5.588,5.588,0,0,1-.684-1.892,6.292,6.292,0,0,1,1.939-.26,14.975,14.975,0,0,1,2.722,1.166c-1.218-2.271-4.369-3.425-1.822-5.632l-1.646-2.4a15.489,15.489,0,0,1,2.608-1.085c1.053-.235,2.185-.111,3.244-.33.432-.089.761-.673,1.137-1.031-.383-.377-.743-1.043-1.154-1.076-1.156-.093-2.343.2-3.5.1-1.131-.094-3.157-.377-3.2-.756-.23-2.03,1.723-1.495,2.856-1.833,1.031-.307,2.188-.2,3.209-.527.561-.18.954-.883,1.423-1.35-.517-.305-1.017-.833-1.553-.871-1.332-.1-2.711.217-4.01,0a8.682,8.682,0,0,1-2.533-1.4,10.167,10.167,0,0,1,2.523-1.479c1.2-.3,2.513-.105,3.746-.314.521-.088.96-.664,1.436-1.017-.533-.412-1.049-1.145-1.6-1.174-1.324-.07-2.684.374-3.994.247-.78-.076-1.494-.838-2.238-1.291a8.177,8.177,0,0,1,1.842-1.753,11.535,11.535,0,0,1,2.822-.6l-.006-.771a21.169,21.169,0,0,1-2.364-.167c-1.111-.2-2.2-.512-3.3-.777.874-.681,1.654-1.661,2.644-1.976a27.507,27.507,0,0,1,5.337-.956c1.987-.218,2.949,1,3.11,2.8.319,3.588.5,7.187.783,10.778.374,4.674.811,9.344,1.191,14.018a2.668,2.668,0,0,0,2.746,2.724,39.883,39.883,0,0,0,8.728-.37c11.249-2.36,18.754-9.155,22.634-19.966.169-.472.265-1.094.613-1.352a10.342,10.342,0,0,1,2.048-.95c.168.66.628,1.41.456,1.965a30.5,30.5,0,0,1-7.671,12.521c-6.7,6.755-14.825,10.679-24.412,10.886C289.67,246.262,286.473,245.354,283.206,244.88Z"
                                        transform="translate(-274.638 -132.447)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12566"
                                        data-name="Tracé 12566"
                                        d="M324.439,335.033c-3,1.918-4.108,4.131-3.4,6.872.79,3.056,3.307,3.976,5.955,4.1,6.761.325,13.534.448,20.3.5a31.106,31.106,0,0,0,6.22-.778c.763-.152,1.408-.89,2.107-1.362a8.027,8.027,0,0,0-2.4-1.158,30.539,30.539,0,0,0-3.494.278c-6.191.05-12.391.241-18.566-.066-1.6-.079-4.034-1.477-4.458-2.794-.7-2.172,1.105-4.01,3.166-5.127a6.517,6.517,0,0,1,1.383-.6c2.91-.779,5.849-1.459,8.737-2.312,1.725-.509,3.008-.4,4.115,1.249.38.565,1.5.632,2.28.926a9.616,9.616,0,0,0,.7-2.768c-.026-.638-.767-1.242-1.176-1.87-1.871-2.87-3.921-5.641-5.566-8.634-3.706-6.739-4.18-14.241-4.595-21.7-.385-6.926,1.533-13.433,4.049-19.791.377-.953,1.059-1.908-.6-2.293l.084-.049a2.821,2.821,0,0,1-.169.97,44.863,44.863,0,0,0-5.667,17.534c-1.419,10.631.7,20.491,5.5,29.889,2.07,4.053,2.07,4.053-2.728,5.151C336.224,331.206,327.422,333.667,324.439,335.033Z"
                                        transform="translate(-294.384 -160.037)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12567"
                                        data-name="Tracé 12567"
                                        d="M371.344,284.3a10.731,10.731,0,0,1-2.111-1.529c-2.857-3.282-5.611-6.651-8.444-9.954-1.012-1.18-.8-2.273.614-2.381,10.22-.784,16.392-8.162,23.343-14.216,3.684-3.208,7.256-6.442,12.126-7.808,2.017-.565,3.75-.358,4.952,1.327a83.452,83.452,0,0,1,4.7,7.38c1.986,3.514,3.792,7.128,5.843,11.02-.754-.405-2-.652-2.448-1.386-2.357-3.849-4.514-7.821-6.737-11.752-.453-.8-.852-1.635-1.35-2.406-1.344-2.08-3.194-2.722-5.394-1.5-3.176,1.764-6.275,3.666-8.989,5.263,1.328,3.83,2.309,6.9,3.491,9.889a3.279,3.279,0,0,0,1.889,1.582c1.884.614,3.846.986,5.836,1.469-.277,2.04-1.42,2.033-2.765,1.652-8.6-2.433-15.462.774-21.2,6.881C373.195,279.438,372.567,281.87,371.344,284.3Zm17.544-17.314c-.367-1.647-.566-2.981-.965-4.251-1.281-4.081-2.483-4.2-5.633-1.36a75.237,75.237,0,0,1-9.531,7.2c-1.751,1.132-1.918,2.068-.9,3.611,1.409,2.14,2.526,2.369,4.767.928,3.352-2.157,6.405-4.921,10.764-4.964C387.911,268.141,388.426,267.362,388.888,266.987ZM370.1,280.3l1.077.078c.352-1.613,1.247-3.351.912-4.8-.383-1.658-1.864-3.062-3.075-4.89l-5.5,1.456Z"
                                        transform="translate(-311.193 -147.415)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12568"
                                        data-name="Tracé 12568"
                                        d="M378.482,159.506c-.15,3.464-2.808,4.339-5.043,5.406a6.293,6.293,0,0,1-7.445-1.225,9.226,9.226,0,0,1-2.949-8.875c.687-3.409,3.654-5.544,8.086-5.822a5.952,5.952,0,0,1,6.121,4.527c.187.677-.3,2.159-.737,2.272-1.308.34-2.012.888-1.722,2.219.314,1.439,1.315,1.811,2.682,1.384A3.392,3.392,0,0,1,378.482,159.506Z"
                                        transform="translate(-312.339 -105.033)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12569"
                                        data-name="Tracé 12569"
                                        d="M369.087,179.471c-.053.832-.163,1.664-.148,2.494.039,2.074-.259,4.259.293,6.2,1.049,3.678,3.616,4.684,7.308,3.233a17.982,17.982,0,0,0,3.529-1.906,36,36,0,0,0,3.009-2.543l.685.227a7.594,7.594,0,0,1-.847,2.566c-2.139,2.576-4.392,5.061-6.7,7.493a4.514,4.514,0,0,1-2.148,1.08c-.8.2-1.705-.062-2.5.137-5.2,1.3-8.007-2.232-10.951-5.4-.516-.556-.538-1.572-.788-2.375l.53-.381a22.926,22.926,0,0,1,2.213,1.414,3.317,3.317,0,0,0,4.386-.153c.51-.4.247-1.848.254-2.82.017-2.4-.107-4.815.027-7.212.044-.769.721-1.5,1.108-2.251Z"
                                        transform="translate(-311.055 -117.981)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12570"
                                        data-name="Tracé 12570"
                                        d="M410.3,97.484c3.869,2.539,6.1,2.4,7.435-.4-2.337-.615-5.007-1.132-4.723-4.361a2.961,2.961,0,0,1,1.417-2.112c2.824-1.205,4.214,1.128,6.234,3.122l2.22-4.068a23.046,23.046,0,0,1-3.884-1.445,3.239,3.239,0,0,1-1.311-4.586c1.02-1.741,2.68-.8,3.971-.024a28.391,28.391,0,0,1,2.839,2.22l2.211-1.341a6.044,6.044,0,0,1-.144,1.869q-3.14,6.13-6.382,12.206a5.36,5.36,0,0,1-5.43,2.9C412.482,101.337,411.073,100.154,410.3,97.484Zm7.9-2.705q.289-.762.578-1.524a32.69,32.69,0,0,0-3.29-1.2c-.145-.038-.534.837-.809,1.289Zm3.614-7.541.649-1.321-3.069-1.336c-.118.36-.412.984-.326,1.041C419.948,86.212,420.89,86.712,421.814,87.237Z"
                                        transform="translate(-332.623 -76.682)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12571"
                                        data-name="Tracé 12571"
                                        d="M355.67,162.7c-.178.531-.207,1.207-.558,1.572-4.189,4.357-4.33,9.763-3.256,15.062.71,3.5,2.761,6.718,4.129,10.1a6.6,6.6,0,0,1,.124,2.081c-.713-.214-1.832-.216-2.073-.677-1.728-3.3-4.152-6.558-4.69-10.083-.952-6.243-.333-12.567,4.478-17.562a7.536,7.536,0,0,1,1.149-.822Z"
                                        transform="translate(-306.409 -110.754)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12572"
                                        data-name="Tracé 12572"
                                        d="M453.951,103.913l4.349-5.386a8.1,8.1,0,0,1-.01,2.321c-.882,2.311-2.078,4.334-4.64,5.266-.875.318-1.522,1.249-2.289,1.881-2.073,1.709-4.351,1.568-6.612.549a4.387,4.387,0,0,1-2.761-4.475c2.254,2.4,4.428,3.86,7.755,2.29-1.853-2.246-5.324-4.653-1.494-6.953C451.363,97.538,451.986,101.574,453.951,103.913Zm-3.487-.052,1-.827c-.627-.709-1.245-1.427-1.915-2.094a5.455,5.455,0,0,0-.806.681C449.278,102.393,449.876,103.123,450.464,103.86Z"
                                        transform="translate(-346.169 -83.468)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12573"
                                        data-name="Tracé 12573"
                                        d="M477.236,134.817c5.628-12.683,7.869-25.328-.3-38.164C486.237,100.86,484.814,130.041,477.236,134.817Z"
                                        transform="translate(-361.106 -82.667)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12574"
                                        data-name="Tracé 12574"
                                        d="M456.822,137.944c2.515,1.4,4.4,7.723,2.948,10.107a3.466,3.466,0,0,1-1.031.94c-1.428-1.309-3.846-2.611-3.94-4.058C454.65,142.656,456.069,140.275,456.822,137.944Z"
                                        transform="translate(-351.641 -100.316)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12575"
                                        data-name="Tracé 12575"
                                        d="M343.457,274.328c-4.224.66-8.313,2.567-12.681,1.886l-.187-.973,18.67-5.379c-.061,2.007-.187,2.106-5.881,4.514C343.373,274.377,343.457,274.328,343.457,274.328Z"
                                        transform="translate(-298.553 -156.703)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12576"
                                        data-name="Tracé 12576"
                                        d="M435.68,297.488l8.975-5.411c.567,2.9-.936,4.129-2.668,4.949S438.487,299.51,435.68,297.488Z"
                                        transform="translate(-343.473 -166.198)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12577"
                                        data-name="Tracé 12577"
                                        d="M425.137,295.491l10.138-5.684C434.84,294.041,430.67,296.355,425.137,295.491Z"
                                        transform="translate(-338.967 -165.228)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12578"
                                        data-name="Tracé 12578"
                                        d="M287.131,283.043l-1.817-1.482a11.258,11.258,0,0,1,2.573-1.2,9.42,9.42,0,0,1,3.448-.024c.645.119,1.178.846,1.761,1.3-.51.436-.97,1.149-1.54,1.25A32.523,32.523,0,0,1,287.131,283.043Z"
                                        transform="translate(-279.201 -161.115)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12579"
                                        data-name="Tracé 12579"
                                        d="M459.319,302.209a1.869,1.869,0,0,1,2.433,2.267,4.688,4.688,0,0,1-2.006,2.973c-1.467.875-2.475.172-3.8-2.257l3.059-.351c.115-.8.253-1.748.39-2.7Z"
                                        transform="translate(-352.136 -170.499)"
                                        fill="#484848"
                                    />
                                    <path
                                        id="Tracé_12580"
                                        data-name="Tracé 12580"
                                        d="M286.548,275.751c-.753.288-1.459.843-2,.711a34.479,34.479,0,0,1-4.672-1.648,1.243,1.243,0,0,1-.621-.948c0-.3.486-.9.641-.863,2.036.47,4.057,1.01,6.063,1.6C286.168,274.66,286.25,275.141,286.548,275.751Z"
                                        transform="translate(-276.613 -158.045)"
                                        fill="#484848"
                                    />
                                  </g>
                                  <g
                                      id="Groupe_1093"
                                      data-name="Groupe 1093"
                                      transform="translate(76.093 42.332)"
                                  >
                                    <g id="Groupe_1092" data-name="Groupe 1092">
                                      <path
                                          id="Tracé_12581"
                                          data-name="Tracé 12581"
                                          d="M413.926,151.98a6.337,6.337,0,0,1-6.208-1.851l-.182-.662c.868-2.019,4.566-4.107,7.008-3,1.175.388,1.54,1.713,2.476,2.523a1.547,1.547,0,0,1-.719,1.267A4.567,4.567,0,0,1,413.926,151.98Z"
                                          transform="translate(-407.536 -146.16)"
                                          fill="#4c4d4d"
                                      />
                                    </g>
                                  </g>
                                  <g
                                      id="Groupe_1094"
                                      data-name="Groupe 1094"
                                      transform="translate(80.699 43.605)"
                                  >
                                    <circle
                                        id="Ellipse_168"
                                        data-name="Ellipse 168"
                                        cx="1.717"
                                        cy="1.717"
                                        r="1.717"
                                        fill="#fff"
                                    />
                                  </g>
                                </g>
                                <g
                                    id="tracé"
                                    transform="translate(329.313 147.109)"
                                >
                                  <path
                                      id="Tracé_12582"
                                      data-name="Tracé 12582"
                                      d="M528.61,379.945s3.935-12.759,15.827-19.52"
                                      transform="translate(-437.87 -270.295)"
                                      fill="none"
                                      stroke="#fff"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="0.5"
                                  />
                                  <path
                                      id="Tracé_12583"
                                      data-name="Tracé 12583"
                                      d="M542.523,384.143s3.935-12.759,15.827-19.52"
                                      transform="translate(-443.816 -272.09)"
                                      fill="none"
                                      stroke="#fff"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="0.5"
                                  />
                                  <path
                                      id="Tracé_12584"
                                      data-name="Tracé 12584"
                                      d="M508.656,376.839s4.711-14.464,19.211-22.032"
                                      transform="translate(-429.34 -267.894)"
                                      fill="none"
                                      stroke="#fff"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="0.5"
                                  />
                                  <path
                                      id="Tracé_12585"
                                      data-name="Tracé 12585"
                                      d="M521.718,359.438s16.159-1.86,30.559,11.5"
                                      transform="translate(-434.924 -269.836)"
                                      fill="none"
                                      stroke="#fff"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="0.5"
                                  />
                                  <path
                                      id="Tracé_12586"
                                      data-name="Tracé 12586"
                                      d="M513.151,370.186s16.159-1.86,30.559,11.5"
                                      transform="translate(-431.262 -274.43)"
                                      fill="none"
                                      stroke="#fff"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="0.5"
                                  />
                                  <path
                                      id="Tracé_12587"
                                      data-name="Tracé 12587"
                                      d="M506.263,384.337s14.508-2.428,26.71,6.759"
                                      transform="translate(-428.318 -280.392)"
                                      fill="none"
                                      stroke="#fff"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="0.5"
                                  />
                                  <path
                                      id="Tracé_12588"
                                      data-name="Tracé 12588"
                                      d="M370.129,203.686s.441,2.661,2.04,3.528h2.26l-.661-3.528Z"
                                      transform="translate(-370.129 -203.3)"
                                      fill="#fff"
                                  />
                                  <path
                                      id="Tracé_12589"
                                      data-name="Tracé 12589"
                                      d="M377.64,203.4l.662,3.528h2.039a19.2,19.2,0,0,0,.937-3.915A8.962,8.962,0,0,1,377.64,203.4Z"
                                      transform="translate(-373.339 -203.011)"
                                      fill="#fff"
                                  />
                                </g>
                              </g>
                            </svg>
                          </Grid>
                          <Grid item xs={9}>
                            <Grid container>
                              <Grid item xs={2}>

                                  <Typography style={{ fontSize: "1.2rem" }}>
                                    {bookingObj.service}
                                  </Typography>

                              </Grid>
                              <Grid item xs={4} md={7}></Grid>
                              <Grid item xs={2} md={1}>
                                <Typography
                                    style={{
                                      fontSize: "1.1rem",
                                      textAlign: "center"
                                    }}
                                >
                                  Qté
                                </Typography>
                              </Grid>
                              <Grid item md={2} xs={3}>
                                <Typography
                                    style={{
                                      fontSize: "1.1rem",
                                      textAlign: "center"
                                    }}
                                >
                                  Prix unitaire
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container>
                              <Grid item xs={1}></Grid>
                              <Grid item xs={2}>
                                {bookingObj === null
                                    ? null
                                    : bookingObj.prestations.map(prestation => {
                                      return (
                                          <Typography style={{ fontSize: "1.1rem" }}>
                                            {prestation.name}
                                          </Typography>
                                      );
                                    })}
                              </Grid>
                              <Grid item md={6} xs={3}>
                                {bookingObj === null
                                    ? null
                                    : bookingObj.prestations.map(prestation => {
                                      return (
                                          <Grid
                                              style={{
                                                height: "25px",
                                                borderBottom: "1.5px #8281813b solid",
                                                width: "100%"
                                              }}
                                              className={classes.bordernone}
                                          ></Grid>
                                      );
                                    })}
                              </Grid>
                              <Grid item xs={2} md={1}>
                                {bookingObj === null
                                    ? null
                                    : bookingObj.prestations.map(prestation => {
                                      return (
                                          <Typography
                                              style={{
                                                fontSize: "1.1rem",
                                                textAlign: "center"
                                              }}
                                          >
                                            {prestation.value}
                                          </Typography>
                                      );
                                    })}
                              </Grid>
                              <Grid item md={2} xs={3}>
                                {bookingObj === null
                                    ? null
                                    : bookingObj.prestations.map(prestation => {
                                      return (
                                          <Typography
                                              style={{
                                                fontSize: "1.1rem",
                                                textAlign: "center"
                                              }}
                                          >
                                            {prestation.price}€
                                          </Typography>
                                      );
                                    })}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                            container
                            style={{
                              borderBottom: "1.5px #8281813b solid",
                              marginTop: "5%",
                              paddingBottom: "7%"
                            }}
                        >
                          <Grid item xs={12}>
                            <Typography style={{ fontSize: "1.4rem" }}>
                              Matériels fournis
                            </Typography>
                          </Grid>
                          {bookingObj === null ? null : bookingObj.equipments
                              .length ? (
                              bookingObj.equipments.map(equipment => {
                                return (
                                    <Grid item xs={1} style={{ textAlign: "center" }}>
                                      <img
                                          style={{ width: "98%" }}
                                          src={`../../static/equipments/${equipment.logo.slice(
                                              0,
                                              -4
                                          )}_Selected.svg`}
                                      />
                                    </Grid>
                                );
                              })
                          ) : (
                              <p>Aucun équipement fourni</p>
                          )}
                        </Grid>
                        {/*<Grid container style={{borderBottom: '1.5px #8281813b solid', marginTop:'5%', paddingBottom: '7%'}}>
                                    <Grid item xs={12}>
                                        <Typography style={{fontSize: '1.4rem'}}>Photos / Vidéos</Typography>
                                    </Grid>
                                    <Grid onClick={() => this.handleOpen1()} item xs={2}>
                                        <Grid style={{border: '1.5px #8281813b solid', borderRadius: '5px', height: '80px', width: '75%', cursor: 'pointer'}}></Grid>
                                    </Grid>
                                    <Grid onClick={() => this.handleOpen2()} item xs={2}>
                                        <Grid style={{border: '1.5px #8281813b solid', borderRadius: '5px', height: '80px', width: '75%', cursor: 'pointer'}}></Grid>
                                    </Grid>
                                    <Grid onClick={() => this.handleOpen3()} item xs={2}>
                                        <Grid style={{border: '1.5px #8281813b solid', borderRadius: '5px', height: '80px', width: '75%', cursor: 'pointer'}}></Grid>
                                    </Grid>
                                    <Grid onClick={() => this.handleOpen4()} item xs={2}>
                                        <Grid style={{border: '1.5px #8281813b solid', borderRadius: '5px', height: '80px', width: '75%', cursor: 'pointer'}}></Grid>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <input
                                            style={{display:'none'}}
                                            id="text-button-file"
                                            multiple
                                            type="file"
                                        />
                                        <label htmlFor="text-button-file">
                                            <Grid style={{borderRadius: '5px', height: '80px', width: '75%', backgroundColor: '#8281813b', cursor: 'pointer'}}>
                                                <Typography style={{textAlign: 'center', fontSize: '4rem', color: '#828181c7', lineHeight: '1.3'}}>+</Typography>
                                            </Grid>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography style={{fontSize: '1rem', marginTop: '20px'}}>Partagez avec votre Alfred des vidéos et photos de la prestation à réaliser afin qu’il puisse organiser son intervention de la meilleure façon ! </Typography>
                                    </Grid>
                                </Grid>*/}
                    <Grid
                      container
                      style={{
                        borderBottom: "1.5px #8281813b solid",
                        marginTop: "5%",
                        paddingBottom: "7%"
                      }}
                    >
                      <Grid item xs={12}>
                        <Typography style={{ fontSize: "1.4rem" }}>
                          {bookingObj === null || currentUser === null ?
                              <span>Revenus potentiels</span>
                              :
                              currentUser._id === bookingObj.alfred._id ?
                                  bookingObj.status === 'Refusée' ?
                                      <span>Paiement non réalisé</span>
                                      :
                                      bookingObj.status === 'Annulée' || bookingObj.status === 'Expirée' ?
                                          <span>Revenus potentiels</span>
                                          :
                                          bookingObj.status === 'Terminée' || bookingObj.status === 'Confirmée' ?
                                              <span>Versement</span>
                                              :
                                              bookingObj.status === 'Demande d\'infos' || bookingObj.status === 'Pré-approuvée' || bookingObj.status === 'En attente de confirmation' ?
                                                  <span>Revenus potentiels</span>
                                                  :
                                                  <span>Revenus potentiels</span>
                                  :
                                  bookingObj.status === 'Refusée' || bookingObj.status === 'Annulée' || bookingObj.status === 'Expirée' ?
                                      <span>Paiement non réalisé</span>
                                      :
                                      bookingObj.status === 'Terminée' ?
                                          <span>Paiement</span>
                                          :
                                          bookingObj.status === 'Confirmée' || bookingObj.status === 'Pré-approuvée' || bookingObj.status === 'Demande d\'infos' || bookingObj.status === 'Pré-approuvée' || bookingObj.status === 'En attente de confirmation' ?
                                              <span>Paiement si acceptation</span>
                                              :
                                              <span>Revenus potentiels</span>
                          }

                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography style={{ fontSize: "1.4rem" }}>
                          Total (EUR)
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography style={{ fontSize: "1.4rem" }}>
                          {bookingObj === null || currentUser === null
                            ? null
                            : currentUser._id === bookingObj.alfred._id
                            ? (bookingObj.amount - bookingObj.fees * 2).toFixed(
                                2
                              )
                            : bookingObj.amount.match(/^-?\d+(?:\.\d{0,2})?/)[0]}
                          €
                        </Typography>
                      </Grid>
                      <ExpansionPanel
                        defaultExpanded
                        className={classes.exp1}
                        style={{
                          border: "none",
                          boxShadow: "none",
                          width: "60%"
                        }}
                      >
                        <ExpansionPanelSummary
                          expandIcon={
                            <ExpandMoreIcon style={{ fontSize: 25 }} />
                          }
                        >
                          <Typography
                            style={{
                              fontSize: "0.8rem",
                              color: "rgb(47, 188, 211)"
                            }}
                          >
                            voir détail
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Grid container>
                            <Grid item xs={4}>
                              {bookingObj === null
                                ? null
                                : bookingObj.prestations.map(prestation => {
                                    return (
                                      <Typography
                                        style={{ fontSize: "1.1rem" }}
                                      >
                                        {prestation.name}
                                      </Typography>
                                    );
                                  })}
                              </Grid>
                              <Grid item xs={6}>
                              <Grid
                                style={{
                                  height: "25px",
                                  borderBottom: "1.5px #8281813b solid",
                                  width: "100%",
                                  marginTop: "10px"
                                }}
                              ></Grid>
                            </Grid>
                            <Grid item xs={2}>
                              {bookingObj === null
                                ? null
                                : bookingObj.prestations.map(prestation => {
                                    return (
                                      <Typography
                                        style={{
                                          fontSize: "1.1rem",
                                          textAlign: "center"
                                        }}
                                      >
                                        {prestation.value}x{prestation.price}€
                                      </Typography>
                                    );
                                  })}
                              </Grid>


                              <Grid item xs={4}>
                              <Typography
                                style={{
                                  fontSize: "1.1rem",
                                  marginTop: "10px"
                                }}
                              >
                                Frais du service
                              </Typography>
                              </Grid>
                              <Grid item xs={6}>
                              <Grid
                                style={{
                                  height: "25px",
                                  borderBottom: "1.5px #8281813b solid",
                                  width: "100%",
                                  marginTop: "10px"
                                }}
                              ></Grid>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography
                                style={{
                                  fontSize: "1.1rem",
                                  textAlign: "center",
                                  marginTop: "10px"
                                }}
                              >
                                {bookingObj === null ||
                                currentUser ===
                                  null ? null : currentUser._id ===
                                  bookingObj.alfred._id ? (
                                  <span>- {bookingObj.fees}</span>
                                ) : (
                                  <span>+ {bookingObj.fees}</span>
                                )}
                                €
                              </Typography>
                              </Grid>


                            <Grid item xs={4}>
                              <Typography
                                style={{
                                  fontSize: "1.5rem",
                                  fontWeight: "bold",
                                  color: "rgb(47, 188, 211)",
                                  marginTop: "10px"
                                }}
                              >
                                Revenu total
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Grid
                                style={{
                                  height: "25px",
                                  borderBottom: "1.5px #8281813b solid",
                                  width: "100%",
                                  marginTop: "10px"
                                }}
                              ></Grid>
                            </Grid>
                              <Grid item xs={2}>
                              <Typography
                                style={{
                                  fontSize: "1.5rem",
                                  fontWeight: "bold",
                                  color: "rgb(47, 188, 211)",
                                  textAlign: "center",
                                  marginTop: "10px"
                                }}
                              >
                                {bookingObj === null || currentUser === null
                                  ? null
                                  : currentUser._id === bookingObj.alfred._id
                                  ? (
                                      bookingObj.amount -
                                      bookingObj.fees * 2
                                    ).toFixed(2)
                                  : bookingObj.amount.match(/^-?\d+(?:\.\d{0,2})?/)[0]}
                                €
                              </Typography>
                            </Grid>
                          </Grid>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </Grid>
                    <Grid
                      container
                      style={{
                        borderBottom: "1.5px #8281813b solid",
                        marginTop: "2%",
                        paddingBottom: "3%"
                      }}
                    >
                      <Grid item xs={12}>
                        <Typography style={{ fontSize: "1rem" }}>
                          Début le{" "}
                          {bookingObj === null
                            ? null
                            : bookingObj.date_prestation}{" "}
                          à{" "}
                          {bookingObj === null
                            ? null
                              : moment(bookingObj.time_prestation).format('HH:mm')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                      {bookingObj === null ? null : bookingObj.status ===
                        "Confirmée" || bookingObj.status === 'Terminée' ?  (
                        <Typography style={{ fontSize: "1rem" }}>
                          Fin le{" "}
                          {bookingObj === null ? null : moment(bookingObj.end_date).format('DD/MM/YYYY')} à{" "}
                          {bookingObj === null ? null : bookingObj.end_time}
                        </Typography>
                      ) : null}
                      </Grid>
                    </Grid>
                    {bookingObj === null ||
                    currentUser === null ? null : (bookingObj.status ===
                        "En attente de confirmation" &&
                        currentUser._id !== bookingObj.alfred._id) ||
                      bookingObj.status === "Confirmée" ||
                      (bookingObj.status === "Demande d'infos" &&
                        currentUser._id !== bookingObj.alfred._id) ||
                      bookingObj.status === "Pré-approuvée" ? (
                      <Grid
                        container
                        style={{
                          borderBottom: "1.5px #8281813b solid",
                          marginTop: "2%",
                          paddingBottom: "3%"
                        }}
                      >
                        <Link
                          href={{
                            pathname: "cancel",
                            query: { id: this.state.booking_id }
                          }}
                        >
                          <a
                            style={{
                              textDecoration: "none",
                              fontSize: "1.1rem",
                              color: "rgb(47, 188, 211)"
                            }}
                          >
                            Annuler la réservation
                          </a>
                        </Link>
                      </Grid>
                    ) : null}
                    <Grid
                      container
                      style={{
                        borderBottom: "1.5px #8281813b solid",
                        marginTop: "2%",
                        paddingBottom: "3%"
                      }}
                    >
                      <a
                        href="mailto:contact@myalfred.io"
                        style={{
                          textDecoration: "none",
                          fontSize: "1.1rem",
                          color: "rgb(47, 188, 211)"
                        }}
                      >
                        Signaler l’utilisateur
                      </a>
                    </Grid>
                    {bookingObj === null ||
                    currentUser === null ? null : bookingObj.status ===
                      "Terminée" ? (
                      <Grid
                        container
                        style={{
                          borderBottom: "1.5px #8281813b solid",
                          marginTop: "2%",
                          paddingBottom: "3%"
                        }}
                      >
                        <a
                          href="mailto:contact@myalfred.io"
                          style={{
                            textDecoration: "none",
                            fontSize: "1.1rem",
                            color: "rgb(47, 188, 211)"
                          }}
                        >
                          Réclamation
                        </a>
                      </Grid>
                    ) : null}
                    <Grid
                      container
                      style={{
                        borderBottom: "1.5px #8281813b solid",
                        marginTop: "2%",
                        paddingBottom: "3%"
                      }}
                    >
                      <Link href="/faq">
                        <a
                          style={{
                            textDecoration: "none",
                            fontSize: "1.1rem",
                            color: "rgb(47, 188, 211)"
                          }}
                        >
                          Aide
                        </a>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>

                    {/*/////////////////////////////////////////////////////////////////////////////////////////*/}
                  </Grid>
                </Layout>
                {currentUser.is_alfred === true ?
                <Grid
                    container
                    className={classes.bottombar}
                    justify="center"
                    style={{
                      backgroundColor: "white",
                      bottom: 0,
                      position: "fixed",
                      zIndex: "999"
                    }}
                >
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    <Link href={"/myShop/services"}>
                      <a style={{ textDecoration: "none" }}>
                        <p style={{ color: "white", cursor: "pointer" }}>
                          <img
                              src={"../static/shopping-bag.png"}
                              alt={"sign"}
                              width={25}
                              style={{ opacity: "0.5" }}
                          ></img>
                        </p>
                      </a>
                    </Link>
                  </Grid>

                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    <Link href={"/reservations/messages"}>
                      <a style={{ textDecoration: "none" }}>
                        <p style={{ color: "white", cursor: "pointer" }}>
                          <img
                              src={"../static/speech-bubble.png"}
                              alt={"sign"}
                              width={25}
                              style={{ opacity: "0.7" }}
                          ></img>
                        </p>
                      </a>
                    </Link>
                  </Grid>

              <Grid
                item
                xs={2}
                style={{
                  textAlign: "center",
                  borderBottom: "3px solid #4fbdd7"
                }}
              >
                <Link href={"/reservations/allReservations"}>
                  <a style={{ textDecoration: "none" }}>
                    <p style={{ color: "white", cursor: "pointer" }}>
                      <img
                        src={"../static/event.png"}
                        alt={"sign"}
                        width={25}
                        style={{ opacity: "0.7" }}
                      ></img>
                    </p>
                  </a>
                </Link>
              </Grid>

              <Grid item xs={2} style={{ textAlign: "center", zIndex: 999 }}>
                <Link href={"/myShop/myAvailabilities"}>
                  <a style={{ textDecoration: "none" }}>
                    <p style={{ color: "white", cursor: "pointer" }}>
                      <img
                        src={"../static/calendar.png"}
                        alt={"sign"}
                        width={25}
                        style={{ opacity: "0.7" }}
                      ></img>
                    </p>
                  </a>
                </Link>
              </Grid>

              <Grid item xs={2} style={{ textAlign: "center" }}>
                <Link href={"/performances/revenus"}>
                  <a style={{ textDecoration: "none" }}>
                    <p style={{ color: "white", cursor: "pointer" }}>
                      <img
                        src={"../static/speedometer.png"}
                        alt={"sign"}
                        width={25}
                        style={{ opacity: "0.7" }}
                      ></img>
                    </p>
                  </a>
                </Link>
              </Grid>
            </Grid> : null}



            <Footer />
          </>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(DetailsReservation);
