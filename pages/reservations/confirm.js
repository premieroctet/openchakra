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
import About from '../../components/About/About';
import UserAvatar from '../../components/Avatar/UserAvatar';
import BookingDetail from '../../components/BookingDetail/BookingDetail';
registerLocale('fr', fr);
moment.locale("fr");
const _ = require("lodash");

const styles = theme => ({
  bigContainer: {
    flexGrow: 1
  },
  avatarLetter:{
    height: 100,
    width: 100,
    margin: 'auto',
    fontSize: 'xx-large',
  },
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

    axios.get("/myAlfred/api/users/current").then(res => {
      this.setState({ currentUser: res.data });
    });

    axios.get('/myAlfred/api/booking/' + booking_id)
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
      axios.put('/myAlfred/api/booking/modifyBooking/' + this.state.booking_id, { status: 'Confirmée' })

          .then(res => {
          this.setState({bookingObj: res.data})
            setTimeout(()=>this.socket.emit("changeStatus", res.data),100)
        })
        .catch(err => console.log(err))
      return null;
    } else {
      axios.put('/myAlfred/api/booking/modifyBooking/' + this.state.booking_id, dateObj)
          .then(res => {
            this.setState({bookingObj: res.data})
            setTimeout(()=>this.socket.emit("changeStatus", res.data),100)
          })
          .catch(err => console.log(err))
    }
  }

  computePricedPrestations(){
    var result={};
    if (this.state.bookingObj) {
      this.state.bookingObj.prestations.forEach( p => {
        result[p.name]=p.price*p.value;
      })
    }
    return result;
  }

  computeCountPrestations(){
    var result={};
    if (this.state.bookingObj) {
      this.state.bookingObj.prestations.forEach( p => {
        result[p.name]=p.value;
      })
    }
    return result;
  }

  render() {
    const { classes } = this.props;
    const { bookingObj, currentUser } = this.state;

    const pricedPrestations=this.computePricedPrestations();
    const countPrestations=this.computeCountPrestations();

    const amount= this.state.bookingObj ? parseFloat(this.state.bookingObj.amount)-this.state.bookingObj.fees : 0;

    return (
        <Fragment>
          {this.state.bookingObj === null || currentUser === null ?
              null
              :
              <>
                <Layout>
                  <Grid container className={classes.bigContainer}>
                    <Grid container>
                      <Grid item md={5} xs={12} style={{textAlign: "left", margin: "0 auto", float: "right", paddingLeft: "3%"}}>
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
                          </Grid>
                        </Grid>
                        <Grid container >
                          <Grid item>
                            <div style={{ marginLeft: "3%", width:'100%' }}>
                              <About alfred={bookingObj.user._id} profil={false}/>
                            </div>
                          </Grid>
                          <Grid item xs={5} >
                            <Grid item style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                              <UserAvatar classes={'avatarLetter'} user={bookingObj.user} className={classes.avatarLetter} />
                              <Typography style={{marginTop:20}} className={classes.textAvatar}>{bookingObj.user.firstname}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <div style={{ marginTop: "8%" }}>
                          <hr></hr>

                          <Grid container>
                            <Grid item xs={12}>
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
                              <Grid xs={12}>
                                <BookingDetail
                                  prestations={pricedPrestations}
                                  count={countPrestations}
                                  travel_tax={this.state.bookingObj?this.state.bookingObj.travel_tax : 0}
                                  pick_tax={this.state.bookingObj?this.state.bookingObj.pick_tax : 0}
                                  total={amount}
                                />
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12}>
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
                                <Grid container style={{alignItems: 'center'}}>
                                  <Grid item style={{marginRight: 50}}>
                                    <Grid item>
                                      <Grid>
                                        <img style={{width: 40, height : 40}} alt={"calendrier"} title={"calendrier"} src={'../../static/assets/img/userServicePreview/calendrier.svg'}/>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <Grid>
                                      <p>Adresse de la prestation:</p>{" "}
                                    </Grid>
                                    <Grid>
                                      <p>{bookingObj.address.address}, {bookingObj.address.city} {bookingObj.address.zip_code}</p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item style={{display: 'flex', marginTop: 30, marginBottom: 30, alignItems: 'center'}}>
                                <Grid item style={{marginRight: 50}}>
                                  <Grid item>
                                    <Grid>
                                      <img style={{width: 40, height : 40}} alt={"adresse"} title={"adresse"} src={'../../static/assets/img/userServicePreview/adresse.svg'}/>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item style={{display: 'inline-block', width: '100%' }}>
                                  <p>Date de début:</p> <p>{bookingObj.date_prestation} - {moment(bookingObj.time_prestation).format('HH:mm')}</p>
                                </Grid>
                                {typeof bookingObj.end_date !== 'undefined' && typeof bookingObj.end_time !== 'undefined' ?
                                    <Grid item style={{display: 'flex', width: '100%' }}>
                                      <Grid>
                                        <p>Date de fin:</p>
                                      </Grid>
                                      <Grid>
                                        <p>{moment(bookingObj.end_date).format('DD/MM/YYYY')} - {bookingObj.end_time}</p>
                                      </Grid>
                                    </Grid>
                                    :
                                    null
                                }
                                {typeof this.state.bookingObj.end_date === 'undefined' && typeof this.state.bookingObj.end_time === 'undefined' ?
                                    typeof this.state.end === null ? null :

                                        <Grid item style={{display: 'flex', width: '100%', alignItems: 'center', flexDirection : 'column', marginLeft: 30 }}>
                                          <Grid style={{width: '100%'}}>
                                            <p>Date de fin:</p>
                                          </Grid>
                                          <Grid style={{display: 'flex'}}>
                                            <Grid style={{marginRight: 10}}>
                                              <DatePicker
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
                                              />
                                            </Grid>

                                            - {
                                            <Grid style={{marginLeft: 10}}>
                                              <DatePicker
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
                                              />
                                            </Grid>

                                          }
                                          </Grid>
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
