import SnackBar from "../components/SnackBar/SnackBar";
import React from "react";
import ReactDOM from "react-dom";

const snackBarSuccess =  (messages) =>{
  var mysnacbar = <SnackBar severity={'success'} message={messages} id={messages}/>;
  let body = document.getElementById('__next');

  if(typeof messages === "object"){
    Object.keys(messages).map(val => {
      mysnacbar = <SnackBar severity={'success'} message={messages[val]} id={messages[val]}/>;
      let div = document.createElement('div');
      div.id = 'id_snackbar';
      ReactDOM.render(mysnacbar, body.appendChild(div));
    });
  }else{
    let div = document.createElement('div');
    div.id = 'id_snackbar';
    ReactDOM.render(mysnacbar, body.appendChild(div));
  }
};

const snackBarError=  (errors) =>{
  let body = document.getElementById('__next');
  let mysnacbar = <SnackBar severity={'error'} message={errors} id={errors}/>;

  if(typeof errors === "object"){
    Object.keys(errors).map(val => {
      mysnacbar = <SnackBar severity={'error'} message={errors[val]} id={errors[val]}/>;
      let div = document.createElement('div');
      div.id = 'id_snackbar';
      ReactDOM.render(mysnacbar, body.appendChild(div));
    });
  }else{
    let div = document.createElement('div');
    div.id = 'id_snackbar';
    ReactDOM.render(mysnacbar, body.appendChild(div));
  }
};

module.exports = {
  snackBarSuccess,
  snackBarError
};
