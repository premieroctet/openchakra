import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { TextField } from '@material-ui/core';
import Footer2 from '../../hoc/Layout/Footer/Footer2';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import Modal from '@material-ui/core/Modal';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LocalSeeIcon from '@material-ui/icons/LocalSee';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },

    containerheader:{
        [theme.breakpoints.down('sm')]: {
            width:'100%!important',
            marginTop:'-79px',
        }},
    bottombar:{
        visibility:'hidden',
        [theme.breakpoints.down('sm')]: {
            visibility:'visible',
            boxShadow: '2px -5px 14px -15px rgba(0,0,0,0.75)'
        }},
    topbar:{
        visibility:'visible',
        position: 'sticky',
        top: 64,
        zIndex:999,
        [theme.breakpoints.down('sm')]: {
            visibility:'hidden',
        }},
    containermain:{
        width:'100%',
        display: 'flex',
        height:'100%',
        [theme.breakpoints.down('sm')]: {
            padding:'2%',
            paddingLeft:'2%'
        }},
    tabscontainer:{
        width:'50%',
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '1%',
        [theme.breakpoints.down('sm')]: {
            width:'100%',
        }
        },
    tabweb:{
        visibility:'visible',
        width:'100%',
        position:'sticky',
        top:'114px',
        fontSize:15,
        backgroundColor:'white',
        zIndex:'1',
        [theme.breakpoints.down('sm')]: {
            visibility:'hidden'
        }
        },
    tabmobile:{
        display:'none',
        [theme.breakpoints.down('sm')]: {
            display:'inherit',
            fontSize:'10px',
            fontWeight:'300',
            marginTop:'-100px',
            backgroundColor:'white',
            position:'sticky',
            top:55,
            zIndex:20
        }
        },

    bgimage: {
        width:'100%',
        backgroundColor:'transparent',
        backgroundSize:'contain',
        backgroundRepeat:'no-repeat',
        height:'100%',
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
        },
    addweb:{
        marginTop: '2%',
        display:'flex',
        flexDirection: 'row-reverse',
        marginRight: '20%',
        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
        }
        },
    mobile:{
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    notmobile:{
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    marginbot: {
        marginBottom: '1%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'

},
    hiddenone: {
        [theme.breakpoints.down('sm')]: {
            display: 'none!important',
        },
    },
    revealedone: {
        [theme.breakpoints.up('md')]: {
            display: 'none!important',
        },
    },
    trait:{
        width: '100%',
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent',
        [theme.breakpoints.down('sm')]: {
        },
    },
    trait1:{
        width: '100%',
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait2:{
        width: '100%',
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent',
    },
    trait3:{
        width: '100%',

        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    paper: {
        position: 'absolute',
        width: '80%',
        backgroundColor: 'white',
        border: '2px solid #000',

    },
    resppic:{
        [theme.breakpoints.down('sm')]: {
            top: '17%!important',
        }
    },
    respimg:{
        [theme.breakpoints.down('sm')]: {
            width:'100%',
        }
    },
    buttonAddService : {
        color: 'white'
    },
    responsiveCard: {
        display:'flex',
        alignItems:'center',
        border: '1px solid lightgray',
        padding: '15px 15px 15px 15px',
        width:'80%',
        [theme.breakpoints.down('sm')]: {
            width:'100%',
        }
    },
    buttonSave: {
        display:'flex',
        justifyContent:'flex-end',
        width:'100%',
        bottom:0,
        alignItems:"center",
        height:60
    },
    responsiveBg:{
        width:'50%',
        position: 'sticky',
        top: '224px',
        height: '50%',
        zIndex: '-1',
        [theme.breakpoints.down('sm')]: {
            display:'none',
        }
    }
});

class services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            shop: {},
            serviceUser: [],
            tabs: false,
            booking_request: true,
            my_alfred_conditions: true,
            profile_picture: false,
            identity_card: false,
            recommandations: false,
            flexible_cancel: false,
            moderate_cancel: false,
            strict_cancel: false,
            no_booking_request: false,
            welcome_message: '',
            open: false,
            banner: [],
            open2: false,
            id_service: '',
        };
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                if(user.is_alfred === false) {
                    Router.push('/creaShop/creaShop');
                } else {
                    this.setState({user:user});

                    axios.get(url+'myAlfred/api/shopBanner/all')
                        .then(response => {
                            let banner = response.data;

                            this.setState({banner: banner})
                        })
                        .catch(err =>{console.log(err)});

                    axios
                        .get(url+'myAlfred/api/shop/currentAlfred')
                        .then(res => {
                            let shop = res.data;
                            this.setState({shop:shop,booking_request: shop.booking_request, no_booking_request:shop.no_booking_request,my_alfred_conditions: shop.my_alfred_conditions,
                                profile_picture: shop.profile_picture, identity_card: shop.identity_card, recommandations: shop.recommandations,
                                flexible_cancel: shop.flexible_cancel, moderate_cancel: shop.moderate_cancel, strict_cancel: shop.strict_cancel,
                                welcome_message: shop.welcome_message});
                        })
                        .catch(err =>
                            console.log(err)
                        );

                    axios
                        .get(url+'myAlfred/api/serviceUser/currentAlfred')
                        .then(res => {
                            let serviceUser = res.data;
                            this.setState({serviceUser: serviceUser});
                        })
                        .catch(err =>
                            console.log(err)
                        );
                }
            })
            .catch(err => {
                    console.log(err);
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );
    }

    handleClickOpen(id) {
        this.setState({id_service: id, open2:true});
    }

    handleClose2() {
        this.setState({id_service:'', open2:false});
    }

    handleOpen = () => {
        this.setState({open:true});
    };

    handleClose = () => {
        this.setState({open:false});
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleChange2 = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleChangeBr = () => {
        this.setState({no_booking_request: false, booking_request: true})
    };

    handleChangeNbr = () => {
        this.setState({ no_booking_request: true, booking_request: false });
    };

    handleChangeF = () => {
        this.setState({ flexible_cancel: true, moderate_cancel: false,strict_cancel: false });
    };

    handleChangeM = () => {
        this.setState({ flexible_cancel: false, moderate_cancel: true,strict_cancel: false });
    };

    handleChangeS = () => {
        this.setState({ flexible_cancel: false, moderate_cancel: false,strict_cancel: true });
    };

    onSubmit =() => {
        const booking_request = this.state.booking_request;
        const no_booking_request = this.state.no_booking_request;
        const my_alfred_conditions = this.state.my_alfred_conditions;
        const profile_picture = this.state.profile_picture;
        const identity_card = this.state.identity_card;
        const recommandations = this.state.recommandations;
        const welcome_message = this.state.welcome_message;
        const flexible_cancel = this.state.flexible_cancel;
        const moderate_cancel = this.state.moderate_cancel;
        const strict_cancel = this.state.strict_cancel;

        axios.put(url+'myAlfred/api/shop/editParameters',{booking_request,no_booking_request,my_alfred_conditions,profile_picture,identity_card,
            recommandations,welcome_message,flexible_cancel,moderate_cancel,strict_cancel})
            .then(() => {
                toast.info('Paramètres modifiés')
            })
            .catch(err => console.log(err))
    };

    handleClicktabs2 =() => {
        this.setState({ tabs: true });
    };

    handleClicktabs =() => {
        this.setState({ tabs: false });
    };

    deleteService(id) {
        axios.delete(url + 'myAlfred/api/serviceUser/' + id)
            .then(() => {
                toast.error('Service supprimé');
                this.setState({open2:false,id_service:''});
                this.componentDidMount();
            })
            .catch(err => console.log(err))

    }

    onSubmitBanner = e =>{
        e.preventDefault();
        const data = {picture: e.target.label.value};

        axios.put(url+'myAlfred/api/shop/editBanner',data)
            .then(res => {
                toast.info('Photo modifiée');
                this.setState({open:false});
                this.componentDidMount();
            })
            .catch(err => {
                console.log(err)
            })
    };

    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {serviceUser} = this.state;
        const tabs = this.state.tabs;
        const {banner} = this.state;

        const image = banner.map((e,index) => (
            <div key={index}>
                <img src={`../../../${e.picture}`} alt={e.label} />
                <div className="legend">
                    <p>{e.label}</p>
                    <form onSubmit={(event)=>this.onSubmitBanner(event)}><input type='hidden' value={e.picture} name='label'/><button type='submit'>Choisir</button></form>
                </div>
            </div>
        ));

        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container className={classes.topbar} justify="center" style={{backgroundColor: '#4fbdd7',marginTop: -3}}>

                            <Grid item xs={2} style={{textAlign:"center",borderBottom: '2px solid white'}}>
                                <Link href={'/myShop/services'}><a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Ma boutique</p></a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <Link href={'/myShop/messages'}><a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Messages</p></a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <Link href={'/myShop/mesreservations'}><a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Mes réservations</p></a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center",zIndex:999}}>
                                <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Mon calendrier</p></a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <Link href={'/myShop/performances'}><a style={{textDecoration:'none'}}>
                                    <p style={{color: "white",cursor: 'pointer'}}>Performance</p></a>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.containerheader} style={{backgroundImage: `url('../../${this.state.shop.picture}')`,backgroundPosition: "center", height:'42vh',
                            backgroundSize:"cover", backgroundRepeat:"no-repeat",justifyContent:"center",alignItems:"center"}}>
                        </Grid>
                        <Grid item>
                            <img src={'../'+user.picture} className={classes.resppic} style={{borderRadius: '50%',position:'absolute',top:'27%',left:'0',right:'0',marginLeft:'auto',marginRight:'auto', minWidth: '137px', maxWidth: '137px', maxHeight: '137px', minHeight: '137px',zIndex:501, objectFit: 'cover'}}  alt={'picture'}/>
                        </Grid>
                        <Grid item style={{position:"absolute",left:'3%',top:'20%',zIndex:502}}>
                            <LocalSeeIcon onClick={()=>this.handleOpen()} style={{cursor:'pointer',color:"white",width:40}}/>
                        </Grid>
                        <Grid item style={{position:"absolute",right:'3%',top:'20%',zIndex:502}}>
                            <Link href={'/myShop/shopPreview?id_alfred=' + this.state.user._id}><a style={{textDecoration: 'none',color: 'white',cursor:'pointer',fontWeight: '600',fontSize: '1.15rem'}}><VisibilityIcon><p>Aperçu</p></VisibilityIcon></a></Link>
                        </Grid>
                        <Grid container className={classes.tabweb}>
                            <Grid item xs={6} style={{textAlign:"center"}}>
                                <div>
                                    <h2 onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '0%',position: 'sticky'}}> Mes services</h2>
                                </div>
                            </Grid>
                            <Grid item xs={6} >
                                <h2 onClick={this.handleClicktabs2}  style={{color:'#828181',fontWeight: '100', textAlign: 'center',cursor: 'pointer'}}> Mes paramètres de réservation</h2><br/>
                            </Grid>
                            <Grid item xs={6}>
                                {tabs ?
                                    <React.Fragment>
                                        <hr className={classes.trait1}/>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <hr className={classes.trait3}/>
                                    </React.Fragment>}
                            </Grid>
                            <Grid item xs={6}>
                                {tabs ?
                                    <React.Fragment>
                                        <hr className={classes.trait} />
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <hr className={classes.trait2} />
                                    </React.Fragment>}
                            </Grid>
                        </Grid>
                        <Grid container className={classes.tabmobile}>
                            <Grid item xs={6} style={{textAlign:"center"}}>
                                <h2 onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '25%'}}> Mes services</h2>
                            </Grid>
                            <Grid item xs={6} >
                                <h2 onClick={this.handleClicktabs2}  style={{color:'#828181',fontWeight: '100', textAlign: 'center',cursor: 'pointer'}}>Réservation</h2><br/>
                            </Grid>
                            <Grid item xs={6} style={{textAlign:"center"}}>
                                {tabs ?
                                    <React.Fragment>
                                        <hr className={classes.trait1}/>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <hr className={classes.trait3}/>
                                    </React.Fragment>}
                            </Grid>
                            <Grid item xs={6} >
                                {tabs ?
                                    <React.Fragment>
                                        <hr className={classes.trait}/>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <hr className={classes.trait2}/>
                                    </React.Fragment>}
                            </Grid>
                        </Grid>
                        <Grid className={classes.containermain}>
                            <Grid className={classes.tabscontainer}>
                                {tabs ?
                                    <Grid style={{width:'90%', display:'flex', flexDirection:'column', padding:'2%'}}>
                                        <Grid item xs={12} >
                                            <h2 style={{fontWeight: '100'}}>Comment les utilisateurs peuvent réserver ? </h2>
                                        </Grid>
                                        <Grid>
                                            <Grid className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.booking_request}
                                                        onChange={this.handleChangeBr}
                                                        value={'booking_request'}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked />}
                                                        checkedIcon={<RadioButtonCheckedIcon/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <p>Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H. </p>
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.no_booking_request}
                                                        onChange={this.handleChangeNbr}
                                                        value={'no_booking_request'}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked/>}
                                                        checkedIcon={<RadioButtonCheckedIcon />}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <p>Les utilisateurs peuvent réserver mes services directement sans demande de réservation.  </p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <hr style={{backgroundColor: 'darkgray'}}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h2 style={{fontWeight: '100'}}>Vos conditions de réservation </h2>
                                        </Grid>
                                        <p style={{fontWeight: '100'}}>Il se peut que vous ayez moins de réservation si vous ajoutez des conditions. Les personnes qui ne répondent pas à vos critères peuvent quand même vous envoyer une demande. </p>
                                        <Grid container>
                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.my_alfred_conditions}
                                                        onChange={this.handleChange('my_alfred_conditions')}
                                                        value={'my_alfred_conditions'}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked/>}
                                                        checkedIcon={<RadioButtonCheckedIcon/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{fontWeight: '100', lineHeight: '0!important'}}>Conditions My-Alfred</h4>
                                                    <p>Adresse email et numéro de téléphone confirmés
                                                    </p>
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.profile_picture}
                                                        onChange={this.handleChange('profile_picture')}
                                                        value={'profile_picture'}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked/>}
                                                        checkedIcon={<RadioButtonCheckedIcon />}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{fontWeight: '100', lineHeight: '0!important'}}>Photo de profil</h4>
                                                    <p>Ces utilisateurs ont fourni une photo de profil.</p>
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.identity_card}
                                                        onChange={this.handleChange('identity_card')}
                                                        value={'identity_card'}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked/>}
                                                        checkedIcon={<RadioButtonCheckedIcon />}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{fontWeight: '100', lineHeight: '0!important'}}>Pièce d'identité<span className={classes.hiddenone}> officielle</span></h4><h4 style={{fontWeight: '100', lineHeight: '0.5!important'}} className={classes.revealedone}>officielle</h4>
                                                    <p>Ces utilisateurs ont vérifié leur pièce d'identité.</p>
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.recommandations}
                                                        onChange={this.handleChange('recommandations')}
                                                        value={'recommandations'}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked/>}
                                                        checkedIcon={<RadioButtonCheckedIcon/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{fontWeight: '100', lineHeight: '0!important'}}>Recommandations<span className={classes.hiddenone}> d'autres Alfred</span></h4><h4 style={{fontWeight: '100', lineHeight: '0.5!important'}} className={classes.revealedone}>d'autres Alfred</h4>
                                                    <p>Ces utilisateurs ont déjà utilisé des services avec My-Alfred, sont recommandés par d'autres Alfred et non pas reçu de commentaires négatifs.</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <hr style={{backgroundColor: 'darkgray'}}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h2 style={{fontWeight: '100'}}>Votre message de bienvenue validant votre réservation </h2>
                                        </Grid>
                                        <p style={{fontWeight: '100'}}>Les utilisateurs recevront votre message lorsque vous confirmerez leur réservation. </p>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="outlined-multiline-static"
                                                multiline
                                                value={this.state.welcome_message}
                                                name={'welcome_message'}
                                                onChange={this.handleChange2}
                                                rows="6"
                                                margin="normal"
                                                variant="outlined"
                                                style={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <hr style={{backgroundColor: 'darkgray'}}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h2 style={{fontWeight: '100'}}>Vos conditions d’annulation </h2>
                                        </Grid>
                                        <p style={{fontWeight: '100'}}>Choisissez vos conditions en cas d'annulation de la part des utilisateurs.</p>
                                        <Grid container style={{marginTop: '2%'}}>
                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.flexible_cancel}
                                                        onChange={this.handleChangeF}
                                                        value={'flexible_cancel'}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked/>}
                                                        checkedIcon={<RadioButtonCheckedIcon />}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{fontWeight: '100', lineHeight: '0!important'}}>Flexibles </h4>
                                                    <p>Remboursement intégral jusqu'à 1 jour avant la prestation</p>
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.moderate_cancel}
                                                        onChange={this.handleChangeM}
                                                        value={'moderate_cancel'}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked/>}
                                                        checkedIcon={<RadioButtonCheckedIcon />}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{fontWeight: '100', lineHeight: '0!important'}}>Modérées</h4>
                                                    <p>Remboursement intégral jusqu'à 5 jours avant la prestation</p>
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.strict_cancel}
                                                        onChange={this.handleChangeS}
                                                        value={'strict_cancel'}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked/>}
                                                        checkedIcon={<RadioButtonCheckedIcon />}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{
                                                        fontWeight: '100',
                                                        lineHeight: '0!important'
                                                    }}>
                                                        Strictes
                                                    </h4>
                                                    <p>
                                                        Remboursement intégral jusqu'à 10 jours avant la prestation.
                                                    </p>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={12}>
                                                {tabs ?
                                                    <div className={classes.buttonSave}>
                                                        <Button size={'medium'}
                                                                type={'button'}
                                                                onClick={this.onSubmit}
                                                                variant="contained"
                                                                color="secondary"
                                                                style={{
                                                                    color: 'white',
                                                                    maxHeight:40
                                                                }}>
                                                            Enregistrer
                                                        </Button>
                                                    </div>: null}
                                            </Grid>
                                        </Grid>
                                    </Grid>:
                                  <React.Fragment>
                                    {serviceUser.map((e,index)=> (
                                        <React.Fragment key={index}>
                                            <Grid className={classes.mobile}>
                                                <h3 style={{color: '#505050'}}>{e.service.category.label}</h3>
                                            </Grid>
                                            <Grid container>
                                                <Grid className={classes.notmobile} style={{marginLeft: 90, backgroundColor: 'white'}}>
                                                    <h3 style={{color: '#505050'}}>{e.service.category.label}</h3>
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.responsiveCard}>
                                                <Grid item md={3} xs={12} style={{ borderBottom : '150px', borderLeft : '150px', cursor: 'pointer'}}>
                                                    <Link /*href={'/myShop/previewService?id='+e._id}*/>
                                                        <img className={classes.respimg} src={'../../'+e.service.picture} alt={'picture'} width={'85%'}/>
                                                    </Link>
                                                </Grid>
                                                <Grid item md={6} xs={9}>
                                                    <h4 style={{fontWeight: 'bolder',fontSize: 18,color: '#737373'}}>{e.service.label}</h4>
                                                    <p style={{fontSize: 14}}>{e.prestations.length} Prestation(s) proposée(s)</p>
                                                    <p style={{fontSize: 14}}>{e.number_of_views} Vue(s) du service</p>
                                                </Grid>
                                                <Grid item xs={3} style={{display:"flex", justifyContent:"flex-end"}}>
                                                    <Link href={'/myShop/editService?id='+e._id}>
                                                        <a style={{cursor: 'pointer',textDecoration:'none',height:'fit-content'}}>
                                                            <h4 style={{paddingRight: 7,fontWeight: 'bolder',fontSize: 16,color:'#3CBED4',marginTop:0,cursor:"pointer"}}>
                                                                <EditIcon  style={{cursor: 'pointer',width:22, height:22 }}/>
                                                            </h4>
                                                        </a>
                                                    </Link>
                                                    <a style={{cursor: 'pointer',textDecoration:'none',height:'fit-content'}}>
                                                        <h4 style={{fontWeight: 'bolder',fontSize: 16,color:'#F8727F',marginTop:0,cursor:"pointer"}}>
                                                            <DeleteIcon onClick={()=>this.handleClickOpen(e._id)}  style={{cursor: 'pointer',width:22, height:22 }}/>
                                                        </h4>
                                                    </a>
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>))}
                                            <Grid container className={classes.addweb}>
                                                <Grid>
                                                    <Link href={'/myShop/addService'}>
                                                        <Button
                                                          variant="contained"
                                                          className={classes.buttonAddService}
                                                          color="primary"
                                                          startIcon={<AddCircleOutlineIcon />}
                                                        >
                                                            Ajouter un nouveau service
                                                        </Button>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                  </React.Fragment>
                                }
                            </Grid>
                            <Grid className={classes.responsiveBg}>
                                <div>
                                    <img className={classes.bgimage} alt="background" src={'../../static/servicesbg.png'}/>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Footer2 />
                    </Grid>
                    <Grid container className={classes.bottombar} justify="center" style={{backgroundColor: 'white',bottom:0, position:'fixed', zIndex:'999'}}>

                        <Grid item xs={2} style={{textAlign:"center", borderBottom: '3px solid #4fbdd7'}}>
                            <Link href={'/myShop/services'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/shopping-bag.png'} alt={'sign'} width={25} style={{opacity:'0.5'}}/></p></a>
                            </Link>
                        </Grid>

                        <Grid item xs={2} style={{textAlign:"center"}}>
                            <Link href={'/myShop/messages'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speech-bubble.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                            </a></Link>
                        </Grid>

                        <Grid item xs={2} style={{textAlign:"center"}}>
                            <Link href={'/myShop/mesreservations'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/event.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                            </a></Link>
                        </Grid>

                        <Grid item xs={2} style={{textAlign:"center",zIndex:999}}>
                            <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/calendar.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                            </a></Link>
                        </Grid>

                        <Grid item xs={2} style={{textAlign:"center"}}>
                            <Link href={'/myShop/performances'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}><img src={'../static/speedometer.png'} alt={'sign'} width={25} style={{opacity:'0.7'}}/></p>
                            </a></Link>
                        </Grid>

                    </Grid>
                    <Modal
                        style={{zIndex: 9999}}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <div style={{
                            top: `50%`,
                            left: `50%`,
                            transform: `translate(-50%, -50%)`
                        }}
                             className={classes.paper}>
                            <Carousel>
                                {image}
                            </Carousel>
                        </div>
                    </Modal>
                </Layout>

                <Dialog
                  open={this.state.open2}
                  onClose={()=>this.handleClose2()}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Supprimer un service"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Voulez-vous vraiment supprimer ce service de votre boutique ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose2()} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={()=>this.deleteService(this.state.id_service)} color="secondary" autoFocus>
                            Supprimer
                        </Button>
                    </DialogActions>
                </Dialog>

            </Fragment>
        );
    };
}



export default withStyles(styles)(services);



