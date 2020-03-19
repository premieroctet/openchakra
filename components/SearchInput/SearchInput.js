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
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

class SearchInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      research: '',
    }
  }

  keyPress(e) {
    if(e.keyCode === 13){
      this.props.search(this.state.research);
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.mainContainer}>
        <Grid>
          <FormControl variant="outlined"  margin='dense'>
            <InputLabel variant={"outlined"} style={{backgroundColor :'white'}}>Quel service ? </InputLabel>
            <OutlinedInput
              Element
              id="input-with-icon-textfield"
              type={'text'}
              variant="outlined"
              value={this.state.research}
              className={classes.textField}
              onChange={(event)=>{this.setState({research: event.target.value});}}
              onKeyDown={(e)=>this.keyPress(e)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search"
                    onClick={()=>this.props.search(this.state.research)}
                  >
                    {<Search />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
