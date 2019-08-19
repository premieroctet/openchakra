import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Checkbox from '@material-ui/core/Checkbox';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import styled from 'styled-components';
import Typography from "@material-ui/core/Typography";
import { TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';
const jwt = require('jsonwebtoken');

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
        marginTop: -18.5,
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



});

class services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            shop: {},
            serviceUser: [],
            checkedA: false,
            checkedB: false,
            checkedC: false,
            checkedD: false,
            checkedE: false,
            checkedF: false,
            checkedG: false,
            checkedH: false,
            checkedI: false,
            tabs: false,
        };



    }

    componentDidMount() {

        
        localStorage.setItem('path',Router.pathname);
        const token = localStorage.getItem('token').split(' ')[1];
        const decode = jwt.decode(token);
        if (decode.is_alfred === false) {
            Router.push('/becomeAlfredForm');

        }

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});
            })
            .catch(err => {
                    console.log(err);
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );

        axios
            .get(url+'myAlfred/api/shop/currentAlfred')
            .then(res => {
                let shop = res.data;
                this.setState({shop:shop});
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



    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };
      
    handleChangeA = () => {
        this.setState({ checkedA: true, checkedB: false });
      };  

    handleChangeB = () => {
        this.setState({ checkedA: false, checkedB: true });
      };  

    handleChangeI = () => {
        this.setState({ checkedG: true, checkedH: false, checkedI: false });
      };  

    handleChangeJ = () => {
        this.setState({ checkedG: false, checkedH: true, checkedI: false });
      };  

    handleChangeK = () => {
        this.setState({ checkedG: false, checkedH: false, checkedI: true });
      };

    handleClick = name => () => {
        this.setState({[name] : true});
    }

    handleClick2 = name => () => {
        this.setState({ [name] : false });
    }

    handleClickA = () => {
        this.setState({ checkedA: true, checkedB: false });
    }

    handleClickA2 = () => {
        this.setState({ checkedA: false });
    }

    handleClickB = () => {
        this.setState({ checkedA: false, checkedB: true });
    }

    handleClickB2 = () => {
        this.setState({ checkedB: false });
    }

    handleClickI = () => {
        this.setState({ checkedG: true, checkedH: false, checkedI: false });
    }

    handleClickI2 = () => {
        this.setState({ checkedG: false });
    }

    handleClickJ = () => {
        this.setState({ checkedG: false, checkedH: true, checkedI: false });
    }

    handleClickJ2 = () => {
        this.setState({ checkedH : false });
    }

    handleClickK = () => {
        this.setState({ checkedG: false, checkedH: false, checkedI: true });
    }

    handleClickK2 = () => {
        this.setState({ checkedI : false });
    }

    onSubmit =() => {
        this.setState({ checkedA: false, checkedB: false, checkedC: false, checkedD: false, checkedE: false, checkedF: false, checkedG: false, checkedH: false, checkedI: false  })
    }

    handleClicktabs2 =() => {
        this.setState({ tabs: true });
    }

    handleClicktabs =() => {
        this.setState({ tabs: false });
    }
    
    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {shop} = this.state;
        const {serviceUser} = this.state;
        const tabs = this.state.tabs;
        const checkedB = this.state.checkedB;
        const checkedA = this.state.checkedA;
        const checkedC = this.state.checkedC;
        const checkedD = this.state.checkedD;
        const checkedE = this.state.checkedE;
        const checkedF = this.state.checkedF;
        const checkedG = this.state.checkedG;
        const checkedH = this.state.checkedH;
        const checkedI = this.state.checkedI;
        const conditionclick = checkedA ? this.handleClickA2: this.handleClickA;
        const conditionclick2 = checkedB ? this.handleClickB2: this.handleClickB;
        const conditionclick3 = checkedC ? this.handleClick2('checkedC'): this.handleClick('checkedC');
        const conditionclick4 = checkedD ? this.handleClick2('checkedD'): this.handleClick('checkedD');
        const conditionclick5 = checkedE ? this.handleClick2('checkedE'): this.handleClick('checkedE');
        const conditionclick6 = checkedF ? this.handleClick2('checkedF'): this.handleClick('checkedF');
        const conditionclick7 = checkedG ? this.handleClickI2 : this.handleClickI;
        const conditionclick8 = checkedH ? this.handleClickJ2 : this.handleClickJ;
        const conditionclick9 = checkedI ? this.handleClickK2 : this.handleClickK;

        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container justify="center" style={{backgroundColor: '#4fbdd7',marginTop: -3}}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={2}>
                                <p style={{color: "white",cursor: 'pointer'}}>Ma boutique</p>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{color: "white",cursor: 'pointer'}}>Message</p>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{color: "white",cursor: 'pointer'}}>Mes réservations</p>
                            </Grid>   
                            <Grid item xs={2}>
                                <p style={{color: "white",cursor: 'pointer'}}>Mon calendrier</p>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{color: "white",cursor: 'pointer'}}>Performance</p>
                            </Grid>

                        </Grid>
                        <Grid container style={{backgroundImage: "url('../../static/shopBanner/sky-690293_1920.jpg')",backgroundPosition: "center", height:'42vh',
                            backgroundSize:"cover", backgroundRepeat:"no-repeat",justifyContent:"center",alignItems:"center"}}>



                        </Grid>
                        <Grid item style={{backgroundColor: 'rgba(0,0,0,0.25)',position:"absolute" ,width:'100%',zIndex:500,height:'42vh',top:115}}>

                        </Grid>
                        <Grid item>

                            <img src={'../'+user.picture} style={{borderRadius: '50%',position:'absolute',top:'27%',left:'45%',zIndex:501}} width={'9%'} alt={'picture'}/>
                        </Grid>
                        <Grid item style={{position:"absolute",left:'3%',top:'18%',zIndex:502}}>
                            <p style={{color: 'white',cursor:'pointer',fontWeight: '600',fontSize: '1rem'}}>{/*<EditIcon  style={{cursor: 'pointer',width:15, height:15, marginRight: 3,}}/>*/}Modifier</p>
                        </Grid>
                        <Grid item style={{position:"absolute",right:'3%',top:'18%',zIndex:502}}>
                            <p>{serviceUser.map((e,index)=> (<a style={{textDecoration: 'none',color: 'white',cursor:'pointer',fontWeight: '600',fontSize: '1.15rem'}} href={'/myShop/shopPreview?id_alfred=' + e.user}>Aperçu de ma boutique</a>))}</p>
                        </Grid>

                        <Grid container style={{marginTop: 20}}>
                            <Grid item xs={7}>
                                <Grid container>
                                    <Grid item xs={6} style={{textAlign:"center"}}>
                                        <div>
                                        <h2 style={{position: 'sticky',}} onClick={this.handleClicktabs} style={{color:'#828181',fontWeight: '100',cursor: 'pointer',marginLeft: '25%'}}> Mes services</h2>
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
                                        
                                        
                                    <Grid container className={classes.marginbot} onClick={conditionclick}>
                                        <Grid item xs={3} sm={2} md={1}>
                                            <Checkbox
                                                checked={checkedA}
                                                onChange={this.handleChange('checkedA')}
                                                value="checkedA"
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
                                       
                                    <Grid container className={classes.marginbot} onClick={conditionclick2}> 
                                        <Grid item xs={3} sm={2} md={1}>
                                            <Checkbox
                                                checked={checkedB}
                                                onChange={this.handleChange('checkedB')}
                                                value="checkedB"
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
                                        <Grid container className={classes.marginbot} onClick={conditionclick3}>
                                            <Grid item xs={3} sm={2} md={1}>
                                                <Checkbox
                                                    checked={checkedC}
                                                    onChange={this.handleChange('checkedC')}
                                                    value="checkedC"
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


                                        <Grid container className={classes.marginbot} onClick={conditionclick4}>
                                            <Grid item xs={3} sm={2} md={1}>
                                                <Checkbox
                                                    checked={checkedD}
                                                    onChange={this.handleChange('checkedD')}
                                                    value="checkedD"
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

                                        <Grid container className={classes.marginbot} onClick={conditionclick5}>
                                            <Grid item xs={3} sm={2} md={1}>
                                                <Checkbox
                                                    checked={checkedE}
                                                    onChange={this.handleChange('checkedE')}
                                                    value="checkedE"
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

                                        <Grid container className={classes.marginbot} onClick={conditionclick6}>
                                            <Grid item xs={3} sm={2} md={1}>
                                                <Checkbox
                                                    checked={checkedF}
                                                    onChange={this.handleChange('checkedF')}
                                                    value="checkedF"
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
                                        defaultValue="Merci pour votre Reservation !"
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
                                        <Grid container className={classes.marginbot} onClick={conditionclick7}>
                                            <Grid item xs={3} sm={2} md={1}>
                                                <Checkbox
                                                    checked={checkedG}
                                                    onChange={this.handleChangeI}
                                                    value="checkedG"
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


                                        <Grid container className={classes.marginbot} onClick={conditionclick8}>
                                            <Grid item xs={3} sm={2} md={1}>
                                                <Checkbox
                                                    checked={checkedH}
                                                    onChange={this.handleChangeJ}
                                                    value="checkedH"
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

                                        <Grid container className={classes.marginbot} onClick={conditionclick9}>
                                            <Grid item xs={3} sm={2} md={1}>
                                                <Checkbox
                                                    checked={checkedI}
                                                    onChange={this.handleChangeK}
                                                    value="checkedI"
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
                                                    Remboursement intégral pour les annulations effectuées dans les 48 heures 
                                                    suivant  la réservation, si la date de prestation intervient dans 14 jours ou plus. 
                                                    Remboursement à hauteur de 50 % pour les annulations effectuées au moins 7 
                                                    jours avant la date de prestation. Aucun remboursement pour les 
                                                    annulations effectuées dans les 7 jours précédant la date de prestation.
                                                </p>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                </Grid>: 
                            <React.Fragment>
                                {serviceUser.map((e,index)=> (
                                    <React.Fragment>
                                        <Grid key={index} container>
                                                <Grid style={{marginLeft: 130, backgroundColor: 'white',marginBottom: '-36px',padding: '8px',}}>
                                                    <h3 style={{color: '#505050'}}>{e.service.category.label}</h3>

                                                </Grid>
                                            </Grid>
                                            <Grid container style={{marginLeft:110, border: '1px solid lightgray',padding: '15px 15px 15px 15px',}}>
                                                <Grid item xs={3} style={{ borderBottom : '150px', borderLeft : '150px', cursor: 'pointer'}}>
                                                    <Link href='/myShop/previewService'><img src={e.service.picture} alt={'picture'} width={'85%'}/></Link>
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
                                                    <Link>
                                                        <a style={{cursor: 'pointer',textDecoration:'none',height:'fit-content'}}>
                                                            <h4 style={{fontWeight: 'bolder',fontSize: 16,color:'#F8727F',marginTop:0,cursor:"pointer"}}><DeleteIcon  style={{cursor: 'pointer',width:22, height:22 }}/></h4>
                                                        </a>
                                                    </Link>
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
                                        <img src={'../../static/plus-4.svg'} style={{marginTop: '27%'}} width={'42%'} alt={'plus'}/>
                                     </Grid>
                                     <Grid item xs={10}>
                                        <h3 style={{color:'white',fontWeight: '100'}}>Ajouter un nouveau service</h3>
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
                            <Grid item xs={4} style={{backgroundColor: '#FAFAFA',maxWidth:'28%',marginTop: '-20px', marginLeft: 81}}>
                                {/*<Grid container style={{alignItems:"center"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 37.418 35.979">
                                    <g id="Groupe_936" data-name="Groupe 936" transform="translate(0 24.999)">
                                        <path id="Tracé_10757" data-name="Tracé 10757" d="M27.626-19.5l.412.049.464.1.414.148.361.2.412.2.361.248.361.3.308.345.26.347.2.4.207.347.154.4.1.446.053.4v.844l-.053.4-.1.446-.154.4-.207.347-.2.4-.26.347-.308.347-2.062,1.934-.257.2-.257.148-.31.1-.361.049-.308-.049-.31-.1-.257-.148-.257-.2-4.071-3.916-.207-.248-.154-.248-.1-.3-.053-.3.053-.347.1-.3.154-.248.207-.25,2.009-1.98.361-.3.361-.248L25.1-19l.361-.2.414-.148.464-.1.412-.049ZM17.678-7.009l.207.049.154.049.207.1.154.1.1.148.1.2.051.148.053.2-.053.2-.051.2-.1.15-.1.148L13.04-.171l-.154.148-.154.1-.207.049h-.412L11.907.077l-.154-.1L11.6-.171l-.156-.148-.1-.15-.051-.2v-.4l.051-.2.1-.15.156-.148,5.36-5.154.154-.1.154-.1.207-.049ZM31.286-25l-1.133.049-1.133.051-1.135.148-1.133.248-1.083.248-1.03.347-.929.446-.464.2-.361.3-.412.248-.31.3L11.7-12.362H.825l-.308.049-.207.051-.207.1-.1.148v.148l.053.2.1.2.2.25,5.1,4.856-.669.645-2.784.5-.31.1-.257.1-.154.2-.1.148v.2l.051.248.1.2.207.248L15.359,9.491l.26.2.2.1.257.049h.207l.154-.1.207-.15.1-.248.1-.3.515-2.676.669-.645,5.052,4.906.257.2.207.1.2.049h.156l.154-.1.1-.2.051-.2.053-.3V-.27l10.461-10.06.31-.3.257-.4.31-.4.2-.4.464-.893.361-.992L36.9-14.74l.257-1.092.156-1.09.051-1.09.051-1.092v-.99l-.051-.941-.1-.893-.154-.743-.154-.645-.207-.5-.154-.2-.1-.1-.1-.1-.207-.15-.515-.2L35-24.7l-.775-.15-.926-.1L32.318-25Z" fill="#7e7e7e" fill-rule="evenodd"/>
                                        <path id="Tracé_10758" data-name="Tracé 10758" d="M5.977-5l-.42.047-.42.1-.42.143-.358.24L4-4.04l-.54.672L2.381-1.594,1.421.036,1,.756H1L1.9.421,3.94-.347l2.216-.864L7-1.643l.54-.287.3-.289.179-.336.12-.336L8.2-3.226l-.061-.336L8.014-3.9l-.179-.287-.3-.289-.358-.24-.361-.143-.42-.1Z" transform="translate(0.44 8.785)" fill="#7e7e7e" fill-rule="evenodd"/>
                                        <path id="Tracé_10759" data-name="Tracé 10759" d="M6.72-3,6.5-2.943l-.223.112-.187.168L5.9-2.438,5.71-2.1,5.562-1.6l-.15.617-.15.673L5.075.87,5,1.318H5l.337-.055L6.122.925,6.533.758l.41-.225.375-.28L7.542.028l.15-.28L7.8-.587,7.879-.87v-.673L7.8-1.878l-.112-.28-.15-.28-.187-.225L7.168-2.83l-.225-.112Z" transform="translate(2.196 9.663)" fill="#7e7e7e" fill-rule="evenodd"/>
                                        <path id="Tracé_10760" data-name="Tracé 10760" d="M2.186-7l-.28.11-.337.17-.28.223-.223.337L.784-5.6l-.223.617-.17.615L.057-3.19,0-2.685.449-2.8l1.177-.28L2.3-3.3l.617-.225.5-.225.337-.28.225-.28.167-.28.112-.337.055-.335L4.26-5.6l-.112-.335-.167-.28L3.755-6.5l-.28-.223-.28-.17L2.858-7Z" transform="translate(0.001 7.907)" fill="#7e7e7e" fill-rule="evenodd"/>
                                    </g>
                                </svg>
                                <h2 style={{color: '#585858',fontWeight:'100',marginLeft:10}}>Conseils</h2>

                                </Grid>*/}
                            </Grid>
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
                </Layout>

            </Fragment>
        );
    };
}



export default withStyles(styles)(services);

 
                               