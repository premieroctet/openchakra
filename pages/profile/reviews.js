import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import StarRatings from 'react-star-ratings';
import {Helmet} from 'react-helmet';
moment.locale('fr');

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
    },
    hidesm: {
        minWidth: '271px',
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    }

    ,hidelg: {
        [theme.breakpoints.up('md')]: {
            display:'none',
        }

    },
    trigger:{
        [theme.breakpoints.down('sm')]: {
            marginTop: -10,
            width: '100%',
            marginLeft:'0px',
            height:'30px',
            backgroundColor:'#2FBCD3',

            display:'block',
            transition: 'display 0.7s',
            borderRadius:'5px',
            '&:focus': {
                display:'none',
                transition: 'display 0.7s',

            }
        }

    }

    ,toggle: {
        [theme.breakpoints.down('sm')]: {  marginLeft:'-75px',
            transition: 'margin-left 0.7s',

            '&:hover': {
                marginLeft:'0px',
                transition: 'margin-left 0.7s',
                boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',

            }
        }
    },
    tabweb:{width:'100%', position:'sticky', top:'64px', fontSize:15, backgroundColor:'white', zIndex:'20',
        [theme.breakpoints.down('sm')]: {
            display:'none'}},
    trait:{
        width: '100%',
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent',
        [theme.breakpoints.down('sm')]: {
        },
    },
    tabmobile: {
        fontSize: "10px",
        fontWeight: "300",
        height: 90,
        backgroundColor: "white",
        position: "sticky",
        top: 55,
        zIndex: 20,
        [theme.breakpoints.up("md")]: {
            display: "none"
        },

    },

    trait1:{
        width: '100%',

        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait2:{
        width: '100%',
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent',  [theme.breakpoints.down('sm')]: {
        },
    },
    trait3:{
        width: '100%',
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },


});

class reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            alfredReviews: [],
            clientReviews: [],
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
                this.setState({user:user});
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
        const {user} = this.state;
        const {alfredReviews} = this.state;
        const {clientReviews} = this.state;
        const tabs = this.state.tabs;


        return (
            <Fragment>
		<Helmet>
        <title>Commentaires - My Alfred </title>
        <meta property="description" content="Parcourez vos commentaires et notations pour les services rémunérés proposés ou trouvés sur My-Alfred. Chaque service donne lieu à une notation, des commentaires et des compliments. L'inscription est 100% gratuite et vous permet de proposer et trouver des services rémunérés entre particuliers ou freelance. " />
      </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                        <Grid className={classes.toggle}  item xs={3} style={{}}>

                            <div className={classes.trigger}></div>
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


                        <Grid item xs={9} style={{paddingLeft: 55, minHeight: '530px'}}>
                            <Grid container>
                                <h1 style={{color: 'dimgray',fontWeight: '100'}}>Commentaires</h1>
                            </Grid>
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
                            {tabs ?
                                    clientReviews.map(e => (


                                    <Grid container>
                                        <Grid container style={{marginTop: '40px'}}>
                                            <Grid item xs={6} md={2}>
                                                <img style={{width: '75px', height : '75px', borderRadius: '50%', objectFit: 'cover'}} src={'../../'+e.user.picture}/>
                                            </Grid>
                                            <Grid item xs={6} md={10} style={{marginTop: '10px'}}>
                                                <Typography style={{color: 'rgb(47, 188, 211)',fontSize: '1.2rem'}}>
                                                    {e.serviceUser.service.label} pour {e.user.firstname}
                                                </Typography>
                                                <Typography style={{color: '#9B9B9B',fontSize: '1rem'}}>
                                                    {moment(e.date).format('DD/MM/YYYY')} - {moment(e.date).format('HH:mm')}
                                                </Typography>
                                            </Grid>
                                            <Grid container style={{marginTop: '40px'}}>
                                                <Grid item md={2} xs={6}>
                                                    <Typography style={{fontSize: '1rem'}}>
                                                        Qualité de la prestation
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={10} xs={6}>
                                                    <StarRatings
                                                    rating={e.note_alfred.prestation_quality}
                                                    starRatedColor={"#2FBCD3"}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension={'20px'}
                                                    starHoverColor={'#2FBCD3'}
                                                    starSpacing={'3px'}
                                                />
                                                </Grid>

                                                <Grid item md={2} xs={6}>
                                                    <Typography style={{fontSize: '1rem'}}>
                                                        Qualité - Prix
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={10} xs={6}>
                                                    <StarRatings
                                                        rating={e.note_alfred.quality_price}
                                                        starRatedColor={"#2FBCD3"}
                                                        numberOfStars={5}
                                                        name='rating'
                                                        starDimension={'20px'}
                                                        starHoverColor={'#2FBCD3'}
                                                        starSpacing={'3px'}
                                                    />
                                                </Grid>

                                                <Grid item md={2} xs={6}>
                                                    <Typography style={{fontSize: '1rem'}}>
                                                        Relationnel
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={10} xs={6}>
                                                    <StarRatings
                                                        rating={e.note_alfred.relational}
                                                        starRatedColor={"#2FBCD3"}
                                                        numberOfStars={5}
                                                        name='rating'
                                                        starDimension={'20px'}
                                                        starHoverColor={'#2FBCD3'}
                                                        starSpacing={'3px'}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} style={{marginTop: '40px', marginBottom: '15px'}}>
                                                <Typography style={{boxShadow: '0px 0px 6px rgba(130, 129, 129, 0.28)', height: '100px', padding: '15px', width: '75%',  borderRadius: '10px'}}>
                                                    {e.content}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Grid container style={{marginTop: '40px', marginBottom: '40px'}}>
                                            <Grid item xs={12}>
                                                <hr style={{border: 'none', height: '2px', backgroundColor: '#7E7E7E', width: '80%', margin: 'auto'}}/>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    ))


                                :
                                alfredReviews.map(e => (


                                <Grid container>
                                    <Grid container style={{marginTop: '40px'}}>
                                        <Grid item xs={6} md={2}>
                                            <img style={{width: '75px', height : '75px', borderRadius: '50%', objectFit: 'cover'}} src={'../../'+e.alfred.picture}/>
                                        </Grid>
                                        <Grid item xs={6} md={10} style={{marginTop: '10px'}}>
                                            <Typography style={{color: 'rgb(47, 188, 211)',fontSize: '1.2rem'}}>
                                                {e.serviceUser.service.label} par {e.alfred.firstname}
                                            </Typography>
                                            <Typography style={{color: '#9B9B9B',fontSize: '1rem'}}>
                                                {moment(e.date).format('DD/MM/YYYY')} - {moment(e.date).format('HH:mm')}
                                            </Typography>
                                        </Grid>
                                        <Grid container style={{marginTop: '40px'}}>
                                            <Grid item md={2} xs={6}>
                                                <Typography style={{fontSize: '1rem'}}>
                                                    Accueil
                                                </Typography>
                                            </Grid>
                                            <Grid item md={10} xs={6}>
                                                <StarRatings
                                                    rating={e.note_client.reception}
                                                    starRatedColor={"#2FBCD3"}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension={'20px'}
                                                    starHoverColor={'#2FBCD3'}
                                                    starSpacing={'3px'}
                                                />
                                            </Grid>

                                            <Grid item md={2} xs={6}>
                                                <Typography style={{fontSize: '1rem'}}>
                                                    Précision de la demande
                                                </Typography>
                                            </Grid>
                                            <Grid item md={10} xs={6}>
                                                <StarRatings
                                                    rating={e.note_client.accuracy}
                                                    starRatedColor={"#2FBCD3"}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension={'20px'}
                                                    starHoverColor={'#2FBCD3'}
                                                    starSpacing={'3px'}
                                                />
                                            </Grid>

                                            <Grid item md={2} xs={6}>
                                                <Typography style={{fontSize: '1rem'}}>
                                                    Relationnel
                                                </Typography>
                                            </Grid>
                                            <Grid item md={10} xs={6}>
                                                <StarRatings
                                                    rating={e.note_client.relational}
                                                    starRatedColor={"#2FBCD3"}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension={'20px'}
                                                    starHoverColor={'#2FBCD3'}
                                                    starSpacing={'3px'}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} style={{marginTop: '40px', marginBottom: '15px'}}>
                                            <Typography style={{boxShadow: '0px 0px 6px rgba(130, 129, 129, 0.28)', height: '100px', padding: '15px', width: '75%',  borderRadius: '10px'}}>
                                                {e.content}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{marginTop: '40px', marginBottom: '40px'}}>
                                        <Grid item xs={12}>
                                            <hr style={{border: 'none', height: '2px', backgroundColor: '#7E7E7E', width: '80%', margin: 'auto'}}/>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                ))

                            }
                        </Grid>
                    </Grid>
                </Layout>
                {/* <Footer/>*/}

            </Fragment>
        );
    };
}



export default withStyles(styles)(reviews);
