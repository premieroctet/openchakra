import Chip from '@material-ui/core/Chip';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SelectSlotTimerStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar'

class SelectSlotTimer extends React.Component {
  constructor(props) {
    super(props);
    this.createRender = this.createRender.bind(this);
  }

  toggleTimeSlot = item => {
    this.props.onChange(item);
  };

  createRender = (arrayLength, index, classes, bookings) => {
    var items = [];

    for (let i = index; i < index+arrayLength; i++) {
      const color=this.props.slots[i]==true ? '#4fbdd7' : this.props.slots[i]==false ?'#c4c4c4' : ''
      const pattern = this.props.slots[i]==null ? 'repeating-linear-gradient(45deg, #4fbdd7 48%, #FFFFFF  50%, #4fbdd7 51%)' : ''
      const avatar=bookings[i] ? `/${bookings[i]}` : null
      var avatarProp = avatar ? <Avatar src={avatar} /> : <div />
      items.push(
        <Chip
          clickable
          label={('0' + i).slice(-2) + 'h00 - ' + ('0' + (i + 1)).slice(-2) + 'h00'}
          style={{backgroundColor: color, backgroundImage: pattern}}
          className={classes.textFieldChips}
          avatar={ avatarProp }
          onClick={() => {
            this.toggleTimeSlot(i);
          }}
          selectable={false}
        />

      );
    }
    return items;
  };

  render() {
    const {classes, arrayLength, index, bookings} = this.props;

    return (
      <Grid style={{textAlign: 'center'}}>
        {this.createRender(arrayLength, index, classes, bookings)}
      </Grid>
    );
  }
}

export default withStyles(styles, {withTheme: true})(SelectSlotTimer);
