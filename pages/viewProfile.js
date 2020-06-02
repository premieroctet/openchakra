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
import styles from './viewProfile/viewProfileStyle'
import UserAvatar from '../components/Avatar/UserAvatar';
import About from '../components/About/About';
import CardPreview from '../components/CardPreview/CardPreview';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';



moment.locale("fr");

class viewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      depliage: false,
      customerComments: false, // False : display Alfred comments, tru display customer comments
      user_id: null,
      user_infos: null,
      alfredReviews: null,
      customerReviews: null,
      userState: false,
      userId: '',
      services: [],
    };
  }

  static getInitialProps({ query: { id } }) {
    return { user_id: id };
  }

  componentDidMount() {
    const user_id = this.props.user_id;
    this.setState({ user_id: user_id });

    axios.get('/myAlfred/api/users/current').then(res => {
      let user = res.data;
      if(user) {
        this.setState({
          userState: true,
          userId: user._id,
        })
      }
    }).catch(function (error) {
      console.log(error);
    });

    axios.get(`/myAlfred/api/shop/alfred/${this.props.user_id}`)
      .then( response  =>  {
        let shop = response.data;
        this.setState({
          alfred: shop.alfred,
          idAlfred: shop.alfred._id,
          languages: shop.alfred.languages,
          services: shop.services,
          shop:shop,
        });

      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("/myAlfred/api/users/users/" + this.props.user_id)
      .then(res => {
        this.setState({ user_infos: res.data });

        axios
          .get(
              "/myAlfred/api/reviews/profile/customerReviewsCurrent/" +
              this.props.user_id
          )
          .then(res => this.setState({ customerReviews: res.data })).catch(error => {console.error(error)});

        axios
          .get(
              "/myAlfred/api/reviews/profile/alfredReviewsCurrent/" +
              this.props.user_id
          )
          .then(res => this.setState({ alfredReviews: res.data }));
      })
      .catch(err => {console.err(err)});
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
    const { customerComments, user_infos } = this.state;

    console.log(user_infos, 'user_infos')

    return (
      <Fragment>
        {user_infos === null ? null : (
          <Grid>
            <Layout>
              <Grid container className={classes.bigContainer}>
                {/*//////////////////////////////Container de gauche///////////////////////////////////////////////////////////*/}

                <Grid container style={{ marginBottom: "10%" }}>
                  <Grid className={classes.toggle} item>
                    <Grid container className={classes.mainContainer}>
                      <Grid item>
                        <Grid>
                          <Grid container style={{justifyContent: 'center'}}>
                            <Grid item className={classes.itemAvatar}>
                              <UserAvatar classes={'avatarLetter'} user={user_infos} className={classes.avatarLetter} />
                            </Grid>
                           <Grid style={{marginLeft: "auto", marginRight: "auto", marginTop: 50}}>
                             <About alfred={user_infos._id} profil={false} needTitle={false}/>
                           </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/********************************************* container de droite***********************************************************/}

                  <Grid className={classes.rightcontent} item>
                    <Grid container>
                      <Grid item className={classes.largeWidth}>
                        <Typography variant={"h3"} className={classes.titleAbout}>
                          Bonjour je m'appelle {user_infos.firstname}
                        </Typography>
                        <Grid item xs={12} className={classes.containerDescription}>
                          <Typography style={{ fontSize: "1rem" }}>{user_infos.description ? user_infos.description : "Aucune description"   }</Typography>
                        </Grid>
                      </Grid>
                      <Grid className={classes.servicesContainer}>
                        <Grid className={classes.largeWidth}>
                          <Typography variant="h3" className={classes.titleAbout}>
                            Les services de {user_infos.firstname}
                          </Typography>
                        </Grid>
                        <Grid container className={classes.cardPreviewContainer} spacing={2}>
                          { Object.keys(this.state.services).map( result => {
                            return (
                              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                                <CardPreview
                                  isOwner={false}
                                  needAvatar={false}
                                  userState={this.state.userState}
                                  alfred={user_infos}
                                  services={this.state.services[result]._id}
                                  needRefresh={this.needRefresh}/>
                              </Grid>
                            )
                          })
                          }
                        </Grid>
                      </Grid>

                      <Grid item xs={12} style={{ marginTop: "3%" }}>
                        <Typography variant="h3" className={classes.titleAbout}>
                          Vérifications
                        </Typography>
                      </Grid>
                      { !(user_infos.id_confirmed || user_infos.email || user_infos.phone )? (
                        <Grid style={{ marginTop: "3%" }}>
                          <Typography variant="h3" className={classes.titleAbout}>Cet utilisateur n'a aucune vérification</Typography>
                        </Grid>
                      ) : null}
                      <Grid style={{marginLeft: 15, marginTop: 15}}>
                        {user_infos.id_confirmed ? (
                          <Grid item style={{ marginTop: "15px" }}>
                            <Grid container>
                              <Grid item style={{ textAlign: "center" }}>
                                <CheckCircleIcon color={"primary"}/>
                              </Grid>
                              <Grid item style={{ marginLeft: "15px" }}>
                                <Typography style={{ fontSize: "1rem" }}>
                                  Pièce d’identité
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : null}
                        {user_infos.phone ? (
                          <Grid item style={{ marginTop: "15px" }}>
                            <Grid container>
                              <Grid item style={{ textAlign: "center" }}>
                                <CheckCircleIcon color={"primary"}/>
                              </Grid>
                              <Grid item style={{ marginLeft: "15px" }}>
                                <Typography style={{ fontSize: "1rem" }}>
                                  Téléphone
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : null}
                        {user_infos.email ? (
                          <Grid item style={{ marginTop: "15px" }}>
                            <Grid container>
                              <Grid item style={{ textAlign: "center" }}>
                                <CheckCircleIcon color={"primary"}/>
                              </Grid>
                              <Grid item style={{ marginLeft: "15px" }}>
                                <Typography style={{ fontSize: "1rem" }}>
                                  Adresse Email
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : null}
                      </Grid>



                      <Grid container className={classes.tabweb}>
                        <Grid item xs={12} style={{ marginTop: "3%" }}>
                          <Typography variant="h3" className={classes.titleAbout}>
                            Commentaires
                          </Typography>
                        </Grid>
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
                            style={{ fontSize: "1.1rem", color: "#828181", fontWeight: "100", cursor: "pointer", marginLeft: "0%" }}
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
                        <Grid container style={{ marginTop: "20px" }} className={classes.tabweb}>
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
