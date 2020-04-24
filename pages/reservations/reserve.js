import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../hoc/Layout/Layout";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import {registerLocale} from "react-datepicker";
import fr from 'date-fns/locale/fr';
import io from "socket.io-client";
const _ = require("lodash");
registerLocale('fr', fr);
moment.locale("fr");
import styles from '../reserve/reserveStyle'
import About from '../../components/About/About';
import UserAvatar from '../../components/Avatar/UserAvatar';
import BookingDetail from '../../components/BookingDetail/BookingDetail';


class Reserve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booking_id: null,
      date: Date.now(),
      hour: Date.now(),
      user: null,
      currentUser: null,
      emitter: null,
      recipient: null,
      bookingObj: null,
      city: null,
      address: null,
      zip_code: null,
      prestations: [],
      pick_tax: null,
      travel_tax: null,
      total: 0,
      fees: null,
      grandTotal: null,
      checkedOption: false,
      optionPrice: null,
      languages: [],
      alfredId: ''
    };
  }

  static getInitialProps({ query: { id } }) {
    return { booking_id: id };
  }

  componentDidMount() {
    const booking_id = this.props.booking_id;
    this.setState({booking_id: booking_id});
    const bookingObj = JSON.parse(localStorage.getItem("bookingObj"));

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

    axios.get("/myAlfred/api/users/current").then(res => {
      this.setState({ currentUser: res.data });
    });

    this.setState({
      emitter: localStorage.getItem("emitter"),
      recipient: localStorage.getItem("recipient"),
      prestations: bookingObj.prestations,
      bookingObj: bookingObj,
      city: bookingObj.address.city,
      address: bookingObj.address.address,
      zip_code: bookingObj.address.zip_code,
      date: bookingObj.date_prestation,
      hour: bookingObj.time_prestation,
      travel_tax: bookingObj.travel_tax,
      pick_tax: bookingObj.pick_tax,
      fees: bookingObj.fees,
      grandTotal: bookingObj.amount,
      alfredId: bookingObj.alfred._id
    });

    axios.get('/myAlfred/api/booking/' + booking_id)
        .then(res => {
          this.setState({ bookingObj: res.data })

          this.socket = io();
          this.socket.on("connect", socket => {
            this.socket.emit("booking", this.state.bookingObj._id)
          })
        })
  }

  changeStatus() {
    const endDate = moment(this.state.date).format('DD/MM/YYYY');
    const endHour = moment(this.state.hour).format('HH:mm');
    const dateObj = { end_date: endDate, end_time: endHour, status: 'Pré-approuvée' };



    axios.put('/myAlfred/api/booking/modifyBooking/' + this.state.booking_id, dateObj)
            .then(res => {
              this.setState({bookingObj: res.data});
              setTimeout(()=>this.socket.emit("changeStatus", res.data),100)
            })
            .catch()
  }

  computePricedPrestations(){
    var result={};
    const count=this.state.count;
    this.state.prestations.forEach( p => {
      result[p.name]=p.price*p.value;
    })
    return result;
  }

  computeCountPrestations(){
    var result={};
    this.state.prestations.forEach( p => {
      result[p.name]=p.value;
    })
    return result;
  }

  render() {
    const { classes } = this.props;
    const { bookingObj, currentUser } = this.state;
    console.log(bookingObj, 'booiking')

    const pricedPrestations=this.computePricedPrestations();
    const countPrestations=this.computeCountPrestations();

    return (
      <Fragment>
        {this.state.bookingObj === null || this.state.currentUser === null ?
          null
          :
          <Grid>
            <Layout>
            <Grid container className={classes.bigContainer}>
              <Grid container>
                <Grid item md={5} xs={12} className={classes.leftContainer}>
                  <Grid container>
                    <Grid item xs={12} className={classes.marginItemContainer}>
                      <h2 className={classes.h2Style}>
                        Détails de votre réservation{" "}
                      </h2>
                    </Grid>
                  </Grid>
                  <Grid container  className={classes.containerAboutAndAvatar}>
                    <Grid item className={classes.marginContainerAvatar}>
                      <div style={{ width:'100%' }}>
                        <About alfred={bookingObj.alfred._id} profil={false}/>
                      </div>
                    </Grid>
                    <Grid item className={classes.containerAvatar}>
                      <Grid item>
                        <UserAvatar classes={'avatarLetter'} user={bookingObj.alfred} className={classes.avatarLetter} />
                        <Typography style={{marginTop:20}} className={classes.textAvatar}>{bookingObj.alfred.firstname}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <div style={{ marginTop: "8%" }}>
                    <hr></hr>
                    <Grid container>
                      <Grid item xs={12}>
                        <h3 className={classes.h3Style}>
                          Détail de la réservation
                        </h3>
                        <BookingDetail prestations={pricedPrestations} count={countPrestations} total={this.state.grandTotal} client_fee={this.state.fees} travel_tax={this.state.travel_tax} pick_tax={this.state.pick_tax}/>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12}>
                          <hr></hr>
                          <Grid item xs={3} style={{ width: "25%", float: "left", paddingTop: 15 }} >
                            <Grid item>
                              <Grid>
                                <img style={{width: 40, height : 40}} alt={"calendrier"} title={"calendrier"} src={'../../static/assets/img/userServicePreview/calendrier.svg'}/>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={9} style={{ width: "70%" }}>
                            <p>Adresse de la prestation:</p>{" "}
                            <p>{bookingObj.address.address}, {bookingObj.address.city} {bookingObj.address.zip_code}</p>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} style={{}}>
                          <Grid item xs={3} style={{ width: "25%", float: "left", paddingTop: 15 }} >
                            <Grid item>
                              <Grid>
                                <img style={{width: 40, height : 40}} alt={"adresse"} title={"adresse"} src={'../../static/assets/img/userServicePreview/adresse.svg'}/>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={5} style={{ width: "50%", display: 'inline-block' }}>
                            <p>Date de début:</p> <p>{bookingObj.date_prestation} - {moment(bookingObj.time_prestation).format('HH:mm')}</p>
                          </Grid>
                          {typeof bookingObj.end_date !== 'undefined' && typeof bookingObj.end_time !== 'undefined' ? <Grid item xs={4} style={{ width: "50%", display: 'inline-block' }}>
                            <p>Date de fin:</p> <p>{moment(bookingObj.end_date).format('DD/MM/YYYY')} - {bookingObj.end_time}</p>
                          </Grid> : null}
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>

                  <Grid style={{ float: "right" }} item xs={12}>
                    {" "}
                    <Link href={{pathname: '/paymentChoice', query: { id: bookingObj._id, total: bookingObj.amount,fees: bookingObj.fees }}}>
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
                        Réserver
                      </Button>
                    </Link>
                  </Grid>

                  {/*cadre avec couleur et checkbox*/}
                </Grid>

                {/*Contenu à droite*/}
                <Grid item xs={12} md={7} style={{ marginTop: "2%", marginBottom: "5%" }} >
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
        </Grid>
        }
      </Fragment>
    );
  }
}

export default withStyles(styles)(Reserve);
