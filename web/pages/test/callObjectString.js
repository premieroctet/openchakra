import React from 'react'
import Button from "@material-ui/core/Button";
import SnackBar from "../../components/SnackBar/SnackBar";
const {snackBar} = require('../../utils/notifications');
import ReactDOM from "react-dom";

export default class callObjectString extends React.Component{
  constructor(props) {
    super(props);
  }

  displaySnackbar = () =>{
    snackBar('success', 'hello');
  };

  render() {
    return(
      <div>
        <Button onClick={this.displaySnackbar}>
          click
        </Button>
      </div>
    );
  }
}
