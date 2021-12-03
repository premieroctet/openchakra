import {Grid} from '@material-ui/core'
import CustomButton from '../CustomButton/CustomButton'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import styles from './DialogBaseStyle.js'
import IconButton from '@material-ui/core/IconButton'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'

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


class DialogBase extends React.Component {

  constructor(props) {
    super(props)
    this.state={
    }
  }

render = () => {
  const {classes, open, title, onClose}=this.props
  const {buttons}=this.props
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="customized-dialog-title" onClose={this.handleCloseModalAddRib}>
        <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h4 className={'customhandleribdialogtitle'}>{title}</h4>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid style={{margin: '15px'}}>
          {this.props.children}
        </Grid>
        <Grid style={{textAlign: 'center', marginLeft: 15, marginRight: 15, marginTop: '3vh', marginBottom: '3vh'}}>
          {buttons && buttons.map(b => (
            <CustomButton onClick={b.onClick} color="primary" variant="contained" classes={{root: `${classes.buttonSave}`}}>
              {b.label}
            </CustomButton>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(DialogBase))
