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
import {HANDLE_RIB} from '../../utils/i18n'

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
        this.setState({accounts: accounts})
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
    this.setState({showAddRib: false, bic: null, iban: null, errors: {}})
  };

  handleClose() {
    this.setState({showDeleteRib: false})
  }

  deleteAccount(account_id) {
    axios.delete(`/myAlfred/api/payment/account/${account_id}`)
      .then(() => {
        snackBarSuccess(HANDLE_RIB.snackbar_rib_delete)
        this.handleClose()
        this.componentDidMount()
      })
      .catch(() => {
        snackBarError(HANDLE_RIB.snackbar_rib_error_delete)
        this.handleClose()
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
              <h4 className={'customhandleribdialogtitle'}>{HANDLE_RIB.dialog_add_rib_title}</h4>
            </Grid>
            <Grid>
              <Typography className={'customhandleribdialogsubtitle'} style={{color: 'rgba(39,37,37,35%)'}}>{HANDLE_RIB.dialog_add_rib_subitle}</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid style={{margin: '15px'}}>
            <TextField
              className={'customhandleribdialogiban'}
              id="outlined-name"
              style={{width: '100%'}}
              value={this.state.iban}
              name={'iban'}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
              placeholder={HANDLE_RIB.dialog_add_rib_iban}
              label={HANDLE_RIB.dialog_add_rib_iban}
              error={errors.iban}
              helperText={errors.iban}
            />
          </Grid>
          <Grid style={{margin: '15px'}}>
            <TextField
              className={'customhandleribdialogbic'}
              style={{width: '100%'}}
              value={this.state.bic}
              name={'bic'}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
              placeholder={HANDLE_RIB.dialog_add_rib_bic}
              label={HANDLE_RIB.dialog_add_rib_bic}
              error={errors.bic}
              helperText={errors.bic}
            />
          </Grid>
          <Grid style={{textAlign: 'center', marginLeft: 15, marginRight: 15, marginTop: '3vh', marginBottom: '3vh'}}>
            <Button
              onClick={this.onSubmit}
              variant="contained"
              classes={{root: `customhandleribsavebuttton ${classes.buttonSave}`}}
            >
              {HANDLE_RIB.dialog_add_rib_button_save}
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
                <Typography className={'customhandleribsecurity1'} style={{color: 'rgba(39,37,37,35%)'}}>{HANDLE_RIB.dialog_add_rib_data}</Typography>
              </Grid>
              <Grid>
                <Typography className={'customhandleribsecurity2'} style={{color: 'rgba(39,37,37,35%)'}}>{HANDLE_RIB.dialog_add_rib_mongo}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  };

  modalDeleteRib = (id, classes) => {
    return (
      <Dialog
        open={this.state.showDeleteRib}
        onClose={() => this.handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{HANDLE_RIB.dialog_delete_rib_title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {HANDLE_RIB.dialog_delete_rib_content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            {HANDLE_RIB.dialog_delete_rib_cancel}
          </Button>
          <Button onClick={() => this.deleteAccount(id)} classes={{root: classes.buttonCancel}}>
            {HANDLE_RIB.dialog_delete_rib_button}
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
        snackBarSuccess(HANDLE_RIB.snackbar_rib_add)
        this.handleCloseModalAddRib()
        this.setState({showAddRib: false})
        axios.get('/myAlfred/api/payment/activeAccount')
          .then(response => {
            let accounts = response.data
            this.setState({accounts: accounts})
            this.componentDidMount()
          })

      })
      .catch(err => {
        snackBarError(HANDLE_RIB.snackbar_error_rib_add)
        try {
          this.setState({errors: err.response.data.errors})
        }
        catch (err2) {
          console.error(err2)
        }
      })
  };


  render() {
    const {classes} = this.props
    const{accounts, is_pro, showAddRib, showDeleteRib, errors} = this.state

    return(
      <Grid>
        <Grid style={{display: 'flex', alignItems: 'center'}}>
          <Grid>
            <h3 className={'customhandleribtitle'}>{HANDLE_RIB.title}</h3>
          </Grid>
          <Grid className={'customhandleribadd'}>
            <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={this.handleClick}>
              <AddCircleOutlineOutlinedIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid>
          <Typography
            className={'customhandleribsubtitle'}
            style={{color: 'rgba(39,37,37,35%)'}}>{is_pro ? HANDLE_RIB.subtitle_b2b : HANDLE_RIB.subtitle}</Typography>
        </Grid>
        {accounts.length>0 ?
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
            <Typography>{HANDLE_RIB.no_rib}</Typography>
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
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>{HANDLE_RIB.info_data}</Typography>
            </Grid>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>{HANDLE_RIB.mango_info}</Typography>
            </Grid>
          </Grid>
        </Grid>
        {showAddRib ? this.modalAddRib(errors, classes) : null}
        {showDeleteRib ? this.modalDeleteRib(accounts[0].Id, classes) : null}
      </Grid>
    )
  }
}

export default withStyles(styles)(HandleRIB)
