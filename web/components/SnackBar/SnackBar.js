import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
    const {message, open} = this.props;
    return(
      <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert style={{backgroundColor: 'rgba(248, 207, 97, 1)', fontWeight: 'bold'}} onClose={this.handleClose}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

export default SnackBar
