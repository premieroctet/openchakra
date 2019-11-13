import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CheckIcon from '@material-ui/core/SvgIcon/SvgIcon';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const styles = theme => ({

  contentWarper: {
    display: 'flex',
    flexDirection:'row',
    backgroundColor: '#4fbdd7',
    borderRadius: '50px',
    justifyContent: 'space-around'
  },
  contentCheckBox: {
    display:'flex',
    alignItems:'center',
    backgroundColor: 'green'
  }

});

const GreenCheckbox = withStyles({
  root: {
    color: 'green',
    '&$checked': {
      color: 'green',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);




class ButtonMultiChoice extends React.Component{
  constructor(props){
    super(props)
  }

  setSelected(){
    console.log('bonjour')
  }

  render() {
    const {classes} = this.props;

    {/*const [state, setState] = React.useState({
      checkedG: true,
    });

    const handleChange = name => event => {
      setState({ ...state, [name]: event.target.checked });
    };*/}


    return (
      <div className={classes.contentWarper}>
        <div className={classes.contentCheckBox}>
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={state.checkedG}
                onChange={handleChange('checkedG')}
                value="checkedG"
              />
            }
            label="Custom color"
          />
        </div>
        <div style={{backgroundColor:'red'}}>
          <label style={{ padding: '1%' }}>
            Frais de déplacement (montant forfaitaire)
          </label>
        </div>
        <div style={{backgroundColor:'purple'}}>
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

export default  withStyles(styles)(ButtonMultiChoice);
