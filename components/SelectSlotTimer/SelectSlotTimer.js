import Chip from '@material-ui/core/Chip';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SelectSlotTimerStyle'
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';



class SelectSlotTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recurrSlotTime: new Set()
        }
    }

    activeTimeSlot = (item) => {
        this.state.recurrSlotTime.has(item) ? this.removeSlotTime(item) : this.addSlotTime(item);
    };

    addSlotTime = (item) => {
        this.setState(({recurrSlotTime}) => ({
            recurrSlotTime: new Set(recurrSlotTime).add(item)
        }));
    };

    removeSlotTime = (item) => {
        this.setState(({recurrSlotTime}) => {
            const newChecked = new Set(recurrSlotTime);
            newChecked.delete(item);
            return {
                recurrSlotTime: newChecked
            };
        });
    };

    createRender = (arrayLength, index, classes) =>{
        const items = [];

        for (let i = index; i < arrayLength; i++ ) {
            items.push(
                <Chip
                    clickable
                    label={('0' + i).slice(-2) + 'h00 - ' + ('0' + (i+1)).slice(-2) + 'h00'}
                    style={{backgroundColor : this.state.recurrSlotTime.has(i) ? '#4fbdd7' : '#c4c4c4'}}
                    className={classes.textFieldChips}
                    onClick={() => {
                        this.activeTimeSlot(i);
                    }}
                   //avatar={<Avatar alt="avatar" title={'avatar'} src="../../static/assets/img/chat 2.jpg" />}
                />
            )
        }
        return items;
    };


    render() {
        const {classes, arrayLength, index} = this.props;

        return (
            <Grid>
                {this.createRender(arrayLength, index, classes)}
            </Grid>
        )
    }
}

export default withStyles(styles, { withTheme: true }) (SelectSlotTimer);
