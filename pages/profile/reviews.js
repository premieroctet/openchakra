import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import {Helmet} from 'react-helmet';
import Commentary from '../../components/Commentary/Commentary';
moment.locale('fr');
import styles from './reviews/reviewsStyle'
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import cookie from 'react-cookies'

class reviews extends React.Component {
    constructor(props) {
        super(props);
      this.child = React.createRef();
        this.state = {
            user: {},
            alfredReviews: [],
            clientReviews: [],
            is_alfred: false,
            tabs: false,
        };
        this.callDrawer = this.callDrawer.bind(this)
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = cookie.load('token')
        axios
            .get('/myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user, is_alfred: user.is_alfred});
                console.log("**********Alfred:"+user.is_alfred);
                axios.get('/myAlfred/api/reviews/profile/alfredReviewsCurrent/'+user._id)
                    .then(res => {
                        let reviews = res.data;
                        this.setState({alfredReviews:reviews})
                    })
                    .catch();

                axios.get('/myAlfred/api/reviews/profile/customerReviewsCurrent/'+user._id)
                    .then(res => {
                        let reviews = res.data;
                        this.setState({clientReviews:reviews})
                    })
                    .catch()

            })
            .catch(err => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        cookie.remove('token', { path: '/' })
                        Router.push({pathname: '/login'})
                    }
                }
            );

    }

    handleClicktabs2 =() => {
        this.setState({ tabs: true });
    };

    handleClicktabs =() => {
        this.setState({ tabs: false });
    };

    callDrawer(){
        this.child.current.handleDrawerToggle();
    }

    render() {
        const {classes} = this.props;
        const {user, is_alfred} = this.state;
        const tabs = this.state.tabs;


        return (
            <Fragment>
                <Helmet>
                    <title>Commentaires - My Alfred </title>
                    <meta property="description" content="Parcourez vos commentaires et notations pour les services rémunérés proposés ou trouvés sur My-Alfred. Chaque service donne lieu à une notation, des commentaires et des compliments. L'inscription est 100% gratuite et vous permet de proposer et trouver des services rémunérés entre particuliers ou freelance. " />
                </Helmet>
                 <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid style={{zIndex: 0}}>
                            <ResponsiveDrawer ref={this.child} isActiveIndex={4} itemsDrawers={'profil'}/>
                        </Grid>
                        <Grid>
                            <Grid>
                                <IconButton
                                  color="inherit"
                                  aria-label="open drawer"
                                  edge="start"
                                  onClick={this.callDrawer}
                                  className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Grid>


                        <Grid item lg={9} className={classes.containerCommentary}>
                        <Grid container>
                            <h1 style={{color: 'dimgray',fontWeight: '100'}}>Commentaires</h1>
                        </Grid>
                        { is_alfred ?
                          <>
                            <Grid container className={classes.tabweb} style={{paddingRight: '30px'}}>
                                <Grid item xs={6} style={{textAlign:"center"}}>
                                    <div>
                                        <h2 onClick={()=>this.handleClicktabs()} style={{fontWeight: '100',cursor: 'pointer',marginLeft: '0%',position: 'sticky'}}>Commentaires de mes Alfred</h2>
                                    </div>
                                </Grid>
                                <Grid item xs={6} >
                                    <h2 onClick={()=>this.handleClicktabs2()}  style={{fontWeight: '100', textAlign: 'center',cursor: 'pointer'}}>Commentaires de mes clients</h2><br/>
                                </Grid>

                                <Grid item xs={6}>
                                    {tabs ?
                                        <React.Fragment>
                                            <hr className={classes.trait1} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <hr className={classes.trait3} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>}
                                </Grid>
                                <Grid item xs={6}>
                                    {tabs ?
                                        <React.Fragment>
                                            <hr className={classes.trait} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <hr className={classes.trait2} style={{marginTop:'-10px'}}/>
                                        </React.Fragment>}
                                </Grid>

                            </Grid>
                            <Grid container className={classes.tabmobile}>
                                <Grid item style={{ textAlign: "center" }}>
                                    <h2
                                        onClick={()=>this.handleClicktabs()}
                                        style={{
                                            color: "#828181",
                                            fontWeight: "100",
                                            cursor: "pointer",
                                            marginLeft: "25%",
                                            fontSize:'0.8rem'
                                        }}
                                    >
                                        Commentaires de mes Alfred
                                    </h2>
                                </Grid>
                                <Grid item>
                                    <h2
                                        onClick={()=>this.handleClicktabs2()}
                                        style={{
                                            color: "#828181",
                                            fontWeight: "100",
                                            textAlign: "center",
                                            cursor: "pointer",
                                            fontSize:'0.8rem'
                                        }}
                                    >
                                        Commentaires de mes clients
                                    </h2>
                                    <br />
                                </Grid>

                                <Grid item xs={6} style={{ textAlign: "center" }}>
                                    {tabs ? (
                                        <React.Fragment>
                                            <hr className={classes.trait1} />
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <hr className={classes.trait3} />
                                        </React.Fragment>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    {tabs ? (
                                        <React.Fragment>
                                            <hr className={classes.trait} />
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <hr className={classes.trait2} />
                                        </React.Fragment>
                                    )}
                                </Grid>
                            </Grid>
                            </>
                            :
                            null
                          }
                            {tabs ?
                              <Grid container style={{marginTop: '3%', width: '90%'}}>
                                  <Commentary alfred_mode={true} user_id={user._id} key={moment()} styleComponent={true}/>
                              </Grid>
                                :
                              <Grid container style={{marginTop: '3%', width:'90%'}}>
                                  <Commentary alfred_mode={false} user_id={user._id} key={moment()} styleComponent={true}/>
                              </Grid>
                            }
                        </Grid>
                    </Grid>
                </Layout>
            </Fragment>
        );
    };
}



export default withStyles(styles)(reviews);
