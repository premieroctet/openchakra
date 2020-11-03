import React, {Fragment} from 'react';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import {pdfjs} from 'react-pdf';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Helmet} from 'react-helmet';
import styles from './trustAndVerification/trustAndVerificationStyle';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Siret from '../../components/WizardForm/Siret';
import {Radio, RadioGroup} from '@material-ui/core';
import ButtonSwitch from '../../components/ButtonSwitch/ButtonSwitch';
import cookie from 'react-cookies';
import Information from '../../components/Information/Information';
import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';
import LayoutAccount from "../../hoc/Layout/LayoutAccount";

const {CESU} = require('../../utils/consts');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const I18N = require('../../utils/i18n');
const {checkSocialSecurity} = require('../../utils/social_security');
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
      id_registrationproof: null,
      card: {},
      pageNumber: 1,
      numPages: null,
      recto_file: null,
      verso_file: null,
      registration_proof_file: null,
      registration_proof: null,
      ext: '',
      extVerso: '',
      extRegistrationProof: '',
      professional: false,
      particular: false,
      alfred: false,
      company: {},
      siret: '',
      name: '',
      naf_ape: '',
      creation_date: '',
      status: '',
      open: false,
      // SMS Code setState
      smsCodeOpen: false, // Show/hide SMS code modal
      smsCode: '', // Typed SMS code
      smsError: null,
      cesu: null,
      cis: false,
      notice: false,
      id_card_status: null,
      id_card_error: null,
      deleteConfirmMessage: null,
    };
    this.editSiret = this.editSiret.bind(this);
    this.callDrawer = this.callDrawer.bind(this);
    this.onSiretChange = this.onSiretChange.bind(this);
    this.statusSaveDisabled = this.statusSaveDisabled.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
    this.deleteRecto = this.deleteRecto.bind(this);
    this.deleteRegistrationProof = this.deleteRegistrationProof.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  static getInitialProps({query: {indexAccount}}) {
    return {index: indexAccount};

  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({user: user});
        if (user.id_card) {
          this.setState({card: user.id_card});
          if (user.id_card.recto) {
            const ext = user.id_card.recto.split('.').pop();
            this.setState({ext: ext});
          }
          if (user.id_card.verso) {
            const extVerso = user.id_card.verso.split('.').pop();
            this.setState({extVerso: extVerso});
          }
          if (user.id_card.recto) {
            this.setState({type: user.id_card.verso ? 'identite' : 'passeport'});
          }
        }
        if (user.registration_proof) {
          this.setState({registration_proof: user.registration_proof});
          const ext = user.registration_proof.split('.').pop();
          this.setState({extRegistrationProof: ext});
        }
        this.setState({id_card_status: user.id_card_status_text});
        if (user.id_card_error) {
          this.setState({id_card_error: user.id_card_error_text});
        }
        if (user.is_alfred) {
          this.setState({alfred: true});
          axios.get('/myAlfred/api/shop/currentAlfred')
            .then(response => {
              let result = response.data;
              this.setState({
                cis: result.cis,
                cesu: result.cesu,
                professional: result.is_professional,
                particular: result.is_particular,
                company: result.company,
                social_security: result.social_security,
              });

              if (result.is_professional === true) {
                this.setState({
                  siret: result.company.siret, name: result.company.name, naf_ape: result.company.naf_ape,
                  creation_date: result.company.creation_date, status: result.company.status,
                });
              }
            });
        }
      })
      .catch(err => {
        console.error(err);
        if (err.response.status === 401 || err.response.status === 403) {
          cookie.remove('token', {path: '/'});
          Router.push({pathname: '/login'});
        }
      });
  }

  handleClickOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
    this.setState({deleteCb: null});
  }

  handleDelete() {
    this.state.deleteCb();
    this.handleClose();
  }

  onChange = e => {
    const {name, value} = e.target;
    this.setState({[e.target.name]: e.target.value},
      () => {
        if (name == 'siret') {
          this.handleSiret();
        }
      });
  };

  onCISChange = (id, checked) => {
    const event = {target: {name: 'cis', value: checked}};
    this.onChange(event);
  };

  onChangePartPro = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  onSiretChange = data => {
    this.setState(data);
  };

  onRectoChange = e => {
    this.setState({id_recto: e.target.files[0]});
    this.setState({recto_file: URL.createObjectURL(e.target.files[0])});
  };

  onVersoChange = e => {
    this.setState({id_verso: e.target.files[0]});
    this.setState({verso_file: URL.createObjectURL(e.target.files[0])});
  };

  onRegistrationProofChanged = e => {
    this.setState({id_registrationproof: e.target.files[0]});
    this.setState({registration_proof_file: URL.createObjectURL(e.target.files[0])});
  };

  handleChecked() {
    this.setState({particular: false});
  }

  handleChecked2() {
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
        this.setState({
          name: data.etablissement.l1_normalisee,
          naf_ape: data.etablissement.activite_principale,
          status: data.etablissement.libelle_nature_juridique_entreprise,
        });
        const date = data.etablissement.date_creation;
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        const result = day + '/' + month + '/' + year;
        this.setState({creation_date: result});
      })
      .catch();

  }

  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myCardR', this.state.id_recto);
    formData.append('myCardV', this.state.id_verso);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post('/myAlfred/api/users/profile/idCard', formData, config)
      .then((response) => {
        toast.info('Pièce d\'identité ajoutée');
        this.componentDidMount();
      }).catch();
  };

  addVerso() {
    const formData = new FormData();
    formData.append('myCardV', this.state.id_verso);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post('/myAlfred/api/users/profile/idCard/addVerso', formData, config)
      .then((response) => {
        toast.info('Carte d\'identité ajoutée');

      }).catch();
  }

  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({numPages});
  };

  sendEmail = () => {
    axios.get('/myAlfred/api/users/sendMailVerification')
      .then(() => {
        toast.info('Email envoyé');
      })
      .catch();
  };

  sendSms = () => {
    axios.post('/myAlfred/api/users/sendSMSVerification')
      .then(res => {
        var txt = 'Le SMS a été envoyé';
        toast.info(txt);
        this.setState({smsCodeOpen: true});
      })
      .catch(err => {
        toast.error('Impossible d\'envoyer le SMS');
      });
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
      social_security: this.state.social_security,
    };
    axios.put('/myAlfred/api/shop/editStatus', newStatus)
      .then(res => {
        toast.info('Statut modifié');
        const data = {status: this.state.professional ? 'Pro' : 'Particulier'};
        return axios.put('/myAlfred/api/serviceUser/editStatus', data);
      })
      .then(() => {
        const formData = new FormData();
        formData.append('registrationProof', this.state.id_registrationproof);
        const config = {headers: {'content-type': 'multipart/form-data'}};
        axios.post('/myAlfred/api/users/profile/registrationProof/add', formData, config)
          .then((response) => {
            toast.info('Document d\'immatriculation ajouté');
          });

      })
      .catch(err => console.error(err));
  }

  deleteRecto(force = false) {
    if (!force) {
      this.setState({
        open: true,
        deleteCb: () => this.deleteRecto(true),
        deleteConfirmMessage: I18N.ID_CARD_CONFIRM_DELETION,
      });
    } else {
      axios.delete('/myAlfred/api/users/profile/idCard/recto')
        .then(() => {
          toast.error('Pièce d\'identité supprimée');
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  deleteRegistrationProof(force = false) {
    if (!force) {
      this.setState({
        open: true,
        deleteCb: () => this.deleteRegistrationProof(true),
        deleteConfirmMessage: I18N.REGISTRATION_PROOF_CONFIRM_DELETION,
      });
    } else {
      axios.delete('/myAlfred/api/users/profile/registrationProof')
        .then(() => {
          toast.error('Document d\immatriculation supprimé');
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  checkSmsCode = () => {
    const sms_code = this.state.smsCode;
    axios.post('/myAlfred/api/users/checkSMSVerification', {sms_code: sms_code})
      .then(res => {
        if (res.data.sms_code_ok) {
          toast.info('Votre numéro de téléphone est validé');
          this.setState({smsCodeOpen: false});
        } else {
          toast.error('Le code est incorrect');
        }
      })
      .catch(err => toast.error('Erreur à la vérification du code'));
  };

  callDrawer() {
    this.child.current.handleDrawerToggle();
  }

  statusSaveDisabled = () => {
    console.log(`statusSaveDisabled`);
    const particular = this.state.particular;
    const cesu = this.state.cesu;
    const ss_id = this.state.social_security;
    console.log(`${particular},${JSON.stringify(cesu)},${ss_id}`);
    if (particular) {
      if (cesu == CESU[0] || cesu == CESU[1]) {
        return checkSocialSecurity(ss_id) != null;
      }
    }
    return false;
  };

  displayInfo = () => {
    toast.error('test');
  };

  render() {
    const {classes, index} = this.props;
    const {user, ext, ext2, professional, alfred, cesu, type} = this.state;

    return (
      <Fragment>
        <Helmet>
          <title> Profil - Confiance et vérification - My Alfred </title>
          <meta property="description"
                content="Gérez vos notifications My Alfred depuis votre compte. Choisissez comment vous souhaitez être contacté en cas de réservation, de messages, d'annulation d'un service sur My Alfred. "/>
        </Helmet>
        <LayoutAccount index={index}>
          <Grid container className={classes.bigContainer}>
            <Grid item xs={9} className={classes.containerLeft}>
              <Grid container>
                <h1 style={{color: 'dimgray', fontWeight: '100'}}>Confiance et vérification</h1>
              </Grid>
              <Grid container>
                <Grid item xs={12} style={{marginTop: 20}}>
                  <InputLabel style={{color: 'black'}}>Email</InputLabel>
                </Grid>
                <Grid container>
                  <Grid item xs={12} style={{display: 'contents', justifyContent: 'center'}}>
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
                      <img src={'../static/Confiance et vérification active.svg'} height={80} alt={'check'} width={28}
                           style={{marginLeft: 5}}/>
                      :
                      <img src={'../static/Confiance et vérification.svg'} alt={'check'} height={80} width={28}
                           style={{marginLeft: 5}}/>
                    }
                  </Grid>
                </Grid>
                {user.is_confirmed ?
                  null
                  :
                  <Grid container>
                    <Grid item className={classes.buttonSend}>
                      <Button className={classes.buttresp} type="submit" onClick={() => this.sendEmail()}
                              variant="contained" color="primary" style={{color: 'white', marginTop: 15}}>
                        Envoyer email de vérification
                      </Button></Grid></Grid>}
                <Grid item xs={12} style={{marginTop: 20}}>
                  <InputLabel style={{color: 'black'}}>Téléphone</InputLabel>
                </Grid>
                <Grid container>
                  <Grid item xs={12} style={{display: 'flex'}}>
                    <TextField
                      className={classes.textField}
                      value={user.phone || ''}
                      margin="normal"
                      name={'phone'}
                      variant={'outlined'}
                      disabled={true}
                    />
                    {user.phone_confirmed ?
                      <img src={'../static/Confiance et vérification active.svg'} alt={'check'} height={80} width={28}
                           style={{marginLeft: 5}}/> :
                      <img src={'../static/Confiance et vérification.svg'} alt={'check'} height={80} width={28}
                           style={{marginLeft: 5}}/>
                    }
                  </Grid>
                </Grid>
                {user.phone_confirmed ?
                  null
                  :
                  <Grid container>
                    <Grid item className={classes.buttonSendSMS}>
                      <Button className={classes.buttresp2} type="submit" onClick={() => this.sendSms()}
                              variant="contained" color="primary" style={{color: 'white', marginTop: 15}}>
                        Envoyer sms de vérification
                      </Button>
                    </Grid>
                  </Grid>}
                <Grid item>
                  <h2 style={{fontWeight: '100'}}>Pièce d'identité</h2>
                  <p style={{color: '#2FBCD3'}}>Vous pouvez ajouter ou modifier une pièce d’identité en sélectionnant le
                    type de pièce et télécharger le document.<br/>Un recto pour le passeport et le recto/verso pour la
                    pièce d’identité</p>
                  <em>{this.state.id_card_status}</em><br/>
                  <em style={{color: 'red'}}>{this.state.id_card_error}</em><br/>
                  <TextField
                    select
                    className={classes.typeFile}
                    value={this.state.type}
                    name={'type'}
                    onChange={(event) => {
                      this.onChange(event);
                      this.setState({selected: true});
                    }}
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
                    {type ?
                      <DocumentEditor
                        confirmed={user.id_confirmed}
                        ext={this.state.ext}
                        db_document={this.state.card.recto}
                        uploaded_file={this.state.recto_file}
                        onChange={this.onRectoChange}
                        onDelete={() => this.deleteRecto(false)}
                        disabled={!type}
                        title={'Télécharger recto'}
                      />
                      :
                      null
                    }
                    {
                      type == 'identite' ?
                        <DocumentEditor
                          confirmed={user.id_confirmed}
                          ext={this.state.extVerso}
                          db_document={this.state.card.verso}
                          uploaded_file={this.state.verso_file}
                          onChange={this.onVersoChange}
                          onDelete={() => this.deleteRecto(false)}
                          disabled={type != 'identite'}
                          title={'Télécharger verso'}
                        />
                        :
                        null
                    }
                    {this.state.id_recto === null && this.state.id_verso !== null ?
                      <Grid item xs={9} className={classes.respenr}
                            style={{marginTop: 20, display: 'flex', justifyContent: 'flex-start'}}>
                        <Button onClick={() => this.addVerso()} color={'primary'} variant={'contained'}
                                style={{color: 'white'}}>Enregistrer verso</Button>
                      </Grid>
                      :
                      <Grid item xs={9} className={classes.respenr}
                            style={{marginTop: 20, display: 'flex', justifyContent: 'flex-start'}}>
                        <Button type={'submit'} color={'secondary'} variant={'contained'}
                                style={{color: 'white'}}>Enregistrer</Button>
                      </Grid>
                    }
                  </form>
                </Grid>

              </Grid>
              {alfred ?
                <React.Fragment><Grid container>
                  <h2 style={{fontWeight: '100'}}>Votre statut</h2>
                  &nbsp;
                  <img src="/static/assets/img/info.svg" width={16} onClick={() => this.setState({notice: true})}/>
                  <Information
                    open={this.state.notice}
                    onClose={() => this.setState({notice: false})}
                    text={I18N.CESU_NOTICE}
                  />
                </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.particular}
                            onChange={(e) => {
                              this.onChangePartPro(e);
                              this.handleChecked2();
                            }}
                            value={this.state.particular}
                            name="particular"
                            color="primary"
                            icon={<CircleUnchecked style={{fontSize: 30}}/>}
                            checkedIcon={<FilledButton/>}
                          />
                        }
                        label="Je suis un particulier"
                      />
                    </Grid>
                    {this.state.particular ?
                      <Grid style={{marginLeft: 40}}>
                        <RadioGroup name={'cesu'} value={cesu} onChange={this.onChange}>
                          <div><Radio color="primary" value={CESU[0]}/>Je veux être déclaré(e) en CESU</div>
                          {cesu == CESU[0] ?
                            <Grid style={{display: 'flex', marginLeft: 40}}>
                              <div>N° sécurité sociale</div>
                              &nbsp;
                              <TextField
                                id="ss1"
                                type="number"
                                name='social_security'
                                placeholder="N° SS (13+2 chiffres)"
                                value={this.state.social_security}
                                onChange={this.onChange}
                                errors={this.state.social_security}
                              />
                            </Grid>
                            :
                            null}
                          <div><Radio color="primary" value={CESU[1]}/>J'accepte d'être déclaré en CESU</div>
                          {cesu == CESU[1] ?
                            <Grid style={{display: 'flex', marginLeft: 40}}>
                              <div>N° sécurité sociale</div>
                              &nbsp;
                              <TextField
                                id="ss2"
                                type="number"
                                name='social_security'
                                placeholder="N° SS (13+2 chiffres)"
                                value={this.state.social_security}
                                onChange={this.onChange}
                                errors={this.state.social_security}
                              />
                            </Grid>
                            :
                            null}
                          <div><Radio color="primary" value={CESU[2]}/>Je n'accepte pas d'être déclaré(e) en CESU</div>
                        </RadioGroup>
                      </Grid>
                      : null
                    }
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.professional}
                            onChange={(e) => {
                              this.onChangePartPro(e);
                              this.handleChecked();
                            }}
                            value={this.state.professional}
                            name="professional"
                            color="primary"
                            icon={<CircleUnchecked style={{fontSize: 30}}/>}
                            checkedIcon={<FilledButton/>}
                          />
                        }
                        label="Je suis un professionnel"
                      />
                    </Grid>
                  </Grid>
                  {professional ?
                    <>
                      <ButtonSwitch label="Je suis éligible au Crédit Impôt Service" onChange={this.onCISChange}
                                    checked={this.state.cis}/>
                      <Siret onChange={this.onSiretChange} company={this.state}/>
                      <h2 style={{fontWeight: '100'}}>Document d'immatriculation</h2>
                      <p style={{color: '#2FBCD3'}}>
                        Insérez ici le document d'immatriculation de votre entreprise (extrait de K-Bis, document
                        d'immatriculation de micro-entreprise).<br/>
                        Vous pouvez télécharger ce document en version PDF&nbsp;
                        <a color={'primary'} href='https://avis-situation-sirene.insee.fr/' target='_blank'
                           style={{textDecoration: 'none', color: '#2FBCD3', cursor: 'pointer'}}>sur le site de l'INSEE
                          (lien)</a>
                      </p>
                      <DocumentEditor
                        ext={this.state.extRegistrationProof}
                        db_document={this.state.registration_proof}
                        uploaded_file={this.state.registration_proof_file}
                        onChange={this.onRegistrationProofChanged}
                        onDelete={() => this.deleteRegistrationProof(false)}
                        title={'Télécharger document d\'immatriculation'}
                      />
                    </>
                    :
                    null
                  }
                  <Grid item xs={5}>
                    <Button disabled={this.statusSaveDisabled()} className={classes.respenr2} onClick={this.editSiret}
                            type="submit" variant="contained" color="primary" style={{color: 'white', marginTop: 15}}>
                      Enregistrer
                    </Button>
                  </Grid>
                </React.Fragment>
                : null
              }
            </Grid>
          </Grid>
        </LayoutAccount>
        {/* <Footer/>*/}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Confirmation'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.deleteConfirmMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleDelete} color="secondary" autoFocus>
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
              onChange={e => {
                console.log(e.target.value);
                this.setState({smsCode: e.target.value});
              }}
              fullWidth
              errors={this.state.smsError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({smsCodeOpen: false})} color="primary">
              Annuler
            </Button>
            <Button
              disabled={this.state.smsCode.length != 4}
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
