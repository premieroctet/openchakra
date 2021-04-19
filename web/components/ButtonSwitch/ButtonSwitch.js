import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import styles from './ButtonSwitchStyle';
import Typography from "@material-ui/core/Typography";

const {inspect} = require('util');


const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 52,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    paddingLeft: 3,
    paddingRight: 2,
    paddingBottom: 2,
    paddingTop: 3,
    '&$checked': {
      padding: 2,
      transform: 'translateX(26px)',
      color: '#C7D4EE',
      '& + $track': {
        backgroundColor: 'white',
        opacity: 1,
        border: `1px solid ${theme.palette.grey[400]}`,
      },
    },
    '&$focusVisible $thumb': {
      color: '#C7D4EE',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 20,
    height: 20,
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
    this.checked = this.props.checked
    this.billing = props.billing ? (props.billing._id || this.props.billing): props.isOption ? this.props.billings[0]._id : null
    this.price = this.props.price
    this.label = this.props.label

    this.onToggle = this.onToggle.bind(this);
    this.onChangeBilling = this.onChangeBilling.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeLabel = this.onChangeLabel.bind(this);

    this.fireChange = this.fireChange.bind(this);
  }

  fireChange(id, checked, price, billing, label) {
    if (this.props.onChange) {
      this.props.onChange(this.props.id, this.checked, this.checked ? this.price : null, this.billing, this.label);
    }
  }

  onToggle(value) {
    this.checked = !this.checked
    this.fireChange()
  };

  onChangeBilling(event, index) {
    this.billing = event.target.value
    this.fireChange()
  }

  onChangePrice(event) {
    var price = parseInt(event.target.value);
    if (isNaN(price)) {
      price = null;
    }
    this.price = price
    this.fireChange()
  }

  onChangeLabel(event) {
    this.label = event.target.value
    this.fireChange()
  }

  render() {
    const {classes, isEditable, isOption, isPrice, billings, priceDisabled} = this.props;
    var {label, checked} = this;

    return (
      <Grid container spacing={2} style={{width: '100%', margin:0}}>
        <Grid item xl={6} lg={6} md={8} sm={8} xs={6} className={classes.responsiveIOSswitch} style={{width: this.props.width}}>
          <Grid>
            <IOSSwitch
              color="primary"
              type="checkbox"
              checked={checked}
              onChange={this.onToggle}
            />
          </Grid>
          <Grid>
            <span>
        {isEditable ?
          <CssTextField
            label={'Intitulé'}
            placeholder={'Saisissez un intitulé'}
            value={this.label}
            onChange={this.onChangeLabel}
            error={!this.label}
            helperText={this.label ? null : 'Obligatoire'}
          />
          :
          <Typography style={{color: '#696767'}}>{label === undefined ? 'label introuvable' : label}</Typography>
        }
            </span>
          </Grid>
        </Grid>
        {isPrice ?
          <Grid item xl={6} lg={6} md={4} sm={4} xs={6} className={classes.responsiveIOSswitchContent}>
            {checked === true ?
              <Grid className={classes.containerLabel_mode}>
                <CssTextField
                  value={this.price}
                  label={<Typography style={{color:'#696767'}}>Tarif</Typography>}
                  type="number"
                  className={classes.textField}
                  disabled={!checked || priceDisabled}
                  onChange={this.onChangePrice}
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                    endAdornment: <InputAdornment position="start">€</InputAdornment>,
                  }}
                  error={!this.price}
                  helperText={this.price ? null : 'Obligatoire'}
                />
                {isOption ?
                  <Select
                    style={{
                      width: '100px',
                      fontSize: '0.8rem',
                    }}
                    disabled={!checked}
                    margin="none"
                    onChange={this.onChangeBilling}
                    value={this.billing}
                  >
                    {billings.map(bill => {
                        return (
                          <MenuItem value={bill._id.toString()}>{bill.label}</MenuItem>
                        );
                      },
                    )
                    }
                  </Select> : null
                }
              </Grid>
              : null
            }
          </Grid> : null
        }

      </Grid>
    );
  }
}

export default withStyles(styles)(ButtonSwitch);
