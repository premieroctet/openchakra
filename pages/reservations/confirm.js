import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../hoc/Layout/Layout";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";
import Footer from "../../hoc/Layout/Footer/Footer";
import DatePicker, {registerLocale} from "react-datepicker";
import fr from 'date-fns/locale/fr';
import io from "socket.io-client";

registerLocale('fr', fr);


moment.locale("fr");
const _ = require("lodash");
const { config } = require("../../config/config");
const url = config.apiUrl;

const styles = theme => ({
  bigContainer: {
    flexGrow: 1
  },
  grosHR: {
    height: "7px",
    backgroundColor: "#6ec1e4",
    width: "76%",
    float: "left"
  },
  fournitureHR: {
    height: "5px",
    backgroundColor: "#6ec1e4",
    width: "85%",
    float: "left"
  },
  disponibilityHR: {
    height: "5px",
    backgroundColor: "#6ec1e4",
    width: "103%",
    float: "left"
  },
  conditionsHR: {
    height: "5px",
    backgroundColor: "#6ec1e4",
    width: "189%",
    float: "left"
  },
  perimeterHR: {
    height: "5px",
    backgroundColor: "#6ec1e4",
    width: "223%",
    float: "left"
  },
  dispocard: {
    minHeight: "100px",
    width: "200px",
    textAlign: "center",

    boxShadow: "4px 4px 41px -37px rgba(0,0,0,0.0)",
    border: "solid 1px #ccc",
    borderRadius: "10px"
  },
  dispocardin: {
    padding: "1%",
    fontSize: "17px",
    fontWeight: "bold",
    marginBottom: 10
  },

  prestationlist: {
    padding: "1%",

    marginBottom: 10,
    border: "solid 1px #ccc",
    borderRadius: "5px"
  },
  prestationside: {
    backgroundColor: "transparent",
    Border: "0px #ccc solid",
    borderRadius: "10px",
    marginRight: "10px",
    marginLeft: "10px",
    height: "30px"
  },

  dispoheader: {
    height: "2%",
    color: "white",
    width: "100%",
    padding: "1%",

    fontSize: "15px",
    textAlign: "center",

    borderRadius: "0px",
    backgroundColor: "#F8727F",
    marginBottom: "20px"
  }
});

