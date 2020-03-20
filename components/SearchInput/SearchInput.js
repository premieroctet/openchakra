import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './SearchInputStyle'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Router from 'next/router';
import moment from 'moment';
import axios from 'axios';
const { config } = require('../../config/config');
const url = config.apiUrl;

class SearchInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      research: '',
      gps:'',
      city: ''
    };
    this.findService = this.findService.bind(this)
  }

  keyPress(e) {
    if(e.keyCode === 13){
      this.props.search(this.state.research);
    }
  }

  findService(){
    if(this.state.research === ""){
      Router.push(`/search`)
    }else if(Router.pathname === '/search'){
      this.props.search(this.state.research)
    }else{
      Router.push(`/search?service=${this.state.research}`)
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.mainContainer}>
        <Grid style={{width: '100%'}}>
          <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu" onClick={this.findService}>
              <Search />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <InputBase
              className={classes.input}
              placeholder="Quel service ?"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(event)=>{this.setState({research: event.target.value});}}
              onKeyDown={(e)=>this.keyPress(e)}
            />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchInput);
