import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import HubspotForm from 'react-hubspot-form'
import Footer from '../../hoc/Layout/Footer/Footer';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const styles = theme => ({
  fullContainer: {
    display:'flex',
    flexDirection:'row',
    width: '100%',
    marginBottom:'2%',
    [theme.breakpoints.down('sm')]: {
      height:'65vh',
    }
  },
  loginContainer: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    width: '50%',
  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
    marginTop: '15%',
  },
  cardContant: {
    flexDirection: 'column',
  },
  [theme.breakpoints.between('sm','xl')]: {
    secondContainer: {
      width: '50%',
      heigh: '100vh',
      textAlign: 'center',
    }
  },
  [theme.breakpoints.down('sm')]: {
    secondContainer: {
      display:'none'
    },
    hrStyle:{
      display:'none'
    },
    fullContainer: {
      flexDirection:'column',
      height:'100%'
    },
    loginContainer:{
      width : 'inherit'
    }
  },
  [theme.breakpoints.only('xs')]:{
    loginContainer:{
      marginTop:'2%'
    }
  },
  hrStyle:{
    borderWidth: 0.5,
    color:'lightgray'
  }
});

class contactPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <Grid className={classes.fullContainer}>
          <Grid container className={classes.loginContainer}>
            <Card className={classes.card}>
              <Grid item style={{textAlign:'center'}}>
                <Typography style={{ fontSize: 30 }}>Contact</Typography>
                <img src={'../static/contact_alfred.png'} alt={'contact'} style={{width:100, height:100}}/>
              </Grid>
              <HubspotForm
                portalId='5065724'
                formId='92c4cd76-835c-45ed-94ee-8f4ce28f2779'
                onSubmit={() => console.log('Submit!')}
                onReady={(form) => console.log('Form ready!')}
                loading={<div>Loading...</div>}
              />
            </Card>
          </Grid>
          <hr className={classes.hrStyle}/>
          <Grid className={classes.secondContainer}>
            <img src={'../static/background/contactez_nous.svg'} style={{height:'100vh', width:'90%'}} alt={'test'}/>
          </Grid>
        </Grid>
        {/* <Footer/>*/}

      </Layout>

    )
  }
}

export default withStyles(styles)(contactPage);
