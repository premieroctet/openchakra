/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  cardContainer: {
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '1.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    maxHeight: 700,
    overflow: 'auto',
    width: '55%',
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
});

function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

class Step1 extends Component {

    
  state = {
    isBeauty: 0,
    isCraft: 0,
  }

  handleClickBeauty = () => {
    const isBeauty = this.state.isBeauty;
    this.setState({isBeauty: !isBeauty})
    console.log(this.state);
  }

  handleClickCraft = () => {
    const isCraft = this.state.isCraft;
    this.setState({isCraft: !isCraft});
    console.log(this.state);
  }

  /**/
  render() {
    if (this.props.currentStep !== 1) {
        return null;
      }
    const { classes } = this.props;
    return (
      <Grid container className={classes.cardContainer}>
        <Card className={classes.card}>
          <Grid container style={{ flexDirection: 'column', height: '100%' }}>
            <Grid container className={classes.cardHeader}>
              <Grid item>
                <Typography>Étape 1/3</Typography>
              </Grid>
              <Grid item>
                <Typography>Créez votre boutique de services</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <Grid container className={classes.cardProgressBar}>

            </Grid>
            <Grid item className={classes.cardBody}>
              <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item style={{ display: 'flex', flexGrow: 1, padding: '1rem' }}>
                  <select multiple style={{ width: '100%' }}>
                    <option value="beauté" onClick={this.handleClickBeauty}>Beauté</option>
                    <option value="bricolage" onClick={this.handleClickCraft}>Bricolage</option>
                  </select>
                </Grid>
                <Grid item style={{ display: 'flex', flexGrow: 1, padding: '1rem' }}>
                  {this.state.isBeauty == 1 ? <select multiple style={{ width: '100%' }}>
                    <option value="coiffure">Coiffure</option>
                  </select> : null}
                  {this.state.isCraft == 1 ? <select multiple style={{ width: '100%' }}>
                    <option value="jardin">Jardin</option>
                  </select> : null}
                </Grid>
                <Grid>

                </Grid>
              </Grid>

            </Grid>

          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Step1);

