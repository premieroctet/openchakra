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
    width: 250,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  }, 
}); 


class Textnumsiret extends React.Component {
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
          label="N° de SIRET"
          placeholder="Renseignez votre numéro de SIRET"
          className={classes.textField}
          margin="normal"
        />
      </form>
    );
  }
}

Textnumsiret.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Textnumsiret);