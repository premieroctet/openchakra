import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const {CLOSE_NOTIFICATION_DELAY}=require('../../utils/consts');

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SnackBar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      open: true,
    }
  }

  handleClose = (event, reason) =>{
    if (reason === 'clickaway') {
      return;
    }
    let body = document.getElementById('__next');
    let el = document.getElementById('id_snackbar');
    body.removeChild(el)

  };

  render() {
    const {message, severity, id} = this.props;
    const {open} = this.state;
    const is_snackbar = document.getElementById('snackbar');

    if(is_snackbar){
        var newMargin = parseFloat(is_snackbar.style.marginBottom);
    }

    return(
      <Snackbar
        key={id}
        autoHideDuration={CLOSE_NOTIFICATION_DELAY*1000}
        open={open}
        onClose={this.handleClose}
        id={'snackbar'}
        style={{marginBottom: is_snackbar ? newMargin + 80 : 0}}
      >
        <Alert key={id} severity={severity} style={{fontWeight: 'bold'}}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

export default SnackBar
