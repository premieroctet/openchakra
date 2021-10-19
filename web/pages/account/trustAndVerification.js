import { canAlfredParticularRegister } from '../../config/config';
import CustomButton from '../../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
const {clearAuthenticationToken, setAxiosAuthentication} = require('../../utils/authentication')
const {snackBarSuccess} = require('../../utils/notifications')
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import {pdfjs} from 'react-pdf'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Helmet} from 'react-helmet'
import styles from '../../static/css/pages/trustAndVerification/trustAndVerification'
import Siret from '../../components/Siret/Siret'
import {Radio, RadioGroup} from '@material-ui/core'
import ButtonSwitch from '../../components/ButtonSwitch/ButtonSwitch'
import DocumentEditor from '../../components/DocumentEditor/DocumentEditor'
import LayoutAccount from '../../hoc/Layout/LayoutAccount'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import LayoutMobile from '../../hoc/Layout/LayoutMobile'
import '../../static/assets/css/custom.css'
import {TRUST_VERIFICATION} from '../../utils/i18n'
const {CESU} = require('../../utils/consts')

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
const I18N = require('../../utils/i18n')
moment.locale('fr')

// TODO : nettoyer les attributes doublons (ex siret et company.siret)
// TODO : prendre en compte vat_subject et vat_number
class trustAndVerification extends React.Component {
  constructor(props) {
    super(props)
    this.child = React.createRef()
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
      company: {},
      open: false,
      cesu: null,
      cis: false,
      notice: false,
      id_card_status: null,
      id_card_error: null,
      deleteConfirmMessage: null,
    }
    this.saveStatus = this.saveStatus.bind(this)
    this.callDrawer = this.callDrawer.bind(this)
    this.onSiretChange = this.onSiretChange.bind(this)
    this.statusSaveEnabled = this.statusSaveEnabled.bind(this)
    this.deleteRecto = this.deleteRecto.bind(this)
    this.deleteRegistrationProof = this.deleteRegistrationProof.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        let st = {'user': user}
        if (user.id_card) {
          st.card = user.id_card
          if (user.id_card.recto) {
            st.ext = user.id_card.recto.split('.').pop()
          }
          if (user.id_card.verso) {
            st.extVerso = user.id_card.verso.split('.').pop()
          }
          if (user.id_card.recto) {
            this.setState({type: user.id_card.verso ? 'identite' : 'passeport'})
          }
        }
        if (user.registration_proof) {
          st.registration_proof = user.registration_proof
          st.extRegistrationProof = user.registration_proof.split('.').pop()
        }
        st.id_card_status = user.id_card_status_text
        if (user.id_card_error) {
          st.id_card_error = user.id_card_error_text
        }
        this.setState(st)
        if (user.is_alfred) {
          axios.get('/myAlfred/api/shop/currentAlfred')
            .then(response => {
              let shop = response.data
              this.setState({
                cis: shop.cis,
                cesu: shop.cesu,
                professional: shop.is_professional,
                company: shop.company,
              })

            })
        }
        else {
          this.setState({
            professional: Boolean(user.professional),
            company: user.professional,
          })
        }
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })
  }


  handleClose() {
    this.setState({open: false, deleteCb: null})
  }

  handleDelete() {
    this.deleteCb()
    this.handleClose()
  }

  onChange = e => {
    const {name} = e.target
    this.setState({[e.target.name]: e.target.value},
      () => {
        if (name === 'siret') {
          this.handleSiret()
        }
      })
  };

  onCISChange = (id, checked) => {
    const event = {target: {name: 'cis', value: checked}}
    this.onChange(event)
  };

  onChangePartPro = event => {
    const {name, checked} = event.target
    const {user}=this.state

    const pro = (name == 'professional' && checked) || (name == 'particular' && !checked)
    this.setState({professional: pro})
    if (!user.is_alfred) {
      this.setState({company: pro ? {} : null})
    }
  };

  onSiretChange = data => {
    this.setState({company: data})
  };

  onRectoChange = e => {
    this.setState({
      id_recto: e.target.files[0],
      recto_file: URL.createObjectURL(e.target.files[0]),
      ext_upload: e.target.files[0].name.split('.').pop(),
    })
  }

  onVersoChange = e => {
    this.setState({
      id_verso: e.target.files[0],
      verso_file: URL.createObjectURL(e.target.files[0]),
      extVerso_upload: e.target.files[0].name.split('.').pop(),
    })
  }

  onRegistrationProofChanged = e => {
    this.setState({
      id_registrationproof: e.target.files[0],
      registration_proof_file: URL.createObjectURL(e.target.files[0]),
      extRegistrationProof_upload: e.target.files[0].name.split('.').pop(),
    })
  }

  handleSiret() {
    const code = this.state.siret
    axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/siret/${code}`)
      .then(res => {
        const data = res.data
        this.setState({
          name: data.etablissement.l1_normalisee,
        })
        const date = data.etablissement.date_creation
        const year = date.substring(0, 4)
        const month = date.substring(4, 6)
        const day = date.substring(6, 8)
        const result = `${day }/${ month }/${ year}`
        this.setState({creation_date: result})
      })
      .catch()

  }

  onSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('myCardR', this.state.id_recto)
    formData.append('myCardV', this.state.id_verso)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    axios.post('/myAlfred/api/users/profile/idCard', formData, config)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('TRUST_VERIFICATION.snackbar_id_add')))
        this.componentDidMount()
      })
      .catch(err => {
        console.error(err)
      })
  };

  addVerso() {
    const formData = new FormData()
    formData.append('myCardV', this.state.id_verso)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    axios.post('/myAlfred/api/users/profile/idCard/addVerso', formData, config)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('TRUST_VERIFICATION.snackbar_card_add')))
        this.componentDidMount()
      }).catch()
  }

  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({numPages})
  };

  saveStatus() {
    const newStatus = {
      is_particular: this.state.particular,
      is_professional: this.state.professional,
      company: this.state.company,
      cesu: this.state.cesu,
      cis: this.state.cis,
    }
    const url = this.state.user.is_alfred ? '/myAlfred/api/shop/status' : '/myAlfred/api/users/profile/status'
    axios.put(url, newStatus)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('TRUST_VERIFICATION.snackbar_status_update')))
        const formData = new FormData()
        if (this.state.id_registrationproof) {
          formData.append('registrationProof', this.state.id_registrationproof)
          const config = {headers: {'content-type': 'multipart/form-data'}}
          axios.post('/myAlfred/api/users/profile/registrationProof/add', formData, config)
            .then(() => {
              snackBarSuccess(ReactHtmlParser(this.props.t('TRUST_VERIFICATION.snackbar_doc_add')))
              this.componentDidMount()
            })
            .catch(err => console.error(err))
        }
      })
      .catch(err => console.error(err))
  }
  deleteRecto(force = false) {
    if (!force) {
      this.setState({
        open: true,
        deleteCb: () => this.deleteRecto(true),
        deleteConfirmMessage: ReactHtmlParser(this.props.t('TRUST_VERIFICATION.id_card_confirm_deletion')),
      })
    }
    else {
      axios.delete('/myAlfred/api/users/profile/idCard/recto')
        .then(() => {
          snackBarSuccess(ReactHtmlParser(this.props.t('TRUST_VERIFICATION.snackbar_id_delete')))
          this.componentDidMount()
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  deleteRegistrationProof(force = false) {
    if (!force) {
      this.setState({
        open: true,
        deleteCb: () => this.deleteRegistrationProof(true),
        deleteConfirmMessage: ReactHtmlParser(this.props.t('REGISTRATION_PROOF_CONFIRM_DELETION')),
      })
    }
    else {
      axios.delete('/myAlfred/api/users/profile/registrationProof')
        .then(() => {
          snackBarSuccess(ReactHtmlParser(this.props.t('TRUST_VERIFICATION.snackbar_doc_delete')))
          this.componentDidMount()
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  callDrawer() {
    this.child.current.handleDrawerToggle()
  }

  statusSaveEnabled = () => {
    const {user, professional, cesu, company}=this.state
    if (professional) {
      if (!(company && company.siret && company.name)) {
        return false
      }
      if (company.vat_subject && !company.vat_number) {
        return false
      }
    }
    else if (user.is_alfred && !cesu) {
      return false
    }
    return true
  };

  modalDeleteConfirmMessage = classes => {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.dialog_delete_title'))}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.state.deleteConfirmMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={this.handleClose} color="primary">
            {ReactHtmlParser(this.props.t('COMMON.btn_cancel'))}
          </CustomButton>
          <CustomButton onClick={this.handleDelete} classes={{root: classes.cancelButton}}>
            {ReactHtmlParser(this.props.t('COMMON.btn_delete'))}
          </CustomButton>
        </DialogActions>
      </Dialog>
    )
  };


  content = classes => {
    const {user, professional}=this.state
    if (!user) {
      return null
    }

    const displayCesu = user.is_alfred
    const displayCis = user.is_alfred

    return (
      <Grid style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2 className={'customtrustandveriftitle'}>{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.title'))}</h2>
          </Grid>
          <Grid>
            <Typography className={'customtrustandverifsubtitle'} style={{color: 'rgba(39,37,37,35%)'}}>{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.subtitle'))}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h3 className={'customtrustandverifidtitle'}>{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.identity_title'))}</h3>
          </Grid>
          <Grid>
            <Typography className={'customtrustandverifidsubtitle'} style={{color: 'rgba(39,37,37,35%)'}}>{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.identity_add_title'))}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Grid className={classes.searchFilterRightContainer}>
            <Grid className={classes.searchFilterRightLabel}>
              <h3 className={'customtrustandverifdocumenttitle'}>{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.document_type'))}</h3>
            </Grid>
            <Grid>
              <FormControl>
                <Select
                  labelId="simple-select-placeholder-label-label"
                  id="simple-select-placeholder-label"
                  value={this.state.type}
                  name={'type'}
                  onChange={event => {
                    this.onChange(event)
                    this.setState({selected: true})
                  }}
                  displayEmpty
                  disableUnderline
                  classes={{select: classes.searchSelectPadding}}
                >
                  <MenuItem value={'passeport'}>
                    {ReactHtmlParser(this.props.t('TRUST_VERIFICATION.passport'))}
                  </MenuItem>
                  <MenuItem value={'identite'}>
                    {ReactHtmlParser(this.props.t('TRUST_VERIFICATION.id_card'))}
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
                title={ReactHtmlParser(this.props.t('TRUST_VERIFICATION.download_recto'))}
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
                  title={ReactHtmlParser(this.props.t('TRUST_VERIFICATION.download_verso'))}
                />
                :
                null
            }
            {this.state.id_recto === null && this.state.id_verso !== null ?
              <Grid style={{marginTop: '3vh', marginBottom: '5vh'}}>
                <CustomButton onClick={() => this.addVerso()} variant="contained" className={`customtrustandverifsaveverso ${classes.buttonSave}`}>
                  {ReactHtmlParser(this.props.t('TRUST_VERIFICATION.save_verso'))}
                </CustomButton>
              </Grid>
              :
              <Grid style={{marginTop: '3vh', marginBottom: '5vh'}}>
                <CustomButton onClick={this.onSubmit} variant="contained" className={`customtrustandverifsavedoc ${classes.buttonSave}`}>
                  {ReactHtmlParser(this.props.t('COMMON.btn_save'))}
                </CustomButton>
              </Grid>
            }
          </Grid>
        </Grid>
        { /** Status part/pro ***/ }
        <Grid>
          <Grid>
            <Divider style={{height: 2, width: '100%', margin: '0px'}}/>
          </Grid>
          <Grid style={{marginBottom: '12vh'}}>
            <Grid>
              <h3 className={'customtrustandverifstatustitle'}>{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.your_status'))}</h3>
            </Grid>
            <Grid>
              { canAlfredParticularRegister() &&
                <Grid>
                  <FormControlLabel
                    control={
                      <Radio
                        className={'customtrustandverifparticular'}
                        checked={!professional}
                        onChange={e => {
                          this.onChangePartPro(e)
                        }}
                        value={!professional}
                        name="particular"
                        color="primary"
                      />
                    }
                    label={ReactHtmlParser(this.props.t('TRUST_VERIFICATION.particular'))}
                  />
                </Grid>
              }
              {!professional && displayCesu ?
                <Grid>
                  <RadioGroup name={'cesu'} value={this.state.cesu} onChange={this.onChange}>
                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                      <Radio color="primary" value={CESU[0]}/>
                      <Typography className={'customtrustandverifcesu'}>{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.declare_cesu'))}</Typography>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                      <Radio color="primary" value={CESU[1]}/>
                      <Typography className={'customtrustandverifces'}>{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.declare_cesu'))}</Typography>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                      <Radio color="primary" value={CESU[2]}/>
                      <Typography className={'customtrustandverifnocesu'}>{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.no_cesu'))}</Typography>
                    </Grid>
                  </RadioGroup>
                </Grid>
                : null
              }
              <Grid>
                <FormControlLabel
                  control={
                    <Radio
                      className={'customtrustandverifradiopro'}
                      checked={this.state.professional}
                      onChange={e => {
                        this.onChangePartPro(e)
                      }}
                      value={this.state.professional}
                      name="professional"
                      color="primary"
                    />
                  }
                  label={ReactHtmlParser(this.props.t('TRUST_VERIFICATION.professional'))}
                />
              </Grid>
            </Grid>
            {this.state.professional ?
              <Grid container>
                { displayCis &&
                <Grid item xs={12} className={'customtrustandverifcis'}>
                  <ButtonSwitch
                    label={ReactHtmlParser(this.props.t('TRUST_VERIFICATION.eligible_credit'))}
                    onChange={this.onCISChange}
                    checked={this.state.cis}
                  />
                </Grid>
                }
                <Grid style={{marginTop: '1vh'}}>
                  <Siret
                    onChange={this.onSiretChange}
                    company={this.state.company}
                  />
                </Grid>
                <Grid>
                  <Grid style={{marginTop: '1vh'}}>
                    <h3 className={'customtrustandverifdocimma'}>{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.document_title'))}</h3>
                  </Grid>
                  <Typography className={'customtrustandverifpdf'} style={{color: 'rgba(39,37,37,35%)'}}>
                    {ReactHtmlParser(this.props.t('TRUST_VERIFICATION.insert_document'))}<br/>
                    {ReactHtmlParser(this.props.t('TRUST_VERIFICATION.pdf_info'))}
                    <a className={'customtrustandveriflink'} color={'primary'} href='https://avis-situation-sirene.insee.fr/' target='_blank'
                    >{ReactHtmlParser(this.props.t('TRUST_VERIFICATION.insee_link'))}</a>
                  </Typography>
                </Grid>
                <DocumentEditor
                  ext={this.state.extRegistrationProof}
                  ext_upload={this.state.extRegistrationProof_upload}
                  db_document={this.state.registration_proof}
                  uploaded_file={this.state.registration_proof_file}
                  onChange={this.onRegistrationProofChanged}
                  onDelete={() => this.deleteRegistrationProof(false)}
                  title={ReactHtmlParser(this.props.t('TRUST_VERIFICATION.download_document_imma'))}
                />
              </Grid>
              :
              null
            }
            <Grid style={{marginTop: '1vh'}}>
              <CustomButton variant="contained" className={`customtrustandverifsavebutton ${classes.buttonSave}`}
                onClick={this.saveStatus} disabled={!this.statusSaveEnabled()}>
                {ReactHtmlParser(this.props.t('COMMON.btn_save'))}
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
        { /** End Status part/pro ***/ }
      </Grid>
    )
  };

  render() {
    const {classes} = this.props
    const {user} = this.state

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
        <Grid className={classes.layoutAccountContainer}>
          <LayoutAccount>
            {this.content(classes)}
          </LayoutAccount>
        </Grid>
        <Grid className={classes.layoutMobileContainer}>
          <LayoutMobile currentIndex={4}>
            {this.content(classes)}
          </LayoutMobile>
        </Grid>
        {this.state.open ? this.modalDeleteConfirmMessage(classes) : null}
      </React.Fragment>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(trustAndVerification))
