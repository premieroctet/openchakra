import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../hoc/Layout/Layout";
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

class Preapprouve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booking_id: null,
      bookingObj: null,
      date: Date.now(),
      hour: Date.now(),
      end: null
    };
  }

  static getInitialProps({ query: { id } }) {
    return { booking_id: id };
  }

  componentDidMount() {

    const booking_id = this.props.booking_id;
    this.setState({booking_id: booking_id});

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.get(url + 'myAlfred/api/booking/' + booking_id)
        .then(res => {
          this.setState({ bookingObj: res.data })

          const date_prestation = this.state.bookingObj.date_prestation.split('/');
          const day = date_prestation[0];
          const month = date_prestation[1];
          const year = date_prestation[2];
          const end = moment(year+'-'+month+'-'+day+'T00:00:00.000Z');

          this.setState({end: end._i, date: new Date(end._i)})

          this.socket = io("http://localhost:3000");
          this.socket.on("connect", socket => {
            this.socket.emit("booking", this.state.bookingObj._id)
          })
        })
  }

  changeStatus() {
    const endDate = moment(this.state.date).format('DD/MM/YYYY');
    const endHour = moment(this.state.hour).format('HH:mm');

    const dateObj = { end_date: endDate, end_time: endHour, status: 'Pré-approuvée' };
    console.log(endDate, endHour)

    axios.put(url + 'myAlfred/api/booking/modifyBooking/' + this.state.booking_id, dateObj)
            .then(res => {
              this.setState({ 
                bookingObj: res.data 
              }, this.socket.emit("changeStatus", res.data))
            })
            .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props;
    const { bookingObj } = this.state;

    return (
      <Fragment>
        {this.state.bookingObj === null ?
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
                          minWidth: "137px",
                          maxWidth: "137px",
                          maxHeight: "137px",
                          minHeight: "137px"
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
                            prestation. Renseignez les en indiquant l’heure de fin
                            du premier créneau et en ajoutant les suivants en
                            cliquant sur « Ajouter un nouveau créneau ».
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
                          <Grid item xs={6} style={{ width: "50%", display: 'inline-block' }}>
                            <p>Heure de début:</p> <p>{bookingObj.date_prestation} - {bookingObj.time_prestation}</p>
                          </Grid>
                          {typeof this.state.end === null ? null :
                            <Grid item xs={6} style={{ width: "50%", display: 'inline-block' }}>
                            <p>Heure de fin:</p> <DatePicker
                                            selected={new Date(this.state.end)}
                                            onChange={(date)=>this.setState({date:date})}
                                            customInput={<Input2 />}
                                            locale='fr'
                                            showMonthDropdown
                                            dateFormat="dd/MM/yyyy"
                                            minDate={new Date(this.state.end)}
                                        /> - <DatePicker
                                        selected={this.state.hour}
                                        onChange={(date)=>this.setState({hour:date})}
                                        customInput={<Input2 />}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Heure"
                                        dateFormat="HH:mm"
                                        locale='fr'
                                        minDate={new Date()}
                                    />
                          </Grid>
                          }
                  
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
                        Pré-approuver
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
          <Footer />
        </>
        }
      </Fragment>
    );
  }
}

export default withStyles(styles)(Preapprouve);
