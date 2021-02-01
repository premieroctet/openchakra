import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const {CLOSE_NOTIFICATION_DELAY}=require('../../utils/consts')

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SnackBar extends React.Component{
  constructor(props) {
    super(props);
  }

  handleClose = () =>{
    this.props.closeSnackBar()
  };


  render() {
    const {message, open, severity} = this.props;
    return(
      <Snackbar open={open} autoHideDuration={CLOSE_NOTIFICATION_DELAY*1000} onClose={this.handleClose}>
        <Alert severity={severity} style={{fontWeight: 'bold'}} onClose={this.handleClose}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

export default SnackBar
