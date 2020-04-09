import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../hoc/Layout/Layout";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import styles from './comingReservations/comingReservationsStyle';
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
import UserAvatar from '../../components/avatar/UserAvatar';
import Button from '@material-ui/core/Button';


const { config } = require("../../config/config");
const url = config.apiUrl;
moment.locale("fr");


class ComingReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: false,
      user: null,
      alfredReservations: [],
      userReservations: [],
      comingReservations: 0,
      isAlfred: false
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
    );
    axios.get(url + "myAlfred/api/users/current").then(res => {
      let result = res.data
      this.setState({ user: result._id });
      if (res.data.is_alfred === true) {
        this.setState({ isAlfred: true });
      }

      axios.get(url + "myAlfred/api/booking/alfredBooking").then(res => {
        this.setState({ alfredReservations: res.data });

        axios.get(url + "myAlfred/api/booking/userBooking").then(res => {
          this.setState({ userReservations: res.data });

          this.state.alfredReservations.forEach(booking => {
            if (
                booking.status === "Demande d'infos" ||
                booking.status === "En attente de confirmation" ||
                booking.status === "Confirmée" ||
                booking.status === "Pré-approuvée"
            ) {
              this.setState({
                comingReservations: this.state.comingReservations + 1
              });
            }
          });

          this.state.userReservations.forEach(booking => {
            if (
                booking.status === "Demande d'infos" ||
                booking.status === "En attente de confirmation" ||
                booking.status === "Confirmée" ||
                booking.status === "Pré-approuvée"
            ) {
              this.setState({
                comingReservations: this.state.comingReservations + 1
              });
            }
          });
        });
      });
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
              {this.state.isAlfred ? (
                <Grid style={{width: '100%'}}>
                  <NavBarShop userId={this.state.user}/>
                </Grid>
              ) : null}

              {/*/////////////////////////////////////////////////////////////////////////////////////////*/}

              <Grid container>
                <Grid
                    className={classes.toggle}
                    item
                    xs={3}
                >
                  <div className={classes.trigger}></div>
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
                          <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                            Toutes mes réservations
                          </a>
                        </div>
                      </Link>
                    </Grid>
                    <Grid
                        item
                        style={{ marginTop: 30, width: 281 }}
                        className={classes.hidelg}
                    >
                      <Link href={"allReservations"}>
                        <div
                            style={{
                              lineHeight: "4",
                              paddingLeft: 5,
                              paddingRight: 5,
                              display: "flex",
                              justifyContent: "center"
                            }}
                        >
                          <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                            <img
                                src={"../static/calendar-3.svg"}
                                alt={"user"}
                                width={27}
                                height={70}
                                style={{ marginRight: 4 }}
                            />
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
                          <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                            Mes réservations à venir
                          </a>
                        </div>
                      </Link>
                    </Grid>
                    <Grid
                        item
                        style={{ marginTop: 30, width: 281 }}
                        className={classes.hidelg}
                    >
                      <Link href={"comingReservations"}>
                        <div
                            style={{
                              lineHeight: "4",
                              paddingLeft: 5,
                              paddingRight: 5,
                              display: "flex",
                              justifyContent: "center"
                            }}
                        >
                          <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                            <img
                                src={"../static/calendar-6.svg"}
                                alt={"user"}
                                width={27}
                                height={70}
                                style={{ marginRight: 4 }}
                            />
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
                          <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                            Mes réservations terminées
                          </a>
                        </div>
                      </Link>
                    </Grid>
                    <Grid
                        item
                        style={{ marginTop: 30, width: 281 }}
                        className={classes.hidelg}
                    >
                      <Link href={"finishedReservations"}>
                        <div
                            style={{
                              lineHeight: "4",
                              paddingLeft: 5,
                              paddingRight: 5,
                              display: "flex",
                              justifyContent: "center"
                            }}
                        >
                          <a style={{ fontSize: "1.1rem", cursor: "pointer" }}>
                            <img
                                src={"../static/calendar.svg"}
                                alt={"user"}
                                width={27}
                                height={70}
                                style={{ marginRight: 4 }}
                            />
                          </a>
                        </div>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid className={classes.paddresp} item xs={9} sm={9} md={7}>
                  <Typography style={{ fontSize: "2rem", marginTop: "4%" }}>
                    Mes réservations à venir
                  </Typography>
                  <Typography style={{ fontSize: "0.8rem", marginBottom: "4%" }}>
                    Vous avez {this.state.comingReservations} réservations à venir
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
                            cursor: "pointer"
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
                  {/************************************************************ début en tant que user web **************************************************/}

                  {tabs ? (
                      <React.Fragment>
                        {this.state.userReservations.length ? (
                            this.state.userReservations.map((booking, i) => {
                              if (
                                  booking.status === "Confirmée" ||
                                  booking.status === "En attente de confirmation" ||
                                  booking.status === "Demande d'infos" ||
                                  booking.status === "Pré-approuvée"
                              ) {
                                return (
                                    <React.Fragment>
                                      {/* Web */}
                                      <Grid container className={classes.webrow}>
                                        <Grid item xs={2} md={1} className={classes.avatarContainer}>
                                          <UserAvatar user={booking.alfred} />
                                        </Grid>
                                        <Grid item xs={5} md={6} className={classes.descriptionContainer}>
                                          <Grid>
                                            <Typography
                                              style={{
                                                marginTop: "2%",
                                                fontSize: "0.8rem",
                                                color:
                                                  booking.status === "Confirmée"
                                                    ? "#419F41"
                                                    : booking.status ===
                                                    "En attente de confirmation" ||
                                                    booking.status === "Demande d'infos"
                                                    ? "#F87280"
                                                    : booking.status === "Pré-approuvée"
                                                      ? "#F89B72"
                                                      : "#5D5D5D"
                                              }}
                                            >
                                              {booking.status} - {booking.alfred.firstname}
                                            </Typography>
                                          </Grid>
                                         <Grid>
                                           <Typography style={{ color: "#9B9B9B", fontSize: "0.8rem" }}>
                                             {booking.date_prestation} -{" "}
                                             {moment(booking.time_prestation).format(
                                               "HH:mm"
                                             )}
                                           </Typography>
                                         </Grid>
                                          <Grid>
                                            <Typography style={{ color: "#9B9B9B", fontSize: "0.8rem" }}>
                                              {booking.service}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={2} className={classes.priceContainer}>
                                          <Grid>
                                            <Typography style={{color: "#4FBDD7", fontWeight: "600"}}>
                                              {booking.amount.match(/^-?\d+(?:\.\d{0,2})?/)[0]}€
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <Grid>
                                            <Link href={{pathname:"/reservations/detailsReservation", query: { id: booking._id, user: true }}}>
                                              <Button color={"primary"} variant={"outlined"}>Détail</Button>
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
                                              marginTop: "15px"
                                            }}
                                        >
                                          <img
                                              src={`../../${booking.alfred.picture}`}
                                              alt={"picture"}
                                              style={{
                                                width: "80px",
                                                height: "80px",
                                                borderRadius: "50%",
                                                objectFit: "cover"
                                              }}
                                          ></img>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            style={{
                                              textAlign: "center",
                                              fontSize: "0.8rem"
                                            }}
                                        >
                                          <Typography
                                              style={{
                                                marginTop: "2%",
                                                fontSize: "0.8rem",
                                                color:
                                                    booking.status === "Confirmée"
                                                        ? "#419F41"
                                                        : booking.status ===
                                                        "En attente de confirmation" ||
                                                        booking.status === "Demande d'infos"
                                                        ? "#F87280"
                                                        : booking.status === "Pré-approuvée"
                                                            ? "#F89B72"
                                                            : "#5D5D5D"
                                              }}
                                          >
                                            {booking.status} -{" "}
                                            {booking.alfred.firstname}
                                          </Typography>
                                          <Typography
                                              style={{
                                                color: "#9B9B9B",
                                                fontSize: "0.8rem"
                                              }}>
                                            {booking.date_prestation} -{" "}
                                            {moment(booking.time_prestation).format(
                                                "HH:mm"
                                            )}
                                          </Typography>
                                          <Typography
                                              style={{
                                                color: "#9B9B9B",
                                                fontSize: "0.8rem"
                                              }}>
                                            {booking.service}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} style={{}}>
                                          <Typography
                                              style={{
                                                color: "#4FBDD7",
                                                fontWeight: "600",
                                                paddingTop: "5%",
                                                textAlign: "center"
                                              }}
                                          >
                                            {
                                              booking.amount.match(
                                                  /^-?\d+(?:\.\d{0,2})?/
                                              )[0]
                                            }
                                            €
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} style={{}}>

                                          <Link
                                              href={{
                                                pathname:
                                                    "/reservations/detailsReservation",
                                                query: { id: booking._id, user: true }
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
                            booking.status === "Confirmée" ||
                            booking.status === "En attente de confirmation" ||
                            booking.status === "Demande d'infos" ||
                            booking.status === "Pré-approuvée"
                        ) {
                          return (
                              <React.Fragment>
                                {/* Web */}
                                <Grid container className={classes.webrow}>
                                  <Grid item xs={2} md={1} className={classes.avatarContainer}>
                                    <UserAvatar user={booking.user} />
                                  </Grid>
                                  <Grid item xs={5} md={6} className={classes.descriptionContainer}>
                                    <Typography
                                        style={{
                                          marginTop: "2%",
                                          fontSize: "0.8rem",
                                          color:
                                              booking.status === "Confirmée"
                                                  ? "#419F41"
                                                  : booking.status ===
                                                  "En attente de confirmation" ||
                                                  booking.status === "Demande d'infos"
                                                  ? "#F87280"
                                                  : booking.status === "Pré-approuvée"
                                                      ? "#F89B72"
                                                      : "#5D5D5D"
                                        }}
                                    >
                                      {booking.status === "Pré-approuvée"
                                          ? "Invitation à réserver"
                                          : booking.status}{" "}
                                      - {booking.user.firstname}
                                    </Typography>
                                    <Grid>
                                      <Typography style={{ color: "#9B9B9B", fontSize: "0.8rem" }}>
                                        {booking.date_prestation} -{" "}
                                        {moment(booking.time_prestation).format("HH:mm")}
                                      </Typography>
                                    </Grid>
                                   <Grid>
                                     <Typography style={{ color: "#9B9B9B", fontSize: "0.8rem" }}>
                                       {booking.service}
                                     </Typography>
                                   </Grid>
                                  </Grid>
                                  <Grid item xs={2} className={classes.priceContainer}>
                                    <Grid>
                                      <Typography style={{color: "#4FBDD7", fontWeight: "600"}}>
                                        {booking.amount.match(/^-?\d+(?:\.\d{0,2})?/)[0]}€
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <Grid>
                                      <Link href={{pathname: "/reservations/detailsReservation", query: { id: booking._id, user: true }}}>
                                        <Button color={"primary"} variant={"outlined"}>Détail</Button>
                                      </Link>
                                    </Grid>
                                  </Grid>
                                  <hr className={classes.hrSeparator}/>
                                </Grid>

                                {/* Mobile */}
                                <Grid
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
                                      style={{ textAlign: "center", marginTop: "15px" }}
                                  >
                                    <img
                                        src={`../../${booking.user.picture}`}
                                        alt={"picture"}
                                        style={{
                                          width: "80px",
                                          height: "80px",
                                          borderRadius: "50%",
                                          objectFit: "cover",
                                          margin: "auto"
                                        }}
                                    ></img>
                                  </Grid>
                                  <Grid
                                      item
                                      xs={12}
                                      style={{ textAlign: "center", fontSize: "0.8rem" }}
                                  >
                                    <Typography
                                        style={{
                                          fontSize: "0.8rem",
                                          marginTop: "2%",
                                          color:
                                              booking.status === "Confirmée"
                                                  ? "#419F41"
                                                  : booking.status ===
                                                  "En attente de confirmation" ||
                                                  booking.status === "Demande d'infos"
                                                  ? "#F87280"
                                                  : booking.status === "Pré-approuvée"
                                                      ? "#F89B72"
                                                      : "#5D5D5D"
                                        }}
                                    >
                                      {booking.status === "Pré-approuvée"
                                          ? "Invitation à réserver"
                                          : booking.status}{" "}
                                      - {booking.user.firstname}
                                    </Typography>
                                    <Typography style={{ color: "#9B9B9B", fontSize: "0.8rem" }}>
                                      {booking.date_prestation} -{" "}
                                      {moment(booking.time_prestation).format("HH:mm")}
                                    </Typography>
                                    <Typography style={{ color: "#9B9B9B", fontSize: "0.8rem" }}>
                                      {booking.service}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography
                                        style={{
                                          color: "#4FBDD7",
                                          fontWeight: "600",
                                          paddingTop: "5%",
                                          textAlign: "center"
                                        }}
                                    >
                                      {booking.amount.match(/^-?\d+(?:\.\d{0,2})?/)[0]}€
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Link
                                        href={{
                                          pathname: "/reservations/detailsReservation",
                                          query: { id: booking._id, user: true }
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
