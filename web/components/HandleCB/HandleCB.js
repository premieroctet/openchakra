import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/HandleCB/HandleCB'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import PaymentCard from '../Payment/PaymentCard/PaymentCard'
import IconButton from '@material-ui/core/IconButton'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import NumberFormat from 'react-number-format'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SecurityIcon from '@material-ui/icons/Security'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import axios from 'axios'
import {setAxiosAuthentication} from '../../utils/authentication'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
const {snackBarSuccess, snackBarError} = require('../../utils/notifications')


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

class HandleCB extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      showAddCreditCard: false,
      cards: [],
      showDeleteCard: false,
      Idtempo: '',
      error: null,
      card_number: '',
      expiration_date: '',
      csv: '',
    }
  }


  componentDidMount() {
    setAxiosAuthentication()

    axios.get('/myAlfred/api/payment/cards')
      .then(response => {
        let cards = response.data
        this.setState({cards: cards})
      }).catch(err => console.error(err))
  }


  callAddCreditCard = () => {
    this.setState({showAddCreditCard: true})
  };

  callDialogDeletedCard = e => {
    this.setState({showDeleteCard: true, Idtempo: e})
  };

  handleCloseDial = () => {
    this.setState({showDeleteCard: false})
  };

  handleCloseCreditCard = () => {
    this.setState({showAddCreditCard: false})
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
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
        snackBarSuccess('Carte ajouté !')
        this.setState({error: null, showDeleteCard: false, showAddCreditCard: false}, () => this.componentDidMount())
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data.error)
      })
  };

  deleteCard = () => {
    const obj = {id_card: this.state.Idtempo}
    axios.put('/myAlfred/api/payment/cards', obj).then(() => {
      snackBarSuccess('Carte supprimé !')
      this.setState({showDeleteCard: false, showAddCreditCard: false}, () => this.componentDidMount())
    }).catch(err => {
      snackBarError(err.response.data.error)
    })
  };

  modalAddCreditCard = classes => {
    const {showAddCreditCard, card_number, expiration_date, csv} = this.state
    return (
      <Dialog
        open={showAddCreditCard}
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
                value={card_number}
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
                value={expiration_date}
                format="##/##"
                placeholder="MM/YY"
                style={{width: '100%'}}
              />
            </Grid>
            <Grid style={{margin: '15px'}}>
              <TextField
                label="CVV"
                variant="outlined"
                value={csv}
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

  render() {
    const{classes, userName} = this.props
    const{cards, showAddCreditCard, showDeleteCard} = this.state

    return(
      <Grid>
        <Grid style={{display: 'flex', alignItems: 'center'}}>
          <Grid>
            <h3>Cartes enregistrées</h3>
          </Grid>
          <Grid>
            <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={this.callAddCreditCard}>
              <AddCircleOutlineOutlinedIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid>
          <Typography style={{color: 'rgba(39,37,37,35%)'}}>Payez encore plus rapidement sans communiquer vos
            informations financières.</Typography>
        </Grid>
        <Grid style={{marginTop: '5vh'}}>
          <PaymentCard cards={cards} userName={userName} editable={true}
            deleteCard={this.callDialogDeletedCard}/>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid style={{display: 'flex', alignItems: 'center'}}>
            <Grid>
              <IconButton aria-label="add" onClick={this.callAddCreditCard}>
                <AddCircleIcon/>
              </IconButton>
            </Grid>
            <Grid>
              <Typography>Ajouter une carte bancaire</Typography>
            </Grid>
          </Grid>
        </Grid>
        {showAddCreditCard ? this.modalAddCreditCard(classes) : null}
        {showDeleteCard ? this.modalDeleteCreditCard(classes) : null}
      </Grid>
    )
  }
}

export default withStyles(styles)(HandleCB)
