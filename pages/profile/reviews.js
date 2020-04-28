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

class reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            alfredReviews: [],
            clientReviews: [],
            is_alfred: false,
            tabs: false,
        };
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
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
                        localStorage.removeItem('token');
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


    render() {
        const {classes} = this.props;
        const {user, is_alfred, alfredReviews, clientReviews} = this.state;
        const tabs = this.state.tabs;


        return (
            <Fragment>
                <Helmet>
                    <title>Commentaires - My Alfred </title>
                    <meta property="description" content="Parcourez vos commentaires et notations pour les services rémunérés proposés ou trouvés sur My-Alfred. Chaque service donne lieu à une notation, des commentaires et des compliments. L'inscription est 100% gratuite et vous permet de proposer et trouver des services rémunérés entre particuliers ou freelance. " />
                </Helmet>
                 <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid className={classes.toggle}  item xs={3}>

                            <div className={classes.trigger}/>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/user.svg'} alt={'user'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Modifier le profil
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/user.svg'} alt={'user'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}} className={classes.hidesm}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes adresses de prestations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'}height={70} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/picture-2.svg'} alt={'picture'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/picture-2.svg'} alt={'picture'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Photo
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/success.svg'} alt={'check'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/success.svg'} alt={'check'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Confiance et vérification
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape-2.svg'} alt={'comment'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape-2.svg'} alt={'comment'} height={70} width={27} style={{marginRight: 10,marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Commentaires
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

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
                                <Grid item xs={6} style={{ textAlign: "center" }}>
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
                                <Grid item xs={6}>
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
                                        <Commentary alfred_mode={true} user_id={user._id} key={moment()}/>
                                    </Grid>

                                :

                                    <Grid container style={{marginTop: '3%', width:'90%'}}>
                                        <Commentary alfred_mode={false} user_id={user._id} key={moment()}/>
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
