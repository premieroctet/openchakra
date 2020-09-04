import Chip from '@material-ui/core/Chip';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SelectSlotTimerStyle'
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';



class SelectSlotTimer extends React.Component {
    constructor(props) {
      super(props);
      this.createRender = this.createRender.bind(this)
    }

    toggleTimeSlot = item => {
      this.props.onChange(item, !this.props.slots.has(item))
    };

    createRender = (arrayLength, index, classes) =>{
        const items = [];

        for (let i = index; i < arrayLength; i++ ) {
            items.push(
                <Chip
                    key={i}
                    clickable
                    label={('0' + i).slice(-2) + 'h00 - ' + ('0' + (i+1)).slice(-2) + 'h00'}
                    style={{backgroundColor :  this.props.slots ? this.props.slots.has(i) ? '#4fbdd7' : '#c4c4c4' : '#c4c4c4'}}
                    className={classes.textFieldChips}
                    onClick={() => { this.toggleTimeSlot(i) }}
                />
            )
        }
        return items;
    };


    render() {
        const {classes, arrayLength, index} = this.props;

        return (
            <Grid style={{textAlign: 'center'}}>
                {this.createRender(arrayLength, index, classes)}
            </Grid>
        )
    }
}

export default withStyles(styles, { withTheme: true }) (SelectSlotTimer);