const Input2 = ({value,  onClick }) => (
    <Button value={value} color={"inherit"} variant={"outlined"} style={{color:"gray"}} className="example-custom-input" onClick={onClick}>
      {value}
    </Button>

);

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booking_id: null,
      bookingObj: null,
      date: Date.now(),
      currDate: Date.now(),
      hour: Date.now(),
      hourToSend: Date.now(),
      begin: null,
      end: null,
      minDate: null,
      isToday: false,
      isBookingDate: false
    };
  }

  static getInitialProps({ query: { id } }) {
    return { booking_id: id };
  }

  componentDidMount() {
    const booking_id = this.props.booking_id;
    this.setState({booking_id: booking_id});

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

    axios.get(url + "myAlfred/api/users/current").then(res => {
      this.setState({ currentUser: res.data });
    });

    axios.get(url + 'myAlfred/api/booking/' + booking_id)
        .then(res => {
          this.setState({ bookingObj: res.data })

          const date_prestation = this.state.bookingObj.date_prestation.split('/');
          const day = date_prestation[0];
          const month = date_prestation[1];
          const year = date_prestation[2];
          const end = new Date(moment(year+'-'+month+'-'+day+'T00:00:00.000Z', 'YYYY-MM-DD').startOf('days'));

          this.setState({
            end: end,
            date: end,
            minDate: end,
            begin: end,
            time_prestation: this.state.bookingObj.time_prestation,
            min_time_prestation: this.state.bookingObj.time_prestation,
            hourToSend: moment(new Date(this.state.bookingObj.time_prestation).setHours(new Date(this.state.bookingObj.time_prestation).getHours() + 1)).utc()._d
          })

          let isToday = moment(this.state.currDate).isSame(moment(new Date()), 'day');
          this.setState({
            isToday: isToday
          })

          if (moment(this.state.currDate).isSame(end, 'day')) {
            this.setState({
              isBookingDate: true
            })
          }

          if (moment(this.state.currDate).isAfter(this.state.end)) {
            this.setState({end: this.state.currDate})
          }

          this.socket = io();
          this.socket.on("connect", socket => {
            this.socket.emit("booking", this.state.bookingObj._id)
          })
        })
  }

  changeStatus() {
    const endDate = moment(this.state.end).format('YYYY-MM-DD');
    const endHour = moment(this.state.hourToSend).format('HH:mm');

    const dateObj = { end_date: endDate, end_time: endHour, status: 'Confirmée' };


    if (typeof this.state.bookingObj.end_date !== 'undefined' && typeof this.state.bookingObj.end_time !== 'undefined') {
      axios.put(url + 'myAlfred/api/booking/modifyBooking/' + this.state.booking_id, { status: 'Confirmée' })

          .then(res => {
          this.setState({bookingObj: res.data})
            setTimeout(()=>this.socket.emit("changeStatus", res.data),100)
        })
        .catch(err => console.log(err))
      return null;
    } else {
      axios.put(url + 'myAlfred/api/booking/modifyBooking/' + this.state.booking_id, dateObj)
          .then(res => {
            this.setState({bookingObj: res.data})
            setTimeout(()=>this.socket.emit("changeStatus", res.data),100)
          })
          .catch(err => console.log(err))
    }


  }

  render() {
    const { classes } = this.props;
    const { bookingObj, currentUser } = this.state;

    return (
        <Fragment>
          {this.state.bookingObj === null || currentUser === null ?
              null
              :
              <>
                <Layout>
                  <Grid container className={classes.bigContainer}>
                    <Grid container>
                      <br></br>
                      <Grid
                          item
                          md={5}
                          xs={12}
                          style={{
                            textAlign: "left",
                            margin: "0 auto",
                            float: "right",
                            paddingLeft: "3%"
                          }}
                      >
                        <div
                            style={{ margin: "20px 11%", marginTop: "5%", width: "90%" }}
                        ></div>
                        <Grid container>
                          <Grid
                              item
                              xs={12}
                              style={{ marginTop: 50, marginBottom: 30 }}
                          >
                            <h2
                                style={{
                                  fontSize: "2rem",
                                  color: "rgba(84,89,95,0.95)",
                                  letterSpacing: -1,
                                  fontWeight: "100"
                                }}
                            >
                              Confirmer la réservation de {`${bookingObj.user.firstname} ${bookingObj.user.name}`}{" "}
                            </h2>
                            <hr
                                style={{
                                  width: "100px",
                                  color: "#F87280",
                                  border: "solid 3px #F87280 ",
                                  float: "left",
                                  marginTop: "-10px"
                                }}
                            ></hr>
                          </Grid>
                        </Grid>
                        <br></br>
                        <Grid container>
                          <Grid item xs={5} style={{}}>
                            <img
                                src={`../../${bookingObj.user.picture}`}
                                style={{
                                  borderRadius: "50%",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                  zIndex: 501,
                                  width: "137px",
                                  height: "137px",
                                  objectFit: "cover"
                                }}
                                alt={"picture"}
                            />
                          </Grid>

                          <Grid item xs={5} style={{}}>
                            <h3
                                style={{
                                  fontSize: "1.6rem",
                                  color: "rgba(84,89,95,0.95)",
                                  letterSpacing: -1,
                                  fontWeight: "bold"
                                }}
                            >
                              A propos de {`${bookingObj.user.firstname} ${bookingObj.user.name}`}
                            </h3>
                            <div style={{ marginLeft: "3%" }}>
                              {bookingObj === null ||
                              currentUser === null ? null : currentUser._id ===
                              bookingObj.alfred._id ? (
                                  Math.round(bookingObj.user.score_client) === 0 ? (
                                      <>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                      </>
                                  ) : Math.round(bookingObj.user.score_client) ===
                                  1 ? (
                                      <>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                      </>
                                  ) : Math.round(bookingObj.user.score_client) ===
                                  2 ? (
                                      <>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                      </>
                                  ) : Math.round(bookingObj.user.score_client) ===
                                  3 ? (
                                      <>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                      </>
                                  ) : Math.round(bookingObj.user.score_client) ===
                                  4 ? (
                                      <>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-regular.png"
                                        ></img>
                                      </>
                                  ) : Math.round(bookingObj.user.score_client) ===
                                  5 ? (
                                      <>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                        <img
                                            style={{
                                              width: "20px",
                                              marginRight: "3px",
                                              marginBottom: "5px"
                                            }}
                                            src="../../static/stars/star-solid.png"
                                        ></img>
                                      </>
                                  ) : (
                                      <p>Erreur lors du chargement du score</p>
                                  )
                              ) : Math.round(bookingObj.alfred.score) === 0 ? (
                                  <>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                  </>
                              ) : Math.round(bookingObj.alfred.score) === 1 ? (
                                  <>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                  </>
                              ) : Math.round(bookingObj.alfred.score) === 2 ? (
                                  <>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                  </>
                              ) : Math.round(bookingObj.alfred.score) === 3 ? (
                                  <>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                  </>
                              ) : Math.round(bookingObj.alfred.score) === 4 ? (
                                  <>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-regular.png"
                                    ></img>
                                  </>
                              ) : Math.round(bookingObj.alfred.score) === 5 ? (
                                  <>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                    <img
                                        style={{
                                          width: "20px",
                                          marginRight: "3px",
                                          marginBottom: "5px"
                                        }}
                                        src="../../static/stars/star-solid.png"
                                    ></img>
                                  </>
                              ) : (
                                  <p>Erreur lors du chargement du score</p>
                              )}

                              <Grid style={{ marginLeft: "4%" }} container>
                                <Grid item xs={2}>
                                  <img
                                      style={{ width: "15px" }}
                                      src="../../static/stars/star-solid.png"
                                  ></img>
                                </Grid>
                                <Grid item xs={10}>
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
                                          <Grid item xs={2}>
                                            <img
                                                style={{ width: "15px" }}
                                                src="../../static/statut/oui.png"
                                            ></img>
                                          </Grid>
                                          <Grid item xs={10}>
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
                                      <Grid item xs={2}>
                                        <img
                                            style={{ width: "15px" }}
                                            src="../../static/statut/oui.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10}>
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
                                      <Grid item xs={2}>
                                        <img
                                            style={{ width: "15px" }}
                                            src="../../static/statut/calendar.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10}>
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
                                      <Grid item xs={2}>
                                        <img
                                            style={{ width: "15px" }}
                                            src="../../static/statut/calendar.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10}>
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
                                      <Grid item xs={2}>
                                        <img
                                            style={{ width: "15px" }}
                                            src="../../static/statut/beaver.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10}>
                                        <Typography
                                            style={{
                                              fontSize: "0.8rem",
                                              marginLeft: "-5%"
                                            }}
                                        >
                                          Est également Alfred{" "}
                                        </Typography>
                                      </Grid>
                                    </>
                                ) : null}

                                {bookingObj === null ||
                                currentUser === null ? null : currentUser._id ===
                                bookingObj.alfred._id ? (
                                    <>
                                      <Grid item xs={2}>
                                        <img
                                            style={{ width: "15px" }}
                                            src="../../static/statut/chat.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10}>
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
                                      <Grid item xs={2}>
                                        <img
                                            style={{ width: "15px" }}
                                            src="../../static/statut/chat.png"
                                        ></img>
                                      </Grid>
                                      <Grid item xs={10}>
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
                            <Grid item xs={2} style={{}}></Grid>
                            <Grid item xs={10} style={{}}></Grid>
                          </Grid>
                        </Grid>

                        <div style={{ marginTop: "8%" }}>
                          <hr></hr>

                          <Grid container>
                            <Grid item xs={12} style={{}}>
                              <h3
                                  style={{
                                    fontSize: "1.6rem",
                                    color: "rgba(84,89,95,0.95)",
                                    letterSpacing: -1,
                                    fontWeight: "bold"
                                  }}
                              >
                                Détail de la réservation
                              </h3>
                              <Grid xs={12} style={{}}>
                                <Grid
                                    item
                                    xs={9}
                                    style={{ width: "90%", float: "left" }}
                                >
                                  <h4>{bookingObj.service}</h4>
                                </Grid>
                                {bookingObj.prestations.map(prestation => {
                                  return (
                                      <>
                                        <Grid
                                            item
                                            xs={9}
                                            style={{ width: "90%", float: "left" }}
                                        >
                                          <p>{prestation.value}X {prestation.name}</p>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={3}
                                            style={{ width: "10%", float: "right" }}
                                        >
                                          <p>{prestation.price}€</p>
                                        </Grid>
                                      </>
                                  )
                                })}
                                {typeof bookingObj.option === 'undefined' ?
                                    null
                                    :
                                    <>
                                      <Grid
                                          item
                                          xs={9}
                                          style={{ width: "90%", float: "left" }}
                                      >
                                        <p>{bookingObj.option.label}</p>
                                      </Grid>
                                      <Grid
                                          item
                                          xs={3}
                                          style={{ width: "10%", float: "right" }}
                                      >
                                        {" "}
                                        <p>{bookingObj.option.price}€</p>
                                      </Grid>
                                    </>
                                }

                                <br></br>

                                <Grid
                                    item
                                    xs={9}
                                    style={{ width: "90%", float: "left" }}
                                >
                                  <p>Frais de service</p>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    style={{ width: "10%", float: "right" }}
                                >
                                  {" "}
                                  <p>{bookingObj.fees}€</p>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} style={{}}>
                                <hr></hr>
                                <h3
                                    style={{
                                      fontSize: "1.6rem",
                                      color: "rgba(84,89,95,0.95)",
                                      letterSpacing: -1,
                                      fontWeight: "bold"
                                    }}
                                >
                                  Planning de la réservation
                                </h3>
                                <br></br>
                                <p>
                                  Afin de mettre à jour votre calendrier et donner de la
                                  visibilité à votre client sur la réalisation de la
                                  prestation, le planning de la réservation doit être
                                  mis à jour. Si votre réservation se réalise sur un
                                  seul créneau, renseignez l’heure de fin. Si votre
                                  prestation se réalise en plusieurs créneaux (peinture,
                                  cours etc.), échangez avec votre client sur un
                                  planning et des créneaux horaires pour cette
                                  prestation.
                                </p>
                                <br></br>
                                <Grid
                                    item
                                    xs={3}
                                    style={{
                                      width: "25%",
                                      float: "left",
                                      paddingTop: 15
                                    }}
                                >
                                  <img
                                      src="../../static/calendarreservation.svg"
                                      width={"35%"}
                                  />
                                </Grid>
                                <Grid item xs={9} style={{ width: "70%" }}>
                                  <p>Adresse de la prestation:</p>{" "}
                                  <p>{bookingObj.address.address}, {bookingObj.address.city} {bookingObj.address.zip_code}</p>
                                </Grid>
                              </Grid>
                              <Grid item xs={12} style={{}}>
                                <Grid
                                    item
                                    xs={3}
                                    style={{
                                      width: "25%",
                                      float: "left",
                                      paddingTop: 15
                                    }}
                                >
                                  <img src="../../static/mapmarker.svg" width={"35%"} />
                                </Grid>
                                <Grid item xs={5} style={{ width: "50%", display: 'inline-block' }}>
                                  <p>Date de début:</p> <p>{bookingObj.date_prestation} - {moment(bookingObj.time_prestation).format('HH:mm')}</p>
                                </Grid>
                                {typeof bookingObj.end_date !== 'undefined' && typeof bookingObj.end_time !== 'undefined' ?
                                    <Grid item xs={4} style={{ width: "50%", display: 'inline-block' }}>
                                      <p>Date de fin:</p> <p>{moment(bookingObj.end_date).format('DD/MM/YYYY')} - {bookingObj.end_time}</p>
                                    </Grid>
                                    :
                                    null
                                }
                                {typeof this.state.bookingObj.end_date === 'undefined' && typeof this.state.bookingObj.end_time === 'undefined' ?
                                    typeof this.state.end === null ? null :

                                        <Grid item xs={6} style={{ width: "50%", display: 'inline-block' }}>
                                      <p>Date de fin:</p> <DatePicker
                                        selected={moment(this.state.end).isAfter(this.state.currDate) ? this.state.end : this.state.currDate}
                                        onChange={date => {
                                          let isToday = moment(date).isSame(moment(new Date()), 'day');
                                          this.setState({
                                            end:date,
                                            isToday: isToday,
                                          }, () => {
                                            this.setState({
                                              hourToSend: moment(this.state.begin).isSame(this.state.end, 'day') ? moment(new Date(this.state.time_prestation).setHours(new Date(this.state.time_prestation).getHours() + 1)).utc()._d : moment(this.state.currDate).utc()._d
                                            })

                                          })
                                        }}
                                        customInput={<Input2 />}
                                        locale='fr'
                                        showMonthDropdown
                                        dateFormat="dd/MM/yyyy"
                                        minDate={this.state.begin}
                                    /> - {<DatePicker
                                            selected={moment(this.state.begin).isSame(this.state.end, 'day') ? new Date(this.state.time_prestation).setHours(new Date(this.state.time_prestation).getHours() + 1) : this.state.currDate}
                                        onChange={
                                          moment(this.state.begin).isSame(this.state.end, 'day') ?
                                              (date) => this.setState({
                                                time_prestation: moment(date.setHours(date.getHours() - 1)).utc()._d,
                                                hour: date,
                                                hourToSend: moment(date.setHours(date.getHours() + 1)).utc()._d
                                              })
                                              :
                                              (date) => this.setState({
                                                currDate: date,
                                                hour: date,
                                                hourToSend: date
                                              })

                                        }

                                          customInput={<Input2 />}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        minTime={moment(this.state.begin).isSame(this.state.end, 'day') ? new Date(this.state.min_time_prestation).setHours(new Date(this.state.min_time_prestation).getHours() + 1) : this.state.isToday ? this.state.currDate : null}
                                        maxTime={moment(this.state.begin).isSame(this.state.end, 'day') || this.state.isToday ? moment().endOf('day').toDate() : null}
                                        timeCaption="Heure"
                                        dateFormat="HH:mm"
                                        locale='fr'
                                        minDate={new Date()}
                                    />}
                                    </Grid>

                                :
                                null}

                              </Grid>
                            </Grid>
                          </Grid>
                        </div>

                        <Grid style={{ float: "right" }} item xs={12}>
                          {" "}
                          <Link href={{pathname: '/reservations/detailsReservation', query: { id: this.state.booking_id }}}>
                            <Button
                                color={"secondary"}
                                variant={"contained"}
                                onClick={() => this.changeStatus()}
                                style={{
                                  color: "white",
                                  fontSize: "16px",
                                  width: "100%",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  marginBottom: 50,
                                  marginRight: 20
                                }}
                            >
                              Confirmer
                            </Button>
                          </Link>
                        </Grid>

                        {/*cadre avec couleur et checkbox*/}
                      </Grid>

                      {/*Contenu à droite*/}
                      <Grid
                          item
                          xs={12}
                          md={7}
                          style={{ marginTop: "2%", marginBottom: "5%" }}
                      >
                        <Grid
                            container
                            style={{
                              backgroundImage: `url('../../static/resa.svg')`,
                              backgroundPosition: "cover",
                              backgroundRepeat: "no-repeat",
                              border: "thin solid transparent",
                              maxWidth: "100%",
                              height: "90vh",
                              padding: "2%",
                              position: "sticky",
                              top: 100
                            }}
                        ></Grid>{" "}
                      </Grid>
                    </Grid>{" "}
                  </Grid>
                </Layout>
              </>
          }
        </Fragment>
    );
  }
}

export default withStyles(styles)(Confirm);
