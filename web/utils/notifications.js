import SnackBar from "../components/SnackBar/SnackBar";
import React from "react";
import ReactDOM from "react-dom";

const snackBar = (severity, message) => {
  const body = document.getElementById('__next');
  var mysnackbar;

  if(typeof message === "object"){
    Object.values(message).map(value => {
      mysnackbar = <SnackBar severity={severity} message={value} id={value}/>;
      let div = document.createElement('div');
      div.id = 'id_snackbar';
      ReactDOM.render(mysnackbar, body.appendChild(div));
    });
  }
  else{
    mysnackbar = <SnackBar severity={severity} message={message} id={message}/>;
    let div = document.createElement('div');
    div.id = 'id_snackbar';
    ReactDOM.render(mysnackbar, body.appendChild(div));
  }
}

const snackBarSuccess =  (message) =>{
  snackBar('success', message)
};

const snackBarError=  (error) =>{
  snackBar('error', error)
};

const snackBarWarning= (warning) =>{
  snackBar('warning', warning)
};

module.exports = {
  snackBarSuccess,
  snackBarWarning,
  snackBarError
};
