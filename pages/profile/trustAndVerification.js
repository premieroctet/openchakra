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
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;






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

class trustAndVerification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            type: '',
            id_recto: '',
            id_verso: '',
            card:{},
            pageNumber: 1,
            numPages: null,
            ext: '',
            professionnal: false,
            company: {},
        };
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user,card:user.id_card});
                const ext = this.state.card.recto.split('.').pop();
                this.setState({ext:ext });

                if(user.is_alfred) {
                    axios.get(url+'myAlfred/api/shop/currentAlfred')
                        .then(response => {
                            let result = response.data;
                            this.setState({professionnal: result.is_professional,company: result.company});
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

    onChangeRecto = e => {
        this.setState({id_recto:e.target.files[0]});
    };

    onChangeVerso = e => {
        this.setState({id_verso:e.target.files[0]});
    };

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
                alert("Carte d'identité ajouté");

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
              alert('Email envoyé')
          })
          .catch(err => console.log(err));
    };

    sendSms = () => {
      //function sms
    };

    render() {
        const {classes} = this.props;
        const {user} = this.state;
        const {ext} = this.state;
        const {professionnal} = this.state;
        const {company} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>

                    <Grid className={classes.toggle}  item xs={3} style={{}}>
                         
                         <div className={classes.trigger}></div>
                            <Grid container style={{justifyContent: 'center',}}>
                                <Grid item style={{marginTop: 30,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/user.svg'} alt={'user'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a s style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Modifier le profil
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 30,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/profile/editProfile'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/user.svg'} alt={'user'} width={27} style={{marginRight: 4}}/>
                                            <a s style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10}}className={classes.hidesm}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} width={27} style={{marginRight: 10, marginLeft:10}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Mes adresses de prestations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10}}className={classes.hidelg}>
                                    <Link href={'/profile/myAddresses'}>
                                        <div style={{padding: '30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/sign.svg'} alt={'sign'} width={27} style={{marginleft: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/picture-2.svg'} alt={'picture'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/profile/editPicture'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/picture-2.svg'} alt={'picture'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Photos
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{padding:'30px', lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/success-2.svg'} alt={'check'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/profile/trustAndVerification'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/success-2.svg'} alt={'check'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Confiance et vérification
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                            
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/profile/reviews'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/comment-black-oval-bubble-shape.svg'} alt={'comment'} width={27} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Commentaires
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidelg}>
                                    <Link href={'/profile/recommandations'}>
                                        <div style={{padding:'30px',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex', justifyContent:'center'}}>
                                            <img src={'../static/megaphone.svg'} alt={'speaker'} width={33} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                               
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>

                                <Grid item style={{marginTop: 10,width: 270.25}} className={classes.hidesm}>
                                    <Link href={'/profile/recommandations'}>
                                        <div style={{border: '0.2px solid lightgrey',lineHeight:'4',paddingLeft:5,paddingRight:5,display:'flex'}}>
                                            <img src={'../static/megaphone.svg'} alt={'speaker'} width={33} style={{marginRight: 4}}/>
                                            <a style={{fontSize: '1.1rem',cursor:"pointer"}}>
                                                Recommandations
                                            </a>
                                        </div>
                                    </Link>
                                </Grid>


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
                                <Grid item xs={12} style={{display:"contents",justifyContent:"center"}}>
                                    <TextField
                                        id="standard-name"
                                        style={{ marginTop: 15,width:'50%'}}
                                        value={user.email}
                                        margin="normal"
                                        name={'email'}
                                        variant={'outlined'}
                                        disabled={true}
                                    />
                                    {user.is_confirmed ? <img src={'../static/success-2.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/> :
                                        <img src={'../static/success.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                                    }


                                </Grid>
                                {user.is_confirmed ?
                                    null
                                    : <Button type="submit" onClick={()=>this.sendEmail()} variant="contained" color="primary" style={{width:'50%',color:'white',marginTop:15 }}>
                                        Envoyer email de vérification
                                    </Button>}


                                <Grid item xs={12} style={{marginTop: 20}}>

                                    <InputLabel style={{color: 'black'}}>Téléphone</InputLabel>
                                </Grid>
                                <Grid item xs={12} style={{display:"contents",justifyContent:"center"}}>
                                    <TextField
                                        id="standard-name"
                                        style={{ marginTop: 15,width:'50%'}}
                                        value={user.phone}
                                        margin="normal"
                                        name={'phone'}
                                        variant={'outlined'}
                                        disabled={true}
                                    />
                                    {user.phone_confirmed ? <img src={'../static/success-2.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/> :
                                        <img src={'../static/success.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                                    }


                                </Grid>
                                <Grid container>
                                <Grid item xs={6}>
                                    {user.phone_confirmed ?
                                        null
                                        : <Button type="submit" onClick={()=>this.sendSms()} variant="contained" color="primary" style={{width:'100%',color:'white',marginTop:15 }}>
                                            Envoyer sms de vérification
                                        </Button>}
                                </Grid>
                                </Grid>

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
                                    <div style={{marginTop: 20,border:'0.2px solid lightgrey',width:'80%'}}>
                                        <label style={{display: 'inline-block', marginTop: 15,paddingLeft: 50}} className="forminputs">
                                            <p style={{cursor:"pointer",color:'darkgrey',fontSize: '1.1rem'}}>Télécharger recto</p>
                                            <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="myCardR" type="file"
                                                   onChange={this.onChangeRecto}
                                                   className="form-control"
                                            />
                                        </label>
                                        <span>{this.state.id_recto.name !== null ? this.state.id_recto.name : null}</span>
                                    </div>
                                    <div style={{marginTop: 20,border:'0.2px solid lightgrey',width:'80%'}}>
                                        <label style={{display: 'inline-block', marginTop: 15,paddingLeft: 50}} className="forminputs">
                                            <p style={{cursor:"pointer",color:'darkgrey',fontSize: '1.1rem'}}>Télécharger verso (sauf passeport)</p>
                                            <input id="file" style={{width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden'}} name="myCardV" type="file"
                                                   onChange={this.onChangeVerso}
                                                   className="form-control"
                                            />
                                        </label>
                                        <span>{this.state.id_verso.name !== null ? this.state.id_verso.name : null}</span>
                                    </div>
                                            <Button type="submit" variant="contained" color="primary" style={{ width: '80%',color:'white',marginTop:15 }}>
                                                Valider
                                            </Button>
                                    </form>
                                </Grid>

                                <Grid item xs={6} style={{borderLeft:'0.2px solid lightgrey',height:"max-content",paddingLeft:20}}>
                                    <h2 style={{fontWeight:'100'}}>Pièce d'identité</h2>

                                    <div style={{marginTop: 20,width:'80%',display:'flex'}}>
                                        {ext ==='pdf' ?
                                            <Document
                                                file={`../${this.state.card.recto}`}
                                                onLoadSuccess={this.onDocumentLoadSuccess}
                                            >
                                                <Page pageNumber={this.state.pageNumber} width='250' />
                                            </Document>
                                            :
                                            <img src={'../'+this.state.card.recto} alt={'recto'} width={200}/>

                                        }
                                        {user.id_confirmed ? <img src={'../static/success-2.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/> :
                                            <img src={'../static/success.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                                        }
                                    </div>


                                </Grid>
                            </Grid>
                            {professionnal ?
                                <React.Fragment><Grid container>
                                    <h2 style={{fontWeight:'100'}}>Siret</h2>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} style={{display:"contents",justifyContent:"center"}}>
                                        <TextField
                                            id="standard-name"
                                            style={{ marginTop: 15,width:'50%'}}
                                            value={company.siret}
                                            margin="normal"
                                            name={'email'}
                                            variant={'outlined'}
                                            disabled={true}
                                        />
                                        <img src={'../static/success-2.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                                    </Grid>

                                </Grid>
                                <Grid container style={{width:'70%',marginTop:20,backgroundColor:'whitesmoke',paddingLeft:10}}>

                                    <Grid item xs={6}>
                                        <p style={{marginBottom:0}}>Siret : {company.siret}</p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p style={{marginBottom:0}}>Date de creation : {company.creation_date}</p>
                                    </Grid>

                                </Grid>
                                    <Grid container style={{width:'70%',backgroundColor:'whitesmoke',paddingLeft:10}}>

                                        <Grid item xs={6}>
                                            <p style={{marginBottom:0,marginTop: 10}}>Dénomination : {company.name}</p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <p style={{marginBottom:0,marginTop: 10}}>NAF/APE : {company.naf_ape}</p>
                                        </Grid>

                                </Grid>
                                    <Grid container style={{width:'70%',backgroundColor:'whitesmoke',paddingLeft:10}}>

                                        <Grid item xs={12}>
                                            <p style={{marginTop: 10}}>Status juridique : {company.status}</p>
                                        </Grid>


                                    </Grid>
                                </React.Fragment>
                            : null
                            }
                        </Grid>
                    </Grid>
                </Layout>

            </Fragment>
        );
    };
}



export default withStyles(styles)(trustAndVerification);
