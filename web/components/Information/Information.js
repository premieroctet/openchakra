import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import {INFORMATION} from '../../utils/i18n'

class Information extends React.Component {

  render() {
    const {open} = this.props

    if (!open) {
      return null
    }
    return (
      <Dialog aria-labelledby="simple-dialog-title" open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle id="alert-dialog-title">{this.props.type ? ReactHtmlParser(this.props.t('INFORMATION.title_error')) : ReactHtmlParser(this.props.t('INFORMATION.title'))}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" dangerouslySetInnerHTML={{__html: this.props.text}}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            {ReactHtmlParser(this.props.t('INFORMATION.button'))}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Information))
