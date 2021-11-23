import {BUTTONS} from '../Dialog/utils'
import {TextField} from '@material-ui/core'
import DialogBase from '../Dialog/DialogBase'
import {withTranslation} from 'react-i18next'
import React from 'react'
/**
import {withStyles} from '@material-ui/core/styles'
import styles from './DialogBaseStyle.js'
*/
class DialogReject extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      reason: '',
    }
  }
  onRefuse = () => {
    const {onRefuse}=this.props
    const {reason}=this.state
    onRefuse && onRefuse(reason)
  }

  onReasonChange = ev => {
    this.setState({reason: ev.target.value})
  }

  render = () => {
    const {/** classes, */open, onClose}=this.props
    const buttons=[{label: BUTTONS.CANCEL, onClick: onClose}, {label: 'Refuser', onClick: this.onRefuse}]
    return (
      <DialogBase
        open={open}
        onClose={onClose}
        title={'Refus de réservation'}
        buttons={buttons}
      >
        <h4>Indiquez la raison du refus:</h4>
        <TextField onChange={this.onReasonChange}/>
      </DialogBase>
    )
  }

}

export default withTranslation('custom', {withRef: true})(DialogReject)
