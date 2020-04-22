import React, {Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Footer from '../../hoc/Layout/Footer/Footer';
import {Helmet} from 'react-helmet';
import {generate_avatar} from '../../utils/generateAvatar';


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
    },
   hidelg: {
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
    toggle: {
        [theme.breakpoints.down('sm')]: {
            marginLeft:'-75px',
            transition: 'margin-left 0.7s',
             '&:hover': {
                 marginLeft:'0px',
                  transition: 'margin-left 0.7s',
                 boxShadow: '11px 6px 23px -24px rgba(0,0,0,0.75)',
             }
        }
    },
    buttonAddaddress: {
        display: 'inline-block',
        marginTop: 15,
        color: '#4fbdd7',
        borderColor: '#4fbdd7',
        backgroundColor: 'white',
        border: '1px solid',
        '&:hover': {
            backgroundColor: '#4fbdd7',
            color:'white'
        },
    }
});

class Thumb extends React.Component {
    state = {
        loading: false,
        thumb: undefined,
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) { return null; }

        if (loading) { return <p>loading...</p>; }

        return (<img src={thumb}
                     alt={file.name}
                     width={150}
                     height={150}
                     style={{borderRadius: '50%',objectFit:'cover'}}/>);
    }
}

class editPicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            haveapicture: '',
            open: false,

        };
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get('/myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});

                if(typeof user.picture !="undefined" || user.picture != null) {
                    this.setState({picture: true})
                } else {
                    this.setState({picture: false})
                }
            })
            .catch(err => {
                    if(err.response.status === 401 || err.response.status === 403) {
                        localStorage.removeItem('token');
                        Router.push({pathname: '/login'})
                    }
                }
            );
    }

    handleClickOpen() {
        this.setState({open:true});
    }

    handleClose() {
        this.setState({open:false});
    }

    onChange = e => {
        this.setState({haveapicture:e.target.files[0]});
    };

    onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('myImage',this.state.haveapicture);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/myAlfred/api/users/profile/picture",formData,config)
            .then((response) => {
                toast.info('Photo modifiée');
                Router.push({pathname:'/profile/editProfile'})
            }).catch();
    };

    deletePicture = () => {
      axios.delete('/myAlfred/api/users/profile/picture/delete')
          .then(() => {
              toast.error('Photo supprimée');
              this.setState({open:false});
              this.componentDidMount();
          })
          .catch();
    };

    render() {
        const {classes} = this.props;
        const user = this.state.user;
        return (
            <Fragment>
		<Helmet>
        <title>Profil - Photos - My Alfred </title>
        <meta property="description" content="Votre photo de profil sur My Alfred, plateforme web et mobile de services entre particuliers et auto entrepreneurs. Trouvez des services près de chez vous ! Paiement sécurisé - Inscription 100% gratuite." />
      </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer} style={{minHeight:530}}>
                    <Grid className={classes.toggle}  item xs={3} style={{}}>
                         <div className={classes.trigger}/>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/user.svg'} alt={'user'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Modifier le profil
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/user.svg'} alt={'user'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'2',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes adresses de prestations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} height={70} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/picture.svg'} alt={'picture'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/picture.svg'} alt={'picture'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Photo
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/success.svg'} alt={'check'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/success.svg'} alt={'check'} height={70} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Confiance et vérification
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} height={70} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} height={70} width={27} style={{marginRight: 10,marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Commentaires
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                            </Grid>
                        </Grid>


                        <Grid item xs={9} style={{paddingLeft: 55,marginBottom:15}}>
                            <Grid container>
                                <h1 style={{color: 'dimgray',fontWeight: '100'}}>Photo</h1>
                            </Grid>
                            <Grid container style={{marginTop: 20}}>
                                <Grid item>
                                    <DeleteIcon onClick={()=>this.handleClickOpen()} className={classes.deleteicon} style={{marginLeft: '90%',padding: '2%', marginBottom: '-10%', color: '#616060',  cursor: 'pointer' }}/>
                                    <Thumb file={this.state.haveapicture} />
                                    {
                                       this.state.haveapicture ?
                                         null :
                                           user.picture ?
                                             <img width={150} height={150} style={{borderRadius: '50%',objectFit:'cover'}} src={`../${user.picture}`} alt={'picture'}/>:
                                             <Avatar alt="photo de profil" className={classes.avatarLetter}>{generate_avatar(user)}</Avatar>
                                    }
                                </Grid>
                                <Grid item xs={12} md={6} style={{marginLeft: '5%'}}>
                                    <form onSubmit={this.onSubmit}>
                                        <Grid container>
                                        <Grid item xs={12} lg={12}>
                                            <p style={{display: 'inline-block', marginTop: 15,color:'black'}}>La photo de votre profil sera
                                                visible des utilisateurs du site et leur permettra de déjà vous connaitre !
                                                Téléchargez une photo de vous claire et lumineuse, de bonne qualité. Pour un rendu optimal,
                                                la photo doit être cadrée, sans lunette de soleil, en regardant l’objectif,
                                                avec seulement vous sur la photo. </p><br />
                                           <label style={{display: 'inline-block', marginTop: 15,color:'#2FBCD3'}} className="forminputs">
                                                <p style={{cursor:"pointer",fontSize:'0.8rem'}}>Téléchargez une photo depuis votre ordinateur</p>
                                                <input id="file" style={{display: 'none'}} name="myImage" type="file"
                                                       onChange={this.onChange}
                                                       className="form-control" accept={'image/*'}
                                                />
                                            </label>
                                        </Grid>
                                        </Grid>
                                        <Grid item style={{ display: 'flex', justifyContent: 'left', marginTop: 30 }}>
                                            <Button type="submit" variant="contained" color="secondary" style={{color: 'white' }}>
                                                Enregistrer
                                            </Button>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Layout>
                {/* <Footer/>*/}

                <Dialog
                    open={this.state.open}
                    onClose={()=>this.handleClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Supprimer votre photo ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Voulez-vous vraiment supprimer votre photo de profil ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose()} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={()=>this.deletePicture()} color="secondary" autoFocus>
                            Supprimer
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    };
}

export default withStyles(styles)(editPicture);
