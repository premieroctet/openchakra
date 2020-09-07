import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import Footer from '../hoc/Layout/Footer/Footer';
import cookie from 'react-cookies';

const styles = theme => ({
    bigContainer: {
        flexGrow: 1,

    },

});

class PaymentSuccessCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            success: false

        };

    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        let bookingObj = JSON.parse(localStorage.getItem("bookingObj"));

        if (!bookingObj) {
          this.context.router.history.goBack();
          return;
        }

        axios.defaults.headers.common["Authorization"] = cookie.load('token')
        axios
            .get("/myAlfred/api/users/current")
            .then(res => {
                let user = res.data;
                this.setState({ user: user });
            })
            .catch(err => {
                if (err.response.status === 401 || err.response.status === 403) {
                    cookie.remove('token', { path: '/' })
                    Router.push({ pathname: "/login" });
                }
            });
        axios.get('/myAlfred/api/payment/transactions')
            .then(result => {
                let transaction = result.data;
                if(transaction.Status === 'FAILED'){
                    Router.push('/paymentFailed')
                } else {
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
                        fees: bookingObj.fees,
                        grandTotal: bookingObj.amount
                    }, () => {
                        axios
                            .post("/myAlfred/api/chatRooms/addAndConnect", {
                                emitter: localStorage.getItem("emitter"),
                                recipient: localStorage.getItem("recipient")
                            })
                            .then(res => {
                                let booking = this.state.bookingObj;
                                booking.chatroom = res.data._id;

                                axios
                                    .post("/myAlfred/api/booking/add", booking)
                                    .then(result => {
                                        axios
                                            .put(
                                                "/myAlfred/api/chatRooms/addBookingId/" + booking.chatroom,
                                                { booking: result.data._id }
                                            )
                                            .then(() => {
                                                this.setState({success:true})
                                                localStorage.removeItem("bookingObj");
                                                Router.push({
                                                    pathname: "/reservations/detailsReservation",
                                                    query: { id: result.data._id }
                                                });

                                            });
                                    })
                                    .catch(err => console.error(err));
                            });
                    });
                }
            })

    }




    render() {
        const {classes} = this.props;
        const {success} = this.state;



        return (
            success ?
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
                                        <div style={{margin: '20px 11%', marginTop: '5%',width: '90%'}}/>
                                        <Grid container>

                                            <Grid item xs={12} style={{marginTop:50, marginBottom:30}}>
                                                <h2 style={{fontSize: '2.5rem',color: 'rgba(84,89,95,0.95)',letterSpacing: -1, fontWeight: '100', textAlign:'center'}}>Réservation enregistrée !</h2>

                                            </Grid>
                                        </Grid>
                                        <br/>



                                        <div>

                                            <Grid container>

                                                <Grid item xs={12} style={{textAlign:'center'}}>
                                                    <p style={{fontSize:'30px'}}>Toute l’équipe de My-Alfred vous remercie pour votre réservation. </p>

                                                    <Link href={'/reservations/allReservations'}>
                                                        <Button variant={"contained"} color={"primary"} style={{color:'white'}}>Mes réservations</Button>
                                                    </Link>


                                                    <br/>

                                                </Grid>

                                            </Grid>

                                        </div>



                                        {/*cadre avec couleur et checkbox*/}






                                    </Grid>

                                    {/*Contenu à droite*/}
                                    <Grid item xs={12} md={7} style={{marginTop: '2%', marginBottom: '5%'}}>
                                        <Grid container style={{ backgroundImage: `url('../../static/resa.svg')`,backgroundPosition: "cover", backgroundRepeat:'no-repeat', border: 'thin solid transparent',maxWidth: '100%', height:'90vh', padding:'2%', position: 'sticky', top: 100,}}>

                                        </Grid> </Grid>
                                </Grid>    </Grid>
                        </Layout>
                        <Footer/>

                    </Fragment>
                    :

                    <Fragment>
                        <Layout>
                            <Grid container className={classes.bigContainer}>

                                {/*Le Header */}

                                {/*Le Contenu */}
                                <Grid container>
                                    <br/>
                                    {/*Contenu à Gauche*/}

                                    {/*Petite Description*/}
                                    <Grid item md={5} xs={12} style={{textAlign: 'left',margin: '0 auto', float:'right', paddingLeft:'3%'}}>
                                        <div style={{margin: '20px 11%', marginTop: '5%',width: '90%'}}/>
                                        <Grid container>

                                            <Grid item xs={12} style={{marginTop:50, marginBottom:30}}>
                                                <h2 style={{fontSize: '2.5rem',color: 'rgba(84,89,95,0.95)',letterSpacing: -1, fontWeight: '100', textAlign:'center'}}>Paiement en cours...</h2>

                                            </Grid>
                                        </Grid>
                                        <br/>



                                        <div>

                                            <Grid container>


                                            </Grid>

                                        </div>



                                        {/*cadre avec couleur et checkbox*/}






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



export default withStyles(styles)(PaymentSuccessCreate);
