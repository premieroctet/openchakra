import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class Textcoiffure extends React.Component {
  state = {
    multiline: 'Controlled',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">        
        <TextField
          id="standard-full-width"
          label="Coiffure"
          multiline
          rows="2"
          rowsMax="3"
          onChange={this.handleChange('multiline')}
          style={{ margin: 8 }}
          placeholder=""
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  }
}

Textcoiffure.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Textcoiffure);