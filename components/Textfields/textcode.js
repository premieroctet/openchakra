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
    width: 400,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  }, 
});


class Textcode4chiffre extends React.Component {
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
          id="standard-with-placeholder"
          label="Code de validation"
          placeholder="Renseignez le code à 4 chiffres que vous avez reçu"
          className={classes.textField}
          margin="normal"
        />
      </form>
    );
  }
}

Textcode4chiffre.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Textcode4chiffre);