import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import styles from './InformationStyle'
import withStyles from '@material-ui/core/styles/withStyles';

class Information extends React.Component {

  /**
  props:
   - open : true/false
   - onClose : callback when closing
   - text : text or html
   - type : 'info' or 'warning'
  */
  render() {
      const {classes} = this.props;
    const type=this.props.type ? this.props.type : 'info';

    return (
      <Dialog aria-labelledby="simple-dialog-title" open={this.props.open} onClose={this.props.onClose} classes={{paper: classes.paperOverride}}>
        <DialogTitle id="alert-dialog-title">{this.props.type ? 'Oups !': 'Info'}</DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description" className={classes.textContentDiAlog}>
                  {this.props.text}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={this.props.onClose} color="primary">
                  Ok
              </Button>
          </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(Information)
