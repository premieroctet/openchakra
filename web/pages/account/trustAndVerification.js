const {clearAuthenticationToken} = require('../../utils/authentication')
const {setAxiosAuthentication} = require('../../utils/authentication')
const {snackBarSuccess, snackBarError} = require('../../utils/notifications');
import React, {Fragment} from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {pdfjs} from 'react-pdf';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Helmet} from 'react-helmet';
import styles from '../../static/css/pages/trustAndVerification/trustAndVerification';
import Siret from '../../components/Siret/Siret';
import {Radio, RadioGroup} from '@material-ui/core';
import ButtonSwitch from '../../components/ButtonSwitch/ButtonSwitch';
import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';
import LayoutAccount from "../../hoc/Layout/LayoutAccount";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import FormHelperText from '@material-ui/core/FormHelperText';

const {CESU} = require('../../utils/consts');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const I18N = require('../../utils/i18n');
moment.locale('fr');

// TODO : nettoyer les attributes doublons (ex siret et company.siret)
// TODO : prendre en compte vat_subject et vat_number
class trustAndVerification extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      user: {},
      type: 'identite',
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
      ext_upload: '',
      extVerso: '',
      extVerso_upload: '',
      extRegistrationProof: '',
      extRegistrationProof_upload: '',
      professional: false,
      alfred: false,
      company: {},
      open: false,
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
    this.deleteRecto = this.deleteRecto.bind(this);
    this.deleteRegistrationProof = this.deleteRegistrationProof.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        var st = {'user': user}
        if (user.id_card) {
          st['card'] = user.id_card
          if (user.id_card.recto) {
            st['ext'] = user.id_card.recto.split('.').pop();
          }
          if (user.id_card.verso) {
            st['extVerso'] = user.id_card.verso.split('.').pop();
          }
          if (user.id_card.recto) {
            this.setState({type: user.id_card.verso ? 'identite' : 'passeport'});
          }
        }
        if (user.registration_proof) {
          st['registration_proof'] = user.registration_proof
          st['extRegistrationProof'] = user.registration_proof.split('.').pop();
        }
        st['id_card_status'] = user.id_card_status_text
        if (user.id_card_error) {
          st['id_card_error'] = user.id_card_error_text
        }
        this.setState(st);
        if (user.is_alfred) {
          this.setState({alfred: true});
          axios.get('/myAlfred/api/shop/currentAlfred')
            .then(response => {
              let result = response.data;
              this.setState({
                cis: result.cis,
                cesu: result.cesu,
                professional: result.is_professional,
                company: result.company,
              });

            });
        }
      })
      .catch(err => {
        console.error(err);
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'});
        }
      });
  }


  handleClose() {
    this.setState({open: false, deleteCb: null});
  }

  handleDelete() {
    this.deleteCb();
    this.handleClose();
  }

  onChange = e => {
    const {name, value} = e.target;
    this.setState({[e.target.name]: e.target.value},
      () => {
        if (name === 'siret') {
          this.handleSiret();
        }
      });
  };

  onCISChange = (id, checked) => {
    const event = {target: {name: 'cis', value: checked}};
    this.onChange(event);
  };

  onChangePartPro = event => {
    const {name, checked} = event.target

    const pro = (name == 'professional' && checked) || (name == 'particular' && !checked)
    this.setState({professional: pro})
  };

  onSiretChange = data => {
    this.setState({company: data});
  };

  onRectoChange = e => {
    this.setState({
      id_recto: e.target.files[0],
      recto_file: URL.createObjectURL(e.target.files[0]),
      ext_upload: e.target.files[0].name.split('.').pop()
    })
  }

  onVersoChange = e => {
    this.setState({
      id_verso: e.target.files[0],
      verso_file: URL.createObjectURL(e.target.files[0]),
      extVerso_upload: e.target.files[0].name.split('.').pop()
    })
  }

  onRegistrationProofChanged = e => {
    this.setState({
      id_registrationproof: e.target.files[0],
      registration_proof_file: URL.createObjectURL(e.target.files[0]),
      extRegistrationProof_upload: e.target.files[0].name.split('.').pop()
    })
  }

  handleSiret() {
    const code = this.state.siret;
    axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/siret/${code}`)
      .then(res => {
        const data = res.data;
        this.setState({
          name: data.etablissement.l1_normalisee,
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
        snackBarSuccess('Pièce d\'identité ajoutée');
        this.componentDidMount()
      })
      .catch(err => {
        console.error(err)
      });
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
        snackBarSuccess('Carte d\'identité ajoutée');
        this.componentDidMount
        ()
      }).catch();
  }

  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({numPages});
  };

  editSiret() {
    const newStatus = {
      is_particular: this.state.particular,
      is_professional: this.state.professional,
      company: this.state.company,
      cesu: this.state.cesu,
      cis: this.state.cis,
    };
    axios.put('/myAlfred/api/shop/editStatus', newStatus)
      .then(res => {
        snackBarSuccess('Statut modifié');
        const data = {status: this.state.professional ? 'Pro' : 'Particulier'};
        return axios.put('/myAlfred/api/serviceUser/editStatus', data);
      })
      .then(() => {
        const formData = new FormData();
        if (this.state.id_registrationproof) {
          formData.append('registrationProof', this.state.id_registrationproof);
          const config = {headers: {'content-type': 'multipart/form-data'}};
          axios.post('/myAlfred/api/users/profile/registrationProof/add', formData, config)
            .then(response => {
              snackBarSuccess('Document d\'immatriculation ajouté');
              this.componentDidMount()
            })
            .catch(err => console.error(err))
        }
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
          snackBarSuccess('Pièce d\'identité supprimée')
          this.componentDidMount()
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
          snackBarSuccess('Document d\immatriculation supprimé');
          this.componentDidMount()
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  callDrawer() {
    this.child.current.handleDrawerToggle();
  }

  statusSaveDisabled = () => {
    return false;
  };

  modalDeleteConfirmMessage = () => {
    return (
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
    )
  };


  content = (classes) => {
    return (
      <Grid style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>Vérification</h2>
          </Grid>
          <Grid>
            <Typography style={{color: 'rgba(39,37,37,35%)'}}>Vérifiez votre email, votre numéro de téléphone et votre
              identité.</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h3>Pièce d'identité</h3>
          </Grid>
          <Grid>
            <Typography style={{color: 'rgba(39,37,37,35%)'}}>Ajoutez ou modifiez vos documents d'identité.</Typography>
          </Grid>
        </Grid>

        <Grid>

          <Grid className={classes.searchFilterRightContainer}>
            <Grid className={classes.searchFilterRightLabel}>
              <h3>Type de document</h3>
            </Grid>
            <Grid>
              <FormControl>
                <Select
                  labelId="simple-select-placeholder-label-label"
                  id="simple-select-placeholder-label"
                  value={this.state.type}
                  name={'type'}
                  onChange={(event) => {
                    this.onChange(event);
                    this.setState({selected: true});
                  }}
                  displayEmpty
                  disableUnderline
                  classes={{select: classes.searchSelectPadding}}
                >
                  <MenuItem value={'passeport'}>
                    Passeport
                  </MenuItem>
                  <MenuItem value={'identite'}>
                    Carte d'identité
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid>
            {this.state.type ?
              <DocumentEditor
                confirmed={this.state.user.id_confirmed}
                ext={this.state.ext}
                ext_upload={this.state.ext_upload}
                db_document={this.state.card.recto}
                uploaded_file={this.state.recto_file}
                onChange={this.onRectoChange}
                onDelete={() => this.deleteRecto(false)}
                disabled={!this.state.type}
                title={'Télécharger recto'}
              />
              :
              null
            }
            {
              this.state.type === 'identite' ?
                <DocumentEditor
                  confirmed={this.state.user.id_confirmed}
                  ext={this.state.extVerso}
                  ext_upload={this.state.extVerso_upload}
                  db_document={this.state.card.verso}
                  uploaded_file={this.state.verso_file}
                  onChange={this.onVersoChange}
                  onDelete={() => this.deleteRecto(false)}
                  disabled={this.state.type !== 'identite'}
                  title={'Télécharger verso'}
                />
                :
                null
            }
            {this.state.id_recto === null && this.state.id_verso !== null ?
              <Grid style={{marginTop: '3vh', marginBottom: '5vh'}}>
                <Button onClick={() => this.addVerso()} variant="contained" className={classes.buttonSave}>
                  Enregistrer verso
                </Button>
              </Grid>
              :
              <Grid style={{marginTop: '3vh', marginBottom: '5vh'}}>
                <Button onClick={this.onSubmit} variant="contained" className={classes.buttonSave}>
                  Enregistrer
                </Button>
              </Grid>
            }
          </Grid>
        </Grid>
        <Grid>
          <Grid>
            <Divider style={{height: 2, width: '100%', margin: '10vh 0px'}}/>
          </Grid>
          {this.state.alfred ?
            <Grid style={{marginBottom: '12vh'}}>
              <Grid>
                <h3>Votre statut</h3>
              </Grid>
              <Grid>
                <Grid>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={!this.state.professional}
                        onChange={(e) => {
                          this.onChangePartPro(e);
                        }}
                        value={!this.state.professional}
                        name="particular"
                        color="primary"
                      />
                    }
                    label="Je suis un particulier"
                  />
                </Grid>
                {!this.state.professional ?
                  <Grid>
                    <RadioGroup name={'cesu'} value={this.state.cesu} onChange={this.onChange}>
                      <Grid style={{display: 'flex', alignItems: 'center'}}>
                        <Radio color="primary" value={CESU[0]}/>
                        <Typography>Je veux être déclaré(e) en CESU</Typography>
                      </Grid>
                      <Grid style={{display: 'flex', alignItems: 'center'}}>
                        <Radio color="primary" value={CESU[1]}/>
                        <Typography> J'accepte d'être déclaré en CES </Typography>
                      </Grid>
                      <Grid style={{display: 'flex', alignItems: 'center'}}>
                        <Radio color="primary" value={CESU[2]}/>
                        <Typography>Je n'accepte pas d'être déclaré(e) en CESU</Typography>
                      </Grid>
                    </RadioGroup>
                  </Grid>
                  : null
                }
                <Grid>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={this.state.professional}
                        onChange={(e) => {
                          this.onChangePartPro(e);
                        }}
                        value={this.state.professional}
                        name="professional"
                        color="primary"
                      />
                    }
                    label="Je suis un professionnel"
                  />
                </Grid>
              </Grid>
              {this.state.professional ?
                <Grid container style={{marginTop: '5vh'}}>
                  <Grid item xs={12}>
                    <ButtonSwitch
                      label="Je suis éligible au Crédit Impôt Service"
                      onChange={this.onCISChange}
                      checked={this.state.cis}
                    />
                  </Grid>
                  <Grid style={{marginTop: '5vh'}}>
                    <Siret
                      onChange={this.onSiretChange}
                      company={this.state.company}
                    />
                  </Grid>
                  <Grid>
                    <Grid style={{marginTop: '10vh'}}>
                      <h3>Document d'immatriculation</h3>
                    </Grid>
                    <Typography style={{color: 'rgba(39,37,37,35%)'}}>
                      Insérez ici le document d'immatriculation de votre entreprise (extrait de K-Bis, document
                      d'immatriculation de micro-entreprise).<br/>
                      Vous pouvez télécharger ce document en version PDF&nbsp;
                      <a color={'primary'} href='https://avis-situation-sirene.insee.fr/' target='_blank'
                      >sur le site de l'INSEE</a>
                    </Typography>
                  </Grid>
                  <DocumentEditor
                    ext={this.state.extRegistrationProof}
                    ext_upload={this.state.extRegistrationProof_upload}
                    db_document={this.state.registration_proof}
                    uploaded_file={this.state.registration_proof_file}
                    onChange={this.onRegistrationProofChanged}
                    onDelete={() => this.deleteRegistrationProof(false)}
                    title={'Télécharger document d\'immatriculation'}
                  />
                </Grid>
                :
                null
              }
              <Grid style={{marginTop: '10vh'}}>
                <Button  variant="contained" className={classes.buttonSave}
                        onClick={this.editSiret}>
                  Enregistrer
                </Button>
              </Grid>
            </Grid>
            : null
          }
        </Grid>
      </Grid>
    )
  };

  render() {
    const {classes} = this.props;
    const {message, user} = this.state

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Helmet>
          <title> Profil - Confiance et vérification - My Alfred </title>
          <meta property="description"
                content="Gérez vos notifications My Alfred depuis votre compte. Choisissez comment vous souhaitez être contacté en cas de réservation, de messages, d'annulation d'un service sur My Alfred. "/>
        </Helmet>
        <Hidden only={['xs']}>
          <LayoutAccount>
            {this.content(classes)}
          </LayoutAccount>
        </Hidden>
        <Hidden only={['lg', 'xl', 'sm', 'md']}>
          <LayoutMobile currentIndex={4}>
            {this.content(classes)}
          </LayoutMobile>
        </Hidden>
        {this.state.open ? this.modalDeleteConfirmMessage() : null}
      </React.Fragment>
    );
  };
}

export default withStyles(styles)(trustAndVerification);
