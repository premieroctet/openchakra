import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { Field } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import styles from './ButtonSwitchStyle'
import utils from 'util';


const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: '#47bdd7',
      '& + $track': {
        backgroundColor: 'white',

      },
    },
    '&$focusVisible $thumb': {
      color: 'white',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const CssTextField = withStyles({
  root: {
    '& label': {
      fontSize: '0.8rem',
    },
  },
})(TextField);


class ButtonSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked || false,
      billing: props.isOption ?this.props.billing[0] : null,
      price:0,
      label: this.props.label,
    };
    this.onToggle = this.onToggle.bind(this);
    this.onChangeBilling = this.onChangeBilling.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeLabel = this.onChangeLabel.bind(this);
  }

  onToggle(){
    this.setState({checked: !this.state.checked}, () => this.props.onChange(this.props.id, this.state.checked, this.state.price, this.state.billing, this.state.label ));
  };

  onChangeBilling(event, index) {
    let billing={_id:index.key, label:event.target.value};
    this.setState({billing: billing}, () => this.props.onChange(this.props.id, this.state.checked, this.state.price, this.state.billing, this.state.label));
  }

  onChangePrice(event) {
    this.setState({price: parseInt(event.target.value)}, () => this.props.onChange(this.props.id, this.state.checked, this.state.price, this.state.billing, this.state.label));
  }

  onChangeLabel(event) {
    this.setState({label: event.target.value}, () => this.props.onChange(this.props.id, this.state.checked, this.state.price, this.state.billing, this.state.label ));
  }

  render() {
    const {classes, isEditable, isOption, isPrice, billing} = this.props;
    const {label} = this.state;
    
    return(
      <Grid className={classes.contentFiltre}>
        <Grid className={classes.responsiveIOSswitch} style={{width : this.props.width}}>
          <IOSSwitch
            color="primary"
            type="checkbox"
            checked={this.state.checked}
            onChange={this.onToggle}
          />
        {isEditable ?
           <CssTextField placeholder='Saisissez un intitulé' value={this.state.label} onChange={this.onChangeLabel} />
           :
           label === undefined ? "label introuvable" : label}
        </Grid>
        { isPrice ?
          <Grid className={classes.responsiveIOSswitchContent}>
            {this.state.checked === true ?
              <Grid style={{display:'flex'}}>
                <CssTextField
                  value={this.state.price}
                  label={`Prix`}
                  type="number"
                  className={classes.textField}
                  disabled={!this.state.checked}
                  onChange={this.onChangePrice}
                  InputProps={{
                    inputProps: {
                      min: 0
                    },
                    endAdornment: <InputAdornment position="start">€</InputAdornment>,
                  }}
                />
                { isOption ?
                  <Select
                    style={{
                      width: '100px',
                      fontSize: '0.8rem'
                    }}
                    disabled={!this.state.checked}
                    margin="none"
                    onChange={this.onChangeBilling}
                    value={this.state.billing.label}
                    key={this.state.billing._id}
                  >
                    {billing.map(option => {
                      return (
                        <MenuItem key={option._id} value={option.label}>{option.label}</MenuItem>
                      )
                    }
                    )
                    }
                  </Select> : null
                }
              </Grid>
              :null
            }
          </Grid> : null
        }

      </Grid>
    )
  }
}

ButtonSwitch.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (ButtonSwitch);
