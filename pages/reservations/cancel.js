import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../../hoc/Layout/Layout";
import axios from "axios";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Footer from "../../hoc/Layout/Footer/Footer";
import dynamic from "next/dynamic";
import io from "socket.io-client";

moment.locale("fr");
const _ = require("lodash");
const { config } = require("../../config/config");
const url = config.apiUrl;
const MapComponent = dynamic(() => import("../../components/map"), {
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
  }
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

class Cancel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      shop: {},
      booking_id: null,
    };
  }

  static getInitialProps({ query: { id } }) {
    return { booking_id: id };
  }

  componentDidMount() {
    const booking_id = this.props.booking_id;
    this.setState({booking_id: booking_id});
    
    this.socket = io("http://localhost:3000");
    this.socket.on("connect", socket => {
      this.socket.emit("booking", booking_id)
    })
  }

  changeStatus(status) {
    axios.put(url + 'myAlfred/api/booking/modifyBooking/' + this.state.booking_id, {status: status})
            .then(res => {this.setState({ 
              bookingObj: res.data 
            }), this.socket.emit("changeStatus", res.data)})
            .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    const { bookingObj } = this.state;

    return (
      <Fragment>
        {bookingObj === null ?
          null
          :
          <>
            <Layout>
            <Grid container className={classes.bigContainer}>
              {/*Le Header */}
              {/*Le Contenu */}
              <Grid container>
                <br></br>
                {/*Contenu à Gauche*/}

                {/*Petite Description*/}
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
                        Annuler la réservation service pour {user.firstname}{" "}
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

                  <div>
                    <Grid container>
                      <Grid item xs={12} style={{}}>
                        <br></br>
                      </Grid>
                    </Grid>
                  </div>

                  <Grid style={{ float: "left" }} item xs={6}>
                    {" "}
                    <Link href={{ pathname: 'detailsReservation', query:  { id: this.state.booking_id } }}>
                      <Button
                        color={"primary"}
                        variant={"contained"}
                        style={{
                          color: "white",
                          fontSize: "16px",
                          width: "100%",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          marginBottom: 50,
                          marginRight: 20,
                          borderRadius: "20px",
                          textTransform: "capitalize"
                        }}
                      >
                        Maintenir
                      </Button>
                    </Link>
                  </Grid>
                  <Grid style={{ float: "right" }} item xs={6}>
                    {" "}
                    <Link href={{ pathname: 'detailsReservation', query:  { id: this.state.booking_id } }}>
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
                          marginRight: 20,
                          borderRadius: "20px",
                          textTransform: "capitalize"
                        }}
                        onClick={() => this.changeStatus('Annulée')}
                      >
                        Annuler
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

export default withStyles(styles)(Cancel);
