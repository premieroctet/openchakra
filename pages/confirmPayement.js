import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../hoc/Layout/Layout";
import axios from "axios";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";
import Footer from "../hoc/Layout/Footer/Footer";
import dynamic from "next/dynamic";
import About from '../components/About/About';
import UserAvatar from '../components/Avatar/UserAvatar';

moment.locale("fr");
const _ = require("lodash");
const { config } = require("../config/config");
const url = config.apiUrl;
const MapComponent = dynamic(() => import("../components/map"), {
  ssr: false
});
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

const Input2 = ({ value, onClick }) => (
  <Button
    value={value}
    color={"inherit"}
    variant={"outlined"}
    style={{ color: "gray" }}
    className="example-custom-input"
    onClick={onClick}
  >
    {value}
  </Button>
);

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
      total: null,
      fees: null,
      pick_tax: null,
      travel_tax: null,
      grandTotal: null,
      checkedOption: false,
      optionPrice: null,
      date: null,
      hour: null,
      alfred: null,
      languages: [],
      shop: {},
      userAlfred:[]
    };
  }

  static getInitialProps({ query: { id } }) {
    return { shop_id: id };
  }

  componentDidMount() {
    const prestations = JSON.parse(localStorage.getItem("prestations"));
    const bookingObj = JSON.parse(localStorage.getItem("bookingObj"));
    console.log(bookingObj, 'booking')

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
      alfred: bookingObj.user
    }, () => {
      axios.get(`${url}myAlfred/api/shop/alfred/${this.state.alfred}`)
        .then( response  =>  {
          let shop = response.data;
          this.setState({
            userAlfred: shop.alfred,
            languages: shop.alfred.languages,
            shop:shop,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    const id = this.props.shop_id;
    localStorage.setItem("path", Router.pathname);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem( "token");

    axios.get(url + "myAlfred/api/serviceUser/" + id).then(res => {
      this.setState({ user: res.data.user });
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

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    const { bookingObj, currentUser, userAlfred, languages, shop } = this.state;

    return (
      <Fragment>
        {user === null || currentUser === null ? null : (
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
                      style={{
                        margin: "20px 11%",
                        marginTop: "5%",
                        width: "90%"
                      }}
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
                          Détail de votre réservation
                        </h2>
                      </Grid>
                    </Grid>
                    <br></br>
                    <Grid container>
                      <Grid item xs={5}>
                        <div style={{ marginLeft: "3%" }}>
                          <About alfred={userAlfred} languages={languages} shop={shop}/>
                        </div>
                      </Grid>
                      <Grid item xs={5}>
                        <Grid item className={classes.itemAvatar}>
                          <UserAvatar classes={'avatarLetter'} user={userAlfred} className={classes.avatarLetter} />
                          <Typography style={{marginTop:20}} className={classes.textAvatar}>{userAlfred.firstname}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <div style={{ marginTop: "8%" }}>
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
                        <Grid item xs={12} style={{}}>
                          <Grid item xs={3} style={{width: "30%", float: "left", paddingTop: 15}}>
                            <Grid>
                              <img style={{width: 40, height : 40}} alt={"calendrier"} title={"calendrier"} src={'../../static/assets/img/userServicePreview/calendrier.svg'}/>
                            </Grid>
                          </Grid>
                          <Grid item xs={9} style={{ width: "70%" }}>
                            <p>Date et heure de la prestation:</p>{" "}
                            <p>
                              {this.state.date} - {moment(this.state.hour).format('HH:mm')}
                            </p>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} style={{}}>
                          <Grid item xs={3} style={{width: "30%", float: "left", paddingTop: 15}}>
                            <Grid>
                              <img style={{width: 40, height : 40}} alt={"adresse"} title={"adresse"} src={'../../static/assets/img/userServicePreview/adresse.svg'}/>
                            </Grid>
                          </Grid>
                          <Grid item xs={9} style={{ width: "70%" }}>
                            <p>Adresse de la prestation:</p>{" "}
                            <p>
                              {this.state.address}, {this.state.zip_code} {this.state.city}{" "}
                            </p>
                          </Grid>
                        </Grid>
                      </Grid>
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
                            Paiement
                          </h3>
                          <Grid xs={12}>
                            {this.state.prestations.length
                              ? this.state.prestations.map(prestation => {
                                  return (
                                    <>
                                      <Grid
                                        item
                                        xs={9}
                                        style={{ width: "90%", float: "left" }}
                                      >
                                        <p>
                                          {prestation.value}X {prestation.name}
                                        </p>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={3}
                                        style={{ width: "10%", float: "right" }}
                                      >
                                        <p>
                                          {prestation.price * prestation.value}€
                                        </p>
                                      </Grid>
                                    </>
                                  );
                                })
                              : null}

                            { this.state.travel_tax ?
                            <>
                            <br></br>
                            <Grid item xs={9} style={{ width: "90%", float: "left" }} >
                              <p>Frais de déplacement</p>
                            </Grid>
                            <Grid item xs={3} style={{ width: "10%", float: "right" }} >
                              {" "} <p>{this.state.travel_tax.toFixed(2)}€</p>
                            </Grid>
                            </>
                            :
                            null
                            }

                            { this.state.pick_tax ?
                            <>
                            <br></br>
                            <Grid item xs={9} style={{ width: "90%", float: "left" }} >
                              <p>Frais de livraison/enlèvement</p>
                            </Grid>
                            <Grid item xs={3} style={{ width: "10%", float: "right" }} >
                              {" "} <p>{this.state.pick_tax.toFixed(2)}€</p>
                            </Grid>
                            </>
                            :
                            null
                            }

                            <br></br>
                            <Grid item xs={9} style={{ width: "90%", float: "left" }} >
                              <p>Frais de service</p>
                            </Grid>
                            <Grid item xs={3} style={{ width: "10%", float: "right" }} >
                              {" "} <p>{this.state.fees.toFixed(2)}€</p>
                            </Grid>

                            <Grid
                              item
                              xs={9}
                              style={{
                                width: "90%",
                                float: "left",
                                fontSize: 25,
                                fontWeight: 600,
                                color: "#2FBCD3"
                              }}
                            >
                              <p>Total</p>
                            </Grid>
                            <Grid
                              item
                              xs={3}
                              style={{
                                width: "10%",
                                float: "right",
                                fontWeight: 600,
                                fontSize: 25,
                                color: "#2FBCD3"
                              }}
                            >
                              {" "}
                              <p>{this.state.grandTotal}€</p>
                              <Grid style={{ float: "right" }} item xs={12}>
                                {" "}
                                <Button
                                  color={"secondary"}
                                  variant={"contained"}
                                  style={{
                                    color: "white",
                                    fontSize: "16px",
                                    width: "100%",
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
