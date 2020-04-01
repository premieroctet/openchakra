import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Footer from '../hoc/Layout/Footer/Footer';
import Cards from 'react-credit-cards';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
  } from '../components/utils';
import '../static/creditcards.css';







moment.locale('fr');

const { config } = require('../config/config');
const url = config.apiUrl;

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

    },
    respright:{
        [theme.breakpoints.down('sm')]: {
            display: 'none'
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
    }

});

class paymentChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            cards: [],
            id_card: '',
            cardSelected: false,
            valueother: 'other'
        }


    }

    static getInitialProps ({ query: { id, total, fees } }) {
        return { id: id, total: total, fees:fees }
    }


    componentDidMount() {
        const id = this.props.id;
        this.setState({booking_id:id})


        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                this.setState({user: res.data});
            })
            .catch(err => {
                    console.log(err);
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );

        axios.get(url+'myAlfred/api/payment/cardsActive')
            .then(response => {
                let cards = response.data;
                this.setState({cards:cards});
            })
    }

    payDirect() {
        const total = parseFloat(this.props.total);
        const fees = parseFloat(this.props.fees)*2;
        const data = {
            id_card: this.state.id_card,
            amount: total,
            fees: fees
        };
        axios.post(url+'myAlfred/api/payment/payInDirect',data)
            .then(() => {
                Router.push('/paymentDirectSuccess?id=' +  this.state.booking_id)

            })
            .catch()
    }

    pay(){
        const total = parseFloat(this.props.total);
        const fees = parseFloat(this.props.fees)*2;
        const data = {
            amount: total,
            fees: fees
        };
        axios.post(url+'myAlfred/api/payment/payIn',data)
            .then(res => {
                //axios.put(url +  'myAlfred/api/booking/modifyBooking/' + this.state.booking_id, {status: 'Confirmée'})
                localStorage.setItem('booking_id',this.state.booking_id);
                let payIn = res.data;
                Router.push(payIn.RedirectURL)
            })
    }






    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {cards} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                        <Grid item xs={12} style={{paddingLeft: 55,minHeight: '510px'}}>
                            <Grid container>
                                <h1 style={{color: 'dimgray',fontWeight: '100'}}>Choix du mode de paiement</h1>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} md={6} style={{display: "inline-block"}}>
                                        {cards.length ?
                                        <React.Fragment>

                                                    {/*<Grid container style={{display: 'inline-block'}}>
                                                        <Grid item md={4} sm={4} xs={8}>
                                                    {cards.map((e,index) => (<Tooltip title={e.Alias} placement="right"><Grid container style={{width: '30%'}}><Grid item xs={3}><img style={{width: '17px', height: '17px', marginTop: '17px'}} src="../static/creditcard.svg" alt="creditcard"/></Grid><Grid item xs={9}><p key={index}> carte {index + 1}</p></Grid></Grid></Tooltip>))}
                                                            <p>Autre</p>
                                                        </Grid>
                                                        <Grid item md={2} sm={2} xs={4}>
                                                            <RadioGroup>
                                                                {cards.map((e,index) => (<Radio
                                                                    key={index}
                                                                    checked={this.state.id_card === e.Id}
                                                                    onChange={()=> this.setState({id_card:e.Id,cardSelected: !this.state.cardSelected})}
                                                                    value={e.Id}
                                                                    color={'primary'}
                                                                    name="radio-button-demo"
                                                                    inputProps={{'aria-label': 'A'}}
                                                                    label="yes"
                                                                />))}
                                                                <Radio
                                                                    onChange={()=> this.setState({cardSelected: false})}
                                                                    color={'primary'}
                                                                    value={"other"}
                                                                    name="radio-button-demo1"
                                                                    inputProps={{'aria-label': 'B'}}
                                                                />
                                                            </RadioGroup>
                                                        </Grid>
                                                    </Grid>*/}
                                                    {cards.map((e,index) => (
                                                        <React.Fragment>
                                                           {this.state.id_card === e.Id ?
                                                            <Grid key={index} value={e.Id} onClick={()=>{this.setState({id_card:e.Id});this.setState({cardSelected: true})}} style={{width: '296px',boxShadow: '0px 0px 6px lightgray',border: 'rgb(79, 189, 215) solid 3px', cursor: 'pointer', borderRadius: '16px', margin: '20px', position: 'relative', height: '189px'}}>
                                                                 <Cards
                                                                    expiry={e.ExpirationDate}
                                                                    focused={this.state.focus}
                                                                    name={this.state.name}
                                                                    number={e.Alias.replace(/X/g,'*')}
                                                                    callback={this.handleCallback}
                                                                    preview
                                                                    cvc={'XXX'}
                                                                />
                                                            </Grid>
                                                            :
                                                            <Grid key={index} value={e.Id} onClick={()=>{this.setState({id_card:e.Id});this.setState({cardSelected: true})}} style={{width: '296px',boxShadow: '0px 0px 6px lightgray', cursor: 'pointer', borderRadius: '16px', margin: '20px', position: 'relative', height: '186px'}}>
                                                                <Cards
                                                                    expiry={e.ExpirationDate}
                                                                    focused={this.state.focus}
                                                                    name={this.state.name}
                                                                    number={e.Alias.replace(/X/g,'*')}
                                                                    callback={this.handleCallback}
                                                                    preview
                                                                    cvc={'XXX'}
                                                                />
                                                            </Grid>
                                                            }
                                                            
                                                        
                                                            
                                                        </React.Fragment>
                                                        
                                                    ))}
                                                        {this.state.id_card === this.state.valueother ?
                                                            <Grid value={this.state.valueother} onClick={()=>{this.setState({id_card:"other"});this.setState({cardSelected: false})}} style={{width:'296px', boxShadow: '0px 0px 6px lightgray', height: '40px',border: 'rgb(85, 155, 215) solid 2px', cursor: 'pointer', borderRadius: '5px', margin: '20px', position: 'relative',backgroundColor: '#2FBCD3',color: 'white'}}>
                                                               <p style={{textAlign: "center", lineHeight: 2, position: "absolute", top: 0, left: 0, right: 0, margin: 'auto'}}>Autre</p>
                                                            </Grid>  
                                                            :
                                                            <Grid value={this.state.valueother} onClick={()=>{this.setState({id_card:"other"});this.setState({cardSelected: false})}} style={{width:'296px', boxShadow: '0px 0px 6px lightgray', height: '40px', cursor: 'pointer', borderRadius: '5px', margin: '20px', position: 'relative',backgroundColor: '#2FBCD3',color: 'white'}}>
                                                                <p style={{textAlign: "center", lineHeight: 2, position: "absolute", top: 0, left: 0, right: 0, margin: 'auto'}}>Autre</p>
                                                            </Grid>  
                                                        }
                                                    </React.Fragment>
                                             :

                                            <p>Aucun mode de paiement enregistré</p>

                                        }
                                        
                                        <Grid style={{width:'296px', height: '40px', margin: '20px', position: 'relative'}}>
                                            {this.state.cardSelected ?
                                                <Button onClick={()=>this.payDirect()} type="submit" variant="contained" style={{color: 'white',position: 'absolute', left: 0, right: 0, margin: 'auto', marginBottom: '30px'}} color="primary">
                                                    Payer en 1 clic
                                                </Button>
                                                :
                                                <Button onClick={()=>this.pay()} type="submit" variant="contained" style={{color: 'white',position: 'absolute', left: 0, right: 0, margin: 'auto', marginBottom: '30px'}} color="primary">
                                                    Payer
                                                </Button>
                                            }
                                        </Grid>
                                </Grid>
                                <Grid item xs={6} className={classes.respright}>
                                    <img style={{position: 'sticky', top: 5}} src="../static/resa.svg" alt="beaver"/>
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



export default withStyles(styles)(paymentChoice);
