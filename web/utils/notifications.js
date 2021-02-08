import SnackBar from "../components/SnackBar/SnackBar";
import React from "react";


const snackBar =  (type,messages) =>{
  console.log('function')
  return (<SnackBar severity={type} message={messages} open={true} closeSnackBar={false}/>);
};

module.exports = {
  snackBar,
};
