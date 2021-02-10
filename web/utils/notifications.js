import SnackBar from "../components/SnackBar/SnackBar";
import React from "react";
import ReactDOM from "react-dom";

const snackBarSuccess =  (messages) =>{
  if(typeof messages === "object"){
    Object.keys(messages).map(res => {
      messages = Object.values(messages[res])
    });
  }
  let mysnacbar = <SnackBar severity={'success'} message={messages} id={messages}/>;
  let body = document.getElementById('__next');
  let div = document.createElement('div');
  div.id = 'id_snackbar';
  ReactDOM.render(mysnacbar, body.appendChild(div));
};

const snackBarError=  (errors) =>{
  if(typeof errors === "object"){
    Object.keys(errors).map(res => {
      errors = Object.values(errors[res])
    });
  }
  let mysnacbar = <SnackBar severity={'error'} message={errors} id={errors}/>;
  let div = document.createElement('div');
  div.id = 'id_snackbar';
  ReactDOM.render(mysnacbar, document.getElementById('__next').appendChild(div));
};

module.exports = {
  snackBarSuccess,
  snackBarError
};
