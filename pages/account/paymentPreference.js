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
import Footer2 from '../../hoc/Layout/Footer/Footer2';






moment.locale('fr');

const { config } = require('../../config/config');
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

class paymentPreference extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            clickAdd: false,
            clickEdit: false,
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
                        this.setState({name: res.data.account.name,bank: res.data.account.bank,bic: res.data.account.bic,
                                            iban: res.data.account.iban});
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

    handleClick2 = () => {
        this.setState({clickEdit: !this.state.clickEdit});
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
          .then(res => {
              toast.info('RIB ajouté');
              this.setState({user: res.data});
              this.setState({haveAccount: true,account: res.data.account});

              this.setState({clickAdd: false});

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
            const {clickEdit} = this.state;
            const {haveAccount} = this.state;
            const editfooter = clickEdit ? <Footer/> :<Footer2/>;
            const addfooter = clickAdd ? <Footer/> :<Footer2/>;


            return (
                <Fragment>
                    <Layout>
                        <Grid container className={classes.bigContainer}>

                        <Grid className={classes.toggle}  item xs={3} style={{}}>
                         
                         <div className={classes.trigger}></div>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Notifications
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 30,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a  style={{fontSize: '1.1rem'}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                {/*<Grid item style={{marginTop: 10}} className={classes.hidesm}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mode de paiement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/account/paymentMethod'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/credit-card.svg'} alt={'credit-card'} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>*/}
                                
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/piggy-bank-2.svg'} alt={'piggy-bank'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Préférence de versement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/piggy-bank-2.svg'} alt={'piggy-bank'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/ascendant-bars-graphic.svg'} alt={'ascendant-bars'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Historique des transactions
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/transactions'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/ascendant-bars-graphic.svg'} alt={'ascendant-bars'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                                
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/security'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Sécurité
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/security'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/locked-padlock.svg'} alt={'locked-padlock'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                {/*<Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/applications'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/network.svg'} alt={'network'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Applications connectées
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/applications'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/network.svg'} alt={'network'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>*/}

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Paramètres
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                {/*<Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/sponsors'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/trophy.svg'} alt={'trophy'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Parrainage
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/sponsors'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/trophy.svg'} alt={'trophy'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>*/}

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
                                    <Grid item xs={3}>
                                        {haveAccount ?
                                            <h2 style={{color: '#2FBCD3', fontWeight: '100', cursor: 'pointer'}}
                                                onClick={this.handleClick2}>Modifier le RIB</h2>
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
                                                        value={this.state.name}
                                                        name={'name'}
                                                        onChange={this.onChange}
                                                        margin="normal"
                                                        variant="outlined"
                                                        placeholder={'Nom et prénom du titulaire du compte'}
                                                        label={'Nom et prénom du titulaire du compte'}
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
                                                        label={'Nom de la banque'}
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
                                                        label={'Code SWIFT / BIC'}
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
                                                        label={'IBAN'}
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
                                        </Grid>
                                        : null}
                                    {clickEdit ?
                                        <Grid container>
                                        <Grid item xs={9} >
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
                                                        label={'Nom et prénom du titulaire du compte'}
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
                                                        label={'Nom de la banque'}
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
                                                        label={'Code SWIFT / BIC'}
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
                                                        label={'IBAN'}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} style={{display: "flex", justifyContent: "flex-end",marginBottom:20}}>
                                                    <Button size={'large'} type={'submit'} variant="contained" color="primary"
                                                            style={{color: 'white',marginTop: 15}}>
                                                        Modifier
                                                    </Button>
                                                </Grid>
                                            </form>
                                        </Grid>
                                        </Grid>
                                        : null}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Layout>
                    {haveAccount ? editfooter : addfooter}
                </Fragment>
            );
        }


}



export default withStyles(styles)(paymentPreference);
