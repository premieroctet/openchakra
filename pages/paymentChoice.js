import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Footer from '../hoc/Layout/Footer/Footer';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from "@material-ui/core/Radio";
import Tooltip from '@material-ui/core/Tooltip';






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
        }

    }

    static getInitialProps ({ query: { total, fees } }) {
        return { total: total, fees:fees }

    }

    componentDidMount() {

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
                Router.push('/paymentDirectSuccess')

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
                                <Grid item xs={12} md={6}>
                                        {cards.length ?

                                                    <Grid container>
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
                                                    </Grid>
                                             :

                                            <p>Aucun mode de paiement enregistré</p>

                                        }
                                        {this.state.cardSelected ?
                                            <Button onClick={()=>this.payDirect()} type="submit" variant="contained" style={{color: 'white', marginBottom: '30px'}} color="primary">
                                                Payer en 1 clic
                                            </Button>
                                            :
                                            <Button onClick={()=>this.pay()} type="submit" variant="contained" style={{color: 'white', marginBottom: '30px'}} color="primary">
                                                Payer
                                            </Button>
                                        }
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
