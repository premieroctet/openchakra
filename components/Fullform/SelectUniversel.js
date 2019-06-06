import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 350,
    marginTop: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  lesinputs: {
    display: 'block',
    margin: 'auto',
    textAlign: 'center!important',
  }
});

class SelectUniversel extends React.Component {
  state = {
    service: '',
    labelWidth: 0,
  };

 
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <div className={classes.lesinputs}>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.formControl2} shrink htmlFor="service-label-placeholder">
            Service
          </InputLabel>
          <Select
            value={this.state.service}
            onChange={this.handleChange}
            input={<Input name="service" id="service-label-placeholder" />}
            displayEmpty
            name="service"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>...</em>
            </MenuItem>
            <MenuItem value={"Coiffure"}>Coiffure</MenuItem>
            <MenuItem value={"Plomberie"}>Plomberie</MenuItem>
            <MenuItem value={"Menage"}>Ménage</MenuItem>
            </Select>
        </FormControl></div>
      </form>
    );
  }
}

SelectUniversel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectUniversel);