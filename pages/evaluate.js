import React, {Fragment} from 'react';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Footer from '../hoc/Layout/Footer/Footer';
import StarRatings from 'react-star-ratings';
import {toast} from 'react-toastify';
import TextField from "@material-ui/core/TextField";
import Skills from '../components/Skills/Skills';

const { config } = require('../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        flexGrow: 1,

    },
    grosHR: {
        height: '7px',
        backgroundColor: '#6ec1e4',
        width: '76%',
        float: 'left',
    },
    fournitureHR: {
        height: '5px',
        backgroundColor: '#6ec1e4',
        width: '85%',
        float: 'left',
    },
    disponibilityHR: {
        height: '5px',
        backgroundColor: '#6ec1e4',
        width: '103%',
        float: 'left',
    },
    conditionsHR: {
        height: '5px',
        backgroundColor: '#6ec1e4',
        width: '189%',
        float: 'left',
    },
    perimeterHR: {
        height: '5px',
        backgroundColor: '#6ec1e4',
        width: '223%',
        float: 'left',
    },
    dispocard:{

        minHeight:'100px',
        width:'200px',
        textAlign:'center',

        boxShadow: '4px 4px 41px -37px rgba(0,0,0,0.0)',
        border:'solid 1px #ccc',
        borderRadius:'10px',


    },
    dispocardin:{

        padding:'1%',
        fontSize:'17px',
        fontWeight:'bold',
        marginBottom:10,


    },

    prestationlist:{

        padding:'1%',

        marginBottom:10,
        border:'solid 1px #ccc',
        borderRadius:'5px',


    },
    prestationside:{

        backgroundColor:'transparent',
        Border:'0px #ccc solid',
        borderRadius:'10px',
        marginRight:'10px',
        marginLeft:'10px',
        height:'30px',


    },

    dispoheader:{

        height:'2%',
        color:'white',
        width:'100%',
        padding:'1%',

        fontSize:'15px',
        textAlign:'center',

        borderRadius:'0px',
        backgroundColor:'#F8727F',
        marginBottom:'20px'


    }
});


