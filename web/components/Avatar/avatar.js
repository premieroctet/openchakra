import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const styles = theme => ({
  button: {
    margin: theme.spacing,
  },
  input: {
    display: 'none',
  },
});

const Avatarsbutton = (props) => {
  const classes = props;
  return (
    <div>
      <div>
        <input accept="image/*" className="input" style={{display: 'none'}} id="icon-button-file" type="file"/>
        <label htmlFor="icon-button-file">
          <IconButton color="primary" className={classes.button}
                      style={{width: 70, height: 70, backgroundColor: 'lightgrey'}} component="span">
            <PhotoCamera/>
          </IconButton>
        </label>
      </div>
    </div>
  );
};

Avatarsbutton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Avatarsbutton);
