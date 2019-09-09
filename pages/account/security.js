import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Footer from '../../hoc/Layout/Footer/Footer';
import { toast } from 'react-toastify';

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

class security extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            password: '',
            newPassword: '',
            check : false,
            checkbuttonvalidate : false,
            testpremier : false,
            last_login: [],
        };
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user, last_login: user.last_login});


            })
            .catch(err =>
                console.log(err)
            );
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        if(e.target.value != '') {
            this.setState({testpremier : true});

        } else {
            this.setState({testpremier: false})
        };
    };

    onChangeNewPassword = e => {
        this.setState({ [e.target.name]: e.target.value });
        if(e.target.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})") != null){
            this.setState({newPassword: e.target.value});
            this.setState({check: false});
            this.setState({checkbuttonvalidate : true});
        } else {
            this.setState({check: true});
            this.setState({checkbuttonvalidate : false});
        }
    }


    onSubmit = e => {
        e.preventDefault();

        const data = {password: this.state.password, newPassword: this.state.newPassword};
        axios
            .put(url+'myAlfred/api/users/profile/editPassword', data)
            .then(res => {
                toast.info('Mot de passe modifié');
                this.componentDidMount();
            })
            .catch(err =>
                console.log(err)
            );
    };











    render() {
        const {classes} = this.props;
        const testpremier = this.state.testpremier ?  <Button type="submit" variant="contained" color="primary"> Valider</Button> :  <Button disabled type="submit" variant="contained" color="primary">Valider</Button>;
        const {last_login} = this.state;


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
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Notifications
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 30,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/notifications'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/smartphone-call.svg'} alt={'smartphone-call'} width={27} style={{marginRight: 4}}/>
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
                                            <img src={'../static/piggy-bank.svg'} alt={'piggy-bank'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Préférence de versement
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/paymentPreference'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/piggy-bank.svg'} alt={'piggy-bank'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem'}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                {/*<Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
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
                                </Grid>*/}

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/account/security'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/locked-padlock-2.svg'} alt={'locked-padlock'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Sécurité
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/security'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/locked-padlock-2.svg'} alt={'locked-padlock'} width={27} style={{marginRight: 4}}/>
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
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Paramètres
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/account/parameters'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/two-settings-cogwheels.svg'} alt={'settings'} width={27} style={{marginRight: 4}}/>
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
                            <h1 style={{color: 'dimgray',fontWeight: '100'}}>Securité</h1>

                            <Grid>
                                <Grid item style={{ display: 'flex', justifyContent: 'left' }}>
                                    <h2 style={{ fontWeight: '100' }}>Modifier mon mot de passe</h2>
                                </Grid>
                                <Grid item xs={7}>
                                <p>

                                    Pour la sécurité de votre compte, votre mot de passe doit contenir au minimum 8 caractères dont
                                    une majuscule, une minuscule, un chiffre et un caractère spécial.


                                </p>
                                </Grid>
                                <form onSubmit={this.onSubmit}>
                                    <Grid item>
                                        <TextField
                                            id="standard-with-placeholder"
                                            margin="normal"
                                            label={"Mot de passe actuel"}
                                            placeholder={"Mot de passe actuel"}
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                        />
                                    </Grid>

                                    {/*test pour la validation*/}
                                    {/*{this.state.testpremier ? <p>c'est remplis </p> : <p>c'est pas remplis</p>}*/}


                                    <Grid item>
                                        <TextField
                                            id="standard-with-placeholder"
                                            margin="normal"
                                            label={"Nouveau mot de passe"}
                                            placeholder={"Nouveau mot de passe"}
                                            type="password"
                                            name="newPassword"
                                            value={this.state.newPassword}
                                            onChange={this.onChangeNewPassword}
                                        />
                                    </Grid>
                                    {this.state.check ? <p style={{color : 'red'}}>Mot de passe invalide</p> : null}

                                    <Grid item style={{ display: 'flex', justifyContent: 'left', marginTop: 30 }}>

                                        {this.state.checkbuttonvalidate  ?
                                            testpremier
                                            :
                                            <Button disabled type="submit" variant="contained" style={{color: 'white'}} color="primary">
                                                Valider
                                            </Button>
                                        }
                                    </Grid>
                                </form>

                                <Grid item style={{ display: 'flex', justifyContent: 'left' }}>
                                    <h2 style={{ fontWeight: '100' }}>Dernières connexions : </h2>
                                </Grid>
                                <Grid item style={{display: 'flex', border:'1px darkgray solid', padding: 25, maxWidth: '50%'}}>
                                    <Grid container>
                                        {last_login.map((e,index)=>(
                                            <Grid key={index} item xs={12}>
                                                <p>{moment(e).format('LLLL')}</p>
                                                <hr />
                                            </Grid>
                                        ))}


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



export default withStyles(styles)(security);
