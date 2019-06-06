import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const styles = theme => ({
  checkboxgrand: {
    fontSize: '40px',
  },
});

class Checkboxes extends React.Component {
  state = {
    checkedA: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="medium" />}
              checkedIcon={<CheckBoxIcon fontSize="medium" />}
              value="checkedI"
              color="primary"
            />
          }
        />
      </FormGroup>
      </div>
    );
  }
}

export default withStyles(styles)(Checkboxes);