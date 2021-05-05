import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SecurityIcon from '@material-ui/icons/Security';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/paymentMethod/paymentMethod';
import moment from 'moment'

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography {...other} className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class RecurrentCardDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining: 20*60,
    }
    this.timer=setInterval(() => {
      const remaining=this.state.remaining-1
      if (remaining==0) {
        this.delayExpired()
      }
      this.setState({remaining: this.state.remaining-1})
    }, 1000);
  }

  delayExpired = () => {
    clearInterval(this.timer)
    this.props.onDelayExpired()
  }

  formatTime = () => {
    var m = moment();
    m.set({hour:0,minute:0,second:0,millisecond:0});
    m.add(this.state.remaining, 's')
    var timeString = m.format('mm:ss')
    return timeString
  }

  onValidate =  () => {
    this.props.onValidate()
  }

  render() {
    const {classes} = this.props;
    const {remaining}=this.state
    const errors={}
    return (
      <Dialog
        open={true}
        onClose={() => this.handleCloseModalAddRib()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseModalAddRib}>
          <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Grid>
              <h4>Validation de la carte</h4>
            </Grid>
            <Grid>
              <Typography style={{color: 'rgba(39,37,37,35%)'}}>
                Vous venez d'ajouter une carte de crédit. Pour obtenir l'autorisation de prélèvement,
                nous allons vous débiter la somme d'un euro (1€) que nous vous recréditerons aussitôt.
                Ceci permettra le paiement des microservices et de votre participation aux services de conciergerie.
                Temps restant : {this.formatTime()}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid style={{textAlign: 'center', marginLeft: 15, marginRight: 15, marginTop: '3vh', marginBottom: '3vh'}}>
            <Button
              onClick={this.onValidate}
              variant="contained"
              classes={{root: classes.buttonSave}}
            >
              Valider la carte
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
  }

}

export default withStyles(styles)(RecurrentCardDialog)
