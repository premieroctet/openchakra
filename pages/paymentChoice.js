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
import Radio from "@material-ui/core/Radio";






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
                                {cards.length ?

                                    cards.map((e,index) => (
                                        <Grid container key={index}>
                                            <p>{e.Alias}</p>
                                            <Radio
                                                checked={this.state.id_card === e.Id}
                                                onChange={()=> this.setState({id_card:e.Id,cardSelected: !this.state.cardSelected})}
                                                value={e.Id}
                                                color={'primary'}
                                                name="radio-button-demo"
                                                inputProps={{ 'aria-label': 'A' }}
                                            />
                                        </Grid>
                                    )) :

                                    <p>Aucun mode de paiement enregistré</p>

                                }
                            </Grid>
                            <Grid container>
                                {this.state.cardSelected ?
                                    <Button onClick={()=>this.payDirect()} type="submit" variant="contained" style={{color: 'white'}} color="primary">
                                        Payer en 1 clic
                                    </Button>
                                    :
                                    <Button onClick={()=>this.pay()} type="submit" variant="contained" style={{color: 'white'}} color="primary">
                                        Payer
                                    </Button>
                                }

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
