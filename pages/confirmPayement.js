import React, { Fragment } from "react";
import Layout from "../hoc/Layout/Layout";
import axios from "axios";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";
import Footer from "../hoc/Layout/Footer/Footer";
import About from '../components/About/About';
import UserAvatar from '../components/Avatar/UserAvatar';
import BookingDetail from '../components/BookingDetail/BookingDetail';
const {booking_datetime_str} = require('../utils/dateutils')

moment.locale("fr");
const _ = require("lodash");
const { config } = require("../config/config");
const url = config.apiUrl;

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
  textAvatar: {
    textAlign: 'center',
    color: 'black',
    margin: 'auto',
    fontSize: 20,
  },
});

class ConfirmPayement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      travel_tax: null,
      pick_tax: null,
      grandTotal: null,
      total: 0,
      fees: null,
      grandTotal: null,
      checkedOption: false,
      optionPrice: null,
      date: null,
      hour: null,
      languages: [],
      alfredId: ''
    };
  }

  static getInitialProps({ query: { id } }) {
    return { shop_id: id };
  }

  componentDidMount() {
    const bookingObj = JSON.parse(localStorage.getItem("bookingObj"));

    axios.defaults.headers.common["Authorization"] = localStorage.getItem( "token");

    axios.get(url + "myAlfred/api/users/current").then(res => {
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
    })

    const id = this.props.shop_id;
    localStorage.setItem("path", Router.pathname);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem( "token");

    axios.get(url + "myAlfred/api/serviceUser/" + id).then(res => {
      this.setState({
        user: res.data.user,
        languages: res.data.user.languages
      });
    });
  }

  async handleCheckedOption(price) {
    await this.setState({ checkedOption: !this.state.checkedOption });

    if (this.state.checkedOption === true) {
      let feesTrue = 0.09 * (this.state.total + price);
      feesTrue = parseFloat(feesTrue.toFixed(2));

      let grandTotalTrue = this.state.total + price + feesTrue;
      grandTotalTrue = parseFloat(grandTotalTrue.toFixed(2));
      this.setState({ fees: feesTrue });
      this.setState({ optionPrice: price });
      this.setState({ grandTotal: grandTotalTrue });
    }
    if (this.state.checkedOption === false) {
      let feesFalse = 0.09 * this.state.total;
      feesFalse = parseFloat(feesFalse.toFixed(2));

      let grandTotalFalse = this.state.total + feesFalse;
      grandTotalFalse = parseFloat(grandTotalFalse.toFixed(2));
      this.setState({ fees: feesFalse });
      this.setState({ optionPrice: null });
      this.setState({ grandTotal: grandTotalFalse });
    }
  }

  handlePay() {
    localStorage.setItem("emitter", this.state.emitter);
    localStorage.setItem("recipient", this.state.recipient);
    Router.push({
      pathname: "/paymentChoiceCreate",
      query: { total: this.state.grandTotal, fees: this.state.fees }
    })
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
    const { currentUser, languages, user, alfredId } = this.state;

    const pricedPrestations=this.computePricedPrestations();
    const countPrestations=this.computeCountPrestations();

    return (
      <Fragment>
        {user === null || currentUser === null ? null : (
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
                          Détail de votre réservation
                        </h2>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item>
                        <div style={{ marginLeft: "3%", width:'100%' }}>
                          <About alfred={alfredId} profil={false}/>
                        </div>
                      </Grid>
                      <Grid item xs={5}>
                        <Grid item>
                          <UserAvatar classes={'avatarLetter'} user={user} className={classes.avatarLetter} />
                          <Typography style={{marginTop:20}} className={classes.textAvatar}>{user.firstname}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <div style={{ marginTop: "8%", paddingLeft: '3%' }}>
                      <hr></hr>
                      <Grid container>
                        <h3
                          style={{
                            fontSize: "1.6rem",
                            color: "rgba(84,89,95,0.95)",
                            letterSpacing: -1,
                            fontWeight: "bold"
                          }}
                        >
                          A propos de votre réservation
                        </h3>
                        <Grid item xs={12} style={{display : 'flex', alignItems:'center'}}>
                          <Grid item>
                            <Grid>
                              <img style={{width: 40, height : 40}} alt={"calendrier"} title={"calendrier"} src={'../../static/assets/img/userServicePreview/calendrier.svg'}/>
                            </Grid>
                          </Grid>
                          <Grid item xs={9} style={{marginLeft: 25}}>
                            <p>Date et heure de la prestation:</p>{" "}
                            <p>
                              {booking_datetime_str(this.state.bookingObj)}
                            </p>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} style={{display : 'flex', alignItems:'center'}}>
                          <Grid item>
                            <Grid>
                              <img style={{width: 40, height : 40}} alt={"adresse"} title={"adresse"} src={'../../static/assets/img/userServicePreview/adresse.svg'}/>
                            </Grid>
                          </Grid>
                          <Grid item xs={9} style={{marginLeft: 25}}>
                            <p>Adresse de la prestation:</p>{" "}
                            <p>
                              {this.state.address}, {this.state.zip_code} {this.state.city}{" "}
                            </p>
                          </Grid>
                        </Grid>
                      </Grid>
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
                            Paiement
                          </h3>
                          <Grid xs={12}>
                            <BookingDetail prestations={pricedPrestations} count={countPrestations} total={this.state.grandTotal} client_fee={this.state.fees} travel_tax={this.state.travel_tax} pick_tax={this.state.pick_tax}/>
                            <Grid item xs={3} style={{width: "10%", float: "right", fontWeight: 600, fontSize: 25, color: "#2FBCD3"}}>
                              {" "}
                              <Grid style={{ float: "right" }} item xs={12}>
                                {" "}
                                <Button
                                  color={"secondary"}
                                  variant={"contained"}
                                  style={{
                                    color: "white",
                                    fontSize: "16px",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                    marginBottom: 50,
                                    marginRight: 20
                                  }}
                                  onClick={() => {
                                    this.handlePay();
                                  }}
                                >
                                  Payer
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>

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
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ConfirmPayement);
