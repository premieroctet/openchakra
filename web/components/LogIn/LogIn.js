import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './LogInStyle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
const  {setAuthToken, setAxiosAuthentication}=require('../../utils/authentication')
import axios from 'axios';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import OAuth from '../OAuth/OAuth';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
const {snackBarError}=require('../../utils/notifications')
const {is_development}=require('../../config/config')
const {PROVIDERS, ROLES} = require('../../utils/consts');
const {ENABLE_GF_LOGIN} = require('../../config/config');
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const {is_b2b_admin, is_b2b_style, is_b2b_employee, is_b2b_site} = require('../../utils/context');
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import {COMPANY_ACTIVITY} from "../../utils/consts";


class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {},
      showPassword: false,
      roles: '',
      roleSelect: null,
      showRoles: false
    };
  }

  onChange = e => {
    const {name, value} = e.target;
    if(name === 'username' && is_b2b_site()){
      axios.get(`/myAlfred/api/users/roles/${e.target.value}`).then( res =>{
        let result = res.data;
        this.setState({roles: result}, () => this.controllerUser());
      }).catch( err => {
        console.error(err);
        this.setState({roleSelect: null, roles: ''})
      })
    }
    this.setState({[name]: value});
  };

  controllerUser = () =>{
    const {roles} = this.state;
    let newRoles = roles.filter(result =>  result !== ROLES.EMPLOYEE);

    if(is_b2b_site()){
      if(newRoles.length > 1){
        this.setState({roles: newRoles})
      }else{
        this.setState({roleSelect: newRoles})
      }
    }else{
      if(newRoles.length > 0){
        this.setState({roleSelect: ROLES.EMPLOYEE})
      }
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.roleSelect
    };

    axios.post('/myAlfred/api/users/login', user)
      .then(res => {
        setAuthToken()
        setAxiosAuthentication()
        axios.put('/myAlfred/api/users/account/lastLogin')
          .then(data => {
            this.props.login();
          })
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
        if (err.response) {
	        snackBarError(err.response.data);
          this.setState({errors: err.response.data});
        }
      });
  };

   handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) =>{
    event.preventDefault();
  };

  render() {
    const {classes, callRegister, id} = this.props;
    const {errors, username, password, showPassword, roles, roleSelect} = this.state;
    const showRoles = is_b2b_site() && roles.length > 1;

    return (
      <Grid className={classes.fullContainer}>
        <Grid style={{width: '100%'}}>
          <Grid className={classes.newContainer}>
            <Grid>
              <h2 className={classes.titleRegister}>Connexion</h2>
            </Grid>
            {ENABLE_GF_LOGIN ?
              <Grid className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                  <Grid className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end" className={classes.flexContainerPics}>
                      <Grid style={{width: '100%'}}>
                        {PROVIDERS.map(provider =>
                          <OAuth
                            login={true}
                            provider={provider}
                            key={provider}
                          />,
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end" className={classes.flexContainerPics}>
                      <Grid>
                        <h3 style={{color: 'rgba(84,89,95,0.95)', fontWeight: 'bold', letterSpacing: -1}}>Ou</h3>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              :
              null
            }
            <Grid container spacing={3} className={classes.containerDialogContent}>
              <Grid item className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                  <Grid item>
                    <MailOutlineIcon className={classes.colorIcon}/>
                  </Grid>
                  <Grid item className={classes.widthTextField}>
                    <Input
                      label="Email"
                      placeholder="Email"
                      style={{width: '100%', marginTop: 16, marginBottom: 8}}
                      name="username"
                      value={username}
                      onChange={this.onChange}
                      error={errors.username}
                    />
                    <em>{errors.username}</em>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                  <Grid item>
                    <LockOpenOutlinedIcon className={classes.colorIcon}/>
                  </Grid>
                  <Grid item className={classes.widthTextField}>
                    <Input
                      id="standard-with-placeholder"
                      label="Mot de passe"
                      placeholder="Mot de passe"
                      style={{width: '100%', marginTop: 16, marginBottom: 8}}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={this.onChange}
                      error={errors.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <em>{errors.password}</em>
                  </Grid>
                </Grid>
              </Grid>
              {showRoles ?
                <Grid item className={classes.margin}>
                  <Grid container className={classes.genericContainer}>
                    <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                      <Grid item>
                        <GroupOutlinedIcon className={classes.colorIcon}/>
                      </Grid>
                      <Grid item className={classes.widthTextField}>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-simple-select-label">Rôle</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={roleSelect}
                            onChange={this.onChange}
                            name={'roleSelect'}
                          >
                            {
                              Object.keys(roles).map((role,index) =>(
                                  <MenuItem key={index} value={roles[role]}>{ROLES[roles[role]]}</MenuItem>
                                ))
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid> : null
              }
              <Grid item className={classes.margin}>
                <Grid container className={classes.genericContainer}>
                  <Button onClick={this.onSubmit} disabled={showRoles && roleSelect === null || password === ''} variant="contained" color="primary" style={{width: '100%', color: 'white'}}>
                    Connexion
                  </Button>
                </Grid>
              </Grid>
              <Grid item className={classes.margin}>
                <Grid container className={classes.genericContainer} style={{flexDirection: 'column'}}>
                  <Link href={'/forgotPassword'}><a color="primary" style={{textDecoration: 'none', color: '#2FBCD3'}}>Mot
                    de passe oublié ?</a></Link>
                  <a color="primary" onClick={callRegister}
                     style={{textDecoration: 'none', color: '#2FBCD3', cursor: 'pointer'}}>Pas encore inscrit ?
                    Inscrivez-vous !</a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LogIn);
