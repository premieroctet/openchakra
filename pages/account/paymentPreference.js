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
import { toast } from 'react-toastify';
import Footer from '../../hoc/Layout/Footer/Footer';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
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
    }


});

class paymentPreference extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            clickAdd: false,
            clickDelete: false,
            accounts: [],
            haveAccount: false,
            bic: '',
            iban: '',


        };
    }

        componentDidMount()
        {
            localStorage.setItem('path', Router.pathname);
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios
                .get('/myAlfred/api/users/current')
                .then(res => {
                    this.setState({user: res.data});

                })
                .catch(err => {
                        if (err.response.status === 401 || err.response.status === 403) {
                            localStorage.removeItem('token');
                            Router.push({pathname: '/login'})
                        }
                    }
                );
            axios.get('/myAlfred/api/payment/activeAccount')
                .then(response => {
                    let accounts = response.data;
                    if(accounts.length){
                        this.setState({haveAccount: true, accounts: accounts})
                    }
                })
        }

        handleClick = () => {
            this.setState({clickAdd: !this.state.clickAdd});
        };

    handleClick2 = () => {
        this.setState({clickDelete: !this.state.clickDelete});
    };

    handleClose() {
        this.setState({clickDelete:false});
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
      e.preventDefault();
      const data = {
        bic: this.state.bic,
        iban: this.state.iban
      };

      axios.post('/myAlfred/api/payment/bankAccount',data)
          .then(res => {
              toast.info('RIB ajouté');

              this.setState({clickAdd: false});
              axios.get('/myAlfred/api/payment/activeAccount')
                  .then(response => {
                      let accounts = response.data;
                      if(accounts.length){
                          this.setState({haveAccount: true, accounts: accounts})
                      }
                  })

          })
          .catch()
    };

    deleteAccount(id){
        const data = {
            id_account: id
        };
        axios.put('/myAlfred/api/payment/account',data)
            .then(() => {
                toast.error('Compte bancaire supprimé');
                this.refresh();
            })
            .catch(() => {
                toast.error('Un erreur est survenue')
            })

    }

    refresh() {
        this.setState({clickDelete: false,haveAccount: false});
        axios.get('/myAlfred/api/payment/activeAccount')
            .then(response => {
                let accounts = response.data;
                if(accounts.length){
                    this.setState({haveAccount: true, accounts: accounts})
                }
            })
    }


        render()
        {
            const {classes} = this.props;
            const {user} = this.state;
            const {accounts} = this.state;
            const {clickAdd} = this.state;
            const {clickDelete} = this.state;
            const {haveAccount} = this.state;
            const editfooter = <Footer/>
            const addfooter = <Footer/>


            return (
                <Fragment>
                  <Helmet>
                    <title>compte - Préférences de versement - My Alfred </title>
                    <meta property="description" content="My Alfred, des services entre particuliers et auto-entrepreneurs rémunérés ! Choisissez vos méthodes de versement de vos rémunérations pour chacun des services réalisés. Versement 72h après la prestation." />
                  </Helmet>
                    <Layout>
                        <Grid container className={classes.bigContainer} style={{minHeight:530}}>

                        <Grid className={classes.toggle}  item xs={3} style={{}}>

                         <div className={classes.trigger}></div>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Notifications
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 30,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a  style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}} className={classes.hidesm}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mode de paiement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} height={70} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/piggy-bank-2.svg'} alt={'piggy-bank'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Préférence de versement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/piggy-bank-2.svg'} alt={'piggy-bank'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/ascendant-bars-graphic.svg'} alt={'ascendant-bars'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Historique des transactions
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/ascendant-bars-graphic.svg'} alt={'ascendant-bars'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/security'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Sécurité
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/security'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidesm}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Paramètres
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 275.25}} className={classes.hidelg}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>

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
                                        {haveAccount ?  <p>{accounts[0].OwnerName}, {accounts[0].IBAN}</p>:  <p>Aucun rib</p> }

                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={3}>
                                        {haveAccount ?
                                            <h2 style={{color: '#2FBCD3', fontWeight: '100', cursor: 'pointer'}}
                                                onClick={()=>this.handleClick2()}>Supprimer le RIB</h2>
                                            :
                                        <h2 style={{color: '#2FBCD3', fontWeight: '100', cursor: 'pointer'}}
                                            onClick={this.handleClick}>Ajouter un RIB</h2>}
                                    </Grid>
                                    {clickAdd ?
                                        <Grid container>
                                        <Grid item xs={9} style={{marginBottom: '25%'}}>
                                            <form onSubmit={this.onSubmit}>
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
                                                        label={'IBAN'}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        style={{width: '100%'}}
                                                        value={this.state.bic}
                                                        name={'bic'}
                                                        onChange={this.onChange}
                                                        margin="normal"
                                                        variant="outlined"
                                                        placeholder={'Code SWIFT / BIC'}
                                                        label={'Code SWIFT / BIC'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} style={{display: "flex", justifyContent: "flex-end"}}>
                                                    <Button size={'large'} type={'submit'} variant="contained" color="primary"
                                                            style={{color: 'white',marginTop: 15}}>
                                                        Ajouter le rib
                                                    </Button>
                                                </Grid>
                                            </form>
                                        </Grid>
                                        </Grid>
                                        : null}
                                    {clickDelete ?
                                        <Dialog
                                            open={this.state.clickDelete}
                                            onClose={()=>this.handleClose()}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"Voulez-vous vraiment supprimer votre RIB ?"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Si vous supprimez votre RIB vous ne pourrez plus l'utiliser par la suite avec ce compte.
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={()=>this.handleClose()} color="primary">
                                                    Annuler
                                                </Button>
                                                <Button onClick={()=>this.deleteAccount(accounts[0].Id)} color="secondary" autoFocus>
                                                    Supprimer
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                        : null}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Layout>
                  {/* <Footer/>*/}

                </Fragment>
            );
        }


}



export default withStyles(styles)(paymentPreference);
