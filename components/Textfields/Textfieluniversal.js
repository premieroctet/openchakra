import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

class Universaltext extends React.Component {
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
            label="périmètre / achat / etc"
            placeholder="Renseignez votre périmètre / panier minimum"
            className={classes.textField}
            margin="normal"
          />
        </form>
      );
    }
  }
  
  Universaltext.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Universaltext);