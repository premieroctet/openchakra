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
import styles from './confirmPayement/confirmPayement';
const {booking_datetime_str} = require('../utils/dateutils');

moment.locale("fr");
const _ = require("lodash");
const { config } = require("../config/config");
const url = config.apiUrl;


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
    const { currentUser, user, alfredId } = this.state;

    const pricedPrestations=this.computePricedPrestations();
    const countPrestations=this.computeCountPrestations();

    return (
      <Fragment>
        {user === null || currentUser === null ? null : (
          <>
            <Layout>
              <Grid container className={classes.bigContainer}>
                <Grid container>
                  <Grid item md={5} xs={12} className={classes.leftContainer}>
                    <Grid container>
                      <Grid item xs={12} className={classes.marginItemContainer}>
                        <h2 className={classes.h2Style}>
                          Détail de votre réservation
                        </h2>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.containerAboutAndAvatar}>
                      <Grid item className={classes.marginContainerAvatar}>
                        <div style={{ width:'100%' }}>
                          <About alfred={user._id} profil={false}/>
                        </div>
                      </Grid>
                      <Grid item className={classes.containerAvatar}>
                        <Grid item>
                          <UserAvatar classes={'avatarLetter'} user={user} className={classes.avatarLetter} />
                          <Typography style={{marginTop:20}} className={classes.textAvatar}>{user.firstname}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <div style={{ paddingLeft: '3%' }}>
                      <hr></hr>
                      <Grid container>
                        <h3 className={classes.h3Style}>
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
                      <Grid container className={classes.widthLarge}>
                        <Grid item className={classes.widthLarge}>
                          <h3 className={classes.h3Style}>
                            Paiement
                          </h3>
                          <Grid className={classes.widthLarge}>
                            <BookingDetail prestations={pricedPrestations} count={countPrestations} total={this.state.grandTotal} client_fee={this.state.fees} travel_tax={this.state.travel_tax} pick_tax={this.state.pick_tax}/>
                            <Grid item className={classes.buttonContainerPiad}>
                              <Grid item>
                                <Button
                                  color={"secondary"}
                                  variant={"contained"}
                                  className={classes.buttonPaid}
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
                  <Grid item xs={12} md={7} className={classes.rightContainer}>
                    <Grid className={classes.backgroundRightContainer} container/>
                  </Grid>
                </Grid>
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
