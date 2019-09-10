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
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import Footer from '../../hoc/Layout/Footer/Footer';
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



moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;
const FilledButton = styled.div`
    display: inline-block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: #2FBCD3;
    margin-right: 5px;
    margin-top: 3px;
    margin-left: 3px;
`;

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },
    marginbot: {
        marginBottom: '3.5%',
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
    triangle: {
        width: 0,
        height: 0,
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderTop: '15px solid gray',
        margin: '0 auto',
        marginTop:-28
    },
    trait:{
        width: '87%',
        marginTop: -18.5,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    trait1:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait2:{
        width: '87%',
        marginTop: -18,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait3:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: 'white',
        border: '2px solid #000',

    },



});

class services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            shop: {},
            serviceUser: [],
            tabs: false,
            booking_request: false,
            my_alfred_conditions: false,
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
                    Router.push('/becomeAlfredForm');
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
        const {shop} = this.state;
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
                        <Grid container justify="center" style={{backgroundColor: '#4fbdd7',marginTop: -3}}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={2} style={{textAlign:"center",borderBottom: '2px solid white',zIndex:999}}>
                                <p style={{color: "white",cursor: 'pointer'}}>Ma boutique</p>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <p style={{color: "white",cursor: 'pointer'}}>Messages</p>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <p style={{color: "white",cursor: 'pointer'}}>Mes réservations</p>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <Link href={'/myShop/myAvailabilities'}><a style={{textDecoration:'none'}}>
                                <p style={{color: "white",cursor: 'pointer'}}>Mon calendrier</p></a>
                                </Link>
                            </Grid>
                            <Grid item xs={2} style={{textAlign:"center"}}>
                                <p style={{color: "white",cursor: 'pointer'}}>Performance</p>
                            </Grid>

                        </Grid>
                        <Grid container style={{backgroundImage: `url('../../${this.state.shop.picture}')`,backgroundPosition: "center", height:'42vh',
                            backgroundSize:"cover", backgroundRepeat:"no-repeat",justifyContent:"center",alignItems:"center"}}>



                        </Grid>
                        <Grid item style={{backgroundColor: 'rgba(0,0,0,0.25)',position:"absolute" ,width:'100%',zIndex:500,height:'42vh',top:117}}>

                        </Grid>
                        <Grid item>

                            <img src={'../'+user.picture} style={{borderRadius: '50%',position:'absolute',top:'27%',left:'45%',zIndex:501}} width={'9%'} alt={'picture'}/>
                        </Grid>
                        <Grid item style={{position:"absolute",left:'3%',top:'20%',zIndex:502}}>
                            <img src={'../static/edit-image.svg'} alt={'edit'} onClick={()=>this.handleOpen()} style={{cursor:'pointer'}} width={30}/>
                        </Grid>
                        <Grid item style={{position:"absolute",right:'3%',top:'18%',zIndex:502}}>
                            <Link href={'/myShop/shopPreview?id_alfred=' + this.state.user._id}><a style={{textDecoration: 'none',color: 'white',cursor:'pointer',fontWeight: '600',fontSize: '1.15rem'}}><p>Aperçu de ma boutique</p></a></Link>
                        </Grid>

                        <Grid container style={{marginTop: 20}}>
                            <Grid item xs={7}>
                                <Grid container>
                                    <Grid item xs={6} style={{textAlign:"center"}}>
                                        <div>
                                            <h2 onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '25%',position: 'sticky'}}> Mes services</h2>
                                            {tabs ?
                                                <React.Fragment>
                                                    <hr className={classes.trait1}/>
                                                </React.Fragment>
                                                :
                                                <React.Fragment>
                                                    <hr className={classes.trait3}/>
                                                </React.Fragment>}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h2 onClick={this.handleClicktabs2}  style={{color:'#828181',fontWeight: '100', textAlign: 'center',cursor: 'pointer'}}> Mes paramètres de réservation</h2><br/>
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
                                <Grid container style={{paddingLeft: 100}}>
                                    <Grid item xs={2}>


                                    </Grid>
                                    <Grid item xs={10} style={{paddingTop:26}}>

                                    </Grid>
                                </Grid>

                                {tabs ?
                                    <Grid container style={{marginLeft:110}}>
                                        <Grid item xs={12}><h2 style={{fontWeight: '100'}}>Comment les utilisateurs peuvent réserver ? </h2></Grid>

                                        <Grid container>


                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.booking_request}
                                                        onChange={this.handleChangeBr}
                                                        value={this.state.booking_request}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                        checkedIcon={<FilledButton />}

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
                                                        value={this.state.no_booking_request}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                        checkedIcon={<FilledButton />}
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

                                        <Grid item xs={12}><h2 style={{fontWeight: '100'}}>Vos conditions de réservation </h2></Grid>
                                        <p style={{fontWeight: '100',marginTop: '-1%',}}>Il se peut que vous ayez moins de réservation si vous ajoutez des conditions. Les personnes qui ne répondent pas à vos critères peuvent quand même vous envoyer une demande. </p>

                                        <Grid container style={{marginTop: '2%'}}>
                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.my_alfred_conditions}
                                                        onChange={this.handleChange('my_alfred_conditions')}
                                                        value={this.state.my_alfred_conditions}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                        checkedIcon={<FilledButton />}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{fontWeight: '100', lineHeight: '0!important'}}>Conditions My-Alfred</h4>
                                                    <p>Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H. </p>
                                                </Grid>
                                            </Grid>


                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.profile_picture}
                                                        onChange={this.handleChange('profile_picture')}
                                                        value={this.state.profile_picture}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                        checkedIcon={<FilledButton />}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{fontWeight: '100', lineHeight: '0!important'}}>+ Photo de profil</h4>
                                                    <p>Si vous activez cette condition, vous ne pourrez voir les photos de profil des voyageurs qu'une fois la réservation confirmée. En savoir plus</p>
                                                </Grid>
                                            </Grid>

                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.identity_card}
                                                        onChange={this.handleChange('identity_card')}
                                                        value={this.state.identity_card}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                        checkedIcon={<FilledButton />}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{fontWeight: '100', lineHeight: '0!important'}}>Pièce d'identité<span className={classes.hiddenone}> officielle</span></h4><h4 style={{fontWeight: '100', lineHeight: '0.5!important'}} className={classes.revealedone}>officielle</h4>
                                                    <p>Ces utilisateurs ont vérifié leur identité.</p>
                                                </Grid>
                                            </Grid>

                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.recommandations}
                                                        onChange={this.handleChange('recommandations')}
                                                        value={this.state.recommandations}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                        checkedIcon={<FilledButton />}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{fontWeight: '100', lineHeight: '0!important'}}>Recommandations<span className={classes.hiddenone}> d'autres Alfred</span></h4><h4 style={{fontWeight: '100', lineHeight: '0.5!important'}} className={classes.revealedone}>d'autres Alfred</h4>
                                                    <p>Ces utilisateurs ont déjà utilisés des services avec My-Alfred, sont recommandés par d'autres Alfred et n'ont pas reçu de commentaires négatifs.</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                        <Grid item xs={12}>
                                            <hr style={{backgroundColor: 'darkgray'}}/>
                                        </Grid>

                                        <Grid item xs={12}><h2 style={{fontWeight: '100'}}>Votre message de bienvenue validant votre réservation </h2></Grid>
                                        <p style={{fontWeight: '100',marginTop: '-1%',}}>Les utilisateurs recevront votre message lorsque vous confirmerez leur réservation. </p>

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

                                        <Grid item xs={12}><h3 style={{fontWeight: '100'}}>Vos conditions d’annulation </h3></Grid>
                                        <p style={{fontWeight: '100',marginTop: '-1%',}}>Choisissez vos conditions en cas d'annulation de la part des utilisateurs.</p>

                                        <Grid container style={{marginTop: '2%'}}>
                                            <Grid container className={classes.marginbot}>
                                                <Grid item xs={3} sm={2} md={1}>
                                                    <Checkbox
                                                        checked={this.state.flexible_cancel}
                                                        onChange={this.handleChangeF}
                                                        value={this.state.flexible_cancel}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                        checkedIcon={<FilledButton />}
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
                                                        value={this.state.moderate_cancel}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                        checkedIcon={<FilledButton />}
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
                                                        value={this.state.strict_cancel}
                                                        color="primary"
                                                        inputProps={{
                                                            'aria-label': 'secondary checkbox',
                                                        }}
                                                        icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                        checkedIcon={<FilledButton />}
                                                    />
                                                </Grid>
                                                <Grid item xs={9} sm={10} md={11}>
                                                    <h4 style={{fontWeight: '100', lineHeight: '0!important'}}>Strictes </h4>
                                                    <p>
                                                        Remboursement intégral jusqu'à 10 jours avant la prestation.
                                                    </p>
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </Grid>:
                                    <React.Fragment>
                                        {serviceUser.map((e,index)=> (
                                            <React.Fragment key={index}>
                                                <Grid container>
                                                    <Grid style={{marginLeft: 130, backgroundColor: 'white',marginBottom: '-36px',padding: '8px',}}>
                                                        <h3 style={{color: '#505050'}}>{e.service.category.label}</h3>

                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{marginLeft:110, border: '1px solid lightgray',padding: '15px 15px 15px 15px',}}>
                                                    <Grid item xs={3} style={{ borderBottom : '150px', borderLeft : '150px', cursor: 'pointer'}}>
                                                        <Link href={'/myShop/previewService?id='+e._id}><img src={e.service.picture} alt={'picture'} width={'85%'}/></Link>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <h4 style={{fontWeight: 'bolder',fontSize: 18,color: '#737373'}}>{e.service.label}</h4>
                                                        <p style={{fontSize: 14}}>{e.prestations.length} Prestation(s) proposée(s)</p>
                                                    </Grid>
                                                    <Grid item xs={3} style={{display:"flex", justifyContent:"flex-end"}}>
                                                        <Link href={'/myShop/editService?id='+e._id}>
                                                            <a style={{cursor: 'pointer',textDecoration:'none',height:'fit-content'}}>
                                                                <h4 style={{paddingRight: 7,fontWeight: 'bolder',fontSize: 16,color:'#3CBED4',marginTop:0,cursor:"pointer"}}><EditIcon  style={{cursor: 'pointer',width:22, height:22 }}/></h4>
                                                            </a>
                                                        </Link>

                                                            <a style={{cursor: 'pointer',textDecoration:'none',height:'fit-content'}}>
                                                                <h4 style={{fontWeight: 'bolder',fontSize: 16,color:'#F8727F',marginTop:0,cursor:"pointer"}}><DeleteIcon onClick={()=>this.handleClickOpen(e._id)}  style={{cursor: 'pointer',width:22, height:22 }}/></h4>
                                                            </a>

                                                    </Grid>

                                                </Grid>
                                            </React.Fragment>))}


                                        <Grid container style={{cursor:'pointer',marginBottom: 45,marginLeft:110,backgroundColor: 'rgb(47, 188, 211)',maxWidth:'100%',marginTop:30,height:70,justifyContent:"center"}}>

                                            <Grid item xs={3} style={{display:"flex",justifyContent:"center"}}>

                                            </Grid>
                                            <Grid item xs={1} style={{display:"flex",justifyContent:"center"}}>
                                            </Grid>

                                            <Grid item xs={5}>
                                                <Grid container>
                                                    <Grid item xs={2}>
                                                        <Link href={'/myShop/selectCategory'}><a style={{textDecoration:'none'}}>
                                                        <img src={'../../static/plus-4.svg'} style={{marginTop: '27%'}} width={'42%'} alt={'plus'}/>
                                                        </a>
                                                        </Link>
                                                    </Grid>
                                                    <Grid item xs={10}>
                                                        <Link href={'/myShop/selectCategory'}><a style={{textDecoration:'none'}}>
                                                        <h3 style={{color:'white',fontWeight: '100'}}>Ajouter un nouveau service</h3>
                                                        </a>
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={3} style={{display:"flex",justifyContent:"center"}}>

                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                }
                            </Grid>
                            <Grid item xs={1} style={{zIndex: -999}}></Grid>

                            {tabs ?
                                <div style={{backgroundColor: 'lightgray',display:'flex',justifyContent:'flex-end',width:'100%',bottom:0,
                                    alignItems:"center",height:60}}>
                                    <Button size={'medium'} type={'button'} onClick={this.onSubmit} variant="contained" color="secondary"
                                            style={{color: 'white',maxHeight:40,marginRight:20}}>
                                        Enregistrer
                                    </Button>
                                </div>: null}
                        </Grid>

                    </Grid>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <div style={{top: `50%`,
                            left: `50%`,
                            transform: `translate(-50%, -50%)`,}} className={classes.paper}>
                            <Carousel>

                                {image}

                            </Carousel>

                        </div>
                    </Modal>
                </Layout>
                <Footer/>

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



