import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Checkboxes from '../components/Checkboxes/checkboxes';
//import Selectgenre from '../components/Select/select';
//import Datenaissance from '../components/Datenaissance/datepicker';
import Router from 'next/router';




import Layout from '../hoc/Layout/Layout';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";

const { config } = require('../config/config');
const url = config.apiUrl;
const styles = theme => ({
  signupContainer: {
    alignItems: 'center',
    height: '170vh',
    justifyContent: 'top',
    flexDirection: 'column',

    /*[theme.breakpoints.down('md')]: {
      height: '140vh',
    },
    [theme.breakpoints.down('sm')]: {
      height: '145vh',
    },
    [theme.breakpoints.down('xs')]: {
      height: '150vh',
    },*/
  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
    marginTop: '100px',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
    lineHeight: 4.15,
  },
  CGU: {
    marginTop:'5px!important',
  },
  datenaissance: {
    marginTop: 20,
  },
  selectgenre: {
    marginTop: 20,
    marginBottom: -15,
  },
});

class signup extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          gender: '',
          firstname:'',
          name: '',
          birthday: '',
          email: '',
          password: '',
          password2: '',
          errors: {}
        };
      }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
      onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

      onSubmit = e => {
        e.preventDefault();

        const newUser = {
          gender: this.state.gender,
          firstname: this.state.firstname,
          name: this.state.name,
          birthday: this.state.birthday,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2,
        };

        axios
            .post(url+'myAlfred/api/users/register', newUser)
            .then(res => {
              Router.push({pathname:'/login'})
            })
            .catch(err =>
                console.log(err)
            );


      };

      render() {
        const { classes } = this.props;
        const { errors } = this.state;

        return (
            <Layout>
              <Grid container className={classes.signupContainer}>
                <Card className={classes.card}>
                  <Grid>
                    <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography style={{ fontSize: 30 }}>Inscription</Typography>
                    </Grid>
                    <form onSubmit={this.onSubmit}>
                      <Grid item className={classes.selectgenre}>
                        <FormControl className={classes.formControl}>
                          <InputLabel shrink htmlFor="genre-label-placeholder">
                            Genre
                          </InputLabel>
                          <Select
                              input={<Input name="gender" id="genre-label-placeholder" />}
                              displayEmpty
                              name="gender"
                              value={this.state.gender}
                              onChange={this.onChange}
                              className={classes.selectEmpty}
                          >
                            <MenuItem value="">
                              <em>...</em>
                            </MenuItem>
                            <MenuItem value={"Homme"}>Homme</MenuItem>
                            <MenuItem value={"Femme"}>Femme</MenuItem>
                            <MenuItem value={"Autre"}>Non défini</MenuItem>
                          </Select>
                          <FormHelperText>Quel est votre genre ?</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <TextField
                            id="standard-with-placeholder"
                            label="Prénom"
                            placeholder="Prénom"
                            margin="normal"
                            style={{ width: '100%' }}
                            type="text"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.onChange}
                            error={errors.firstname}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="standard-with-placeholder"
                            label="Nom"
                            placeholder="Nom"
                            margin="normal"
                            style={{ width: '100%' }}
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                        />
                      </Grid>
                      <Grid item className={classes.datenaissance}>
                        <TextField
                            id="date"
                            label="Date de naissance"
                            type="date"
                            name="birthday"
                            className={classes.textField}
                            value={this.state.birthday}
                            onChange={this.onChange}
                            InputLabelProps={{
                              shrink: true,
                            }}
                        />
                        <FormHelperText>Quel est votre date de naissance ?</FormHelperText>
                      </Grid>
                      <Grid item>
                        <TextField
                            id="standard-with-placeholder"
                            label="Email"
                            placeholder="Email"
                            margin="normal"
                            style={{ width: '100%' }}
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
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
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="standard-with-placeholder"
                            label="Réécrivez votre mot de passe"
                            placeholder="Réécrivez votre mot de passe"
                            margin="normal"
                            style={{ width: '100%' }}
                            type="password"
                            name="password2"
                            value={this.state.password2}
                            onChange={this.onChange}
                            error={errors.password2}
                        />
                      </Grid>
                      <Grid container>
                        <Grid className="CGU" item xs={6}>
                          <Typography>
                            <Link href='#'>
                              <a className={classes.linkText}>
                                Acceptez vous nos CGU ?
                              </a>
                            </Link>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Checkboxes/>
                        </Grid>
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
}

export default withStyles(styles)(signup);