class Evaluate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            service: {},
            prestation: 0,
            price: 0,
            relational: 0,
            content: '',
            careful: false,
            punctual: false,
            flexible: false,
            reactive: false,
            alfred:{},
        };
        this.changeRating = this.changeRating.bind(this);
        this.changeRating2 = this.changeRating2.bind(this);
        this.changeRating3 = this.changeRating3.bind(this);
        this.onComplimentChanged = this.onComplimentChanged.bind(this);



    }

    static getInitialProps ({ query: { booking,id } }) {
        return { booking:booking,service_id: id }

    }



    componentDidMount() {
        const id = this.props.service_id;
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});
            })
            .catch(err => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );

        axios.get(url+'myAlfred/api/serviceUser/'+id)
            .then(res => {
                let service = res.data;
                this.setState({service: service});
            })
            .catch()
    }

    onComplimentChanged = (name) => {
      const org=this.state[name];
      console.log(name+" was "+org);
      this.setState({[name]: !org});
    }

    changeRating( newRating, name ) {
        this.setState({
            prestation: newRating
        });
    }

    changeRating2( newRating, name ) {
        this.setState({
            price: newRating
        });
    }

    changeRating3( newRating, name ) {
        this.setState({
            relational: newRating
        });
    }

    back(){
        Router.back();
    }

    evaluate() {
        const id = this.props.service_id;
        const booking = this.props.booking;
        const service = this.state.service;
        const alfred = service.user._id;
        const content = this.state.content;
        const prestation_quality = this.state.prestation;
        const quality_price = this.state.price;
        const relational = this.state.relational;

        const obj = {
            alfred: alfred,
            service: id,
            booking: booking,
            prestation_quality: prestation_quality,
            quality_price: quality_price,
            relational: relational,
            content: content,
            careful: this.state.careful,
            punctual: this.state.punctual,
            flexible: this.state.flexible,
            reactive: this.state.reactive,
        };

        axios.post(url+'myAlfred/api/reviews/add/alfred',obj)
            .then(() => {
                toast.info('Commentaire enregistré');
                //Router.push('/merci')
                Router.push(`/reservations/detailsReservation?id=${booking}`);
            })
            .catch(err => {
                toast.error('Une erreur est survenue')
            })

    }






    render() {
        const {classes} = this.props;
        const {user} = this.state;



        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                        {/*Le Header */}

                        {/*Le Contenu */}
                        <Grid container>
                            <br></br>
                            {/*Contenu à Gauche*/}

                            {/*Petite Description*/}
                            <Grid item md={5} xs={12} style={{textAlign: 'left',margin: '0 auto', float:'right', paddingLeft:'3%'}}>
                                <div style={{margin: '20px 11%', marginTop: '5%',width: '90%'}}></div>
                                <Grid container>

                                    <Grid item xs={12} style={{marginTop:50, marginBottom:30}}>
                                        <h2 style={{fontSize: '2.5rem',color: 'rgba(84,89,95,0.95)',letterSpacing: -1, fontWeight: '100', textAlign:'left'}}>Evaluation & commentaires</h2>

                                    </Grid>
                                </Grid>




                                <div>

                                    <Grid container>

                                        <Grid item xs={12} style={{textAlign:'left'}}>


                                            <p style={{fontSize:'25px'}}>Qu’avez vous pensé de la prestation de votre Alfred ?</p>


                                            <br></br>

                                        </Grid>
                                        <Grid item xs={7} style={{textAlign:'right'}}>
                                            <Grid container>
                                                <Grid item xs={7}> <p style={{fontSize:'18px'}}>Qualité de la prestation</p></Grid>
                                                <Grid item xs={5} style={{lineHeight:'4'}}><StarRatings
                                                rating={this.state.prestation}
                                                starRatedColor={"#2FBCD3"}
                                                changeRating={this.changeRating}
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension={'20px'}
                                                starHoverColor={'#2FBCD3'}
                                                starSpacing={'3px'}
                                            /></Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={7}>
                                                    <p style={{fontSize:'18px'}}>Qualité - Prix</p>
                                                </Grid>
                                                <Grid item xs={5} style={{lineHeight:'4'}}><StarRatings
                                                    rating={this.state.price}
                                                    starRatedColor={"#2FBCD3"}
                                                    changeRating={this.changeRating2}
                                                    numberOfStars={5}
                                                    name='rating2'
                                                    starDimension={'20px'}
                                                    starHoverColor={'#2FBCD3'}
                                                    starSpacing={'3px'}
                                                /></Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={7}>
                                                    <p style={{fontSize:'18px'}}>Relationnel</p>
                                                </Grid>
                                                <Grid item xs={5} style={{lineHeight:'4'}}><StarRatings
                                                    rating={this.state.relational}
                                                    starRatedColor={"#2FBCD3"}
                                                    changeRating={this.changeRating3}
                                                    numberOfStars={5}
                                                    name='rating3'
                                                    starDimension={'20px'}
                                                    starHoverColor={'#2FBCD3'}
                                                    starSpacing={'3px'}
                                                /></Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </div>
                                    <Grid className={classes.skillsContentContainer}>
                                      <Skills alfred={this.state.alfred} skills={this.state} widthHr={'100%'} hideCount={true} onClick={this.onComplimentChanged} />
                                    </Grid>
                                <div>
                                    <br></br>
                                    <p style={{fontSize:'25px'}}>Votre commentaire</p>

                                    {/*<form class="example-form">


                                        <mat-form-field class="example-full-width">
                                            <textarea onChange={(e)=>this.setState({content:e.target.value})}
                                                      style={{width:'100%', height:'150px', borderRadius:'30px'}} matInput placeholder=""></textarea>
                                        </mat-form-field>
                                    </form>*/}
                                    <Grid container>
                                        <Grid item xs={12}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        style={{width:'100%'}}
                                        multiline
                                        rows="6"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={(e)=>this.setState({content:e.target.value})}
                                    />
                                        </Grid>
                                    </Grid>
                                </div>



                                {/*cadre avec couleur et checkbox*/}

                                <br></br>

                                <Grid style={{float:'left'}} item xs={6}> <Button onClick={()=>this.back()}  color={"white"} variant={"contained"} style={{color:"gray", backgroundColor:'white', fontSize:'16px', width:"100%", paddingLeft:'20px', paddingRight:'20px', marginBottom:50, marginRight:20, borderRadius:'20px', textTransform:'capitalize'}}>Retour</Button>
                                </Grid>
                                <Grid style={{float:'right'}} item xs={6}> <Button disabled={this.state.prestation ===0 || this.state.price === 0 || this.state.relational === 0 || !this.state.content.trim()} onClick={()=>this.evaluate()}  color={"primary"} variant={"contained"} style={{color:"white", fontSize:'16px', width:"100%", paddingLeft:'20px', paddingRight:'20px', marginBottom:50, marginRight:20, borderRadius:'20px', textTransform:'capitalize'}}>Terminé</Button>
                                </Grid>


                            </Grid>

                            {/*Contenu à droite*/}
                            <Grid item xs={12} md={7} style={{marginTop: '2%', marginBottom: '5%'}}>
                                <Grid container style={{ backgroundImage: `url('../../static/resa.svg')`,backgroundPosition: "cover", backgroundRepeat:'no-repeat', border: 'thin solid transparent',maxWidth: '100%', height:'90vh', padding:'2%', position: 'sticky', top: 100,}}>

                                </Grid> </Grid>
                        </Grid>    </Grid>
                </Layout>
                <Footer/>

            </Fragment>
        );
    };
}



export default withStyles(styles)(Evaluate);
