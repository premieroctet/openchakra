import {Grid, TextField, Typography} from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import DialogBase from '../Dialog/DialogBase'
import {withTranslation} from 'react-i18next'
import React from 'react'

/**
import {withStyles} from '@material-ui/core/styles'
import styles from './DialogBaseStyle.js'
*/
class DialogCancel extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      reason: '',
    }
  }
  onCancel = () => {
    const {onCancel}=this.props
    const {reason}=this.state
    onCancel && onCancel(reason)
  }

  onReasonChange = ev => {
    this.setState({reason: ev.target.value})
  }

  render = () => {
    const {/** classes, */open, onClose, t}=this.props
    const buttons=[{label: 'Retour', onClick: onClose}, {label: "Confimer l'annulation", onClick: this.onCancel}]
    return (
      <DialogBase
        open={open}
        onClose={onClose}
        title={ReactHtmlParser(t('BOOKING_CANCEL.title'))}
        buttons={buttons}
      >
        <Grid item xs={12} style={{padding: '5%', width: '100%'}}>
          <Typography>
            {ReactHtmlParser(t('BOOKING_CANCEL.subtitle'))}
            <br/>
            {ReactHtmlParser(t('BOOKING_CANCEL.stepA'))}
            <br/>
            {ReactHtmlParser(t('BOOKING_CANCEL.stepB'))}
            <br/>
            {ReactHtmlParser(t('BOOKING_CANCEL.stepC'))}
            <br/>
            <br/>
            {ReactHtmlParser(t('BOOKING_CANCEL.penalty'))}
          </Typography>
          <h4>Indiquez la raison de l'annulation:</h4>
          <TextField onChange={this.onReasonChange}/>
        </Grid>
      </DialogBase>
    )
  }

}

export default withTranslation('custom', {withRef: true})(DialogCancel)
