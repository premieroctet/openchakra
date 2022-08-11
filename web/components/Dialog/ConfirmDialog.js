import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import {withTranslation} from 'react-i18next'
import CustomButton from '../CustomButton/CustomButton'

const ConfirmDialog = ({t, removeAction, showDialog, setShowDialog}) => {
  
  return (<Dialog
    open={showDialog}
    onClose={() => setShowDialog(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{ReactHtmlParser(t('CARD_SERVICE.dialog_delete_title'))}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {ReactHtmlParser(t('CARD_SERVICE.dialog_delete_content'))}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <CustomButton onClick={() => setShowDialog(false)} color="primary">
        {ReactHtmlParser(t('COMMON.btn_cancel'))}
      </CustomButton>
      <CustomButton onClick={() => {
        removeAction()
        setShowDialog(false)
      }} >
        {ReactHtmlParser(t('COMMON.btn_delete'))}
      </CustomButton>
    </DialogActions>
  </Dialog>
  )
}

export default withTranslation(null, {withRef: true})(ConfirmDialog)

