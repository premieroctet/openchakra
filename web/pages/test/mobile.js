import React from 'react';
import {Dialog, DialogActions, DialogContent, Divider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import CguContent from "../../components/CguContent/CguContent";

class MobileTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }


  dialogCgu = (classes) => {
    const {open} = this.state;
    const handleClose = () => {
      this.setState({open: false})
    };
    return (
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle onClose={() => this.setState({open: false})}>
        </DialogTitle>
        <DialogContent>
          <CguContent/>
          <Button style={{float: 'right'}} onClick={handleClose}>Fermer</Button>
        </DialogContent>
      </Dialog>
    )
  }

  handleOpenCgu = () => {
    this.setState({open: true})
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Button variant="outlined" onClick={this.handleOpenCgu}>Test cgu</Button>
        {this.dialogCgu()}
      </div>
    )
  }
}

export default MobileTest
