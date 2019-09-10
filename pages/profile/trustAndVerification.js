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
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import { Document,Page } from 'react-pdf'
import Footer from '../../hoc/Layout/Footer/Footer';
import { pdfjs } from 'react-pdf';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import styled from "styled-components";
import { toast } from 'react-toastify';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;






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
        marginTop: 70,
        marginBottom: 70,
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
                     height={'auto'}
                     width={100}
                     />);
    }
}

class trustAndVerification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            type: '',
            id_recto: '',
            id_verso: '',
            card:{},
            haveCard: false,
            pageNumber: 1,
            numPages: null,
            ext: '',
            professional: false,
            particular: false,
            alfred: false,
            company: {},
            siret: '',
            name: '',
            naf_ape: '',
            creation_date: '',
            status: '',
        };
        this.editSiret = this.editSiret.bind(this);
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});
                if(user.id_card !== undefined) {
                    this.setState({card:user.id_card});
                    const ext = this.state.card.recto.split('.').pop();
                    this.setState({ext:ext , haveCard: true});
                }



                if(user.is_alfred) {
                    this.setState({alfred: true});
                    axios.get(url+'myAlfred/api/shop/currentAlfred')
                        .then(response => {
                            let result = response.data;
                            this.setState({professional: result.is_professional,particular:result.is_particular,company: result.company});

                            if(result.is_professional === true) {
                                this.setState({siret: result.company.siret,name: result.company.name,naf_ape: result.company.naf_ape,
                                    creation_date: result.company.creation_date, status: result.company.status})
                            }

                        })
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

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChange2 = event => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    };

    onChangeRecto = e => {
        this.setState({id_recto:e.target.files[0]});
    };

    onChangeVerso = e => {
        this.setState({id_verso:e.target.files[0]});
    };

    handleChecked () {
        this.setState({particular: false})
    }

    handleChecked2 () {
        this.setState({professional: false});
        this.setState({name: ''});
        this.setState({siret: ''});
        this.setState({naf_ape: ''});
        this.setState({creation_date: ''});
        this.setState({status: ''});
    }

    handleSiret() {
        const code = this.state.siret;

        axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/siret/${code}`)
            .then(res => {
                const data = res.data;
                this.setState({name: data.etablissement.l1_normalisee, naf_ape: data.etablissement.activite_principale, status: data.etablissement.libelle_nature_juridique_entreprise});
                const date = data.etablissement.date_creation;
                const year = date.substring(0,4);
                const month = date.substring(4,6);
                const day = date.substring(6,8);
                const result = day+'/'+month+'/'+year;
                this.setState({creation_date: result});

            })
            .catch(err => {
                console.log(err);
            })

    }

    onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('myCardR',this.state.id_recto);
        formData.append('myCardV',this.state.id_verso);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url+"myAlfred/api/users/profile/idCard",formData,config)
            .then((response) => {
                toast.info('Carte d\'identité ajoutée');

            }).catch((error) => {
            console.log(error)
        });
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    sendEmail = () =>{
      axios.get(url+'myAlfred/api/users/sendMailVerification')
          .then(() => {
              toast.info('Email envoyé');
          })
          .catch(err => console.log(err));
    };

    sendSms = () => {
      //function sms
    };

    editSiret() {
        const newStatus = {
            is_particular: this.state.particular,
            is_professional: this.state.professional,
            status: this.state.status,
            name: this.state.name,
            creation_date: this.state.creation_date,
            siret: this.state.siret,
            naf_ape: this.state.naf_ape,


        };
        axios
            .put(url+'myAlfred/api/shop/editStatus', newStatus)
            .then(res => {
                toast.info('Statut modifié')

            })
            .catch(err =>
                console.log(err)
            );
    }

    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {ext} = this.state;
        const {professional} = this.state;
        const {alfred} = this.state;
        const {company} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                    <Grid className={classes.toggle}  item xs={3} style={{}}>

                         <div className={classes.trigger}></div>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/user.svg'} alt={'user'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Modifier le profil
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 30,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/user.svg'} alt={'user'} width={27} style={{marginRight: 4}}/>
                                            <a  style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'2',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes adresses de prestations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}} className={classes.hidelg}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/picture-2.svg'} alt={'picture'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/picture-2.svg'} alt={'picture'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Photo
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/success-2.svg'} alt={'check'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/success-2.svg'} alt={'check'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Confiance et vérification
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                {/*<Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Commentaires
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidelg}>
                                    <Link href={'/profile/recommandations'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/megaphone.svg'} alt={'speaker'} width={33} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>

                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 281}} className={classes.hidesm}>
                                    <Link href={'/profile/recommandations'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/megaphone.svg'} alt={'speaker'} width={33} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Recommandations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>*/}


                            </Grid>
                        </Grid>


                        <Grid item xs={9} style={{paddingLeft: 55}}>
                            <Grid container>
                                <h1 style={{color: 'dimgray',fontWeight: '100'}}>Confiance & vérification</h1>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} style={{marginTop: 20}}>

                                    <InputLabel style={{color: 'black'}}>Email</InputLabel>
                                </Grid>
                                <Grid container>
                                <Grid item xs={12} style={{display:"contents",justifyContent:"center"}}>
                                    <TextField
                                        id="standard-name"
                                        style={{ marginTop: 15,width:'50%'}}
                                        value={user.email || ''}
                                        margin="normal"
                                        name={'email'}
                                        variant={'outlined'}
                                        disabled={true}
                                    />
                                    {user.is_confirmed ? <img src={'../static/success-2.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/> :
                                        <img src={'../static/success.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                                    }
                                </Grid>


                                </Grid>
                                {user.is_confirmed ?
                                    null
                                    : <Grid container> <Grid item xs={7}> <Button type="submit" onClick={()=>this.sendEmail()} variant="contained" color="primary" style={{width:'50%',color:'white',marginTop:15 }}>
                                        Envoyer email de vérification
                                    </Button></Grid></Grid>}



                                <Grid item xs={12} style={{marginTop: 20}}>

                                    <InputLabel style={{color: 'black'}}>Téléphone</InputLabel>
                                </Grid>
                                <Grid container>
                                <Grid item xs={12} style={{display:"contents",justifyContent:"center"}}>
                                    <TextField
                                        style={{ marginTop: 15,width:'50%'}}
                                        value={user.phone || ''}
                                        margin="normal"
                                        name={'phone'}
                                        variant={'outlined'}
                                        disabled={true}
                                    />
                                    {user.phone_confirmed ? <img src={'../static/success-2.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/> :
                                        <img src={'../static/success.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                                    }


                                </Grid>
                                </Grid>

                                    {user.phone_confirmed ?
                                        null
                                        :
                                        <Grid container>
                                            <Grid item xs={4} style={{maxWidth:'30%'}}>
                                        <Button type="submit" onClick={()=>this.sendSms()} variant="contained" color="primary" style={{width:'100%',color:'white',marginTop:15 }}>
                                            Envoyer sms de vérification
                                        </Button>
                                            </Grid>
                                        </Grid>}


                                <Grid item xs={6}>
                                    <h2 style={{fontWeight:'100'}}>Pièce d'identité</h2>
                                    <p style={{color:'#2FBCD3'}}>Ajouter ou modifier une pièce d'identité</p>
                                    <TextField
                                        select
                                        style={{width:'70%'}}
                                        value={this.state.type}
                                        name={'type'}
                                        onChange={this.onChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Type</InputAdornment>,
                                        }}
                                    >

                                            <MenuItem value={'passeport'}>
                                                Passeport
                                            </MenuItem>
                                        <MenuItem value={'identite'}>
                                            Carte d'identité
                                        </MenuItem>

                                    </TextField>
                                    <form onSubmit={this.onSubmit}>
                                    <Grid item xs={6} style={{marginTop: 20,border:'0.2px solid lightgrey',display:"flex",justifyContent:"center"}}>
                                        <label style={{display: 'inline-block',marginTop:15,textAlign:"center"}} className="forminputs">
                                            <p style={{cursor:"pointer",color:'darkgrey',fontSize: '0.9rem'}}>Télécharger recto</p>
                                            <input id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}} name="myCardR" type="file"
                                                   onChange={this.onChangeRecto}
                                                   className="form-control" accept=".jpg,.jpeg,.png,.pdf"
                                            />
                                        </label>


                                    </Grid>
                                        <Thumb file={this.state.id_recto} />
                                    <Grid item xs={6} style={{marginTop: 20,border:'0.2px solid lightgrey',display:"flex",justifyContent:"center"}}>
                                        <label style={{display: 'inline-block',textAlign:"center" }} className="forminputs">
                                            <p style={{cursor:"pointer",color:'darkgrey',fontSize: '0.9rem'}}>Télécharger verso (sauf passeport)</p>
                                            <input id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}} name="myCardV" type="file"
                                                   onChange={this.onChangeVerso}
                                                   className="form-control" accept=".jpg,.jpeg,.png,.pdf"
                                            />
                                        </label>

                                    </Grid>
                                        <Thumb file={this.state.id_verso} />
                                        <Grid item xs={5}>
                                            <Button type="submit" variant="contained" color="primary" style={{color:'white',marginTop:15 }}>
                                                Valider
                                            </Button>
                                        </Grid>
                                    </form>
                                </Grid>

                                <Grid item xs={6} style={{borderLeft:'0.2px solid lightgrey',height:"max-content",paddingLeft:20}}>

                                    {this.state.haveCard ?
                                        <div style={{marginTop: 20,width:'80%',display:'flex'}}>
                                            {ext ==='pdf' ?
                                                <Document
                                                file={`../${this.state.card.recto}`}
                                                onLoadSuccess={this.onDocumentLoadSuccess}
                                                >
                                                <Page pageNumber={this.state.pageNumber} width={250} />
                                                </Document>
                                                :
                                                <img src={`../${this.state.card.recto}`} alt={'recto'} width={200}/>

                                            }
                                            {user.id_confirmed ? <img src={'../static/success-2.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/> :
                                                <img src={'../static/success.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                                            }
                                        </div>

                                        : null}



                                </Grid>
                            </Grid>
                            {alfred ?
                                <React.Fragment><Grid container>
                                    <h2 style={{fontWeight:'100'}}>Votre statut</h2>
                                </Grid>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.particular}
                                                        onChange={(e)=>{this.onChange2(e);this.handleChecked2()}}
                                                        value={this.state.particular}
                                                        name="particular"
                                                        color="primary"
                                                        icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                        checkedIcon={<FilledButton />}
                                                    />
                                                }
                                                label="Je suis un particulier"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.professional}
                                                        onChange={(e)=>{this.onChange2(e);this.handleChecked()}}
                                                        value={this.state.professional}
                                                        name="professional"
                                                        color="primary"
                                                        icon={<CircleUnchecked style={{fontSize: 30}} />}
                                                        checkedIcon={<FilledButton />}
                                                    />
                                                }
                                                label="Je suis un professionnel"
                                            />
                                        </Grid>
                                    </Grid>
                                    {professional ?
                                        <React.Fragment>
                                            <Grid container>
                                                <Grid item xs={12} style={{display:"contents",justifyContent:"center"}}>
                                                    <TextField
                                                        id="standard-name"
                                                        style={{ marginTop: 15,width:'50%'}}
                                                        value={this.state.siret}
                                                        onChange={this.onChange}
                                                        margin="normal"
                                                        name={'siret'}
                                                        variant={'outlined'}

                                                    />
                                                    <Grid item xs={3} style={{marginTop:8,marginLeft:5}}>
                                                    <Button onClick={()=>this.handleSiret()} type="submit" variant="contained" color="primary" style={{ width: '80%',color:'white',marginTop:15 }}>
                                                        Vérifier
                                                    </Button>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                            <Grid container style={{width:'70%',marginTop:20,backgroundColor:'whitesmoke',paddingLeft:10}}>

                                                <Grid item xs={6}>
                                                    <p style={{marginBottom:0}}>Siret : {this.state.siret}</p>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <p style={{marginBottom:0}}>Date de creation : {this.state.creation_date}</p>
                                                </Grid>

                                            </Grid>
                                            <Grid container style={{width:'70%',backgroundColor:'whitesmoke',paddingLeft:10}}>

                                                <Grid item xs={6}>
                                                    <p style={{marginBottom:0,marginTop: 10}}>Dénomination : {this.state.name}</p>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <p style={{marginBottom:0,marginTop: 10}}>NAF/APE : {this.state.naf_ape}</p>
                                                </Grid>

                                            </Grid>
                                            <Grid container style={{width:'70%',backgroundColor:'whitesmoke',paddingLeft:10}}>

                                                <Grid item xs={12}>
                                                    <p style={{marginTop: 10}}>Status juridique : {this.state.status}</p>
                                                </Grid>


                                            </Grid>
                                        </React.Fragment>
                                        : null}
                                        <Grid item xs={5}>
                                    <Button onClick={this.editSiret} type="submit" variant="contained" color="primary" style={{ width: '80%',color:'white',marginTop:15 }}>
                                        Valider
                                    </Button>
                                        </Grid>


                                </React.Fragment>
                            : null
                            }
                        </Grid>
                    </Grid>
                </Layout>
                <Footer/>

            </Fragment>
        );
    };
}



export default withStyles(styles)(trustAndVerification);
