import SnackBar from "../components/SnackBar/SnackBar";
import React from "react";
import ReactDOM from "react-dom";

const snackBarSuccess =  (messages) =>{
  var mysnacbar = <SnackBar severity={'success'} message={messages}/>;
  var div = document.createElement('div');
  div.id = 'id_snackbar';
  ReactDOM.render(mysnacbar, document.getElementById('__next').appendChild(div));
};

const snackBarError=  (errors) =>{
  if(typeof errors === "object"){
    Object.keys(errors).map(res => {
      errors = Object.values(errors[res])
    });
  }
  var mysnacbar = <SnackBar severity={'error'} message={errors}/>;
  var div = document.createElement('div');
  ReactDOM.render(mysnacbar, document.getElementById('__next').appendChild(div));
};

module.exports = {
  snackBarSuccess,
  snackBarError
};
