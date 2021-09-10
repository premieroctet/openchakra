import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {NEWS_LETTER} from '../../../utils/i18n'
import EmailIcon from '@material-ui/icons/Email'
import InputAdornment from '@material-ui/core/InputAdornment'
import styles from '../../../static/css/components/NewsLetter/NewsLetter'
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import '../../../static/assets/css/custom.css'

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})


const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

class NewsLetter extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      email: '',
      modalSubscription: false,
      modalSubscriptionFailed: false,
    }
  }

  handleOnchange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  handleSubmit = event => {
    event.preventDefault()

    let form_data = new FormData()

    const obj = {
      EMAIL: this.state.email,
      email_address_check: '',
      locale: 'fr',
    }

    for (let key in obj) {
      form_data.append(key, obj[key])
    }

    fetch('https://cef7ace9.sibforms.com/serve/MUIEAMozm6936onrqiPaove-mb4-eZhjKq9N50iJ7FVKRVk4NFAVimF-eRdZmyw9XmVuQh9ItQdDfS1NJLu11EDcUGdHWDoNY13qixwVVhV1R_OjaeI5i5iVjN7Jl86BzlIwoqHgutCV84BudSu-zdJ1Jrq0dAHZBFarwabS9kqbbKhRu9hK2T5XHv6cw8K5NdVf1hkL_BMB3hy7', {
      method: 'POST',
      mode: 'no-cors',
      body: form_data,
    }).then(() => this.setState({modalSubscription: true})).catch(err => this.setState({modalSubscriptionFailed: true}, () => console.error(err)))
  };

  modalSubscription = () => {
    return(
      <Dialog
        onClose={() => this.setState({modalSubscription: false})}
        aria-labelledby="customized-dialog-title"
        open={this.state.modalSubscription}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({modalSubscription: false})}>
          Abonnement à la newsletter de MyAlfred
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Vous avez reçu un email contenant un lien de confirmation !
          </Typography>
        </DialogContent>
      </Dialog>
    )
  };

  modalSubscriptionFailed = () => {
    return(
      <Dialog
        onClose={() => this.setState({modalSubscriptionFailed: false})}
        aria-labelledby="customized-dialog-title"
        open={this.state.modalSubscriptionFailed}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({modalSubscriptionFailed: false})}>
          Abonnement à la newsletter de MyAlfred
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Une erreur est survenue veuillez réessayer ultérieurement, pour plus d'informations contactez-nous via notre chat instantané ou directement par e-mail :
            <a href={'mailto:hello@my-alfred.io'}>
            hello@my-alfred.io
            </a>
          </Typography>
        </DialogContent>
      </Dialog>
    )
  };


  render() {
    const {classes} = this.props
    const {modalSubscription, modalSubscriptionFailed} = this.state


    return (
      <Grid className={classes.newsLetterMainStyle}>
        <Grid className={classes.newsLetterMainContainer}>
          <Grid className={classes.newsLetterLeftContainer}>
            <Grid>
              <h2 className={`customnewsletterh2 ${classes.newsLetterTitle}`}>{NEWS_LETTER.title}</h2>
            </Grid>
            <Grid>
              <p className={`customnewslettertext ${classes.newsLetterSubTitle}`}>{NEWS_LETTER.text}</p>
            </Grid>
          </Grid>
          <Grid className={classes.newsLetterRightContainer}>
            <Grid className={classes.newsLetterContainer}>
              <Grid>
                <TextField
                  id="outlined-basic"
                  placeholder="Email"
                  variant="outlined"
                  name="email"
                  classes={{root: `customnewletterbutton ${classes.newsLetterTextField}`}}
                  InputLabelProps={{shrink: false}}
                  onChange={this.handleOnchange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon className={classes.newsLetterEmailIcon}/>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid className={classes.newsLetterContainer}>
              <Grid>
                <Button style={{width: '100%'}} variant={'outlined'} classes={{root: `customnewsletterbutton ${classes.newsLetterButton}`}} onClick={this.handleSubmit}>{NEWS_LETTER.button}</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {modalSubscription ? this.modalSubscription() : null}
        {modalSubscriptionFailed ? this.modalSubscriptionFailed() : null}
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(NewsLetter))
