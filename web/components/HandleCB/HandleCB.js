import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/HandleCB/HandleCB'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PaymentCard from '../Payment/PaymentCard/PaymentCard'
import IconButton from '@material-ui/core/IconButton'
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
import '../../static/assets/css/custom.css'
import {HANDLE_CB} from '../../utils/i18n'

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
        snackBarSuccess(HANDLE_CB.snackbar_add)
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
      snackBarSuccess(HANDLE_CB.snackbar_delete)
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
        classes={{paper: 'customhandlecbdialog'}}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseCreditCard}>
          <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Grid>
              <h4>{ReactHtmlParser(this.props.t('HANDLE_CB.cb_title_dialog_add'))}</h4>
            </Grid>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>{ReactHtmlParser(this.props.t('HANDLE_CB.cb_subtitle_dialog_add'))}</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
            <Grid style={{margin: '15px'}}>
              <NumberFormat
                className={'customhandlecbnumb'}
                customInput={TextField}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('HANDLE_CB.cb_dialog_nb_add'))}
                name={'card_number'}
                onChange={this.onChange}
                value={card_number}
                format="#### #### #### ####"
                placeholder={ReactHtmlParser(this.props.t('HANDLE_CB.cb_dialog_placeholdercb_add'))}
                style={{width: '100%'}}
              />
            </Grid>
            <Grid style={{margin: '15px'}}>
              <NumberFormat
                className={'customhandlecbdate'}
                customInput={TextField}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('HANDLE_CB.cb_dialog_expdate_add'))}
                name={'expiration_date'}
                onChange={this.onChange}
                value={expiration_date}
                format="##/##"
                placeholder={ReactHtmlParser(this.props.t('HANDLE_CB.cb_dialog_placeholderexpdate_add'))}
                style={{width: '100%'}}
              />
            </Grid>
            <Grid style={{margin: '15px'}}>
              <TextField
                className={'customhandlecbcvv'}
                label={ReactHtmlParser(this.props.t('HANDLE_CB.cb_dialog_cvv_add'))}
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
              classes={{root: `customhandlecbsavebutton ${classes.buttonSave}`}}
            >
              {ReactHtmlParser(this.props.t('HANDLE_CB.cb_dialog_savecb_add'))}
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
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>{ReactHtmlParser(this.props.t('HANDLE_CB.cb_dialog_crypdata_add'))}</Typography>
              </Grid>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>{ReactHtmlParser(this.props.t('HANDLE_CB.cb_dialog_mongo_add'))}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  };

  modalDeleteCreditCard = classes => {
    return (
      <Dialog
        open={this.state.showDeleteCard}
        onClose={this.handleCloseDial}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title">{ReactHtmlParser(this.props.t('HANDLE_CB.cb_title_dialog_delete'))}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ReactHtmlParser(this.props.t('HANDLE_CB.cb_content_dialog_delete'))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseDial} color="primary">
            {ReactHtmlParser(this.props.t('HANDLE_CB.cb_cancel_dialog_delete'))}
          </Button>
          <Button onClick={this.deleteCard} classes={{root: classes.buttonCancel}}>
            {ReactHtmlParser(this.props.t('HANDLE_CB.cb_delete_dialog_delete'))}
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
            <h3 className={'customhandlecbtitle'}>{ReactHtmlParser(this.props.t('HANDLE_CB.cb_saves_title'))}</h3>
          </Grid>
          <Grid className={'customhandlecbaddcb'}>
            <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={this.callAddCreditCard}>
              <AddCircleOutlineOutlinedIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid>
          <Typography className={'customhandlecbsubtitle'} style={{color: 'rgba(39,37,37,35%)'}}>{ReactHtmlParser(this.props.t('HANDLE_CB.cb_subtitle_paid'))}</Typography>
        </Grid>
        <Grid style={{marginTop: '5vh'}}>
          <PaymentCard cards={cards} userName={userName} editable={true}
            deleteCard={this.callDialogDeletedCard}/>
        </Grid>
        {showAddCreditCard ? this.modalAddCreditCard(classes) : null}
        {showDeleteCard ? this.modalDeleteCreditCard(classes) : null}
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(HandleCB))
