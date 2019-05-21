import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import Layout from '../hoc/Layout/Layout';

const styles = {
  signupContainer: {
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
  },
};

const signup = (props) => {
  const { classes } = props;

  return (
    <Layout>
      <Grid container className={classes.signupContainer}>
        <Card className={classes.card}>
          <Grid>
            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography style={{ fontSize: 30 }}>Inscription</Typography>
            </Grid>
            <form>
            <Grid item>
              <TextField
                id="standard-with-placeholder"
                label="Prenom"
                placeholder="Prénom"
                margin="normal"
                style={{ width: '100%' }}
                type="email"
              />
            </Grid>
            <Grid item>
                <TextField
                  id="standard-with-placeholder"
                  label="Nom"
                  placeholder="Nom"
                  margin="normal"
                  style={{ width: '100%' }}
                  type="email"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="standard-with-placeholder"
                  label="Email"
                  placeholder="Email"
                  margin="normal"
                  style={{ width: '100%' }}
                  type="email"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="standard-with-placeholder"
                  label="Mot de passe"
                  placeholder="Mot de passe"
                  margin="normal"
                  style={{ width: '100%' }}
                  type="password"
                />
                <Typography>
                  <Link href='#'>
                    <a className={classes.linkText}>
                      Acceptez vous nos CGU ? 
                    </a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                  Inscription
                </Button>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Grid>
    </Layout>
  );
};

export default withStyles(styles)(signup);
