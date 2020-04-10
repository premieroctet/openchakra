import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../hoc/Layout/Layout";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import moment from "moment";
import getDistance from "geolib/es/getDistance";
import convertDistance from "geolib/es/convertDistance";
import UserAvatar from '../../components/Avatar/UserAvatar';
import io from "socket.io-client";
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
import styles from './detailsReservation/detailsReservationStyle'
import About from '../../components/About/About';
import Button from '@material-ui/core/Button';


moment.locale("fr");

const { config } = require("../../config/config");
const url = config.apiUrl;

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
      splitAddress: null,
      categoryLabel: ''
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
      this.setState({ currentUser: result });
    }).catch(error => {
      console.log(error)
    });

    axios.get(url + "myAlfred/api/booking/" + booking_id).then(res => {
      this.setState(
        {
          bookingObj: res.data,
          alfredId: res.data.user._id
        },
      );

      if(this.state.bookingObj.serviceUserId){
        axios.get(`/myAlfred/api/serviceUser/${this.state.bookingObj.serviceUserId}`).then(res =>{
          let resultat = res.data;
          this.setState({category : resultat.service.category}, () =>
            axios.get(`/myAlfred/api/category/${this.state.category}`).then(res =>{
              this.setState({categoryLabel: res.data.label})
            })
          )
        }).catch(error =>{
          console.log(error)
        })
      }

      this.setState({ splitAddress: this.state.bookingObj.address.address.split(' ')})

      this.socket = io();
      this.socket.on("connect", socket => {
        this.socket.emit("booking", this.state.bookingObj._id)
      });
      this.socket.on("displayStatus", data => {
        this.setState({bookingObj: data})
    })
  }).catch(error => {
    console.log(error)
    })
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
    const { bookingObj, splitAddress, currentUser, categoryLabel } = this.state;

    return (
        <Fragment>
          {/*<Layout>*/}
          {bookingObj === null ||
          currentUser === null || splitAddress === null ? null : currentUser._id !==
          bookingObj.alfred._id && currentUser._id !== bookingObj.user._id ? (
              <p>Vous n'avez pas l'autorisation d'accéder à cette page</p>
          ) : (
              <Grid>
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

                        <Grid container className={classes.mobilerow} style={{marginTop: "5%", justifyContent: 'space-between', alignItems: 'center'}}>
                          <Grid item xs={3} md={1}>
                            {bookingObj === null ||
                            currentUser === null ? null : currentUser._id ===
                            bookingObj.alfred._id ? (
                                <UserAvatar user={bookingObj.user} className={classes.avatarLetter}/>
                            ) : (
                                <UserAvatar user={bookingObj.alfred} className={classes.avatarLetter}/>
                            )}
                          </Grid>
                          <Grid item xs={5} md={7}>
                            <Grid>
                              <Typography
                                style={{fontSize: "1.7rem" }}
                              >
                                {bookingObj === null || currentUser === null ? null : currentUser._id === bookingObj.alfred._id ? (
                                  <span>{`${bookingObj.user.firstname} ${bookingObj.user.name}`}</span>
                                ) : <span>{`${bookingObj.alfred.firstname} ${bookingObj.alfred.name}`}</span> }
                              </Typography>
                            </Grid>
                            <Grid style={{ marginTop: "2%"}}>
                              <Typography style={{fontSize: "0.8rem" }}>
                                Réservation {bookingObj.service} le{" "}
                                {bookingObj === null
                                  ? null
                                  : bookingObj.date_prestation}
                              </Typography>
                            </Grid>
                            <Grid style={{ marginTop: "2%"}}>
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
                                    ? (bookingObj.amount - bookingObj.fees * 2).toFixed(2)
                                    : bookingObj.amount.match(/^-?\d+(?:\.\d{0,2})?/)[0]}
                                €
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={2} style={{ textAlign: "center" }}>
                            <div style={{ marginTop: "5%" }}>
                              <Grid>
                                <img style={{width: 40, height : 40}} alt={"adresse"} title={"adresse"} src={'../../static/assets/img/userServicePreview/adresse.svg'}/>
                              </Grid>
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
                        <hr className={classes.hrSeparator}/>
                        <Grid container style={{borderBottom: "1.5px #8281813b solid", marginTop: "5%", paddingBottom: "7%", alignItems: 'center'}}>
                          <Grid item xs={12} md={7}>
                            <About alfred={bookingObj.user._id}/>
                          </Grid>
                          <Grid item style={{ textAlign: "center"}}>
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
                            <Button variant={"outlined"} color={"primary"}>Envoyer un message</Button>
                              </Link>
                            {bookingObj === null ? null : bookingObj.status ===
                            "Confirmée" ? (
                                <Grid>
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
                                </Grid>
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
                        <Grid container style={{ borderBottom: "1.5px #8281813b solid", marginTop: "5%", paddingBottom: "7%" }}>
                          <Grid item xs={12}>
                            <Typography style={{fontSize: "1.7rem", marginBottom: "5%"}}>
                              A propos de votre réservation
                            </Typography>
                          </Grid>
                          <Grid style={{display: 'flex', width: '100%', justifyContent : 'space-between'}}>
                            <Grid item>
                              <Grid container>
                                <Grid style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                  <Grid item style={{ textAlign: "center" }}>
                                    <Grid style={{width: 150}} >
                                      <img style={{width: 60, height :60}} alt={"commentary"} title={"commentary"} src={'../../static/assets/img/userServicePreview/calendrier.svg'}/>
                                    </Grid>
                                  </Grid>
                                  <Grid item style={{ paddingLeft: "3%" }}>
                                    <Typography>
                                      {bookingObj === null
                                        ? null
                                        : `${bookingObj.date_prestation} - ${moment(bookingObj.time_prestation).format('HH:mm')}`}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                  <Grid item style={{ textAlign: "center", marginTop: "3%" }}>
                                    <Grid style={{width: 150}}>
                                      <img style={{width: '100%', height : '100%'}} alt={categoryLabel} title={categoryLabel} src={`../../static/assets/img/castorJobs/${categoryLabel}.svg`}/>
                                    </Grid>
                                  </Grid>
                                  <Grid item style={{ paddingLeft: "3%", marginTop: "3%", width: '100%' }}>
                                    <Grid>
                                      <p>{bookingObj.service}</p>
                                    </Grid>
                                    <Grid>
                                      <Grid style={{width : '100%', display : 'flex'}}>
                                        <Grid style={{marginRight: 10}}>
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
                                                  {prestation.value} x
                                                </Typography>
                                              );
                                            })}
                                        </Grid>
                                        <Grid >
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
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item style={{display:'flex', alignItems: 'center'}}>
                              <Grid container>
                                {bookingObj === null ||
                                currentUser === null ? null : bookingObj.status ===
                                "En attente de confirmation" ? (
                                  currentUser._id === bookingObj.alfred._id ? (
                                    <Grid style={{display:'flex',flexDirection: 'column', alignItems: 'center'}}>
                                      <Grid style={{marginBottom: 10}}>
                                        <Typography>
                                          Votre réservation doit être confirmée avant le{" "}
                                          {moment(bookingObj.date)
                                            .add(1, "d")
                                            .format("DD/MM/YYYY")}{" "}
                                          à {moment(bookingObj.date).format("HH:mm")}
                                        </Typography>
                                      </Grid>
                                      <Grid style={{marginBottom: 10}}>
                                        <Link
                                          href={{
                                            pathname: "/reservations/confirm",
                                            query: { id: this.state.booking_id }
                                          }}
                                        >
                                          <Button variant={"contained"} className={classes.buttonConfirm}>Confirmer la réservation</Button>
                                        </Link>
                                      </Grid>
                                      <Grid>
                                        <Button variant={"outlined"} color={'primary'} onClick={() => this.changeStatus('Refusée')}>Refuser</Button>
                                      </Grid>
                                    </Grid>
                                  ) : (
                                    <p>En attente de confirmation</p>
                                  )
                                ) : bookingObj.status === "Demande d'infos" &&
                                currentUser._id === bookingObj.alfred._id ? (
                                  <Grid>
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
                                  </Grid>
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
                        </Grid>
                        <Grid container style={{borderBottom: "1.5px #8281813b solid", marginTop: "5%", paddingBottom: "7%"}}>
                          <Grid item xs={12}>
                            <Typography style={{ fontSize: "1.4rem" }}>
                              Matériel fourni
                            </Typography>
                          </Grid>
                          {bookingObj === null ? null : bookingObj.equipments
                              .length ? (
                              bookingObj.equipments.map(equipment => {
                                return (
                                    <Grid item xs={1} style={{ textAlign: "center" }}>
                                      <img
                                        alt={equipment.logo}
                                        title={equipment.logo}
                                          style={{ width: "98%" }}
                                          src={`../../static/equipments/${equipment.logo.slice(0,-4)}_Selected.svg`}
                                      />
                                    </Grid>
                                );
                              })
                          ) : (
                              <p>Aucun équipement fourni</p>
                          )}
                        </Grid>
                    <Grid container style={{borderBottom: "1.5px #8281813b solid", marginTop: "5%", paddingBottom: "7%"}}>
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
                      <Grid container style={{display: 'flex', flexDirection: 'column',}}>
                        <Grid  style={{display: 'flex', marginTop:'5%', width: '70%', justifyContent: 'space-between'}}>
                          <Grid item>
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
                          <Grid item>
                            {bookingObj === null
                              ? null
                              : bookingObj.prestations.map(prestation => {
                                return (
                                  <Typography style={{fontSize: "1.1rem", textAlign: "center"}}>
                                    {(prestation.value * prestation.price).toFixed(2)}€
                                  </Typography>
                                );
                              })}
                          </Grid>
                        </Grid>
                        {bookingObj.fees !== 0 ?
                        <Grid  style={{display: 'flex', width: '70%', justifyContent: 'space-between'}}>
                          <Grid item>
                            <Typography style={{fontSize: "1.1rem", marginTop: "10px"}}>
                              Frais de service
                            </Typography>
                          </Grid>
                          <Grid item >

                              <Typography style={{fontSize: "1.1rem", textAlign: "center", marginTop: "10px"}}>
                                {bookingObj === null || currentUser === null ? null : currentUser._id === bookingObj.alfred._id ? (
                                  <span>- {bookingObj.fees.toFixed(2)}</span>
                                ) : (
                                  <span>+ {bookingObj.fees.toFixed(2)}</span>
                                )}
                                €
                              </Typography>
                          </Grid>
                        </Grid>
                          : null
                        }
                        <Grid style={{display: 'flex', width: '70%', justifyContent: 'space-between', marginTop: '5%'}}>
                          <Grid item>
                            <Typography style={{fontSize: "1.5rem", fontWeight: "bold", color: "rgb(47, 188, 211)", marginTop: "10px"}}>
                              Revenu total
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography style={{fontSize: "1.5rem", fontWeight: "bold", color: "rgb(47, 188, 211)", textAlign: "center", marginTop: "10px"}}>
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
                      </Grid>
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
                {currentUser.is_alfred === true ?
                  <NavbarMobile userId={this.state.userId}/>
                : null}
          </Grid>
        )}
          {/*</Layout>*/}
      </Fragment>
    );
  }
}

export default withStyles(styles)(DetailsReservation);
