import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
const {setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import NumberFormat from 'react-number-format'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import {formatCreditCardNumber, formatCVC, formatExpirationDate} from '../../components/utils'
import {Helmet} from 'react-helmet'
import IconButton from '@material-ui/core/IconButton'
import styles from '../../static/css/pages/paymentMethod/paymentMethod'
const {isB2BAdmin} = require('../../utils/context')
import LayoutAccount from '../../hoc/Layout/LayoutAccount'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import PaymentCard from '../../components/Payment/PaymentCard/PaymentCard'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import SecurityIcon from '@material-ui/icons/Security'
import LayoutMobile from '../../hoc/Layout/LayoutMobile'
import {formatIban} from '../../utils/text'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import {toast} from 'react-toastify'
import HandleCB from '../../components/HandleCB/HandleCB'

moment.locale('fr')

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props
  return (
    <MuiDialogTitle disableTypography {...other} className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})


class paymentMethod extends React.Component {
  constructor(props) {
    super(props)
    this.child = React.createRef()
    this.state = {
      user: {},
      cards: [],
      card_number: '',
      expiration_date: '',
      issuer: '',
      focused: '',
      csv: '',
      showDeleteCard: false,
      Idtempo: '',
      showAddCreditCard: false,
      showAddRib: false,
      showDeleteRib: false,
      accounts: [],
      haveAccount: false,
      bic: '',
      iban: '',
      error: null,
      errors: {},
      is_pro: false,
    }
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        this.setState({
          user: res.data,
          userName: res.data.full_name,
          is_pro: isB2BAdmin(),
        })
      })
      .catch(err => {
        // if (err.response.status === 401 || err.response.status === 403) {
        //   clearAuthenticationToken()
        //   Router.push({pathname: '/'});
        // }
        console.error(err)
      },
      )

    axios.get('/myAlfred/api/payment/cards')
      .then(response => {
        let cards = response.data
        this.setState({cards: cards})
      }).catch(err => console.error(err))

    axios.get('/myAlfred/api/payment/activeAccount')
      .then(response => {
        let accounts = response.data
        if (accounts.length) {
          this.setState({haveAccount: true, accounts: accounts})
        }
      })
  }

  handleClick = () => {
    this.setState({showAddRib: !this.state.showAddRib})
  };

  handleClick2 = () => {
    this.setState({showDeleteRib: !this.state.showDeleteRib})
  };

  handleClose() {
    this.setState({showDeleteRib: false})
  }

  refreshCards = () => {
    this.setState({showDeleteCard: false, showAddCreditCard: false}, () => this.componentDidMount())
  };

  handleCloseDial = () => {
    this.setState({showDeleteCard: false})
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  handleInputChange = ({target}) => {
    if (target.name === 'card_number') {
      target.value = formatCreditCardNumber(target.value)
    }
    else if (target.name === 'expiration_date') {
      target.value = formatExpirationDate(target.value)
    }
    else if (target.name === 'csv') {
      target.value = formatCVC(target.value)
    }

    this.setState({[target.name]: target.value})
  };

  onSubmit = e => {
    e.preventDefault()
    const data = {
      bic: this.state.bic,
      iban: this.state.iban,
    }

    this.setState({errors: {}})
    axios.post('/myAlfred/api/payment/bankAccount', data)
      .then(res => {
        toast.info('RIB ajouté')

        this.setState({showAddRib: false})
        axios.get('/myAlfred/api/payment/activeAccount')
          .then(response => {
            let accounts = response.data
            if (accounts.length) {
              this.setState({haveAccount: true, accounts: accounts})
            }
          })

      })
      .catch(err => {
        toast.error('Erreur à l\'ajout du RIB')
        try {
          this.setState({errors: err.response.data.errors})
        }
        catch (err) {
          console.error(err)
        }
      })
  };

  deleteAccount(id) {
    const data = {
      id_account: id,
    }
    axios.put('/myAlfred/api/payment/account', data)
      .then(() => {
        toast.error('Compte bancaire supprimé')
        this.refresh()
      })
      .catch(() => {
        toast.error('Un erreur est survenue')
      })

  }

  refresh() {
    this.setState({showDeleteRib: false, haveAccount: false})
    axios.get('/myAlfred/api/payment/activeAccount')
      .then(response => {
        let accounts = response.data
        if (accounts.length) {
          this.setState({haveAccount: true, accounts: accounts})
        }
      })
  }

  handleCloseModalAddRib = () => {
    this.setState({showAddRib: false})
  };

  modalAddRib = (errors, classes) => {
    return (
      <Dialog
        open={this.state.showAddRib}
        onClose={() => this.handleCloseModalAddRib()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseModalAddRib}>
          <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Grid>
              <h4>Ajouter un RIB</h4>
            </Grid>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>Ajouter un RIB en toute sécurité</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid style={{margin: '15px'}}>
            <TextField
              id="outlined-name"
              style={{width: '100%'}}
              value={this.state.iban}
              name={'iban'}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
              placeholder={'IBAN'}
              label={'IBAN'}
              error={errors.iban}
              helperText={errors.iban}
            />
          </Grid>
          <Grid style={{margin: '15px'}}>
            <TextField
              style={{width: '100%'}}
              value={this.state.bic}
              name={'bic'}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
              placeholder={'Code SWIFT / BIC'}
              label={'Code SWIFT / BIC'}
              error={errors.bic}
              helperText={errors.bic}
            />
          </Grid>
          <Grid style={{textAlign: 'center', marginLeft: 15, marginRight: 15, marginTop: '3vh', marginBottom: '3vh'}}>
            <Button
              onClick={this.onSubmit}
              variant="contained"
              classes={{root: classes.buttonSave}}
            >
              Enregistrer le RIB
            </Button>
          </Grid>
          <Grid style={{display: 'flex', alignItems: 'center'}}>
            <Grid>
              <Grid>
                <SecurityIcon style={{color: 'rgba(39,37,37,35%)'}}/>
              </Grid>
            </Grid>
            <Grid>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>Toutes les données de paiement sur My Alfred sont
                  chiffrées.</Typography>
              </Grid>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>Elles sont gérées par mangopay notre partenaire de
                  confiance.</Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  };

  modalDeleteRib = id => {
    return (
      <Dialog
        open={this.state.showDeleteRib}
        onClose={() => this.handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Voulez-vous vraiment supprimer votre RIB ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si vous supprimez votre RIB vous ne pourrez plus l'utiliser par la suite avec ce compte.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Annuler
          </Button>
          <Button onClick={() => this.deleteAccount(id)} color="secondary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };


  addCard = () => {
    const card_number = this.state.card_number.replace(/\s/g, '')
    const expiration_date = this.state.expiration_date.split('/')
    const finaldate = expiration_date[0] + expiration_date[1]
    const csv = this.state.csv

    const obj = {
      card_number: card_number,
      expiration_date: finaldate,
      csv: csv,
    }

    axios.post('/myAlfred/api/payment/createCard', obj)
      .then(() => {
        this.setState({error: null})
        this.refreshCards()
      })
      .catch(err => {
        console.error(err)
        this.setState({error: err.response.data.error})
      })
  };

  deleteCard = () => {
    /* TODO pas de réponse de mongopay, api tourne en boucle, du coup j'ai supprimé then & catch*/
    const obj = {id_card: this.state.Idtempo}
    axios.put('/myAlfred/api/payment/cards', obj)
    this.setState({showDeleteCard: false, showAddCreditCard: false}, this.componentDidMount)
  };

  handleCloseCreditCard = () => {
    this.setState({showAddCreditCard: false})
  };

  callAddCreditCard = () => {
    this.setState({showAddCreditCard: true})
  };

  callDialogDeletedCard = e => {
    this.setState({showDeleteCard: true, Idtempo: e})
  };

  modalAddCreditCard = classes => {
    return (
      <Dialog
        open={this.state.showAddCreditCard}
        onClose={() => this.handleCloseCreditCard()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseCreditCard}>
          <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Grid>
              <h4>Enregistrer une carte</h4>
            </Grid>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>Ajouter une carte en toute sécurité</Typography>
            </Grid>
            <Grid>
              <Typography style={{color: 'red'}}>{this.state.error}</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
            <Grid style={{margin: '15px'}}>
              <NumberFormat
                customInput={TextField}
                variant={'outlined'}
                label="Numéro de carte"
                name={'card_number'}
                onChange={this.onChange}
                value={this.state.card_number}
                format="#### #### #### ####"
                placeholder="Votre carte de crédit"
                style={{width: '100%'}}
              />
            </Grid>
            <Grid style={{margin: '15px'}}>
              <NumberFormat
                customInput={TextField}
                variant={'outlined'}
                label="Date d'expiration"
                name={'expiration_date'}
                onChange={this.onChange}
                value={this.state.expiration_date}
                format="##/##"
                placeholder="MM/YY"
                style={{width: '100%'}}
              />
            </Grid>
            <Grid style={{margin: '15px'}}>
              <TextField
                label="CVV"
                variant="outlined"
                value={this.state.csv}
                onChange={this.onChange}
                name={'csv'}
                type="number"
                pattern="\d{3,4}"
                style={{width: '100%'}}
              />
            </Grid>
          </Grid>
          <Grid style={{textAlign: 'center', marginLeft: 15, marginRight: 15, marginTop: '3vh', marginBottom: '3vh'}}>
            <Button
              onClick={this.addCard}
              variant="contained"
              classes={{root: classes.buttonSave}}
            >
              Enregistrer la carte
            </Button>
          </Grid>
          <Grid style={{display: 'flex', alignItems: 'center'}}>
            <Grid>
              <Grid>
                <SecurityIcon style={{color: 'rgba(39,37,37,35%)'}}/>
              </Grid>
            </Grid>
            <Grid>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>Toutes les données de paiement sur My Alfred sont
                  cryptées.</Typography>
              </Grid>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>Elles sont gérées par mangopay notre partenaire de
                  confiance.</Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  };

  modalDeleteCreditCard = () => {
    return (
      <Dialog
        open={this.state.showDeleteCard}
        onClose={this.handleCloseDial}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title">{'Voulez-vous vraiment supprimer votre carte bancaire ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si vous supprimez votre carte bancaire vous ne pourrez plus l'utiliser par la suite avec ce compte.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseDial} color="primary">
            Annuler
          </Button>
          <Button onClick={this.deleteCard} color="secondary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  content = () => {
    return (
      <Grid style={{display: 'flex', flexDirection: 'column'}}>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>Modes de paiement</h2>
          </Grid>
          <Grid>
            <Typography style={{color: 'rgba(39,37,37,35%)'}}>N'hésitez pas à enregistrer un mode de paiement pour aller
              plus vite lors de vos réservations.</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <HandleCB/>
        </Grid>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h3>RIB enregistrés</h3>
          </Grid>
          <Grid>
            <Typography
              style={{color: 'rgba(39,37,37,35%)'}}>{this.state.is_pro ? 'Renseignez un rib pour permettre à vos collaborateurs le paiement par prélèvement bancaire.' : 'Choisissez le versement directement sur votre compte bancaire.'}</Typography>
          </Grid>
        </Grid>
        {this.state.haveAccount ?
          <Grid container style={{marginTop: '10vh', display: 'flex', alignItems: 'center'}}>
            <Grid item xl={7} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Grid item xl={2} style={{display: 'flex'}}>
                <AccountBalanceIcon/>
              </Grid>
              <Grid item xl={6} style={{display: 'flex', flexDirection: 'column'}}>
                <Grid>
                  <Grid>
                    <Typography>{this.state.accounts[0].OwnerName}</Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <Typography
                    style={{color: 'rgba(39,37,37,35%)'}}>{formatIban(this.state.accounts[0].IBAN)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={5} style={{display: 'flex', justifyContent: 'center'}}>
              <IconButton aria-label="delete" onClick={() => this.handleClick2()}>
                <DeleteForeverIcon/>
              </IconButton>
            </Grid>
          </Grid>
          :
          null
        }
        <Grid>
          <Grid>
            <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
          </Grid>
          <Grid style={{display: 'flex', alignItems: 'center'}}>
            <Grid>
              <IconButton aria-label="add" onClick={this.handleClick}>
                <AddCircleIcon/>
              </IconButton>
            </Grid>
            <Grid>
              <Typography>Ajouter un rib</Typography>
            </Grid>
          </Grid>
          <Grid>
            <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
          </Grid>
        </Grid>
        <Grid style={{
          marginTop: '10vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12vh',
        }}>
          <Grid style={{marginRight: '2vh'}}>
            <Grid>
              <SecurityIcon style={{color: 'rgba(39,37,37,35%)'}}/>
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>Toutes les données de paiement sur My Alfred sont
                chiffrées.</Typography>
            </Grid>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>Elles sont gérées par mangopay notre partenaire de
                confiance.</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    )
  };

  render() {
    const {classes} = this.props
    const {showDeleteCard, showAddCreditCard, accounts, showAddRib, showDeleteRib, errors, user} = this.state

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Compte - Modes de paiement - My Alfred </title>
          <meta property="description"
            content="Accédez à votre compte My Alfred, première application d'offres de services entre particuliers. La création de votre compte est gratuite et sécurisée. Créez votre compte sur My Alfred en quelques clics pour trouvez ou offrir vos services !"/>
        </Helmet>
        <Grid className={classes.layoutAccountContainer}>
          <LayoutAccount>
            {this.content(classes)}
          </LayoutAccount>
        </Grid>
        <Grid className={classes.layoutMobileContainer}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Grid>
        {showAddCreditCard ? this.modalAddCreditCard(classes) : null}
        {showDeleteCard ? this.modalDeleteCreditCard(classes) : null}
        {showAddRib ? this.modalAddRib(errors, classes) : null}
        {showDeleteRib ? this.modalDeleteRib(accounts[0].Id) : null}
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(paymentMethod)
