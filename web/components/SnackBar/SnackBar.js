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

  handleClose = () =>{
    this.setState({open: false})
  };


  render() {
    const {message, severity} = this.props;
    const {open} = this.state;
    const is_snackbar = document.getElementById('snackbar');

    if(is_snackbar){
        var style = parseFloat(is_snackbar.style.marginBottom);
    }

    return(
      <Snackbar
        autoHideDuration={CLOSE_NOTIFICATION_DELAY*1000}
        open={open}
        onClose={this.handleClose}
        id={'snackbar'}
        style={{marginBottom: is_snackbar ? style + 80 : 0}}
      >
        <Alert severity={severity} style={{fontWeight: 'bold'}} onClose={this.handleClose}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

export default SnackBar
