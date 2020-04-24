import React, { Fragment } from "react";
import Link from "next/link";
import Layout from "../hoc/Layout/Layout";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Footer from "../hoc/Layout/Footer/Footer";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import moment from "moment";
import Commentary from '../components/Commentary/Commentary';

moment.locale("fr");

const styles = theme => ({
  exp1: {
    "&::before": {
      height: "0px!important"
    }
  },
  bigContainer: {
    marginTop: 68,
    flexGrow: 1
  },
  marginbot: {
    marginBottom: "3.5%"
  },
  hiddenone: {
    [theme.breakpoints.down("sm")]: {
      display: "none!important"
    }
  },
  revealedone: {
    [theme.breakpoints.up("md")]: {
      display: "none!important"
    }
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    borderTop: "15px solid gray",
    margin: "0 auto",
    marginTop: -28
  },
  shopbar: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  bottombar: {
    visibility: "hidden",
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    [theme.breakpoints.down("sm")]: {
      visibility: "visible",
      boxShadow: "2px -5px 14px -15px rgba(0,0,0,0.75)"
    }
  },
  topbar: {
    visibility: "visible",
    position: "sticky",
    top: 65,
    zIndex: 999,
    [theme.breakpoints.down("sm")]: {
      display: "none",
      visibility: "hidden"
    }
  },
  hidesm: {
    minWidth: "271px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  hidelg: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toggle: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "-75px",
      transition: "margin-left 0.7s",

      "&:hover": {
        marginLeft: "0px",
        transition: "margin-left 0.7s",
        boxShadow: "11px 6px 23px -24px rgba(0,0,0,0.75)"
      }
    }
  },
  trait: {
    width: "100%",
    height: 4,
    backgroundColor: "rgb(47, 188, 211)",
    borderColor: "transparent",
    [theme.breakpoints.down("sm")]: {}
  },
  trait1: {
    width: "100%",

    height: 4,
    backgroundColor: "lightgray",
    borderColor: "transparent"
  },
  trait2: {
    width: "100%",
    height: 4,
    backgroundColor: "lightgray",
    borderColor: "transparent",
    [theme.breakpoints.down("sm")]: {}
  },
  trait3: {
    width: "100%",

    height: 4,
    backgroundColor: "rgb(47, 188, 211)",
    borderColor: "transparent"
  },

  tabmobile: {
    visibility: "hidden",
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    [theme.breakpoints.down("sm")]: {
      visibility: "visible",
      fontSize: "10px",
      fontWeight: "300",
      marginTop: "-100px",
      height: 90,
      backgroundColor: "white",
      position: "sticky",
      top: 55,
      zIndex: 20
    }
  },

  mobilerow: {
    marginTop: "1%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "15%"
    }
  },
  Rightcontent: {
    marginLeft: "4%",
    marginTop: "15px"
  }
});

class viewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      depliage: false,
      customerComments: false, // False : display Alfred comments, tru display customer comments
      user_id: null,
      user_infos: null,
      alfredReviews: null,
      customerReviews: null
    };
  }

  static getInitialProps({ query: { id } }) {
    return { user_id: id };
  }

  componentDidMount() {
    const user_id = this.props.user_id;
    this.setState({ user_id: user_id });

    axios
      .get("/myAlfred/api/users/users/" + this.props.user_id)
      .then(res => {
        this.setState({ user_infos: res.data });

        axios
          .get(
              "/myAlfred/api/reviews/profile/customerReviewsCurrent/" +
              this.props.user_id
          )
          .then(res => this.setState({ customerReviews: res.data })).catch(error => {console.log(error)});

        axios
          .get(
              "/myAlfred/api/reviews/profile/alfredReviewsCurrent/" +
              this.props.user_id
          )
          .then(res => this.setState({ alfredReviews: res.data }));
      })
      .catch(err => {console.log(err)});
  }

  handleClick() {
    this.setState({ depliage: true });
  }

  handleClicktabs2 = () => {
    this.setState({ customerComments: true });
  };

  handleClicktabs = () => {
    this.setState({ customerComments: false });
  };

  render() {
    const { classes } = this.props;
    const { customerComments } = this.state;
    const { depliage } = this.state;
    const { user_infos } = this.state;

    return (
      <Fragment>
        {user_infos === null ? null : (
          <Grid>
            <Layout>
              <Grid container className={classes.bigContainer}>
                {/*/////////////////////////////////////////////////////////////////////////////////////////*/}

                <Grid container style={{ marginBottom: "10%" }}>
                  <Grid
                    className={classes.toggle}
                    item
                    xs={3}
                    style={{
                      height: "100%",
                      borderRight: "1px #8281813b solid",
                      marginTop: "15px"
                    }}
                  >
                    <Grid
                      container
                      style={{
                        border: "0.2px solid lightgrey",
                        margin: "auto",
                        justifyContent: "center",
                        position: "sticky",
                        top: 100,
                        width: "90%"
                      }}
                    >
                      <Grid item xs={7} md={9}>
                        <div style={{ marginLeft: "3%" }}>
                          <Grid style={{ marginLeft: "4%" }} container>
                            <Grid
                              item
                              xs={2}
                              style={{
                                marginBottom: "10px",
                                marginTop: "12px"
                              }}
                            >
                              <img
                                style={{ width: "20px" }}
                                src="/static/stars/star-solid.png"
                              ></img>
                            </Grid>
                            <Grid
                              item
                              xs={10}
                              style={{
                                marginBottom: "10px",
                                marginTop: "10px"
                              }}
                            >
                              <Typography
                                style={{
                                  fontSize: "1rem",
                                  marginLeft: "-5%",
                                }}
                              >
                                {user_infos.number_of_reviews} Commentaires
                              </Typography>
                            </Grid>

                            {user_infos.id_confirmed ? (
                              <>
                                <Grid
                                  item
                                  xs={2}
                                  style={{
                                    marginBottom: "10px",
                                    marginTop: "12px"
                                  }}
                                >
                                  <img
                                    style={{ width: "20px" }}
                                    src="/static/statut/oui.png"
                                  ></img>
                                </Grid>
                                <Grid
                                  item
                                  xs={10}
                                  style={{
                                    marginBottom: "10px",
                                    marginTop: "10px"
                                  }}
                                >
                                  <Typography
                                    style={{
                                      fontSize: "1.1rem",
                                      marginLeft: "-5%"
                                    }}
                                  >
                                    Pièce d’identité vérifiée
                                  </Typography>
                                </Grid>
                              </>
                            ) : null}

                            <Grid
                              item
                              xs={2}
                              style={{
                                marginBottom: "10px",
                                marginTop: "12px"
                              }}
                            >
                              <img
                                style={{ width: "20px" }}
                                src="/static/statut/calendar.png"
                              ></img>
                            </Grid>
                            <Grid
                              item
                              xs={10}
                              style={{
                                marginBottom: "10px",
                                marginTop: "10px"
                              }}
                            >
                              <Typography
                                style={{
                                  fontSize: "1.1rem",
                                  marginLeft: "-5%"
                                }}
                              >
                                Membre depuis le {moment(user_infos.creation_date).format('DD/MM/YYYY')}
                              </Typography>
                            </Grid>
                            {user_infos.is_alfred ? (
                              <>
                                <Grid
                                  item
                                  xs={2}
                                  style={{
                                    marginBottom: "10px",
                                    marginTop: "12px"
                                  }}
                                >
                                  <img
                                    style={{ width: "20px" }}
                                    src="/static/statut/beaver.png"
                                  ></img>
                                </Grid>
                                <Grid
                                  item
                                  xs={10}
                                  style={{
                                    marginBottom: "10px",
                                    marginTop: "10px"
                                  }}
                                >
                                  <Typography
                                    style={{
                                      fontSize: "1.1rem",
                                      marginLeft: "-5%"
                                    }}
                                  >
                                    {user_infos.firstname} est Alfred{" "}
                                  </Typography>
                                </Grid>
                              </>
                            ) : null}

                            <Grid
                              item
                              xs={2}
                              style={{
                                marginBottom: "10px",
                                marginTop: "12px"
                              }}
                            >
                              <img
                                style={{ width: "20px" }}
                                src="/static/statut/chat.png"
                              ></img>
                            </Grid>
                            <Grid
                              item
                              xs={10}
                              style={{
                                marginBottom: "10px",
                                marginTop: "10px"
                              }}
                            >
                              <Typography
                                style={{
                                  fontSize: "1.1rem",
                                  marginLeft: "-5%"
                                }}
                              >
                                Langue(s) : {user_infos.languages.length ? (
                                user_infos.languages.map(language => {
                                  return language + ', '
                                })
                              ) : 'Français'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.Rightcontent}
                    item
                    xs={9}
                    sm={9}
                    md={7}
                  >
                    <Grid container>
                      <Grid item xs={4} md={2}>
                        <img
                          style={{
                            width: "125px",
                            height: "125px",
                            borderRadius: "50%",
                            objectFit: "cover"
                          }}
                          src={`../${user_infos.picture}`}
                        />
                      </Grid>
                      <Grid item xs={8} md={10}>
                        <Typography style={{ fontSize: "1.8rem" }}>
                          {user_infos.firstname}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography style={{ fontSize: "1.2rem" }}>
                          A propos de {user_infos.firstname}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography style={{ fontSize: "1rem" }}>
                          {user_infos.description ? user_infos.description.slice(0, 200): null}{" "}
                          {depliage ? (
                            <React.Fragment>
                              {user_infos.description ? user_infos.description.slice(201) :null}
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              …
                              <span
                                onClick={() => this.handleClick()}
                                style={{
                                  color: "#2B9BD6",
                                  textDecoration: "underline",
                                  cursor: "pointer"
                                }}
                              >
                                lire la suite
                              </span>
                            </React.Fragment>
                          )}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} style={{ marginTop: "30px" }}>
                        <Typography style={{ fontSize: "1.2rem" }}>
                          Vérifications
                        </Typography>
                      </Grid>
                      { !(user_infos.id_confirmed || user_infos.is_confirmed || user_infos.phone_confirmed)? (
                        <p>Cet utilisateur n'a aucune vérification</p>
                      ) : null}
                      {user_infos.id_confirmed === true ? (
                        <Grid item xs={12} style={{ marginTop: "15px" }}>
                          <Grid container>
                            <Grid item xs={1} style={{ textAlign: "center" }}>
                              <img
                                style={{ width: "30%" }}
                                src="/static/checkboxes/checkedbluealfred.png"
                              />
                            </Grid>
                            <Grid item xs={11}>
                              <Typography style={{ fontSize: "1rem" }}>
                                Pièce d’identité
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      ) : null}
                      {user_infos.phone_confirmed === true ? (
                        <Grid item xs={12} style={{ marginTop: "15px" }}>
                          <Grid container>
                            <Grid item xs={1} style={{ textAlign: "center" }}>
                              <img
                                style={{ width: "30%" }}
                                src="/static/checkboxes/checkedbluealfred.png"
                              />
                            </Grid>
                            <Grid item xs={11}>
                              <Typography style={{ fontSize: "1rem" }}>
                                Téléphone
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      ) : null}
                      {user_infos.is_confirmed === true ? (
                        <Grid item xs={12} style={{ marginTop: "15px" }}>
                          <Grid container>
                            <Grid item xs={1} style={{ textAlign: "center" }}>
                              <img
                                style={{ width: "30%" }}
                                src="/static/checkboxes/checkedbluealfred.png"
                              />
                            </Grid>
                            <Grid item xs={11}>
                              <Typography style={{ fontSize: "1rem" }}>
                                Adresse Email
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      ) : null}

                      <Grid
                        container
                        style={{ marginTop: "20px" }}
                        className={classes.tabweb}
                      >
                        <Grid item xs={6} style={{ textAlign: "center" }}>
                          <div>
                            <h2
                              onClick={this.handleClicktabs}
                              style={{ fontSize: "1.1rem", color: "#828181", fontWeight: "100", cursor: "pointer", marginLeft: "0%" }}
                            >
                              De la part des Alfred
                            </h2>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <h2
                            onClick={this.handleClicktabs2}
                            style={{ fontSize: "1.1rem", color: "#828181", fontWeight: "100", textAlign: "center", cursor: "pointer" }}
                          >
                            De la part des clients
                          </h2>
                          <br />
                        </Grid>

                        <Grid item xs={6}>
                          {customerComments ? (
                            <React.Fragment>
                              <hr
                                onClick={this.handleClicktabs}
                                className={classes.trait1}
                                style={{
                                  marginTop: "-25px",
                                  cursor: "pointer"
                                }}
                              />
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <hr
                                onClick={this.handleClicktabs}
                                className={classes.trait3}
                                style={{
                                  marginTop: "-25px",
                                  cursor: "pointer"
                                }}
                              />
                            </React.Fragment>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          {customerComments ? (
                            <React.Fragment>
                              <hr
                                onClick={this.handleClicktabs2}
                                className={classes.trait}
                                style={{
                                  marginTop: "-25px",
                                  cursor: "pointer"
                                }}
                              />
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <hr
                                onClick={this.handleClicktabs2}
                                className={classes.trait2}
                                style={{
                                  marginTop: "-25px",
                                  cursor: "pointer"
                                }}
                              />
                            </React.Fragment>
                          )}
                        </Grid>
                        <Grid container>
                        <Grid
                          container
                          style={{ marginTop: "20px" }}
                          className={classes.tabweb}
                        >
                        <Commentary user_id={this.props.user_id} alfred_mode={customerComments} key={moment()}/>
                        </Grid>

                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/*/////////////////////////////////////////////////////////////////////////////////////////*/}
              </Grid>
            </Layout>

            <Footer />
          </Grid>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(viewProfile);
