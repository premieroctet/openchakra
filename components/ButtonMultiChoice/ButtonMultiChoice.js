import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CheckIcon from '@material-ui/core/SvgIcon/SvgIcon';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './ButtonMultiChoice.css';

const GreenCheckbox = withStyles({
  root: {
    color: '#B0B0B0',
    '&$checked': {
      color: 'green',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

class ButtonMultiChoice extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checkedG: false
    }
  }

  setSelected(){
    this.checkedG = !this.checkedG;
    console.log('bonjour');
  }

  render() {
    return(
      <div className={"contentWarper"}>
        <div className={"contentCheckBox"}>
          <FormControlLabel
            control={
              <GreenCheckbox
                onChange={this.setSelected()}
                value="checkedG"
              />
            }
          />
        </div>
        <div style={{ backgroundColor: 'red' }}>
          <label style={{ padding: '1%' }}>
            Frais de déplacement (montant forfaitaire)
          </label>
        </div>
        <div style={{ backgroundColor: 'purple' }}>
          <TextField
            id="standard-basic"
            label="Standard"
            margin="normal"
          />
        </div>
      </div>
    )
  }
}
export default ButtonMultiChoice;
