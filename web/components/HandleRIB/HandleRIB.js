import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import styles from '../../static/css/components/HandleRIB/HandleRIB'
import Typography from '@material-ui/core/Typography'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import {formatIban} from '../../utils/text'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Divider from '@material-ui/core/Divider'
import SecurityIcon from '@material-ui/icons/Security'
import axios from 'axios'
import Router from 'next/router'
import {setAxiosAuthentication} from '../../utils/authentication'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
const {snackBarSuccess, snackBarError} = require('../../utils/notifications')
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import {isB2BAdmin} from '../../utils/context'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'

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

class HandleRIB extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      accounts: [],
      haveAccount: false,
      is_pro: isB2BAdmin(),
      showDeleteRib: false,
      showAddRib: false,
      errors: {},
      bic: '',
      iban: '',
    }
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()

    axios.get('/myAlfred/api/payment/activeAccount')
      .then(response => {
        let accounts = response.data
        if (accounts.length) {
          this.setState({haveAccount: true, accounts: accounts})
        }
      })
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  handleClick = () => {
    this.setState({showAddRib: !this.state.showAddRib})
  };

  handleClick2 = () => {
    this.setState({showDeleteRib: !this.state.showDeleteRib})
  };

  handleCloseModalAddRib = () => {
    this.setState({showAddRib: false})
  };

  handleClose() {
    this.setState({showDeleteRib: false})
  }

  deleteAccount(id) {
    const data = {
      id_account: id,
    }
    axios.put('/myAlfred/api/payment/account', data)
      .then(() => {
        snackBarSuccess('Compte bancaire supprimé')
        this.refresh()
      })
      .catch(() => {
        snackBarError('Un erreur est survenue')
      })

  }

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

  onSubmit = e => {
    e.preventDefault()
    const data = {
      bic: this.state.bic,
      iban: this.state.iban,
    }

    this.setState({errors: {}})
    axios.post('/myAlfred/api/payment/bankAccount', data)
      .then(() => {
        snackBarSuccess('RIB ajouté')
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
        snackBarError('Erreur à l\'ajout du RIB')
        try {
          this.setState({errors: err.response.data.errors})
        }
        catch (err) {
          console.error(err)
        }
      })
  };


  render() {
    const {classes} = this.props
    const{haveAccount, accounts, is_pro, showAddRib, showDeleteRib, errors} = this.state

    return(
      <Grid>
        <Grid style={{display: 'flex', alignItems: 'center'}}>
          <Grid>
            <h3>RIB enregistrés</h3>
          </Grid>
          <Grid>
            <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={this.handleClick}>
              <AddCircleOutlineOutlinedIcon/>
            </IconButton>
          </Grid>
        </Grid>

        <Grid>
          <Typography
            style={{color: 'rgba(39,37,37,35%)'}}>{is_pro ? 'Renseignez un rib pour permettre à vos collaborateurs le paiement par prélèvement bancaire.' : 'Choisissez le versement directement sur votre compte bancaire.'}</Typography>
        </Grid>
        {haveAccount ?
          <Grid container style={{marginTop: '10vh', display: 'flex', alignItems: 'center'}}>
            <Grid item xl={7} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Grid item xl={2} style={{display: 'flex'}}>
                <AccountBalanceIcon/>
              </Grid>
              <Grid item xl={6} style={{display: 'flex', flexDirection: 'column'}}>
                <Grid>
                  <Grid>
                    <Typography>{accounts[0].OwnerName}</Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <Typography
                    style={{color: 'rgba(39,37,37,35%)'}}>{formatIban(accounts[0].IBAN)}</Typography>
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
          <Grid style={{marginTop: '5vh'}}>
            <Typography>Aucun RIB enregistré</Typography>
          </Grid>
        }
        <Grid>
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
        {showAddRib ? this.modalAddRib(errors, classes) : null}
        {showDeleteRib ? this.modalDeleteRib(accounts[0].Id) : null}
      </Grid>
    )
  }
}

export default withStyles(styles)(HandleRIB)
