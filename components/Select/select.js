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

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Selectgenre extends React.Component {
  state = {
    genre: '',
    labelWidth: 0,
  };

 
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="genre-label-placeholder">
            Genre
          </InputLabel>
          <Select
            value={this.state.genre}
            onChange={this.handleChange}
            input={<Input name="genre" id="genre-label-placeholder" />}
            displayEmpty
            name="genre"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>...</em>
            </MenuItem>
            <MenuItem value={"Men"}>Homme</MenuItem>
            <MenuItem value={"Women"}>Femme</MenuItem>
            <MenuItem value={"Others"}>Non défini</MenuItem>
          </Select>
          <FormHelperText>Quel est votre genre ?</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

Selectgenre.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Selectgenre);