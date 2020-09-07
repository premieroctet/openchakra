import React, {Fragment} from 'react';
import Layout from '../hoc/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import Footer from '../hoc/Layout/Footer/Footer';
import Cards from 'react-credit-cards';
import styles from './paymentChoiceCreate/paymentChoiceCreateStyle';
import cookie from 'react-cookies';

moment.locale('fr');

class PaymentChoiceCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            cards: [],
            id_card: '',
            cardSelected: false,
        }

    }

    static getInitialProps ({ query: { id, total, fees } }) {
        return { id: id, total: total, fees:fees }

    }


    componentDidMount() {
        const id = this.props.id;
        this.setState({booking_id: id});


        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = cookie.load('token')
        axios
            .get('/myAlfred/api/users/current')
            .then(res => {
                this.setState({user: res.data});
            })
            .catch(err => {
                    console.error(err);
                    if(err.response.status === 401 || err.response.status === 403) {
                        cookie.remove('token', { path: '/' })
                        Router.push({pathname: '/login'})
                    }
                }
            );

        axios.get('/myAlfred/api/payment/cardsActive')
            .then(response => {
                let cards = response.data;
                this.setState({
                    cards:cards,
                });
                if(cards[0]){
                    this.setState({
                        id_card: cards[0].Id,
                        cardSelected: true
                    })
                }
            })
    }

    payDirect() {
        const total = parseFloat(this.props.total);
        const fees = parseFloat(this.props.fees);
        const data = {
            id_card: this.state.id_card,
            amount: total,
            fees: fees
        };
        axios.post('/myAlfred/api/payment/payInDirectCreate',data)
            .then(() => {
                Router.push('/paymentDirectSuccessCreate?=' + this.state.booking_id)

            })
            .catch()
    }

    pay(){
        const total = parseFloat(this.props.total);
        const fees = parseFloat(this.props.fees);
        const data = {
            amount: total,
            fees: fees
        };
        axios.post('/myAlfred/api/payment/payInCreate',data)
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
                        <Grid item xs={12} className={classes.mainContainerCardPaiment}>
                            <Grid container className={classes.containerTitle}>
                                <h1 className={classes.titleStyle}>Choix du mode de paiement</h1>
                            </Grid>
                            <Grid container>
                                <Grid item className={classes.containerLeft}>
                                    {cards.length ?
                                        <Grid className={classes.flexContainerCard}>
                                            {cards.map((e,index) => (
                                              <Grid>
                                                  {this.state.id_card === e.Id ?
                                                    <Grid key={index} value={e.Id}
                                                          onClick={() => {
                                                              this.setState({ id_card: e.Id });
                                                              this.setState({ cardSelected: true})
                                                          }} style={{
                                                        width: '296px',
                                                        boxShadow: '0px 0px 6px lightgray',
                                                        border: 'rgb(79, 189, 215) solid 3px',
                                                        cursor: 'pointer',
                                                        borderRadius: '16px',
                                                        margin: '20px',
                                                        position: 'relative',
                                                        height: '189px'
                                                    }}>
                                                        <Cards
                                                          expiry={e.ExpirationDate}
                                                          focused={this.state.focus}
                                                          name={this.state.name}
                                                          number={e.Alias.replace(/X/g, '*')}
                                                          callback={this.handleCallback}
                                                          preview
                                                          cvc={'XXX'}
                                                        />
                                                    </Grid>
                                                    :
                                                    <Grid key={index} value={e.Id}
                                                          onClick={() => {
                                                              this.setState({ id_card: e.Id });
                                                              this.setState({ cardSelected: true })
                                                          }} style={{
                                                        width: '296px',
                                                        boxShadow: '0px 0px 6px lightgray',
                                                        cursor: 'pointer',
                                                        borderRadius: '16px',
                                                        margin: '20px',
                                                        position: 'relative',
                                                        height: '186px'
                                                    }}>
                                                        <Cards
                                                          expiry={e.ExpirationDate}
                                                          focused={this.state.focus}
                                                          name={this.state.name}
                                                          number={e.Alias.replace(/X/g, '*')}
                                                          callback={this.handleCallback}
                                                          preview
                                                          cvc={'XXX'}
                                                        />
                                                    </Grid>
                                                  }
                                              </Grid>
                                            ))}
                                        </Grid>
                                        :
                                        <p>Aucun mode de paiement enregistré</p>

                                    }
                                    <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <Grid>
                                            <Button onClick={()=>this.payDirect()} type="submit" variant="contained" className={classes.isSelected} disabled={this.state.cardSelected ? false : true}>
                                                { this.state.cardSelected ? "Payer en 1 clic" : "Selectionner une carte"}
                                            </Button>
                                        </Grid>
                                        <Grid>
                                            <Button variant={"contained"} className={classes.paiementMethode} value={this.state.valueother} onClick={()=>this.pay()}>
                                                Autre moyen de paiement
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.respright}>
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



export default withStyles(styles)(PaymentChoiceCreate);
