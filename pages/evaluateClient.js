import React, {Fragment} from 'react';
import Layout from '../hoc/Layout/Layout';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import Footer from '../hoc/Layout/Footer/Footer';
import StarRatings from 'react-star-ratings';
import {toast} from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import cookie from 'react-cookies';
import styles from './evaluateClient/evaluateClientStyle';

class EvaluateClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            service: {},
            accueil: 0,
            accuracy: 0,
            relational: 0,
            content: '',
        };
        this.onComplimentChanged = this.onComplimentChanged.bind(this);
    }

    static getInitialProps ({ query: { booking,id,client } }) {
        return { booking:booking,service_id: id,client:client }

    }

    componentDidMount() {
        const id = this.props.service_id;
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = cookie.load('token')
        axios
            .get('/myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});
            })
            .catch(err => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        cookie.remove('token', { path: '/' })
                        Router.push({pathname: '/login'})
                    }
                }
            );

        axios.get('/myAlfred/api/serviceUser/'+id)
            .then(res => {
                let service = res.data;
                this.setState({service: service});
            })
            .catch()
    }

    onComplimentChanged = (name) => {
      const org=this.state[name];
      this.setState({[name]: !org});
    };

    changeRating = (newRating) => {
        this.setState({
            accueil: newRating
        });
    };

    changeRating2 = (newRating) => {
        this.setState({
            accuracy: newRating
        });
    };

    changeRating3 = (newRating) => {
        this.setState({
            relational: newRating
        });
    };

    back(){
        Router.back();
    }

    evaluate() {
        const id = this.props.service_id;
        const booking = this.props.booking;
        const client = this.props.client;
        const content = this.state.content;
        const accueil = this.state.accueil;
        const accuracy = this.state.accuracy;
        const relational = this.state.relational;

        const obj = {
            booking: booking,
            client: client,
            service: id,
            accueil: accueil,
            accuracy: accuracy,
            relational: relational,
            content: content,
        };

        axios.post('/myAlfred/api/reviews/add/client',obj)
            .then(() => {
                toast.info('Commentaire enregistré');
                Router.push(`/reservations/detailsReservation?id=${booking}`);
            })
            .catch( () => {
                toast.error('Une erreur est survenue')
            })

    }

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container>
                            <Grid item className={classes.mainContainerEvaluateClient}>
                                <Grid container>
                                    <Grid item style={{marginTop:50, marginBottom:30}}>
                                        <h2 style={{fontSize: '2.5rem',color: 'rgba(84,89,95,0.95)',letterSpacing: -1, fontWeight: '100', textAlign:'left'}}>Evaluation & commentaires</h2>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Grid container className={classes.containerSkillsEvaluate}>
                                        <Grid item style={{textAlign:'left'}}>
                                            <p style={{fontSize:'25px'}}>Qu’avez-vous pensé de votre client ?</p>
                                        </Grid>
                                        <Grid item className={classes.skillsEvaluate}>
                                            <Grid container className={classes.starsValueContainer}>
                                                <Grid item>
                                                    <p style={{fontSize:'18px'}}>Accueil</p>
                                                </Grid>
                                                <Grid item style={{lineHeight:'4'}}>
                                                    <StarRatings
                                                    rating={this.state.accueil}
                                                    starRatedColor={"#2FBCD3"}
                                                    changeRating={this.changeRating}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension={'20px'}
                                                    starHoverColor={'#2FBCD3'}
                                                    starSpacing={'3px'}
                                                />
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.starsValueContainer}>
                                                <Grid item>
                                                    <p style={{fontSize:'18px'}}>Précision de la demande</p>
                                                </Grid>
                                                <Grid item style={{lineHeight:'4'}}>
                                                    <StarRatings
                                                    rating={this.state.accuracy}
                                                    starRatedColor={"#2FBCD3"}
                                                    changeRating={this.changeRating2}
                                                    numberOfStars={5}
                                                    name='rating2'
                                                    starDimension={'20px'}
                                                    starHoverColor={'#2FBCD3'}
                                                    starSpacing={'3px'}
                                                />
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.starsValueContainer}>
                                                <Grid item>
                                                    <p style={{fontSize:'18px'}}>Relationnel</p>
                                                </Grid>
                                                <Grid item style={{lineHeight:'4'}}>
                                                    <StarRatings
                                                    rating={this.state.relational}
                                                    starRatedColor={"#2FBCD3"}
                                                    changeRating={this.changeRating3}
                                                    numberOfStars={5}
                                                    name='rating3'
                                                    starDimension={'20px'}
                                                    starHoverColor={'#2FBCD3'}
                                                    starSpacing={'3px'}
                                                />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <p style={{fontSize:'25px'}}>Votre commentaire</p>
                                    <Grid container>
                                        <Grid item style={{width: '100%'}}>
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
                                </Grid>
                                <Grid className={classes.containerNavigationButton}>
                                    <Grid>
                                        <Button
                                            onClick={()=>this.back()}
                                            color={"white"}
                                            variant={"contained"}
                                        >
                                            Retour
                                        </Button>
                                    </Grid>
                                    <Grid>
                                        <Button disabled={this.state.accueil ===0 || this.state.accuracy === 0 || this.state.relational === 0 || !this.state.content.trim()}
                                                onClick={()=>this.evaluate()}
                                                color={"primary"}
                                                variant={"contained"}
                                        >
                                            Terminé
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Layout>
                <Footer/>
            </Fragment>
        );
    };
}



export default withStyles(styles)(EvaluateClient);
