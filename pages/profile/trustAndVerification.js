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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import styled from "styled-components";
import Edit from '@material-ui/icons/EditOutlined';
import Delete from '@material-ui/icons/DeleteOutlined';
import { toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Helmet} from 'react-helmet';
import styles from './trustAndVerification/trustAndVerificationStyle'
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Siret from '../../components/WizardForm/Siret';
const {CESU}=require('../../utils/consts')
const {RadioGroup, Radio} = require('react-radio-group')
import ButtonSwitch from '../../components/ButtonSwitch/ButtonSwitch';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

moment.locale('fr');

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
      this.child = React.createRef();
        this.state = {
            user: {},
            type: null,
            selected: false,
            id_recto: null,
            id_verso: null,
            card:{},
            haveCard: false,
            haveCardV: false,
            pageNumber: 1,
            numPages: null,
            file: null,
            file2: null,
            ext: '',
            extVerso: '',
            professional: false,
            particular: false,
            alfred: false,
            company: {},
            siret: '',
            name: '',
            naf_ape: '',
            creation_date: '',
            status: '',
            open:false,
            // SMS Code setState
            smsCodeOpen: false, // Show/hide SMS code modal
            smsCode: '', // Typed SMS code
            smsError: null,
            cesu: null,
            cis: false,
        };
        this.editSiret = this.editSiret.bind(this);
        this.callDrawer = this.callDrawer.bind(this)
        this.onSiretChange = this.onSiretChange.bind(this)
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get('/myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});
                if(user.id_card !== undefined) {
                    this.setState({card:user.id_card});
                    if(user.id_card.recto !== undefined){
                        const ext = this.state.card.recto.split('.').pop();
                        this.setState({ext:ext , haveCard: true});
                    }
                    if(user.id_card.verso !== undefined){
                        const extVerso = this.state.card.verso.split('.').pop();
                        this.setState({extVerso:extVerso,haveCardV:true});
                    }
                }
                if(user.is_alfred) {
                    this.setState({alfred: true});
                    axios.get('/myAlfred/api/shop/currentAlfred')
                        .then(response => {
                            let result = response.data;
                            this.setState({cis : result.cis, cesu: result.cesu, professional: result.is_professional,particular:result.is_particular,company: result.company});

                            if(result.is_professional === true) {
                                this.setState({siret: result.company.siret,name: result.company.name,naf_ape: result.company.naf_ape,
                                    creation_date: result.company.creation_date, status: result.company.status})
                            }
                        })
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
      const {name, value} = e.target
      this.setState({ [e.target.name]: e.target.value },
      () => {
        if (name=='siret') this.handleSiret()
      });
    };

    onCesuChange = value => {
      const event = {target: { name : 'cesu', value : value}}
      this.onChange(event)
    }

    onCISChange = (id, checked) => {
      const event = {target: { name : 'cis', value : checked}}
      this.onChange(event)
    }

    onChangePartPro = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    onSiretChange = data => {
      this.setState(data)
    }

    onRectoChange = e => {
        this.setState({id_recto:e.target.files[0],haveCard:false});
        this.setState({
            file:
                URL.createObjectURL(e.target.files[0])    })
    };

    onVersoChange = e => {
        this.setState({id_verso:e.target.files[0]});
        this.setState({
            file2:
                URL.createObjectURL(e.target.files[0])    })
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
            .catch()

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
        axios.post("/myAlfred/api/users/profile/idCard",formData,config)
            .then((response) => {
                toast.info('Carte d\'identité ajoutée');
                this.componentDidMount();
            }).catch();
    };

    addVerso() {
        const formData = new FormData();
        formData.append('myCardV',this.state.id_verso);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/myAlfred/api/users/profile/idCard/addVerso",formData,config)
            .then((response) => {
                toast.info('Carte d\'identité ajoutée');

            }).catch();
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    sendEmail = () =>{
        axios.get('/myAlfred/api/users/sendMailVerification')
            .then(() => {
                toast.info('Email envoyé');
            })
            .catch();
    };

    sendSms = () => {
        axios.post('/myAlfred/api/users/sendSMSVerification')
          .then (res => {
            var txt="Le SMS a été envoyé";
            toast.info(txt);
            this.setState({smsCodeOpen:true})
          })
          .catch(err => {
              toast.error("Impossible d'envoyer le SMS");
          })
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
            cesu: this.state.cesu,
            cis: this.state.cis,
        };
        axios
            .put('/myAlfred/api/shop/editStatus', newStatus)
            .then(res => {
                toast.info('Statut modifié');
                let status;
                if(this.state.professional === true){
                    status = 'Pro'
                } else {
                    status = 'Particulier'
                }
                const data = {status:status};
                axios.put('/myAlfred/api/serviceUser/editStatus',data)
                    .then()
                    .catch()

            })
            .catch();
    }

    deleteRecto() {
        this.setState({open:false});
        axios.delete('/myAlfred/api/users/profile/idCard/recto')
            .then(() => {
                toast.error('Recto supprimé');
                setTimeout(() => window.location.reload(), 2000);

            })
            .catch();

    }

    checkSmsCode = () => {
      const sms_code = this.state.smsCode;
      axios.post("/myAlfred/api/users/checkSMSVerification", {sms_code:sms_code})
        .then( res => {
          if (res.data.sms_code_ok) {
            toast.info("Votre numéro de téléphone est validé")
            this.setState({smsCodeOpen: false});
          }
          else {
            toast.error("Le code est incorrect")
          }
        })
        .catch(err => toast.error("Erreur à la vérification du code"))
    }

    callDrawer(){
        this.child.current.handleDrawerToggle();
    }

    render() {
        const {classes} = this.props;
        const {user, ext, ext2, professional, alfred} = this.state;

        return (
            <Fragment>
            <Helmet>
                <title> Profil - Confiance et vérification - My Alfred </title>
                <meta property="description" content="Gérez vos notifications My Alfred depuis votre compte. Choisissez comment vous souhaitez être contacté en cas de réservation, de messages, d'annulation d'un service sur My Alfred. " />
              </Helmet>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid style={{zIndex: 0}}>
                            <ResponsiveDrawer ref={this.child} isActiveIndex={3} itemsDrawers={'profil'}/>
                        </Grid>
                        <Grid>
                            <Grid>
                                <IconButton
                                  color="inherit"
                                  aria-label="open drawer"
                                  edge="start"
                                  onClick={this.callDrawer}
                                  className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} className={classes.containerLeft}>
                            <Grid container>
                                <h1 style={{color: 'dimgray',fontWeight: '100'}}>Confiance et vérification</h1>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} style={{marginTop: 20}}>
                                    <InputLabel style={{color: 'black'}}>Email</InputLabel>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} style={{display:"contents",justifyContent:"center"}}>
                                        <TextField
                                            id="standard-name"
                                            className={classes.textField}
                                            value={user.email || ''}
                                            margin="normal"
                                            name={'email'}
                                            variant={'outlined'}
                                            disabled={true}
                                        />
                                        {user.is_confirmed ?
                                          <img src={'../static/Confiance et vérification active.svg'} height={80} alt={'check'} width={28} style={{marginLeft: 5}}/>
                                          :
                                          <img src={'../static/Confiance et vérification.svg'} alt={'check'} height={80} width={28} style={{marginLeft: 5}}/>
                                        }
                                    </Grid>
                                </Grid>
                                {user.is_confirmed ?
                                    null
                                    :
                                  <Grid container>
                                    <Grid item className={classes.buttonSend}>
                                      <Button className={classes.buttresp} type="submit" onClick={()=>this.sendEmail()} variant="contained" color="primary" style={{color:'white',marginTop:15 }}>
                                        Envoyer email de vérification
                                    </Button></Grid></Grid>}
                                <Grid item xs={12} style={{marginTop: 20}}>
                                    <InputLabel style={{color: 'black'}}>Téléphone</InputLabel>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} style={{display:"flex"}}>
                                        <TextField
                                            className={classes.textField}
                                            value={user.phone || ''}
                                            margin="normal"
                                            name={'phone'}
                                            variant={'outlined'}
                                            disabled={true}
                                        />
                                        {user.phone_confirmed ? <img src={'../static/Confiance et vérification active.svg'} alt={'check'} height={80} width={28} style={{marginLeft: 5}}/> :
                                            <img src={'../static/Confiance et vérification.svg'} alt={'check'} height={80} width={28} style={{marginLeft: 5}}/>
                                        }
                                    </Grid>
                                </Grid>
                                {user.phone_confirmed ?
                                    null
                                    :
                                    <Grid container>
                                        <Grid item  className={classes.buttonSendSMS}>
                                            <Button className={classes.buttresp2} type="submit" onClick={()=>this.sendSms()} variant="contained" color="primary" style={{color:'white',marginTop:15 }}>
                                                Envoyer sms de vérification
                                            </Button>
                                        </Grid>
                                    </Grid>}
                                <Grid item>
                                    <h2 style={{fontWeight:'100'}}>Pièce d'identité</h2>
                                    <p style={{color:'#2FBCD3'}}>Vous pouvez ajouter ou modifier une pièce d’identité en sélectionnant le type de pièce et télécharger le document.  Un recto pour le passeport et le recto/verso pour la pièce d’identité</p>
                                    <TextField
                                        select
                                        className={classes.typeFile}
                                        value={this.state.type}
                                        name={'type'}
                                        onChange={(event)=>{this.onChange(event);this.setState({selected:true})}}
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
                                    <form className={classes.formresp} onSubmit={this.onSubmit}>
                                        {this.state.haveCard ?
                                            <Grid item>
                                                <Grid container style={{alignItems:"center", flexWrap: 'nowrap'}}>
                                                    <Grid item>
                                                        <Grid container style={{border:'1px solid lightgrey',marginTop:20,alignItems:"center", justifyContent: 'center'}}>
                                                            <Grid item>
                                                                {ext ==='pdf' ?
                                                                    <Document
                                                                        file={`../${this.state.card.recto}`}
                                                                        onLoadSuccess={this.onDocumentLoadSuccess}
                                                                    >
                                                                        <Page pageNumber={this.state.pageNumber} width={200} />
                                                                    </Document>
                                                                    :
                                                                    <img src={`../${this.state.card.recto}`} alt={'recto'} width={200}/>
                                                                }
                                                            </Grid>
                                                            <Grid item className={classes.contentIcones}>
                                                                <label className={classes.forminputs}>
                                                                    <Edit color={'primary'} style={{cursor:"pointer"}}/>
                                                                    <input id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}} name="myCardR" type="file"
                                                                           onChange={this.onRectoChange}
                                                                           className="form-control" accept=".jpg,.jpeg,.png,.pdf"
                                                                    />
                                                                </label>
                                                                <Delete style={{cursor:"pointer"}} color={"secondary"} onClick={()=>this.handleClickOpen()}/>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        {user.id_confirmed ? <img src={'../static/Confiance et vérification active.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/> :
                                                            <img src={'../static/Confiance et vérification.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            :(
                                                this.state.file===null ?
                                                  <Grid item xs={6} className={classes.containerRecto}>
                                                        <label style={{display: 'inline-block',marginTop:15,textAlign:"center"}} className="forminputs">
                                                            <p style={{cursor:"pointer",color:'darkgrey',fontSize: '0.9rem'}}>Télécharger recto</p>
                                                            <input disabled={!this.state.selected} id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}} name="myCardR" type="file"
                                                                   onChange={this.onRectoChange}
                                                                   className="form-control" accept=".jpg,.jpeg,.png,.pdf"
                                                            />
                                                        </label>
                                                    </Grid> :
                                                    <Grid container style={{marginTop: 20,alignItems:"center"}}>
                                                        <Grid item xs={6} style={{height:115,border:'0.2px solid lightgrey',display:"flex",justifyContent:"center",
                                                            backgroundImage:`url('${this.state.file}')`,backgroundPosition:"center",backgroundSize:"cover"}}>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <label style={{display: 'inline-block',marginTop:15,textAlign:"center"}} className="forminputs">
                                                                <Edit style={{cursor:"pointer"}}/>
                                                                <input  id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}} name="myCardR" type="file"
                                                                       onChange={this.onRectoChange}
                                                                       className="form-control" accept=".jpg,.jpeg,.png,.pdf"
                                                                />
                                                            </label>
                                                            <Delete style={{cursor:"pointer"}} color={"secondary"} onClick={()=>this.setState({file:null})}/>
                                                        </Grid>

                                                    </Grid>
                                            )}

                                        {this.state.haveCard && this.state.haveCardV ?
                                            <Grid item xs={12}>
                                                <Grid container style={{alignItems:"center"}}>
                                                    <Grid item xs={9}>
                                                        <Grid container style={{border:'1px solid lightgrey',marginTop:20,alignItems:"center"}}>
                                                            <Grid item xs={8}>
                                                                {ext2 ==='pdf' ?
                                                                    <Document
                                                                        file={`../${this.state.card.verso}`}
                                                                        onLoadSuccess={this.onDocumentLoadSuccess}
                                                                    >
                                                                        <Page pageNumber={this.state.pageNumber} width={200} />
                                                                    </Document>
                                                                    :
                                                                    <img src={`../${this.state.card.verso}`} alt={'verso'} width={200}/>
                                                                }
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <label style={{display: 'inline-block',marginTop:15,textAlign:"center"}} className="forminputs">
                                                                    <Edit style={{cursor:"pointer"}}/>
                                                                    <input id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}} name="myCardV" type="file"
                                                                           onChange={this.onVersoChange}
                                                                           className="form-control" accept=".jpg,.jpeg,.png,.pdf"
                                                                    />
                                                                </label>
                                                                <Delete style={{cursor:"pointer"}} color={"secondary"} onClick={()=>this.handleClickOpen()}/>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        {user.id_confirmed ? <img src={'../static/Confiance et vérification active.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/> :
                                                            <img src={'../static/Confiance et vérification.svg'} alt={'check'} width={28} style={{marginLeft: 5}}/>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            :(
                                                this.state.file2===null ?
                                                  <Grid item xs={9} className={classes.containerRecto}>
                                                        <label style={{display: 'inline-block',marginTop:15,textAlign:"center"}} className="forminputs">
                                                            <p style={{cursor:"pointer",color:'darkgrey',fontSize: '0.9rem'}}>Télécharger verso (sauf passeport)</p>
                                                            <input disabled={this.state.type === 'passeport' || !this.state.selected} id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}} name="myCardV" type="file"
                                                                   onChange={this.onVersoChange}
                                                                   className="form-control" accept=".jpg,.jpeg,.png,.pdf"
                                                            />
                                                        </label>
                                                    </Grid> :
                                                    <Grid container style={{marginTop: 20,alignItems:"center"}}>
                                                        <Grid item xs={6} style={{height:115,border:'0.2px solid lightgrey',display:"flex",justifyContent:"center",
                                                            backgroundImage:`url('${this.state.file2}')`,backgroundPosition:"center",backgroundSize:"cover"}}>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <label style={{display: 'inline-block',marginTop:15,textAlign:"center"}} className="forminputs">
                                                                <Edit style={{cursor:"pointer"}}/>
                                                                <input id="file" style={{width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden'}} name="myCardV" type="file"
                                                                       onChange={this.onVersoChange}
                                                                       className="form-control" accept=".jpg,.jpeg,.png,.pdf"
                                                                />
                                                            </label>
                                                            <Delete style={{cursor:"pointer"}} color={"secondary"} onClick={()=>this.setState({file2:null})}/>
                                                        </Grid>
                                                    </Grid>
                                            )}
                                        {this.state.id_recto === null && this.state.id_verso !==null ?
                                            <Grid item xs={9} className={classes.respenr}  style={{marginTop:20,display:"flex",justifyContent:"flex-end"}}>
                                                <Button onClick={()=>this.addVerso()} color={"primary"} variant={"contained"} style={{color:"white"}}>Enregistrer verso</Button>
                                            </Grid>
                                            :
                                            <Grid item xs={9} className={classes.respenr} style={{marginTop:20,display:"flex",justifyContent:"flex-start"}}>
                                                <Button type={"submit"} color={"secondary"} variant={"contained"} style={{color:"white"}}>Enregistrer</Button>
                                            </Grid>
                                        }
                                    </form>
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
                                                        onChange={(e)=>{this.onChangePartPro(e);this.handleChecked2()}}
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
                                        { this.state.particular ?
                                          <Grid style={{ marginLeft:40}}>
                                          <RadioGroup name={'cesu'} selectedValue={this.state.cesu} onChange={this.onCesuChange}>
                                            <div><Radio value={CESU[0]}/>Je veux être déclaré(e) en CESU</div>
                                            <div><Radio value={CESU[1]}/>J'accepte d'être déclaré en CESU</div>
                                            <div><Radio value={CESU[2]}/>Je n'accepte pas d'être déclaré(e) en CESU RAJOUT TOOLTIP</div>
                                          </RadioGroup>
                                          </Grid>
                                          : null
                                        }
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.professional}
                                                        onChange={(e)=>{this.onChangePartPro(e);this.handleChecked()}}
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
                                      <>
                                      <ButtonSwitch label="Je suis éligible au Crédit Impôt Service" onChange={this.onCISChange} checked={this.state.cis} />
                                      <Siret onChange={this.onSiretChange}/>
                                      </>
                                        : null}
                                    <Grid item xs={5}>
                                        <Button className={classes.respenr2} onClick={this.editSiret} type="submit" variant="contained" color="primary" style={{color:'white',marginTop:15 }}>
                                            Enregistrer
                                        </Button>
                                    </Grid>
                                </React.Fragment>
                                : null
                            }
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
                    <DialogTitle id="alert-dialog-title">{"Supprimer la carte d'identité"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Voulez-vous vraiment supprimer votre carte d'identité/passeport ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleClose()} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={()=>this.deleteRecto()} color="secondary" autoFocus>
                            Supprimer
                        </Button>
                    </DialogActions>
                </Dialog>

   <Dialog open={this.state.smsCodeOpen} aria-labelledby="form-dialog-title">
     <DialogTitle id="form-dialog-title">Confirmation du numéro de téléphone</DialogTitle>
     <DialogContent>
       <DialogContentText>
         Saisissez le code reçu par SMS
       </DialogContentText>
       <TextField
         autoFocus
         margin="dense"
         id="name"
         label="Code"
         type="number"
         placeholder="0000"
         maxLength="4"
         value={this.state.smsCode}
         onChange={ e => { console.log(e.target.value); this.setState({smsCode: e.target.value})}}
         fullWidth
         errors={this.state.smsError}
       />
     </DialogContent>
     <DialogActions>
       <Button onClick={() => this.setState({smsCodeOpen:false})} color="primary">
         Annuler
       </Button>
       <Button
         disabled={this.state.smsCode.length!=4}
         onClick={() => this.checkSmsCode()}
         color="primary">
         Confirmer
       </Button>
     </DialogActions>
   </Dialog>
            </Fragment>
        );
    };
}
export default withStyles(styles)(trustAndVerification);
