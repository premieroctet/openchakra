import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SelectUniversel from './SelectUniversel';
import Checkboxes from '../Checkboxes/checkboxes';
import MyCalendar from '../Calendar.1/calendar';
import Universaltext from '../Textfields/Textfieluniversal';
import '../../static/style2.css';

const styles = theme => ({
  cardContainer: {
    height: '120vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '1.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    maxHeight: 500,
    overflow: 'auto',
    width: '70%',
    textAlign: 'center',
  },
  cardHeader: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  cardProgressBar: {
    display: 'flex',
    flexGrow: 1,
  },
  cardBody: {
    display: 'flex',
    flexGrow: 8,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    backgroundColor: 'lightgrey',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 232,
    },
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
  },
  categoryExpansion: {
    marginBottom: 5,
  },
  textinput: {
    marginTop: '35px',
  },
  dlidentite1: {
    lineHeight: 5.3,
    '&:hover': {
      cursor: 'pointer',
      color: '#000080',
    }
  },
  dlidentite2: {
    '&:hover': {
      cursor: 'pointer',
      color: '#000080',
    }
  },
  vridentite: {
    marginTop: 35,
  },
  titre1: {
    fontSize: 18,
  },
  titre2: {
    fontSize: 18,
  },
  titre3: {
    fontSize: 18,
  },
  titre4: {
    fontSize: 18,
  },
  petit1: {
    fontSize: 12,
  },
  petit2: {
    fontSize: 12,
  },
  checkboxespart: {
    marginTop: 25,
  },
  finpres: {
    marginTop: 25,
  },
  obligations: {
    marginTop: 31,
  },
  input: {
    display: 'none',
  },
  items: {
    textAlign: 'left',
    lineHeight: '3.5!important',
  },
  dispos: {
    marginTop: 40,
  },
  lescheckboxes: {
    marginTop: 30,
  },
});


class Designuniform extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.cardContainer}>
        <Card className={classes.card}>
          <Grid container>
            <Grid xs={12}>
              <Typography><h1>Devenir un Alfred</h1></Typography>
            </Grid>
            <Grid xs={12}>
              <Typography><h2>Créez votre boutique de service</h2></Typography>
            </Grid>
            <Grid xs={12}>
              <SelectUniversel />
            </Grid>
            <Grid xs={12}>  
              <SelectUniversel />
            </Grid>
            <Grid container className={classes.lescheckboxes}>
              <Grid xs={2}>
              </Grid> 
              <Grid xs={2}>
                <Grid container>
                  <Grid xs={2}> 
                    <Checkboxes />
                  </Grid>
                  <Grid xs={10}>
                    <Typography className={classes.items}>item</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={2}>
                <Grid container>
                  <Grid xs={2}> 
                    <Checkboxes />
                  </Grid>
                  <Grid xs={10}>
                    <Typography className={classes.items}>item</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={2}>
                <Grid container>
                  <Grid xs={2}> 
                    <Checkboxes />
                  </Grid>
                  <Grid xs={10}>
                    <Typography className={classes.items}>item</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={2}>
                <Grid container>
                  <Grid xs={2}> 
                    <Checkboxes />
                  </Grid>
                  <Grid xs={10}>
                    <Typography className={classes.items}>item</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={4}>
              <Universaltext />
            </Grid>
            <Grid xs={4}>  
              <Universaltext />
            </Grid>
            <Grid xs={4}>  
              <Universaltext />
            </Grid>  
            <Grid xs={12} className={classes.dispos}>
              <Typography><h2>Vos Disponibilités</h2></Typography>
            </Grid>
            <Grid xs={12}>
              <MyCalendar />
            </Grid>

          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Designuniform);
