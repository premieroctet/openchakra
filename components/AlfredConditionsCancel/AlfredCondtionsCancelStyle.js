import Grid from '@material-ui/core/Grid';
import React from 'react';

export default theme => ({
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width :'100%'
  },
  mainContainer: {
    width: '100%'
  },
  containerBooking:{
    display:'flex',
    justifyContent: 'space-between',
    width: '95%'
  },
  containerAlfred:{
    display: 'flex',
    flexDirection: 'column',
    marginLeft : 15
  },
  hrStyle:{
    width : '90%'
  },
  containerPosition:{
    display: 'flex',
  },
  contentPosition:{
    display:'flex',
    flexDirection: 'column',
    marginLeft : 'auto',
    width :'95%'
  },
  contentWelcomePosition:{
    display:'flex',
    flexDirection: 'row',
    marginTop:'1%',
    width:'50%',
    alignItems: 'center'
  },
  texfieldContent:{
    width: '100%',
    marginLeft: 30,
  },
  imgFatCastor:{
    width: 100
  },
  alignCheckbox:{
    display: 'flex',
    alignItems: 'center'
  },
  containerPositionWelcome:{
    display: 'flex',
    marginLeft: 30
  }
});
