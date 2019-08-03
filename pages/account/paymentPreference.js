import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
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






moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 70,
        flexGrow: 1,
    },
    sidebar: {
        border: '0.2px solid lightgrey',
        lineHeight:'4',
        paddingLeft:5,
        paddingRight:5,
        display:'flex'
    },
    item: {
        paddingLeft: 30
    }


});

class paymentPreference extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            clickAdd: false,
            name: '',
            bank: '',
            bic: '',
            iban: '',
            account: {},
            haveAccount: false,


        };
    }

        componentDidMount()
        {

            localStorage.setItem('path', Router.pathname);
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios
                .get(url + 'myAlfred/api/users/current')
                .then(res => {
                    this.setState({user: res.data});
                    if(typeof res.data.account != "undefined") {
                        this.setState({haveAccount: true,account: res.data.account});
                    }
                })
                .catch(err => {
                        console.log(err);
                        if (err.response.status === 401 || err.response.status === 403) {
                            localStorage.removeItem('token');
                            Router.push({pathname: '/login'})
                        }
                    }
                );
        }

        handleClick = () => {
            this.setState({clickAdd: !this.state.clickAdd});
        };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
      e.preventDefault();
      const data = {
        name: this.state.name,
        bank: this.state.bank,
        bic: this.state.bic,
        iban: this.state.iban
      };

      axios.put(url+'myAlfred/api/users/account/rib',data)
          .then(() => {
              alert('RIB ajouté');
              this.setState({clickAdd: false});
              this.componentDidMount();
          })
          .catch(err => {
              console.log(err);
          })
    };


        render()
        {
            const {classes} = this.props;
            const {user} = this.state;
            const {account} = this.state;
            const {clickAdd} = this.state;
            const {haveAccount} = this.state;


            return (
                <Fragment>
                    <Layout>
                        <Grid container className={classes.bigContainer}>

                            <Grid item xs={3} style={{borderRight: '1px solid darkgray'}}>

                                <Grid container style={{justifyContent: 'center'}}>

                                    <Grid item style={{marginTop: 30, width: 270.25}}>
                                        <Link href={'/account/notifications'}>
                                            <div className={classes.sidebar}>
                                                <img src={'../static/smartphone-call.svg'} alt={'user'} width={27}
                                                     style={{marginRight: 4}}/>
                                                <a style={{fontSize: '1.1rem', cursor: "pointer"}}>
                                                    Notifications
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>
                                    <Grid item style={{marginTop: 10, width: 270.25}}>
                                        <Link href={'/account/paymentMethod'}>
                                            <div className={classes.sidebar}>
                                                <img src={'../static/credit-card.svg'} alt={'sign'} width={27}
                                                     style={{marginRight: 4}}/>
                                                <a style={{fontSize: '1.1rem', cursor: "pointer"}}>
                                                    Mode de paiement
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>
                                    <Grid item style={{marginTop: 10, width: 270.25}}>
                                        <Link href={'/account/paymentPreference'}>
                                            <div className={classes.sidebar}>
                                                <img src={'../static/piggy-bank-2.svg'} alt={'picture'} width={27}
                                                     style={{marginRight: 4}}/>
                                                <a style={{fontSize: '1.1rem', cursor: "pointer"}}>
                                                    Préférence de versement
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>

                                    <Grid item style={{marginTop: 10, width: 270.25}}>
                                        <Link href={'/account/transactions'}>
                                            <div className={classes.sidebar}>
                                                <img src={'../static/ascendant-bars-graphic.svg'} alt={'check'}
                                                     width={27} style={{marginRight: 4}}/>
                                                <a style={{fontSize: '1.1rem', cursor: "pointer"}}>
                                                    Historique des transactions
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>

                                    <Grid item style={{marginTop: 10, width: 270.25}}>
                                        <Link href={'/account/security'}>
                                            <div className={classes.sidebar}>
                                                <img src={'../static/locked-padlock.svg'} alt={'comment'} width={27}
                                                     style={{marginRight: 4}}/>
                                                <a style={{fontSize: '1.1rem', cursor: "pointer"}}>
                                                    Sécurité
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>

                                    <Grid item style={{marginTop: 10, width: 270.25}}>
                                        <Link href={'/account/applications'}>
                                            <div className={classes.sidebar}>
                                                <img src={'../static/network.svg'} alt={'speaker'} width={27}
                                                     style={{marginRight: 4}}/>
                                                <a style={{fontSize: '1.1rem', cursor: "pointer"}}>
                                                    Applications connectées
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>
                                    <Grid item style={{marginTop: 10, width: 270.25}}>
                                        <Link href={'/account/parameters'}>
                                            <div className={classes.sidebar}>
                                                <img src={'../static/two-settings-cogwheels.svg'} alt={'speaker'}
                                                     width={27} style={{marginRight: 4}}/>
                                                <a style={{fontSize: '1.1rem', cursor: "pointer"}}>
                                                    Paramètres
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>
                                    <Grid item style={{marginTop: 10, width: 270.25}}>
                                        <Link href={'/account/sponsors'}>
                                            <div className={classes.sidebar}>
                                                <img src={'../static/trophy.svg'} alt={'speaker'} width={27}
                                                     style={{marginRight: 4}}/>
                                                <a style={{fontSize: '1.1rem', cursor: "pointer"}}>
                                                    Parrainage
                                                </a>
                                            </div>
                                        </Link>
                                    </Grid>


                                </Grid>
                            </Grid>


                            <Grid item xs={9} style={{paddingLeft: 55}}>
                                <Grid container>
                                    <h1 style={{color: 'dimgray', fontWeight: '100'}}>Préférence de versement</h1>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <h2 style={{color: 'dimgray', fontWeight: '100'}}>RIB</h2>
                                    </Grid>
                                    <Grid item xs={9} style={{paddingLeft: 20, border: '1px solid lightgrey'}}>
                                        <p>Compte bancaire (par défaut)</p>
                                        {haveAccount ?  <p>{account.name}, {account.iban}</p>:  <p>Aucun rib</p> }

                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <h2 style={{color: '#2FBCD3', fontWeight: '100', cursor: 'pointer'}}
                                            onClick={this.handleClick}>Ajouter un RIB</h2>
                                    </Grid>
                                    {clickAdd ?
                                        <Grid item xs={9}>
                                            <form onSubmit={this.onSubmit}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="outlined-name"
                                                        style={{width: '100%'}}
                                                        value={this.state.name}
                                                        name={'name'}
                                                        onChange={this.onChange}
                                                        margin="normal"
                                                        variant="outlined"
                                                        placeholder={'Nom et prénom du titulaire du compte'}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="outlined-name"
                                                        style={{width: '100%'}}
                                                        value={this.state.bank}
                                                        name={'bank'}
                                                        onChange={this.onChange}
                                                        margin="normal"
                                                        variant="outlined"
                                                        placeholder={'Nom de la banque'}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="outlined-name"
                                                        style={{width: '100%'}}
                                                        value={this.state.bic}
                                                        name={'bic'}
                                                        onChange={this.onChange}
                                                        margin="normal"
                                                        variant="outlined"
                                                        placeholder={'Code SWIFT / BIC'}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="outlined-name"
                                                        style={{width: '100%'}}
                                                        value={this.state.iban}
                                                        name={'iban'}
                                                        onChange={this.onChange}
                                                        margin="normal"
                                                        variant="outlined"
                                                        placeholder={'IBAN'}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} style={{display: "flex", justifyContent: "flex-end"}}>
                                                    <Button size={'large'} type={'submit'} variant="contained" color="primary"
                                                            style={{color: 'white',marginTop: 15}}>
                                                        Ajouter un rib
                                                    </Button>
                                                </Grid>
                                            </form>
                                        </Grid>
                                        : null}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Layout>

                </Fragment>
            );
        }


}



export default withStyles(styles)(paymentPreference);
